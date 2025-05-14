// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize custom cursor
    initCursor();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize portfolio tabs
    initPortfolioTabs();

    // Initialize form validation
    initFormValidation();

    // Initialize parallax effect
    initParallax();

    // Initialize hero animation
    animateHero();
});

// Custom cursor functionality
function initCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorTrailer = document.getElementById('cursor-trailer');
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .service-card, input, textarea, .tab-btn, .logo');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    // Trail effect variables
    const trailDots = 100;
    const trail = [];
    
    // Create trail elements
    // for (let i = 0; i < trailDots; i++) {
    //     const dot = document.createElement('div');
    //     dot.className = 'trail-dot';
    //     dot.style.cssText = `
    //         position: fixed;
    //         width: ${6 - (i * 0.5)}px;
    //         height: ${6 - (i * 0.5)}px;
    //         background-color: var(--accent-color);
    //         border-radius: 50%;
    //         pointer-events: none;
    //         z-index: 9997;
    //         opacity: ${0.7 - (i * 0.06)};
    //         transform: translate(-50%, -50%);
    //         filter: blur(${i * 0.5}px);
    //         box-shadow: 0 0 ${10 - i}px 2px var(--accent-color);
    //     `;
    //     document.body.appendChild(dot);
    //     trail.push({
    //         element: dot,
    //         x: 0,
    //         y: 0
    //     });
    // }
    
    // Update mouse position variables on mousemove
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop
    function animateCursor() {
        // Smooth cursor movement using lerp (linear interpolation)
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        // Update main cursor position
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        
        // Update trail positions with delay effect
        trail.forEach((dot, index) => {
            // The higher the index, the more delay
            if (index === 0) {
                dot.x += (mouseX - dot.x) * 0.3;
                dot.y += (mouseY - dot.y) * 0.3;
            } else {
                const prevDot = trail[index - 1];
                dot.x += (prevDot.x - dot.x) * 0.5;
                dot.y += (prevDot.y - dot.y) * 0.5;
            }
            
            dot.element.style.transform = `translate(${dot.x}px, ${dot.y}px)`;
        });
        
        // Continue animation loop
        requestAnimationFrame(animateCursor);
    }
    
    // Start animation loop
    animateCursor();

    // Cursor effects on interactive elements
    interactiveElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            cursor.classList.add('grow');
        });

        elem.addEventListener('mouseleave', () => {
            cursor.classList.remove('grow');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
            trail.forEach(dot => {
                dot.element.style.opacity = '0';
            });
        }
    });

    // Show cursor when entering window
    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '1';
        trail.forEach((dot, index) => {
            dot.element.style.opacity = `${0.7 - (index * 0.06)}`;
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    // Toggle menu on hamburger click
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open'); // Add this to prevent body scrolling when menu is open
    });

    // Close menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    // Nav background change on scroll
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Reveal elements on scroll
        revealElements();
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Reveal elements on scroll
function revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Portfolio tabs functionality
function initPortfolioTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the selected tab content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Filter portfolio items if "all" is not selected
            if (tabId !== 'all') {
                portfolioItems.forEach(item => {
                    if (item.getAttribute('data-category') === tabId) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            } else {
                portfolioItems.forEach(item => {
                    item.style.display = 'block';
                });
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (name === '' || email === '' || subject === '' || message === '') {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // If validation passes, you would typically send the form data to a server
            // For this example, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
}

// Parallax effect
function initParallax() {
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const parallaxSection = document.querySelector('.parallax');
            const sectionTop = parallaxSection.offsetTop;
            const sectionHeight = parallaxSection.offsetHeight;
            
            // Check if parallax section is in viewport
            if (scrollPosition > sectionTop - window.innerHeight && 
                scrollPosition < sectionTop + sectionHeight) {
                const speed = 0.5;
                const yPos = (scrollPosition - sectionTop) * speed;
                parallaxBg.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
}

// Hero section animation
function animateHero() {
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        // Add a small delay before showing the hero content
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
}

// Create a loader
function initLoader() {
    // Create loader elements
    const loaderWrapper = document.createElement('div');
    loaderWrapper.className = 'loader-wrapper';
    
    const loader = document.createElement('div');
    loader.className = 'loader';
    
    loaderWrapper.appendChild(loader);
    document.body.appendChild(loaderWrapper);
    
    // Remove loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loaderWrapper.style.opacity = '0';
            setTimeout(() => {
                loaderWrapper.remove();
            }, 500);
        }, 1000);
    });
}
// Add animation for bento grid items
const bentoItems = document.querySelectorAll('.bento-item');
bentoItems.forEach((item, index) => {
  // Add staggered reveal animation
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top bottom-=100px",
      toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: index * 0.1
  });
});

// Add this to your script.js file

document.addEventListener('DOMContentLoaded', function() {
    const squares = document.querySelectorAll('.square');
    const hero = document.querySelector('.hero');
    
    // Track mouse movement within the hero section
    hero.addEventListener('mousemove', function(e) {
      // Get mouse position
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Get hero section dimensions and position
      const heroRect = hero.getBoundingClientRect();
      const heroX = heroRect.left + heroRect.width / 2;
      const heroY = heroRect.top + heroRect.height / 2;
      
      // Calculate distance from center (as a percentage)
      const moveX = (mouseX - heroX) / (heroRect.width / 2);
      const moveY = (mouseY - heroY) / (heroRect.height / 2);
      
      // Apply different 3D movements to each square
      squares.forEach((square, index) => {
        // Different intensity for each square
        const intensity = (index + 1) * 15;
        
        // Apply translate and rotate transforms based on mouse position
        square.style.transform = `
          translate3d(${moveX * intensity}px, ${moveY * intensity}px, 0)
          rotateX(${moveY * -intensity / 3}deg)
          rotateY(${moveX * intensity / 3}deg)
        `;
      });
    });
    
    // Reset squares position when mouse leaves the hero section
    hero.addEventListener('mouseleave', function() {
      squares.forEach(square => {
        square.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)';
      });
    });
  });

  //--------------------------------------------------------------------
  (function () {
    class CyberpunkEffect {
      constructor(selector = '.title-word') {
        this.titleWords = document.querySelectorAll(selector);
      }
  
      init() {
        if (!this.titleWords.length) return;
  
        this.injectStyles();
        this.initGlitchInterval();
        this.initHoverEffects();
      }
  
      injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
         .cyberpunk-glitch {
            position: relative;
            display: inline-block;
            line-height: 1;
            text-shadow: -2px 0 #ff00ff, 2px 2px #00fffc !important;
            color: #ffffff !important;
            opacity: 1 !important;
            transform: translate(2px, -2px);
            will-change: transform, text-shadow;
            backface-visibility: hidden;
            contain: layout style;
          }


  
          .cyberpunk-glitch::after {
            content: attr(data-text);
            position: absolute;
            left: 2px;
            text-shadow: -1px 0 #00fffc;
            top: 0;
            color: #ffffff;
            background: transparent;
            overflow: hidden;
            clip: rect(0, 900px, 0, 0);
            animation: noise-anim 2s infinite linear alternate-reverse;
          }
  
          @keyframes noise-anim {
            0% {
              clip: rect(42px, 9999px, 44px, 0);
            }
            5% {
              clip: rect(20px, 9999px, 16px, 0);
            }
            10% {
              clip: rect(50px, 9999px, 60px, 0);
            }
            15% {
              clip: rect(25px, 9999px, 16px, 0);
            }
            20% {
              clip: rect(0px, 9999px, 60px, 0);
            }
            25% {
              clip: rect(42px, 9999px, 60px, 0);
            }
            30% {
              clip: rect(20px, 9999px, 44px, 0);
            }
            35% {
              clip: rect(25px, 9999px, 30px, 0);
            }
            40% {
              clip: rect(10px, 9999px, 60px, 0);
            }
            100% {
              clip: rect(42px, 9999px, 44px, 0);
            }
          }
        `;
        document.head.appendChild(style);
      }
  
      initGlitchInterval() {
        setInterval(() => {
          const randomWord = this.titleWords[Math.floor(Math.random() * this.titleWords.length)];
          randomWord.setAttribute('data-text', randomWord.textContent);
          randomWord.classList.add('cyberpunk-glitch');
  
          setTimeout(() => {
            randomWord.classList.remove('cyberpunk-glitch');
          }, 200);
        }, 3000);
      }
  
      initHoverEffects() {
        this.titleWords.forEach(word => {
          const originalText = word.textContent;
          let interval = null;
  
          word.addEventListener('mouseover', () => {
            let iterations = 0;
            clearInterval(interval);
  
            interval = setInterval(() => {
              word.textContent = originalText
                .split('')
                .map((letter, index) => {
                  if (index < iterations) return originalText[index];
                  return ['@', '#', '$', '%', '&', ')', '(', '*', '!'][Math.floor(Math.random() * 9)];
                })
                .join('');
  
              if (iterations >= originalText.length) {
                clearInterval(interval);
                word.textContent = originalText;
              }
  
              iterations += 1 / 3;
            }, 30);
          });
  
          word.addEventListener('mouseleave', () => {
            clearInterval(interval);
            word.textContent = originalText;
          });
        });
      }
    }
  
    // Auto-run on DOM load
    document.addEventListener('DOMContentLoaded', function () {
      const cyberpunk = new CyberpunkEffect('.title-word');
      cyberpunk.init();
    });
  
    // Optional: expose globally if needed
    window.CyberpunkEffect = CyberpunkEffect;
  })();
  (function () {
    class SectionGlitchEffect {
      constructor(sectionSelector = '.bento-showcase') {
        this.sectionSelector = sectionSelector;
        this.headerTags = ['H2', 'H3'];
      }
  
      init() {
        if (!this.isGlitchEnabled()) return;
  
        this.injectStyles();
        this.applyGlitchToHeaders();
      }
  
      isGlitchEnabled() {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT);
        let node;
        while (node = walker.nextNode()) {
          if (node.nodeValue.trim() === 'enable-glitch') return true;
        }
        return false;
      }
  
      injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
          @keyframes glitch {
            0% { transform: translate(0); text-shadow: 0 0 0 #00fffc; color: #fff; }
            2% { transform: translate(-2px, 0); text-shadow: 2px 0 2px #00fffc, -2px 0 2px #ff00ff; color: #0ff; }
            4% { transform: translate(2px, 0); text-shadow: 2px 0 2px #ff00ff, -2px 0 2px #00fffc; color: #ff0; }
            5% { transform: translate(0, 0); text-shadow: none; color: #fff; }
            42% { transform: translate(0); text-shadow: none; color: #fff; }
            43% { transform: translate(0, 2px); text-shadow: 2px 0 2px #00fffc, -2px 0 2px #ff00ff; color: #0ff; }
            45% { transform: translate(0, -2px); text-shadow: 2px 0 2px #ff00ff, -2px 0 2px #00fffc; color: #ff0; }
            46% { transform: translate(0); text-shadow: none; color: #fff; }
            85% { transform: translate(0); text-shadow: none; color: #fff; }
            86% { transform: translate(-2px, 2px); text-shadow: 2px 0 2px #00fffc, -2px 0 2px #ff00ff; color: #0ff; }
            88% { transform: translate(2px, -2px); text-shadow: 2px 0 2px #ff00ff, -2px 0 2px #00fffc; color: #ff0; }
            89% { transform: translate(0); text-shadow: none; color: #fff; }
            100% { transform: translate(0); text-shadow: auto; color: #fff; }
          }
  
          @keyframes flicker {
            10%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 1; }
            20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.5; }
          }
  
          .glitch-header {
            animation: glitch 2s infinite linear, flicker 3s infinite linear;
            position: relative;
            display: inline-block;
            line-height: 1;
            will-change: transform, opacity;
          }
        `;
        document.head.appendChild(style);
      }
  
      applyGlitchToHeaders() {
        const section = document.querySelector(this.sectionSelector);
        if (!section) return;
  
        const headers = section.querySelectorAll(this.headerTags.map(tag => tag.toLowerCase()).join(','));
        headers.forEach(header => {
          header.classList.add('glitch-header');
        });
      }
    }
  
    document.addEventListener('DOMContentLoaded', () => {
      const glitcher = new SectionGlitchEffect();
      glitcher.init();
    });
  })();
  (function () {
    class SectionGlitchEffect {
      constructor(sectionSelector = '.services') {
        this.sectionSelector = sectionSelector;
        this.headerTags = ['H2'];
      }
  
      init() {
        if (!this.isGlitchEnabled()) return;
  
        this.injectStyles();
        this.applyGlitchToHeaders();
      }
  
      isGlitchEnabled() {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT);
        let node;
        while (node = walker.nextNode()) {
          if (node.nodeValue.trim() === 'enable-glitch') return true;
        }
        return false;
      }
  
      injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
          @keyframes glitch {
            0% { transform: translate(0); text-shadow: 0 0 0 #00fffc; color: #fff; }
            2% { transform: translate(-2px, 0); text-shadow: 2px 0 2px #00fffc, -2px 0 2px #ff00ff; color: #0ff; }
            4% { transform: translate(2px, 0); text-shadow: 2px 0 2px #ff00ff, -2px 0 2px #00fffc; color: #ff0; }
            5% { transform: translate(0, 0); text-shadow: none; color: #fff; }
            42% { transform: translate(0); text-shadow: none; color: #fff; }
            43% { transform: translate(0, 2px); text-shadow: 2px 0 2px #00fffc, -2px 0 2px #ff00ff; color: #0ff; }
            45% { transform: translate(0, -2px); text-shadow: 2px 0 2px #ff00ff, -2px 0 2px #00fffc; color: #ff0; }
            46% { transform: translate(0); text-shadow: none; color: #fff; }
            85% { transform: translate(0); text-shadow: none; color: #fff; }
            86% { transform: translate(-2px, 2px); text-shadow: 2px 0 2px #00fffc, -2px 0 2px #ff00ff; color: #0ff; }
            88% { transform: translate(2px, -2px); text-shadow: 2px 0 2px #ff00ff, -2px 0 2px #00fffc; color: #ff0; }
            89% { transform: translate(0); text-shadow: none; color: #fff; }
            100% { transform: translate(0); text-shadow: auto; color: #fff; }
          }
  
          @keyframes flicker {
            10%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 1; }
            20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.5; }
          }
  
          .glitch-header {
            animation: glitch 2s infinite linear, flicker 3s infinite linear;
            position: relative;
            display: inline-block;
            line-height: 1;
            will-change: transform, opacity;
          }
        `;
        document.head.appendChild(style);
      }
  
      applyGlitchToHeaders() {
        const section = document.querySelector(this.sectionSelector);
        if (!section) return;
  
        const headers = section.querySelectorAll(this.headerTags.map(tag => tag.toLowerCase()).join(','));
        headers.forEach(header => {
          header.classList.add('glitch-header');
        });
      }
    }
  
    document.addEventListener('DOMContentLoaded', () => {
      const glitcher = new SectionGlitchEffect();
      glitcher.init();
    });
  })();
  (function () {
    class SectionGlitchEffect {
      constructor(sectionSelector = '.parallax') {
        this.sectionSelector = sectionSelector;
        this.headerTags = ['H2'];
      }
  
      init() {
        if (!this.isGlitchEnabled()) return;
  
        this.injectStyles();
        this.applyGlitchToHeaders();
      }
  
      isGlitchEnabled() {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT);
        let node;
        while (node = walker.nextNode()) {
          if (node.nodeValue.trim() === 'enable-glitch') return true;
        }
        return false;
      }
  
      injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
          @keyframes glitch {
            0% { transform: translate(0); text-shadow: 0 0 0 #00fffc; color: #fff; }
            2% { transform: translate(-2px, 0); text-shadow: 2px 0 2px #00fffc, -2px 0 2px #ff00ff; color: #0ff; }
            4% { transform: translate(2px, 0); text-shadow: 2px 0 2px #ff00ff, -2px 0 2px #00fffc; color: #ff0; }
            5% { transform: translate(0, 0); text-shadow: none; color: #fff; }
            42% { transform: translate(0); text-shadow: none; color: #fff; }
            43% { transform: translate(0, 2px); text-shadow: 2px 0 2px #00fffc, -2px 0 2px #ff00ff; color: #0ff; }
            45% { transform: translate(0, -2px); text-shadow: 2px 0 2px #ff00ff, -2px 0 2px #00fffc; color: #ff0; }
            46% { transform: translate(0); text-shadow: none; color: #fff; }
            85% { transform: translate(0); text-shadow: none; color: #fff; }
            86% { transform: translate(-2px, 2px); text-shadow: 2px 0 2px #00fffc, -2px 0 2px #ff00ff; color: #0ff; }
            88% { transform: translate(2px, -2px); text-shadow: 2px 0 2px #ff00ff, -2px 0 2px #00fffc; color: #ff0; }
            89% { transform: translate(0); text-shadow: none; color: #fff; }
            100% { transform: translate(0); text-shadow: auto; color: #fff; }
          }
  
          @keyframes flicker {
            10%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 1; }
            20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.5; }
          }
  
          .glitch-header {
            animation: glitch 2s infinite linear, flicker 3s infinite linear;
            position: relative;
            display: inline-block;
            line-height: 1;
            will-change: transform, opacity;
          }
        `;
        document.head.appendChild(style);
      }
  
      applyGlitchToHeaders() {
        const section = document.querySelector(this.sectionSelector);
        if (!section) return;
  
        const headers = section.querySelectorAll(this.headerTags.map(tag => tag.toLowerCase()).join(','));
        headers.forEach(header => {
          header.classList.add('glitch-header');
        });
      }
    }
  
    document.addEventListener('DOMContentLoaded', () => {
      const glitcher = new SectionGlitchEffect();
      glitcher.init();
    });
  })();
  (function () {
    class SectionGlitchEffect {
      constructor(sectionSelector = '.logo') {
        this.sectionSelector = sectionSelector;
        this.headerTags = ['H3'];
      }
  
      init() {
        if (!this.isGlitchEnabled()) return;
  
        this.injectStyles();
        this.applyGlitchToHeaders();
      }
  
      isGlitchEnabled() {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT);
        let node;
        while (node = walker.nextNode()) {
          if (node.nodeValue.trim() === 'enable-glitch') return true;
        }
        return false;
      }
  
      injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
          @keyframes glitch {
            0% { transform: translate(0); text-shadow: 0 0 0 #00fffc; color: #fff; }
            2% { transform: translate(-2px, 0); text-shadow: 2px 0 2px #00fffc, -2px 0 2px #ff00ff; color: #0ff; }
            4% { transform: translate(2px, 0); text-shadow: 2px 0 2px #ff00ff, -2px 0 2px #00fffc; color: #ff0; }
            5% { transform: translate(0, 0); text-shadow: none; color: #fff; }
            42% { transform: translate(0); text-shadow: none; color: #fff; }
            43% { transform: translate(0, 2px); text-shadow: 2px 0 2px #00fffc, -2px 0 2px #ff00ff; color: #0ff; }
            45% { transform: translate(0, -2px); text-shadow: 2px 0 2px #ff00ff, -2px 0 2px #00fffc; color: #ff0; }
            46% { transform: translate(0); text-shadow: none; color: #fff; }
            85% { transform: translate(0); text-shadow: none; color: #fff; }
            86% { transform: translate(-2px, 2px); text-shadow: 2px 0 2px #00fffc, -2px 0 2px #ff00ff; color: #0ff; }
            88% { transform: translate(2px, -2px); text-shadow: 2px 0 2px #ff00ff, -2px 0 2px #00fffc; color: #ff0; }
            89% { transform: translate(0); text-shadow: none; color: #fff; }
            100% { transform: translate(0); text-shadow: auto; color: #fff; }
          }
  
          @keyframes flicker {
            10%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 1; }
            20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.5; }
          }
  
          .glitch-header {
            animation: glitch 2s infinite linear, flicker 3s infinite linear;
            position: relative;
            display: inline-block;
            line-height: 1;
            will-change: transform, opacity;
          }
        `;
        document.head.appendChild(style);
      }
  
      applyGlitchToHeaders() {
        const section = document.querySelector(this.sectionSelector);
        if (!section) return;
  
        const headers = section.querySelectorAll(this.headerTags.map(tag => tag.toLowerCase()).join(','));
        headers.forEach(header => {
          header.classList.add('glitch-header');
        });
      }
    }
  
    document.addEventListener('DOMContentLoaded', () => {
      const glitcher = new SectionGlitchEffect();
      glitcher.init();
    });
  })();
