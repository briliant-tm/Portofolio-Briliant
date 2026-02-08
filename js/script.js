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
    
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form-wrapper');
    if(contactInfo) { contactInfo.style.animationPlayState = 'running'; }
    if(contactForm) { contactForm.style.animationPlayState = 'running'; }

    setTimeout(() => { createObserver('.hobby-tag', 'active', 0.1); }, 500);


    /* =========================================
       4. AUTO ACTIVE LINK (NAVBAR HIGHLIGHT)
       ========================================= */
    const currentPage = window.location.pathname.split("/").pop();
    const menuLinks = document.querySelectorAll('.nav-links a');

    menuLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if ((currentPage === '' || currentPage === 'index.html') && linkPage === 'index.html') {
            link.classList.add('active');
        } else if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });

    /* =========================================
       5. PROJECTS FILTER (DENGAN DESKRIPSI DINAMIS)
       ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const channelBtn = document.getElementById('channelBtn');
    const descElement = document.querySelector('.portfolio-desc'); // Elemen Deskripsi

    // KAMUS DESKRIPSI (Ganti kata-katanya di sini sesuka hati)
    const descriptions = {
        'all': "Menjelajahi dunia infrastruktur jaringan, keamanan siber, hingga produksi musik. Berikut adalah dokumentasi perjalanan teknis dan kreatif saya.",
        
        'network': "Merancang arsitektur jaringan yang aman dan efisien. Fokus pada Routing, Switching (Cisco/Mikrotik), dan manajemen bandwidth untuk skala Enterprise.",
        
        'music': "Eksperimen audio visual melalui berbagai genre eksperimental. Tidak hanya fokus kepada satu genre saja, melainkan bereksperimen genre baru yang belum disentuh sebelumnya.",
        
        'coding': "Mengembangkan antarmuka web yang responsif dan interaktif menggunakan teknologi modern seperti HTML5, CSS3, dan JavaScript."
    };

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 1. Update Class Active pada Tombol
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                // 2. ANIMASI GANTI TEKS DESKRIPSI
                if (descElement) {
                    descElement.style.opacity = 0; // Fade out sebentar
                    setTimeout(() => {
                        // Ganti teks sesuai kategori (Default ke 'all' jika error)
                        descElement.textContent = descriptions[filterValue] || descriptions['all'];
                        descElement.style.opacity = 1; // Fade in lagi
                    }, 200); // Delay 0.2 detik biar smooth
                }

                // 3. LOGIKA GRID ITEM (Muncul/Hilang)
                projectItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.style.display = 'block';
                        item.style.animation = 'none';
                        item.offsetHeight; 
                        item.style.animation = 'fadeIn 0.5s ease-out forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });

                // 4. LOGIKA TOMBOL CHANNEL (HANYA MUNCUL DI TAB MUSIC)
                if (channelBtn) {
                    if (filterValue === 'music') {
                        channelBtn.style.display = 'block';
                        channelBtn.style.animation = 'none';
                        channelBtn.offsetHeight;
                        channelBtn.style.animation = 'fadeInUp 0.5s ease-out';
                    } else {
                        channelBtn.style.display = 'none';
                    }
                }
            });
        });
    }

    /* =========================================
       6. AUTO-FETCH YOUTUBE TITLES (NOEMBED API)
       ========================================= */
    const musicCards = document.querySelectorAll('.music-card[data-video-id]');

    if (musicCards.length > 0) {
        musicCards.forEach(card => {
            const videoId = card.getAttribute('data-video-id');
            const titleElement = card.querySelector('.dynamic-title');
            
            if (videoId && titleElement) {
                const apiUrl = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`;

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data.title) {
                            titleElement.textContent = data.title;
                        } else {
                            titleElement.textContent = "Unknown Title";
                        }
                    })
                    .catch(error => {
                        console.error('Gagal mengambil judul Youtube:', error);
                        titleElement.textContent = "Video Unavailable";
                    });
            }
        });
    }

});