function setLanguage(lang) {
    const data = content[lang];
    
    // Meta SEO
    document.getElementById('meta-title').textContent = data.title;
    document.getElementById('meta-desc').setAttribute('content', data.desc);
    document.documentElement.lang = lang;

    // Hero
    document.getElementById('hero-h1').textContent = data.hero.h1;
    document.getElementById('hero-p').textContent = data.hero.p;
    document.getElementById('hero-btn').textContent = data.hero.btn;
    document.getElementById('about-desc').textContent = data.about_desc;

    // Navigation
    const nav = document.getElementById('main-nav');
    nav.innerHTML = `
        <li><a href="#about">${data.nav.about}</a></li>
        <li><a href="#members">${data.nav.members}</a></li>
        <li><a href="#music">${data.nav.music}</a></li>
        <li><a href="#agenda">${data.nav.agenda}</a></li>
    `;

    // Members Grid
    const membersGrid = document.getElementById('members-grid');
    membersGrid.innerHTML = data.members.map(m => `
        <div class="card">
            <img src="img/members/${m.name.toLowerCase()}.jpg" alt="${m.name}">
            <h3>${m.name}</h3>
            <p class="orange">${m.role}</p>
            <p style="font-size: 0.9rem;">${m.bio}</p>
        </div>
    `).join('');

    // Music Grid
    const musicGrid = document.getElementById('music-grid');
    musicGrid.innerHTML = data.music_items.map(m => `
        <div class="card">
            <h3>${m.title}</h3>
            <p>${m.desc}</p>
            <a href="${m.link}" class="orange">Listen →</a>
        </div>
    `).join('');

    // Agenda
    const agendaList = document.getElementById('agenda-list');
    agendaList.innerHTML = data.agenda.map(a => `
        <div class="agenda-item">
            <span><strong>${a.date}</strong></span>
            <span>${a.city}</span>
            <span class="orange">${a.venue}</span>
        </div>
    `).join('');

    // RGPD Link
    const legalLink = document.getElementById('legal-link');
    legalLink.textContent = data.nav.legal;
    legalLink.href = `legal/rgpd_${lang}.html`;

    localStorage.setItem('lang', lang);
    
    // Animation GSAP
    gsap.from(".card, .agenda-item", { opacity: 0, y: 30, duration: 0.8, stagger: 0.1 });
}

// Custom Cursor
document.addEventListener('mousemove', (e) => {
    gsap.to("#custom-cursor", { x: e.clientX, y: e.clientY, duration: 0.1 });
});

window.onload = () => {
    const savedLang = localStorage.getItem('lang') || 'de';
    setLanguage(savedLang);
};
