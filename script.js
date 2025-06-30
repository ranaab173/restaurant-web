document.addEventListener('DOMContentLoaded', () => {
    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation
    gsap.from('.animate-hero', {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power3.out'
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-opacity-90', 'shadow-lg'); // Changed to 90 for consistency with HTML
        } else {
            navbar.classList.remove('bg-opacity-90', 'shadow-lg');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenuBtn.querySelector('svg').classList.toggle('rotate-90');
    });

    // Smooth scrolling
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.querySelector('svg').classList.remove('rotate-90');
            }
        });
    });

    // Scroll-triggered animations
    gsap.utils.toArray('.animate-about, .animate-contact').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // Parallax effect
    gsap.to('.parallax-bg', {
        scrollTrigger: {
            trigger: '#home',
            scrub: true
        },
        y: 100
    });

    gsap.to('.parallax-overlay', {
        scrollTrigger: {
            trigger: '#home',
            scrub: true
        },
        opacity: 0.8
    });

    // Menu filter
    const menuContainer = document.getElementById('menu-items'); // This variable is not used, but kept for context.
    const filterButtons = document.querySelectorAll('.filter-btn');
    function renderMenu(category = 'all') {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach((item, index) => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
                // Animate visible items
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power2.out'
                });
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Menu filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-accent')); // Changed amber-400 to accent
            button.classList.add('active', 'bg-accent'); // Changed amber-400 to accent
            const category = button.getAttribute('data-category');
            renderMenu(category);
        });
    });

    // Initial menu render
    renderMenu();

    // Reservation form handling
    const reservationForm = document.getElementById('reservation-form');
    const formMessage = document.getElementById('form-message');
    const submitButton = document.getElementById('submit-reservation');

    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;

        if (name && date && time && guests) {
            formMessage.textContent = 'Reservation submitted successfully!';
            formMessage.className = 'text-green-500'; // Kept green for success
            reservationForm.reset();
            gsap.fromTo(formMessage, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
            setTimeout(() => {
                gsap.to(formMessage, { opacity: 0, duration: 0.5 });
            }, 3000);
        } else {
            formMessage.textContent = 'Please fill out all fields.';
            formMessage.className = 'text-red-500'; // Kept red for error
            gsap.fromTo(formMessage, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
        }
    });
});