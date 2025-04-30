// Scroll animation
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initial check
    fadeInOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', fadeInOnScroll);
    
    // Mobile menu toggle (would need additional JS for functionality)
    const mobileMenuButton = document.querySelector('.md\\:hidden');
    mobileMenuButton.addEventListener('click', function() {
        // This would toggle a mobile menu in a real implementation
        console.log('Mobile menu clicked');
    });
});
