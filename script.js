// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Prevent body scroll when mobile menu is open =====
const navbarCollapse = document.getElementById('navbarNav');
if (navbarCollapse) {
    navbarCollapse.addEventListener('show.bs.collapse', function() {
        document.body.style.overflow = 'hidden';
    });
    
    navbarCollapse.addEventListener('hidden.bs.collapse', function() {
        document.body.style.overflow = '';
    });
}

// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight - 10;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.getElementById('navbarNav');
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    });
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Appointment Form Validation and Submission =====
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (this.checkValidity()) {
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                notes: document.getElementById('notes').value
            };
            
            // Log form data (in production, send to server)
            console.log('Appointment Booking:', formData);
            
            // Send WhatsApp message
            const whatsappNumber = '27717758089'; // South African format (0717758089)
            const serviceNames = {
                'knotless': 'Knotless Braids',
                'boho': 'Boho/Goddess Braids',
                'stitch': 'Stitch Cornrows',
                'fulani': 'Fulani Braids',
                'lemonade': 'Lemonade Braids'
            };
            
            const serviceName = serviceNames[formData.service] || formData.service;
            const message = `📅 *New Appointment Booking*\n\n` +
                `👤 *Name:* ${formData.name}\n` +
                `📱 *Phone:* ${formData.phone}\n` +
                `💇 *Service:* ${serviceName}\n` +
                `📆 *Date:* ${formData.date}\n` +
                `⏰ *Time:* ${formData.time}\n` +
                `📝 *Notes:* ${formData.notes || 'None'}\n\n` +
                `Please confirm this appointment.`;
            
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Show success modal
            const modal = new bootstrap.Modal(document.getElementById('successModal'));
            document.getElementById('modalMessage').textContent = 
                `Thank you, ${formData.name}! Your appointment for ${serviceName} on ${formData.date} at ${formData.time} has been sent via WhatsApp. We'll contact you shortly to confirm.`;
            modal.show();
            
            // Reset form
            this.reset();
            this.classList.remove('was-validated');
        } else {
            e.stopPropagation();
            this.classList.add('was-validated');
        }
    });
}

// ===== Contact Form Validation and Submission =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (this.checkValidity()) {
            // Get form data
            const formData = {
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                subject: document.getElementById('contactSubject').value,
                message: document.getElementById('contactMessage').value
            };
            
            // Log form data (in production, send to server)
            console.log('Contact Form Submission:', formData);
            
            // Send WhatsApp message directly
            const whatsappNumber = '27717758089'; // South African format (0717758089)
            const message = `📩 *New Contact Inquiry*\n\n` +
                `👤 *Name:* ${formData.name}\n` +
                `📧 *Email:* ${formData.email}\n` +
                `📌 *Subject:* ${formData.subject}\n` +
                `💬 *Message:* ${formData.message}\n\n` +
                `Please respond to this inquiry.`;
            
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.location.href = whatsappUrl;
            
            // Reset form
            this.reset();
            this.classList.remove('was-validated');
        } else {
            e.stopPropagation();
            this.classList.add('was-validated');
        }
    });
}

// ===== Set Minimum Date for Appointment Form =====
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// ===== Gallery Image Lightbox Effect =====
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const title = this.querySelector('h5').textContent;
        
        // Create modal content dynamically
        const modalHtml = `
            <div class="modal fade" id="galleryModal" tabindex="-1">
                <div class="modal-dialog modal-md modal-dialog-centered gallery-modal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body p-0">
                            <img src="${img.src}" alt="${title}" class="gallery-modal-img">
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if any
        const existingModal = document.getElementById('galleryModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
        modal.show();
        
        // Clean up modal after it's hidden
        document.getElementById('galleryModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    });
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe gallery items
const galleryItemsAnimated = document.querySelectorAll('.gallery-item');
galleryItemsAnimated.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Observe stat items
const statItems = document.querySelectorAll('.stat-item');
statItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// ===== Counter Animation for Stats =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Observe stats section for counter animation
const statsSection = document.querySelector('.about-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// ===== Mobile Menu Enhancement =====
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.getElementById('navbarNav');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
        setTimeout(() => {
            if (navbarCollapse.classList.contains('show')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }, 300);
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const navbar = document.getElementById('navbar');
    const navbarCollapse = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
            bsCollapse.hide();
        }
        document.body.style.overflow = '';
    }
});

// ===== Parallax Effect for Hero Section =====
window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero-section');
    const heroOverlay = document.querySelector('.hero-overlay');
    
    if (heroSection && heroOverlay) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
        
        if (scrolled < window.innerHeight) {
            heroOverlay.style.transform = `translateY(${rate}px)`;
        }
    }
});

// ===== Form Input Focus Effects =====
const formInputs = document.querySelectorAll('.form-control, .form-select');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class to body for fade-in effect
    document.body.classList.add('loaded');
    
    // Set initial active nav link
    const homeSection = document.getElementById('home');
    if (homeSection && window.scrollY < 100) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
    }
});

// ===== Service Card Hover Sound Effect (Optional) =====
const serviceCardsHover = document.querySelectorAll('.service-card');
serviceCardsHover.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add subtle scale effect
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== Back to Top Button =====
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #d4af37 0%, #b8962e 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.4)';
});

backToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
});
