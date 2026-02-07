document.addEventListener('DOMContentLoaded', () => {
    
    // 1. NAVIGASI AKTIF (Mendeteksi kita di halaman mana)
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        // Logika: Jika link href ada di URL browser, beri warna aktif
        if(link.href.includes(currentLocation) && currentLocation !== '/') {
            link.classList.add('active');
        }
    });

    // 2. EFEK MENGETIK (TYPING EFFECT) KHUSUS HALAMAN HOME
    const roleElement = document.querySelector('.role-text');
    
    // Cek dulu: Apakah elemen ini ada? (Hanya ada di index.html)
    if (roleElement) {
        // --- INI TEKS YANG AKAN DIKETIK ---
        const textToType = "Computer Network Engineering"; 
        
        let charIndex = 0;
        roleElement.textContent = ""; // Kosongkan dulu teks bawaan HTML
        
        // Fungsi mengetik satu per satu
        const typeWriter = () => {
            if (charIndex < textToType.length) {
                roleElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100); // Kecepatan ketik (100ms per huruf)
            }
        };

        // Mulai mengetik setelah delay 0.5 detik (biar smooth)
        setTimeout(typeWriter, 500);
    }

    // 3. ANIMASI CARD MUNCUL (REVISI STABIL)
    const skillCards = document.querySelectorAll('.skill-card');
    
    if (skillCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Jika card masuk ke layar
                if (entry.isIntersecting) {
                    // Tambahkan class .visible (biar CSS yang menganimasikan)
                    entry.target.classList.add('visible');
                    
                    // Stop observe setelah muncul (biar ga kedip-kedip kalau scroll naik turun)
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.15 // Muncul ketika 15% card terlihat
        });

        skillCards.forEach((card, index) => {
            // Kita set delay transisi via JS agar staggered (berurutan)
            // Card 1: 0.1s, Card 2: 0.2s, dst...
            card.style.transition = `opacity 0.6s ease-out, transform 0.6s ease-out`;
            card.style.transitionDelay = `${index * 0.1}s`; 
            
            observer.observe(card);
        });
    }

    // 4. ANIMASI HALAMAN ABOUT (Staggered Animation)
    // Cek apakah kita ada di halaman About?
    const aboutSection = document.querySelector('.about-section');

    if (aboutSection) {
        
        // A. Animasi Teks Utama (Judul & Deskripsi)
        const textElements = document.querySelectorAll('.reveal-text');
        textElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, 200 + (index * 100)); // Delay bertahap: 200ms, 300ms, dst
        });

        // B. Animasi Timeline (Muncul satu per satu)
        const timelineItems = document.querySelectorAll('.timeline-item');
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.5 }); // Muncul saat 50% terlihat

        timelineItems.forEach((item, index) => {
            // Beri delay sedikit biar tidak barengan
            item.style.transitionDelay = `${index * 0.2}s`;
            timelineObserver.observe(item);
        });

        // C. Animasi Hobi (Pop-up Cepat)
        const hobbyTags = document.querySelectorAll('.hobby-tag');
        // Kita trigger langsung saja setelah teks selesai
        setTimeout(() => {
            hobbyTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.classList.add('active');
                }, index * 100); // Pop.. pop.. pop.. setiap 100ms
            });
        }, 1000); // Tunggu 1 detik setelah halaman load
    }
});