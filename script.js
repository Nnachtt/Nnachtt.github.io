// Navbar toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

window.addEventListener('scroll', updateActiveLink);

// Navbar shadow on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const updateCounter = () => {
            const current = parseInt(counter.innerText);
            const increment = Math.ceil(target / 60);
            if (current < target) {
                counter.innerText = Math.min(current + increment, target);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + '+';
            }
        };
        updateCounter();
    });
}

// Intersection Observer for counters
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
}

// Testimonials data
const testimonials = [
    {
        text: 'SMA Kartika Nusantara benar-benar mengubah cara pandang saya terhadap pendidikan. Guru-guru sangat kompeten dan fasilitasnya lengkap.',
        name: 'Aulia Rahman',
        role: 'Alumni Angkatan 2020',
    },
    {
        text: 'Saya sangat puas dengan perkembangan anak saya sejak bersekolah di sini. Nilai akademiknya meningkat dan karakternya semakin baik.',
        name: 'Dr. Sari Dewi',
        role: 'Orang Tua Siswa',
    },
    {
        text: 'Program RPL-nya sangat bagus! Saya langsung dapat kerja setelah lulus berkat skill yang diajarkan di sekolah.',
        name: 'Dimas Pratama',
        role: 'Alumni Angkatan 2022',
    },
    {
        text: 'Lingkungan sekolah yang nyaman dan mendukung. Banyak kegiatan ekstrakurikuler yang seru dan bermanfaat.',
        name: 'Nadia Putri',
        role: 'Siswi Kelas XI',
    },
];

// Render testimonials
const container = document.getElementById('testimonialsContainer');
if (container) {
    testimonials.forEach((t, i) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.style.animationDelay = `${i * 0.15}s`;
        card.innerHTML = `
            <p class="testimonial-text">${t.text}</p>
            <div class="testimonial-author">
                <div class="testimonial-avatar">${t.name.charAt(0)}</div>
                <div>
                    <div class="testimonial-name">${t.name}</div>
                    <div class="testimonial-role">${t.role}</div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.textContent;
        btn.textContent = 'Mengirim...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'Pesan Terkirim!';
            btn.style.background = '#10b981';
            contactForm.reset();

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Scroll reveal animation
const revealElements = document.querySelectorAll('.program-card, .facility-card, .testimonial-card, .stat-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});
