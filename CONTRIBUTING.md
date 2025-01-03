<!DOCTYPE html>
<html>
<head>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --primary: #6d28d9;
  --primary-light: #8b5cf6;
  --secondary: #4f46e5;
  --accent: #a855f7;
  --bg: #ffffff;
  --bg-alt: #f8fafc;
  --text: #0f172a;
  --text-light: #475569;
  --border: #e2e8f0;
  --glass: rgba(255, 255, 255, 0.9);
  --glass-border: rgba(255, 255, 255, 0.3);
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
  --shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
  --gradient: linear-gradient(135deg, #6d28d9 0%, #a855f7 100%);
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.7;
  color: var(--text);
  background: var(--bg-alt);
  margin: 0;
  padding: 2rem;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  background: var(--bg);
  border-radius: 2rem;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.header {
  text-align: center;
  padding: 3rem 2rem;
  background: var(--gradient);
  color: white;
  position: relative;
  overflow: hidden;
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(255,255,255,0.1), transparent);
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  position: relative;
}

.header p {
  opacity: 0.9;
  margin-top: 1rem;
  font-size: 1.1rem;
  position: relative;
}

.content {
  padding: 2rem;
}

.team-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.team-card {
  background: var(--bg);
  border-radius: 1.5rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.avatar {
  width: 90px;
  height: 90px;
  border-radius: 1.2rem;
  margin: 0 auto 1.5rem;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  overflow: hidden;
}

.avatar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent);
}

.role {
  color: var(--primary);
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0.5rem 0;
}

.code-block {
  background: #1e1e1e;
  color: #e1e1e1;
  padding: 1rem;
  border-radius: 1rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  white-space: nowrap;
  margin: 1rem 0;
}

.step {
  background: var(--bg);
  border-radius: 1rem;
  padding: 1.5rem;
  margin: 1rem 0;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}

.step h3 {
  color: var(--primary);
  margin-top: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.contact-card {
  background: var(--bg-alt);
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}

.contact-card a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.note {
  background: var(--bg-alt);
  border-left: 4px solid var(--primary);
  padding: 1rem 1.5rem;
  border-radius: 0 1rem 1rem 0;
  margin: 1.5rem 0;
}

section {
  margin: 3rem 0;
}

h2 {
  color: var(--primary);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}
</style>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>🌙 Contributing to NyxBot</h1>
        <p>Bergabung dalam evolusi bot WhatsApp generasi berikutnya</p>
    </div>

    <div class="content">
        <section>
            <h2>👥 Core Development Team</h2>
            <div class="team-section">
                <div class="team-card">
                    <div class="avatar">S</div>
                    <h3>Sxyz</h3>
                    <div class="role">Project Leader</div>
                    <p>Arsitek utama dan visioner NyxBot</p>
                </div>
                
                <div class="team-card">
                    <div class="avatar">X</div>
                    <h3>Xxyroo</h3>
                    <div class="role">Case Developer</div>
                    <p>Spesialis pengembangan fitur dan optimasi</p>
                </div>
                
                <div class="team-card">
                    <div class="avatar">D</div>
                    <h3>Denis</h3>
                    <div class="role">Group Manager</div>
                    <p>Pengelola komunitas dan koordinator tim</p>
                </div>
            </div>
        </section>

        <section>
            <h2>🚀 Quick Start Guide</h2>
            
            <div class="step">
                <h3>1. Clone Repository</h3>
                <div class="code-block">git clone https://github.com/sxyz-dev/NyxBot.git</div>
            </div>

            <div class="step">
                <h3>2. Install Dependencies</h3>
                <div class="code-block">cd NyxBot && npm install</div>
            </div>

            <div class="step">
                <h3>3. Create Feature Branch</h3>
                <div class="code-block">git checkout -b feature/nama-fitur</div>
            </div>
        </section>

        <section>
            <h2>📝 Style Guide</h2>
            <div class="step">
                <ul>
                    <li>Gunakan ES6+ features</li>
                    <li>camelCase untuk penamaan fungsi dan variabel</li>
                    <li>Dokumentasi wajib untuk fungsi publik</li>
                    <li>Maksimal 80 karakter per baris</li>
                </ul>
            </div>
        </section>

        <section>
            <h2>📢 Channels</h2>
            <div class="contact-grid">
                <div class="contact-card">
                    <h3>Discord</h3>
                    <a href="https://discord.gg/nyxbot">NyxBot Community</a>
                </div>
                <div class="contact-card">
                    <h3>WhatsApp</h3>
                    <a href="https://chat.whatsapp.com/KfKHGQ4EKmV4sqRAhEmQKg">Developer Group</a>
                </div>
            </div>
        </section>

        <div class="note">
            <strong>Note:</strong> Dengan berkontribusi, Anda menyetujui lisensi MIT untuk kontribusi Anda.
        </div>
    </div>
</div>

</body>
</html>