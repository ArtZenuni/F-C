document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking links
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.padding = '5px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
        }
    });

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const project = this.dataset.project;
            this.querySelector('.project-image').style.backgroundColor = getProjectColor(project);
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-image').style.backgroundColor = '';
        });
    });

    // Function to get different colors for different projects
    function getProjectColor(project) {
        const colors = {
            'islam': '#27ae60',
            'wix': '#e67e22',
            'construction': '#f39c12',
            'salon': '#d35400'
        };
        
        return colors[project] || '#3498db';
    }

    // Form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would normally send this data to your server
        // For now, we'll just show a success message
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <p>Thanks for your message, ${name}! I'll get back to you soon.</p>
        `;
        successMessage.style.backgroundColor = '#2ecc71';
        successMessage.style.color = 'white';
        successMessage.style.padding = '15px';
        successMessage.style.borderRadius = '4px';
        successMessage.style.marginTop = '20px';
        
        // Add success message to the form
        contactForm.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add scroll animations
    const fadeElements = document.querySelectorAll('.section-title, .about-content, .project-card, .skills-content, .why-fac-content, .contact-content');
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements
    fadeElements.forEach(element => {
        observer.observe(element);
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add the CSS for the fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Progress bar animation for skills (optional)
    const skillBars = document.querySelectorAll('.skill-bar');
    
    if (skillBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.progress');
                    const percentage = progressBar.getAttribute('data-percentage');
                    progressBar.style.width = percentage + '%';
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillBars.forEach(bar => {
            skillsObserver.observe(bar);
        });
    }

    // Project details modal (if needed)
    const projectDetails = {
        'islam': {
            title: 'HelpingWithIslam.com',
            description: 'An educational platform designed to provide resources for reverts learning about Islam. Features include personalized learning paths, interactive quizzes, and a community forum.',
            challenges: 'Developing a custom authentication system with different permission levels while ensuring security best practices. Implementing gamified learning features that are engaging without being distracting.',
            technologies: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'JWT Authentication', 'REST APIs']
        },
        'wix': {
            title: 'Company Website Migration',
            description: 'Migrated a business website from Wix to React to improve performance, add custom features, and enable better content management.',
            challenges: 'Ensuring a seamless transition with zero downtime. Preserving SEO rankings while improving site speed and performance metrics.',
            technologies: ['React', 'Next.js', 'CSS Modules', 'Content Migration', 'Performance Optimization']
        },
        'construction': {
            title: 'Construction Company Website',
            description: 'Developed a responsive marketing website for a local construction company to showcase their services, previous projects, and client testimonials.',
            challenges: 'Creating an image-heavy website that maintains fast loading times. Implementing a custom project gallery with filtering options.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Lazy Loading', 'Form Handling']
        },
        'salon': {
            title: 'Hair Salon Website',
            description: 'Created a modern website for a hair salon with online booking functionality, service showcase, and stylist profiles.',
            challenges: 'Integrating with a third-party booking system API. Designing a visually appealing interface that matches the salon\'s branding.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'API Integration', 'Form Validation', 'Gallery Lightbox']
        }
    };

    // You could add code here to show detailed project information when clicking on cards
    // This would require adding modal HTML to your index.html file
});