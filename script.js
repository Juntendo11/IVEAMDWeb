document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Candlelight Ambient Glow Cursor Effect
       ========================================================================== */
    const candlelight = document.getElementById('candlelight');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let isMouseMoving = false;
    let glowTimeout;

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Show candlelight glow when mouse moves
        candlelight.style.opacity = '1';
        candlelight.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        
        isMouseMoving = true;
        clearTimeout(glowTimeout);

        // Dim the glow slightly if mouse stops moving for a while to simulate flickering/dying candle
        glowTimeout = setTimeout(() => {
            isMouseMoving = false;
            candlelight.style.opacity = '0.4';
        }, 3000);
    });

    // Add a subtle flicker effect using requestAnimationFrame
    let flickerInt = 0;
    function animateFlicker() {
        if(isMouseMoving || candlelight.style.opacity !== '0') {
            flickerInt += 0.05;
            // Generate a random-like sine wave for flickering intensity
            const intensity = 0.8 + (Math.sin(flickerInt) * 0.1) + (Math.sin(flickerInt * 2.3) * 0.05);
            // Apply it safely via CSS variable or direct transform if needed
            // For simplicity, we adjust opacity slightly if active
            if(candlelight.style.opacity > 0.3) {
                 candlelight.style.opacity = intensity;
            }
        }
        requestAnimationFrame(animateFlicker);
    }
    animateFlicker();

    /* ==========================================================================
       Scroll Reveal Intersection Observer
       ========================================================================== */
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -100px 0px', // trigger a bit before the threshold
        threshold: 0.1 // 10% of element visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Initial check for elements already in view on load
    setTimeout(() => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);

});
