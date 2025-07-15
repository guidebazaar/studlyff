const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '20kb' })); // limit request body size

// Update the connection string to use Student_database (if using Atlas, the db name is in the URI)
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/student_database';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Update schema to match provided user structure and use 'users' collection
const userSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Firebase UID
  name: String,
  firstName: String,
  lastName: String,
  bio: String,
  branch: String,
  year: String,
  college: String,
  city: String,
  phoneNumber: String,
  linkedinUrl: String,
  githubUrl: String,
  portfolioUrl: String,
  profilePicture: String,
  skills: [String],
  interests: [String],
  careerGoals: String,
  dateOfBirth: String,
  resumeFiles: [String],
  projectFiles: [String],
  certificationFiles: [String],
  isOnline: Boolean,
  completedProfile: Boolean,
  createdAt: Date,
  updatedAt: Date,
}, { timestamps: true, collection: 'users' });

// Enforce 15KB document size
userSchema.pre('save', function(next) {
  const docSize = Buffer.byteLength(JSON.stringify(this.toObject()));
  if (docSize > 15 * 1024) {
    return next(new Error('Profile data exceeds 15KB limit.'));
  }
  next();
});

const User = mongoose.model('User', userSchema);

// Get user by UID
app.get('/api/profile/:uid', async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create or update user by UID
app.post('/api/profile/:uid', async (req, res) => {
  try {
    const data = req.body;
    if (Buffer.byteLength(JSON.stringify(data)) > 15 * 1024) {
      return res.status(400).json({ error: 'Profile data exceeds 15KB limit.' });
    }
    // Use _id as UID for upsert
    data._id = req.params.uid;
    const user = await User.findByIdAndUpdate(
      req.params.uid,
      { $set: data },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`)); 