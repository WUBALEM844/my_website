// ============================================
// MAIN INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeAll();
});

function initializeAll() {
    initLoadingScreen();
    initCustomCursor();
    initMobileMenu();
    initHeaderScroll();
    initBackToTop();
    initPortfolioFilter();
    initContactForm();
    initDownloadResume();
    initSmoothScrolling();
    initActiveNavLinks();
    initProfileImageModal();
    initTypingEffect();
    initFormAnimations();
    initSocialLinks();
    initThemeToggle();
    initScrollAnimations();
    initNotificationSystem();
    initScrollProgress();
}

// ============================================
// LOADING SCREEN
// ============================================

function initLoadingScreen() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loadingScreen = document.querySelector('.loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('fade-out');
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 1500);
    });
}

// ============================================
// CUSTOM CURSOR
// ============================================

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower || window.innerWidth <= 768) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    function moveCursor(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
    
    function animateCursor() {
        // Direct cursor
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Follower cursor
        followerX += (mouseX - followerX) * 0.08;
        followerY += (mouseY - followerY) * 0.08;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    document.addEventListener('mousemove', moveCursor);
    requestAnimationFrame(animateCursor);
    
    // Hover effects
    const interactiveElements = document.querySelectorAll(
        'a, button, .btn, .projects-item, .skill-item, .detail-item, .contact-item, .social-link, .filter-btn, .nav-link, .profile-container'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
            cursorFollower.style.background = 'rgba(124, 58, 237, 0.2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.background = 'rgba(124, 58, 237, 0.1)';
        });
    });
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (!mobileMenuBtn || !navLinks) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================

function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

// ============================================
// PORTFOLIO FILTER
// ============================================

function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsItems = document.querySelectorAll('.projects-item');
    
    if (filterButtons.length === 0 || projectsItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectsItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px) scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Show notification
            const filterText = filterValue === 'all' ? 'All Projects' : 
                              filterValue === 'web' ? 'Web Projects' :
                              filterValue === 'java' ? 'Java Projects' : 'Database Projects';
            showNotification(`Showing ${filterText}`, 'success');
        });
    });
}

// ============================================
// CONTACT FORM
// ============================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        let isValid = true;
        let errorMessage = '';
        
        if (!name || name.length < 2) {
            isValid = false;
            errorMessage = 'Please enter a valid name (minimum 2 characters)';
        } else if (!email || !validateEmail(email)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        } else if (!subject || subject.length < 3) {
            isValid = false;
            errorMessage = 'Please enter a subject (minimum 3 characters)';
        } else if (!message || message.length < 10) {
            isValid = false;
            errorMessage = 'Please enter a message (minimum 10 characters)';
        }
        
        if (!isValid) {
            showNotification(errorMessage, 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        try {
            await simulateAPICall();
            
            // Success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
            
            setTimeout(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                
                // Show success notification
                showNotification(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`, 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset form labels
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('focused');
                });
            }, 2000);
            
        } catch (error) {
            // Error state
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error!';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                showNotification('There was an error sending your message. Please try again.', 'error');
            }, 2000);
        }
    });
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function simulateAPICall() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1500);
    });
}

// ============================================
// DOWNLOAD RESUME
// ============================================

function initDownloadResume() {
    const downloadResumeBtn = document.getElementById('downloadResumeBtn');
    if (!downloadResumeBtn) return;
    
    downloadResumeBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const confirmed = confirm('Would you like to download my resume?');
        
        if (confirmed) {
            const originalText = downloadResumeBtn.innerHTML;
            downloadResumeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            downloadResumeBtn.disabled = true;
            
            try {
                await simulateDownload();
                
                // Success state
                downloadResumeBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                downloadResumeBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
                
                setTimeout(() => {
                    // Reset button
                    downloadResumeBtn.innerHTML = originalText;
                    downloadResumeBtn.style.background = '';
                    downloadResumeBtn.disabled = false;
                    
                    // Show success notification
                    showNotification('Resume downloaded successfully!', 'success');
                    
                    // Create and trigger actual download
                    createResumePDF();
                    
                }, 1500);
                
            } catch (error) {
                downloadResumeBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error!';
                downloadResumeBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)';
                
                setTimeout(() => {
                    downloadResumeBtn.innerHTML = originalText;
                    downloadResumeBtn.style.background = '';
                    downloadResumeBtn.disabled = false;
                    showNotification('Download failed. Please try again.', 'error');
                }, 2000);
            }
        }
    });
}

function simulateDownload() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

function createResumePDF() {
    // Create a simple text file as resume (in a real app, this would be a PDF)
    const resumeContent = `
        WUBALEM GASHAW
        ================
        
        Contact Information:
        -------------------
        Email: gashawwubalem04@gmail.com
        Phone: +251 964 494 233
        Location: Mizan-Aman, Ethiopia
        
        Education:
        ----------
        BSc in Information Technology
        Wolkite University (2022 - Present)
        GPA: 3.7/4.0
        
        Skills:
        -------
        • HTML5, CSS3, JavaScript
        • Java Programming
        • Oracle Database
        • Adobe Premiere Pro
        • Web Development
        
        Experience:
        -----------
        Freelance Web Developer & Programmer (2023 - Present)
        Content Creator & Video Editor (2022 - Present)
        
        Projects:
        ---------
        1. Hotel Management System (Oracle DB)
        2. Scientific Calculator (Java)
        3. Student Management System (Java)
        4. Personal Portfolio Website
        
        © 2024 Wubalem Gashaw. All rights reserved.
    `;
    
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Wubalem_Gashaw_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ============================================
// SMOOTH SCROLLING
// ============================================

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// ACTIVE NAV LINKS
// ============================================

function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinksAll.length === 0) return;
    
    const highlightNavLink = () => {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', highlightNavLink);
    // Initial highlight
    highlightNavLink();
}

// ============================================
// PROFILE IMAGE MODAL
// ============================================

function initProfileImageModal() {
    const profileImg = document.getElementById('profileImg');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');
    
    if (!profileImg || !modal || !modalImg || !modalClose) return;
    
    profileImg.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = profileImg.src;
        modalImg.alt = profileImg.alt;
    });
    
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// ============================================
// TYPING EFFECT
// ============================================

function initTypingEffect() {
    const tagline = document.querySelector('.typing-text');
    if (!tagline) return;
    
    const text = tagline.textContent;
    tagline.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing after page loads
    setTimeout(typeWriter, 1000);
}

// ============================================
// FORM ANIMATIONS
// ============================================

function initFormAnimations() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        const parent = control.parentElement;
        
        control.addEventListener('focus', () => {
            parent.classList.add('focused');
        });
        
        control.addEventListener('blur', () => {
            if (!control.value) {
                parent.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (control.value) {
            parent.classList.add('focused');
        }
    });
}

// ============================================
// SOCIAL LINKS
// ============================================

function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('title') || 'social media';
            console.log(`Navigating to ${platform} profile...`);
            // In a real application, you would add analytics tracking here
        });
        
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ============================================
// THEME TOGGLE
// ============================================

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.innerHTML = document.body.classList.contains('dark-mode') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        
        const theme = document.body.classList.contains('dark-mode') ? 'Dark' : 'Light';
        showNotification(`${theme} mode activated`, 'success');
    });
    
    // Add dark mode styles
    const darkModeStyles = `
        body.dark-mode {
            background-color: var(--dark);
            color: var(--light);
        }
        
        body.dark-mode header {
            background: rgba(31, 41, 55, 0.95);
        }
        
        body.dark-mode .logo,
        body.dark-mode .nav-links a,
        body.dark-mode .section-title,
        body.dark-mode .hero-description {
            color: white;
        }
        
        body.dark-mode .about-text,
        body.dark-mode .skills,
        body.dark-mode .projects-item,
        body.dark-mode .timeline-content,
        body.dark-mode .contact-info,
        body.dark-mode .contact-form {
            background: var(--dark-light);
            color: white;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = darkModeStyles;
    document.head.appendChild(style);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (barPosition < screenPosition) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }
        });
    };
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const animateTimeline = () => {
        timelineItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.classList.add('visible');
            }
        });
    };
    
    // Section fade-in animation
    const sections = document.querySelectorAll('section');
    const animateSections = () => {
        sections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (sectionPosition < screenPosition) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial setup for sections
    sections.forEach((section) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Scroll event listener
    window.addEventListener('scroll', () => {
        animateSkillBars();
        animateTimeline();
        animateSections();
    });
    
    // Initial animation on load
    window.addEventListener('load', () => {
        setTimeout(() => {
            animateSkillBars();
            animateTimeline();
            animateSections();
        }, 500);
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function initNotificationSystem() {
    // Function is already defined below, this just ensures it's available
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// ============================================
// SCROLL PROGRESS
// ============================================

function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";
    });
}

// ============================================
// PROJECT DETAILS MODAL
// ============================================

// Add click handlers for project links
document.addEventListener('DOMContentLoaded', function() {
    const projectLinks = document.querySelectorAll('.projects-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectItem = this.closest('.projects-item');
            const projectTitle = projectItem.querySelector('h3').textContent;
            const projectDescription = projectItem.querySelector('p').textContent;
            const projectImage = projectItem.querySelector('.projects-img').src;
            const projectCategory = projectItem.getAttribute('data-category');
            
            // Create modal for project details
            showProjectModal({
                title: projectTitle,
                description: projectDescription,
                image: projectImage,
                category: projectCategory
            });
        });
    });
});

function showProjectModal(project) {
    // Create modal HTML
    const modalHTML = `
        <div class="project-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 20px;
        ">
            <div style="
                background: rgba(31, 41, 55, 0.95);
                border-radius: 20px;
                padding: 40px;
                max-width: 800px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                border: 1px solid rgba(124, 58, 237, 0.3);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            ">
                <button class="close-modal" style="
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 30px;
                    cursor: pointer;
                    z-index: 10001;
                ">&times;</button>
                
                <img src="${project.image}" alt="${project.title}" style="
                    width: 100%;
                    height: 300px;
                    object-fit: cover;
                    border-radius: 15px;
                    margin-bottom: 30px;
                ">
                
                <h2 style="
                    color: white;
                    font-size: 2.5rem;
                    margin-bottom: 20px;
                    background: linear-gradient(135deg, #ffffff 0%, var(--primary-light) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                ">${project.title}</h2>
                
                <div style="
                    display: flex;
                    gap: 10px;
                    margin-bottom: 25px;
                    flex-wrap: wrap;
                ">
                    <span style="
                        background: rgba(124, 58, 237, 0.2);
                        color: var(--primary-light);
                        padding: 8px 20px;
                        border-radius: 25px;
                        font-weight: 600;
                        font-size: 0.9rem;
                    ">${project.category.toUpperCase()}</span>
                    <span style="
                        background: rgba(245, 158, 11, 0.2);
                        color: var(--secondary-light);
                        padding: 8px 20px;
                        border-radius: 25px;
                        font-weight: 600;
                        font-size: 0.9rem;
                    ">COMPLETED</span>
                </div>
                
                <p style="
                    color: var(--gray-light);
                    line-height: 1.8;
                    margin-bottom: 30px;
                    font-size: 1.1rem;
                ">${project.description}</p>
                
                <div style="
                    background: rgba(255, 255, 255, 0.05);
                    padding: 25px;
                    border-radius: 15px;
                    margin-bottom: 30px;
                ">
                    <h3 style="
                        color: white;
                        margin-bottom: 15px;
                        font-size: 1.3rem;
                    ">Project Details</h3>
                    <ul style="
                        color: var(--gray-light);
                        list-style: none;
                        padding: 0;
                    ">
                        <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
                            <i class="fas fa-check-circle" style="
                                color: var(--accent);
                                position: absolute;
                                left: 0;
                                top: 5px;
                            "></i>
                            <span>Responsive design for all devices</span>
                        </li>
                        <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
                            <i class="fas fa-check-circle" style="
                                color: var(--accent);
                                position: absolute;
                                left: 0;
                                top: 5px;
                            "></i>
                            <span>Clean and maintainable code</span>
                        </li>
                        <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
                            <i class="fas fa-check-circle" style="
                                color: var(--accent);
                                position: absolute;
                                left: 0;
                                top: 5px;
                            "></i>
                            <span>Optimized for performance</span>
                        </li>
                    </ul>
                </div>
                
                <div style="
                    display: flex;
                    gap: 20px;
                    justify-content: center;
                ">
                    <a href="#" class="btn btn-primary" style="text-decoration: none;">
                        <i class="fas fa-eye"></i> Live Demo
                    </a>
                    <a href="#" class="btn btn-secondary" style="text-decoration: none;">
                        <i class="fab fa-github"></i> View Code
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // Add close functionality
    const modal = modalContainer.querySelector('.project-modal');
    const closeBtn = modalContainer.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal) {
            modal.remove();
        }
    });
}

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    showNotification('Something went wrong. Please try again.', 'error');
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll events
const optimizedScroll = debounce(() => {
    // Your scroll handling code here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScroll);

// Optimize resize events
const optimizedResize = throttle(() => {
    // Your resize handling code here
}, 200);

window.addEventListener('resize', optimizedResize);

// ============================================
// SERVICE WORKER FOR OFFLINE SUPPORT
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}