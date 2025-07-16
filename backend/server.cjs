const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

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

// --- Connection Requests Schema ---
const connectionRequestSchema = new mongoose.Schema({
  from: { type: String, required: true }, // sender UID
  to: { type: String, required: true },   // receiver UID
  createdAt: { type: Date, default: Date.now, expires: 86400 } // auto-delete after 24h
}, { collection: 'connection_requests' });
const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);

// --- Connections Schema ---
const connectionSchema = new mongoose.Schema({
  users: [{ type: String, required: true }], // [uid1, uid2]
  createdAt: { type: Date, default: Date.now }
}, { collection: 'connections' });
const Connection = mongoose.model('Connection', connectionSchema);

// --- Messages Schema ---
const messageSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 86400 } // auto-delete after 24h
}, { collection: 'messages' });
const Message = mongoose.model('Message', messageSchema);

// --- API Endpoints ---
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
    if (Buffer.byteLength(JSON.stringify(data)) > 100 * 1024) {
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

// Send connection request
app.post('/api/connections/request', async (req, res) => {
  const { from, to } = req.body;
  if (!from || !to) return res.status(400).json({ error: 'Missing from or to' });
  // Prevent duplicate requests
  const exists = await ConnectionRequest.findOne({ from, to });
  if (exists) return res.status(409).json({ error: 'Request already sent' });
  // Prevent if already connected
  const connected = await Connection.findOne({ users: { $all: [from, to] } });
  if (connected) return res.status(409).json({ error: 'Already connected' });
  const reqDoc = await ConnectionRequest.create({ from, to });
  res.json(reqDoc);
});

// Get incoming requests for a user
app.get('/api/connections/requests/:uid', async (req, res) => {
  const { uid } = req.params;
  const requests = await ConnectionRequest.find({ to: uid });
  res.json(requests);
});

// Accept connection request
app.post('/api/connections/accept', async (req, res) => {
  const { from, to } = req.body;
  if (!from || !to) return res.status(400).json({ error: 'Missing from or to' });
  // Create connection for both users
  await Connection.create({ users: [from, to] });
  // Remove the request
  await ConnectionRequest.deleteOne({ from, to });
  res.json({ success: true });
});

// Reject connection request
app.post('/api/connections/reject', async (req, res) => {
  const { from, to } = req.body;
  if (!from || !to) return res.status(400).json({ error: 'Missing from or to' });
  await ConnectionRequest.deleteOne({ from, to });
  res.json({ success: true });
});

// Get all connections for a user
app.get('/api/connections/:uid', async (req, res) => {
  const { uid } = req.params;
  const conns = await Connection.find({ users: uid });
  // Return the other user's id for each connection
  const otherIds = conns.map(c => c.users.find(u => u !== uid));
  res.json(otherIds);
});

// Send a message
app.post('/api/messages/send', async (req, res) => {
  const { from, to, text } = req.body;
  if (!from || !to || !text) return res.status(400).json({ error: 'Missing from, to, or text' });
  const msg = await Message.create({ from, to, text });
  res.json(msg);
});

// Get messages between two users (last 24h)
app.get('/api/messages/:uid1/:uid2', async (req, res) => {
  const { uid1, uid2 } = req.params;
  const msgs = await Message.find({
    $or: [
      { from: uid1, to: uid2 },
      { from: uid2, to: uid1 }
    ]
  }).sort({ createdAt: 1 });
  res.json(msgs);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));

const uri = 'mongodb+srv://guidebazaar2:Guidebazaar2@cluster0.jhrhscn.mongodb.net/student_database'; // <-- Replace with your actual MongoDB URI
const client = new MongoClient(uri);

app.get('/api/users', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('student_database');
    // Only fetch fields needed for the Network page
    const users = await db.collection('users').find({}, {
      projection: {
        _id: 1,
        firstName: 1,
        profilePicture: 1,
        bio: 1,
        skills: 1,
        interests: 1,
        college: 1,
        year: 1,
        branch: 1,
        city: 1,
        isOnline: 1
      }
    }).toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  } finally {
    await client.close();
  }
});