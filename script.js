// Enhanced JavaScript with 3D effects and form submission
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    function toggleMenu() {
        const menuToggle = document.querySelector('.menuToggle');
        const navigation = document.querySelector('.navigation');
        menuToggle.classList.toggle('active');
        navigation.classList.toggle('active');
    }

    // Assign toggle function to menu button
    document.querySelector('.menuToggle').addEventListener('click', toggleMenu);

    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
        
        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        backToTop.classList.toggle('active', window.scrollY > 300);
    });

    // Animated Text Typing Effect
    const animatedText = document.querySelector('.animated-text');
    const texts = [
        "Generative AI Developer",
        "React Specialist", 
        "Web Developer"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const currentText = texts[textIndex];
        const currentElement = animatedText.querySelector('h3') || document.createElement('h3');
        
        if (isDeleting) {
            currentElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            currentElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!animatedText.contains(currentElement)) {
            animatedText.innerHTML = '';
            animatedText.appendChild(currentElement);
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(typeText, typingSpeed);
    }

    // Initialize typing effect
    setTimeout(typeText, 1000);

    // Animate Skill Bars on Scroll
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-level');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-level');
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    }

    // 3D Tilt Effect for Project Cards
    function initTiltEffect() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
                card.querySelector('.project-3d-effect').style.transform = `translateX(${(x - centerX) / 10}px) translateY(${(y - centerY) / 10}px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                card.querySelector('.project-3d-effect').style.transform = 'translateX(0) translateY(0)';
            });
        });
    }

    // Form Submission with Modal Popup
    function handleFormSubmission() {
        const contactForm = document.getElementById('contactForm');
        const successModal = document.getElementById('successModal');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                
                if (name && email && message) {
                    // Show loading state
                    const submitBtn = contactForm.querySelector('button[type="submit"]');
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    submitBtn.disabled = true;
                    
                    // Simulate sending (replace with actual AJAX call)
                    setTimeout(() => {
                        // Show success modal
                        successModal.classList.add('active');
                        
                        // Reset form
                        contactForm.reset();
                        submitBtn.innerHTML = 'Send Message';
                        submitBtn.disabled = false;
                    }, 2000);
                } else {
                    // Add shake animation for empty fields
                    contactForm.classList.add('shake');
                    setTimeout(() => {
                        contactForm.classList.remove('shake');
                    }, 500);
                }
            });
        }
        
        // Close modal handlers
        const closeModal = document.querySelector('.close-modal');
        const modalCloseBtn = document.querySelector('.modal-close-btn');
        
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                successModal.classList.remove('active');
            });
        }
        
        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => {
                successModal.classList.remove('active');
            });
        }
        
        // Close modal when clicking outside
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (document.querySelector('.navigation').classList.contains('active')) {
                    toggleMenu();
                }
            }
        });
    });

    // Back to top button functionality
    document.querySelector('.back-to-top').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize all functions
    function init() {
        animateSkillBars();
        initTiltEffect();
        handleFormSubmission();
        
        // Add intersection observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.id === 'skills') {
                        animateSkillBars();
                    }
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });

        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    // Call init function
    init();
});