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

    // 3. ANIMASI CARD MUNCUL (KHUSUS HALAMAN SKILLS)
    const skillCards = document.querySelectorAll('.skill-card');
    
    if (skillCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 }); 

        skillCards.forEach((card, index) => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(50px)';
            // Muncul berurutan (staggered effect)
            card.style.transition = `all 0.6s cubic-bezier(0.25, 1, 0.5, 1) ${index * 0.15}s`; 
            observer.observe(card);
        });
    }
});