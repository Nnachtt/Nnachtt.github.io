// Throttle function for performance optimization
function throttle(fn, delay) {
    let lastCall = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            fn(...args);
        }
    };
}

// Navbar toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', false);
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

// Navbar shadow on scroll
const navbar = document.querySelector('.navbar');
const throttledScroll = throttle(() => {
    updateActiveLink();
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, 100);

window.addEventListener('scroll', throttledScroll);

// Counter animation - prevent multiple triggers
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = Math.ceil(target / 60);
        
        const updateCounter = () => {
            current = Math.min(current + increment, target);
            counter.innerText = current === target ? target + '+' : current;
            
            if (current < target) {
                requestAnimationFrame(updateCounter);
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

// Contact form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function clearFormError(input) {
    const errorMsg = input.parentElement.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.textContent = '';
        input.classList.remove('input-error');
    }
}

function showFormError(input, message) {
    const errorMsg = input.parentElement.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.textContent = message;
        input.classList.add('input-error');
    }
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Clear errors on input
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => clearFormError(input));
        input.addEventListener('input', () => clearFormError(input));
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('#name');
        const email = contactForm.querySelector('#email');
        const subject = contactForm.querySelector('#subject');
        const message = contactForm.querySelector('#message');
        
        let isValid = true;

        // Validate name
        if (!name.value.trim()) {
            showFormError(name, 'Nama lengkap harus diisi');
            isValid = false;
        }

        // Validate email
        if (!email.value.trim()) {
            showFormError(email, 'Email harus diisi');
            isValid = false;
        } else if (!validateEmail(email.value)) {
            showFormError(email, 'Format email tidak valid');
            isValid = false;
        }

        // Validate subject
        if (!subject.value.trim()) {
            showFormError(subject, 'Subjek harus diisi');
            isValid = false;
        }

        // Validate message
        if (!message.value.trim()) {
            showFormError(message, 'Pesan harus diisi');
            isValid = false;
        }

        if (!isValid) return;

        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.textContent;
        btn.textContent = 'Mengirim...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'Pesan Terkirim!';
            btn.style.background = '#10b981';
            contactForm.reset();

            // Clear any error states
            inputs.forEach(input => clearFormError(input));

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

// Back to top button
const backToTopBtn = document.getElementById('backToTopBtn');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
