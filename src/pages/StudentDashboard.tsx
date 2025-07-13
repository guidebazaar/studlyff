import React, { useState } from 'react';
import { Linkedin, Github, Globe, FileUp, FileText, Upload, FileCheck2, FileSearch, X } from 'lucide-react';

export default function StudentProfileDashboard() {
  // Demo data for posted projects/startups
  const postedItems = [
    {
      type: 'Startup',
      title: 'AI EdTech Platform',
      applicants: [
        { name: 'Alice Johnson', resume: 'alice_resume.pdf', summary: 'AI/ML Intern, 2 years exp.', status: 'pending' },
        { name: 'Bob Smith', resume: 'bob_resume.pdf', summary: 'Fullstack Dev, 1 year exp.', status: 'pending' },
      ],
    },
    {
      type: 'Project',
      title: 'Smart Resume Builder',
      applicants: [
        { name: 'Charlie Brown', resume: 'charlie_resume.pdf', summary: 'UI/UX Designer, 3 years exp.', status: 'pending' },
      ],
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const metricCards = [
    {
      title: "Education",
      icon: <span className="text-2xl neon-purple">🎓</span>,
      content: (
        <div>
          <div className="font-bold text-lg mb-1">B.Tech in CSE</div>
          <div className="text-white/80 text-sm mb-1">CGPA: 8.5</div>
          <div className="text-white/60 text-sm">ABC University, 2021-2025</div>
        </div>
      ),
    },
    {
      title: "Skills",
      icon: <span className="text-2xl neon-purple">🛠️</span>,
      content: (
        <div className="flex flex-wrap gap-2">
          {['React', 'Python', 'SQL', 'Communication', 'Teamwork'].map(skill => (
            <span key={skill} className="bg-[#a259ff22] text-white px-3 py-1 rounded-full text-xs font-semibold">{skill}</span>
          ))}
        </div>
      ),
    },
    {
      title: "Projects",
      icon: <span className="text-2xl neon-purple">📁</span>,
      content: (
        <div>
          <div className="mb-2">
            <div className="font-semibold">Portfolio Website.pdf <FileText className="inline w-4 h-4 ml-1 text-[#a259ff]" /></div>
            <div className="font-semibold">Task Manager App.zip <FileText className="inline w-4 h-4 ml-1 text-[#a259ff]" /></div>
            <div className="font-semibold">Chatbot.docx <FileText className="inline w-4 h-4 ml-1 text-[#a259ff]" /></div>
          </div>
          <button className="mt-2 flex items-center gap-2 bg-[#23272f] text-white px-3 py-1 rounded hover:bg-[#a259ff] transition"><FileUp className="w-4 h-4" />Upload Project File</button>
        </div>
      ),
    },
    {
      title: "Certifications",
      icon: <span className="text-2xl neon-purple">📜</span>,
      content: (
        <div>
          <div className="mb-2">
            <div className="font-semibold">Python by Google.pdf <FileText className="inline w-4 h-4 ml-1 text-[#a259ff]" /></div>
            <div className="font-semibold">Web Dev by Meta.pdf <FileText className="inline w-4 h-4 ml-1 text-[#a259ff]" /></div>
          </div>
          <button className="mt-2 flex items-center gap-2 bg-[#23272f] text-white px-3 py-1 rounded hover:bg-[#a259ff] transition"><FileUp className="w-4 h-4" />Upload Certificate</button>
        </div>
      ),
    },
    {
      title: "Links",
      icon: <span className="text-2xl neon-purple">🔗</span>,
      content: (
        <div className="flex gap-4 mt-2">
          <a href="#" className="hover:text-[#a259ff]" title="LinkedIn"><Linkedin className="w-6 h-6" /></a>
          <a href="#" className="hover:text-[#a259ff]" title="GitHub"><Github className="w-6 h-6" /></a>
          <a href="#" className="hover:text-[#a259ff]" title="Website"><Globe className="w-6 h-6" /></a>
        </div>
      ),
    },
    {
      title: "Resume",
      icon: <span className="text-2xl neon-purple">📄</span>,
      content: (
        <div>
          <div className="mb-2 text-white/80">Resume.pdf <FileCheck2 className="inline w-4 h-4 ml-1 text-[#a259ff]" /></div>
          <button className="flex items-center gap-2 bg-[#23272f] text-white px-3 py-1 rounded hover:bg-[#a259ff] transition"><Upload className="w-4 h-4" />Upload Resume</button>
        </div>
      ),
    },
  ];

  function openApplicants(item) {
    setSelectedItem(item);
    setModalOpen(true);
  }
  function closeApplicants() {
    setModalOpen(false);
    setSelectedItem(null);
  }

  return (
    <div className="bg-black min-h-screen w-full font-sans">
      <style>{`
        ::selection { background: #a259ff; color: #fff; }
        .neon-purple { color: #a259ff; }
        .neon-border { border: 2px solid #a259ff44; }
        .card-section { background: #18181b; border: 2px solid #a259ff44; border-radius: 1rem; box-shadow: 0 4px 32px 0 #a259ff11, 0 1.5px 8px 0 #0003; }
        .metric-card { min-height: 180px; padding: 2rem; }
        .metric-card:hover { box-shadow: 0 4px 32px 0 #a259ff55, 0 1.5px 8px 0 #0003; border-color: #a259ff; }
        .profile-btn:hover { filter: brightness(0.92); }
        .modal-blur-bg { position: fixed; inset: 0; z-index: 40; background: rgba(0,0,0,0.45); backdrop-filter: blur(6px); }
      `}</style>
      {/* Dashboard Heading (outside of any card) */}
      <header className="w-full px-4 sm:px-10 pt-8 pb-4 flex justify-between items-center border-b border-[#a259ff33] bg-black">
        <h1 className="text-3xl font-extrabold text-white tracking-wide">DASHBOARD</h1>
        <button
          className="text-white text-2xl font-bold hover:text-[#a259ff] transition"
          onClick={() => window.history.back()}
          title="Go Back"
        >
          <X className="w-8 h-8" />
        </button>
      </header>

      {/* Profile Section as Card */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-10 pt-8">
        <div className="card-section flex flex-col sm:flex-row items-center p-6 gap-6 mb-8 min-h-[180px]">
          <div className="flex-shrink-0 cursor-pointer group relative mb-4 sm:mb-0">
            <div className="h-24 w-24 rounded-full border-4 border-[#a259ff] bg-[#23272f] flex items-center justify-center text-4xl text-white">👤</div>
          </div>
          <div className="flex flex-col gap-1 text-white text-center sm:text-left">
            <span className="text-2xl font-bold">John Doe</span>
            <span className="text-white/80 text-base">john.doe@example.com</span>
            <span className="text-white/80 text-base">ABC University | Computer Science | 3rd Year</span>
            <span className="text-white/60 text-base">Hyderabad, India</span>
          </div>
        </div>
        {/* Bio Section as Card */}
        <div className="card-section p-6 mb-8">
          <label htmlFor="bio" className="block text-white font-bold mb-2 text-lg">Bio</label>
          <textarea
            id="bio"
            className="w-full bg-[#23272f] border border-[#a259ff44] rounded-lg p-3 text-white text-base resize-none focus:outline-none focus:border-[#a259ff] transition"
            rows={3}
            defaultValue="Aspiring software engineer passionate about building impactful products. Experienced in React, Python, and cloud technologies. Open to internships and collaborative projects."
          />
        </div>
      </section>

      {/* Metrics Grid with Neon Theme, cards elongate with content */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-10 pb-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {metricCards.map((item, idx) => (
            <div key={idx} className="metric-card card-section text-white text-base font-medium shadow-md hover:shadow-xl transition-all duration-200 flex flex-col gap-4 cursor-pointer">
              {/* Icon and Title OUTSIDE the card background visually */}
              <div className="flex items-center gap-2 mb-1 -mt-8 -ml-4">
                {item.icon}
                <strong className="text-white text-lg">{item.title}</strong>
              </div>
              <div className="flex-1">{item.content}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Activity Section as Card */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-10 pb-2">
        <h3 className="text-white font-bold mb-3 text-lg tracking-wide">Your Activity</h3>
        <div className="card-section p-6 mb-10 flex flex-col gap-6 min-h-[220px]">
          {postedItems.map((item, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-[#a259ff22] pb-4 last:border-b-0 last:pb-0">
              <span className="font-bold text-white text-lg">{item.title} <span className="text-[#a259ff] text-base font-normal">({item.type})</span></span>
              <button onClick={() => openApplicants(item)} className="bg-[#a259ff] text-white px-4 py-1 rounded font-semibold hover:bg-[#7e3fff] transition">Applicants</button>
            </div>
          ))}
        </div>
      </section>

      {/* Applicants Modal */}
      {modalOpen && selectedItem && (
        <div className="modal-blur-bg flex items-center justify-center">
          <div className="bg-[#18181b] neon-border rounded-2xl shadow-2xl p-8 w-full max-w-xl relative z-50">
            <button onClick={closeApplicants} className="absolute top-4 right-4 text-white/70 hover:text-[#a259ff] p-2 rounded-full transition"><X className="w-6 h-6" /></button>
            <div className="mb-4">
              <span className="font-bold text-white text-xl">Applicants for {selectedItem.title}</span>
            </div>
            {/* Application Forms */}
            <div className="mb-4">
              {selectedItem.applicants.map((app, i) => (
                <div key={i} className="bg-[#23272f] rounded-lg p-4 mb-3 flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="font-semibold text-white">{app.name}</span>
                    <a href="#" className="text-[#a259ff] underline flex items-center gap-1" download><FileText className="w-4 h-4" />{app.resume}</a>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button className="flex items-center gap-1 bg-[#23272f] text-white px-3 py-1 rounded hover:bg-[#a259ff] transition text-xs"><FileSearch className="w-4 h-4" />Application Analyser</button>
                    <button className="flex items-center gap-1 bg-[#23272f] text-white px-3 py-1 rounded hover:bg-[#a259ff] transition text-xs"><FileCheck2 className="w-4 h-4" />Resume Analyser</button>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="flex-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-xs">Accept</button>
                    <button className="flex-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-xs">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Buttons */}
      <footer className="w-full max-w-5xl mx-auto px-4 sm:px-10 pb-10 flex flex-col sm:flex-row gap-4">
        <button className="profile-btn flex-1 bg-white text-black font-bold rounded-2xl py-4 text-lg flex items-center justify-center gap-2 shadow hover:scale-105 transition">
          Edit Profile
        </button>
        <button className="profile-btn flex-1 bg-[#a259ff] text-white font-extrabold rounded-2xl py-4 text-lg flex items-center justify-center gap-2 shadow hover:scale-105 transition">
          Logout
        </button>
      </footer>
    </div>
  );
} 