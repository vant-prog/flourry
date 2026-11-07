// Script.js

// Tailwind Configuration
tailwind = window.tailwind || {};
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Readex Pro"', 'sans-serif'],
            },
            colors: {
                brand: {
                    dark: '#121212',       
                    darker: '#0A0A0A',     
                    cardDark: '#1C1C1C',   
                    cream: '#fdfcf9',      
                    surface: '#f5f2eb',    
                    cardLight: '#ffffff',  
                    olive: '#3e4130',      
                    oliveLight: '#555942', 
                    accent: '#c88647',     
                    boxDark: '#111111',    
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseSubtle: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.85' },
                }
            }
        }
    }
};

// Application Interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Elements
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Mobile Navigation Elements
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');
    const navbar = document.getElementById('navbar');

    // Initial Theme Setup
    if (localStorage.getItem('color-theme') === 'light' || (!('color-theme' in localStorage) && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.remove('dark');
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.add('dark');
        if (themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
    }

    // Toggle Theme Switcher Action
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            themeToggleBtn.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggleBtn.style.transform = '';
            }, 500);

            const performToggle = () => {
                themeToggleDarkIcon.classList.toggle('hidden');
                themeToggleLightIcon.classList.toggle('hidden');

                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            };

            if (document.startViewTransition) {
                document.startViewTransition(() => performToggle());
            } else {
                performToggle();
            }
        });
    }

    // Toggle Mobile Menu Drawer
    const toggleMobileMenu = () => {
        if (!mobileMenu) return;
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            menuIconOpen.classList.add('hidden');
            menuIconClose.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden');
            menuIconOpen.classList.remove('hidden');
            menuIconClose.classList.add('hidden');
        }
    };

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Dynamic Smooth Scroll for Anchor Links (Mobile + Desktop)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;

                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    toggleMobileMenu();
                }

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Shadow and Blur on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('shadow-md', 'py-2');
            navbar.classList.remove('py-3', 'md:py-4');
        } else {
            navbar.classList.remove('shadow-md', 'py-2');
            navbar.classList.add('py-3', 'md:py-4');
        }
    });
});
// Subtle scroll reveals, without blocking content when JavaScript is unavailable.
document.addEventListener('DOMContentLoaded', () => {
    const revealTargets = document.querySelectorAll('section:not(.min-h-screen) .max-w-7xl > *, #pos .grid > *, section .group.relative.rounded-3xl');
    revealTargets.forEach((element, index) => {
        element.classList.add('js-reveal');
        element.style.transitionDelay = `${(index % 3) * 90}ms`;
    });
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    currentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
        revealTargets.forEach(element => observer.observe(element));
    } else {
        revealTargets.forEach(element => element.classList.add('is-visible'));
    }
});
