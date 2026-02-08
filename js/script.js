document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. MOBILE NAVBAR (HAMBURGER MENU)
       ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');

            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Tutup menu saat link diklik
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }

    /* =========================================
       2. TYPING EFFECT (EFEK MENGETIK)
       ========================================= */
    const textElement = document.querySelector('.role-text');
    if (textElement) {
        const words = ["Network Engineer", "Cybersecurity Enthusiast", "IT Support Specialist", "Music Producer"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                textElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                textElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }

    /* =========================================
       3. SCROLL ANIMATION (SKILLS & ABOUT)
       ========================================= */
    const createObserver = (targetSelector, activeClass = 'active', threshold = 0.2) => {
        const elements = document.querySelectorAll(targetSelector);
        if (elements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(activeClass);
                    }
                });
            }, { threshold: threshold });

            elements.forEach((el, index) => {
                if (!el.style.transitionDelay) {
                     el.style.transitionDelay = `${index * 0.1}s`;
                }
                observer.observe(el);
            });
        }
    };

    // Trigger Animasi
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        skillCards.forEach((card, index) => {
            card.style.transition = `opacity 0.6s ease-out, transform 0.6s ease-out`;
            card.style.transitionDelay = `${index * 0.1}s`;
            skillObserver.observe(card);
        });
    }

    createObserver('.reveal-text', 'active', 0.1);
    createObserver('.timeline-item', 'active', 0.3);
    setTimeout(() => { createObserver('.hobby-tag', 'active', 0.1); }, 500);


    /* =========================================
       4. AUTO ACTIVE LINK (SOLUSI BUG NAVBAR)
       ========================================= */
    // Logika: Ambil nama file dari URL browser, lalu cari link yang cocok
    const currentPage = window.location.pathname.split("/").pop(); // Ambil misal "about.html"
    const menuLinks = document.querySelectorAll('.nav-links a');

    menuLinks.forEach(link => {
        // Ambil href dari link (misal "about.html")
        const linkPage = link.getAttribute('href');

        // Jika URL browser kosong (root) atau index.html, tandai Home
        if ((currentPage === '' || currentPage === 'index.html') && linkPage === 'index.html') {
            link.classList.add('active');
        }
        // Untuk halaman lain (About, Skills, dll)
        else if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });

});