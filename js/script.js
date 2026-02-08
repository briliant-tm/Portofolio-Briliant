document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. MOBILE NAVBAR (HAMBURGER MENU)
       ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Toggle class 'active' untuk memunculkan menu
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');

            // Ganti Ikon: Bars (Garis) <-> Times (Silang)
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Tutup menu otomatis saat salah satu link diklik
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                // Reset ikon kembali ke garis tiga
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
        const words = [
            "Network Engineer", 
            "Cybersecurity Enthusiast", 
            "IT Support Specialist", 
            "Music Producer"
        ];
        
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Menghapus huruf
                textElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Lebih cepat saat menghapus
            } else {
                // Mengetik huruf
                textElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150; // Normal saat mengetik
            }

            // Jika kata selesai diketik
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000; // Tahan sebentar sebelum menghapus
            } 
            // Jika kata selesai dihapus
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; // Pindah ke kata berikutnya
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        // Mulai mengetik
        type();
    }

    /* =========================================
       3. SCROLL ANIMATION (SKILLS & ABOUT)
       ========================================= */
    // Helper function untuk Intersection Observer
    const createObserver = (targetSelector, activeClass = 'active', threshold = 0.2) => {
        const elements = document.querySelectorAll(targetSelector);
        
        if (elements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(activeClass);
                        // Optional: Stop observe jika ingin animasi cuma sekali
                        // observer.unobserve(entry.target); 
                    }
                });
            }, { threshold: threshold });

            elements.forEach((el, index) => {
                // Tambahkan delay bertingkat (staggered) otomatis
                // Kecuali jika elemen sudah punya style transition-delay sendiri (seperti di About)
                if (!el.style.transitionDelay) {
                     el.style.transitionDelay = `${index * 0.1}s`;
                }
                observer.observe(el);
            });
        }
    };

    // A. Animasi Kartu Skill (Fade Up)
    // Pastikan di CSS .skill-card punya opacity: 0;
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible'); // Menggunakan class .visible
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

    // B. Animasi Halaman About (Text Slide & Timeline)
    // Menggunakan class 'reveal-text' dan 'timeline-item' yang kita buat tadi
    createObserver('.reveal-text', 'active', 0.1);
    createObserver('.timeline-item', 'active', 0.3);
    
    // C. Animasi Hobi (Pop Up)
    // Trigger hobi sedikit lebih lambat
    setTimeout(() => {
        createObserver('.hobby-tag', 'active', 0.1);
    }, 500);

});