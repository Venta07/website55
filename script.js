// Mobile menu functionality
function initMobileMenu() {
    console.log('Initializing mobile menu...');
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    const fabContainer = document.querySelector('.fab-container');
    const body = document.body;
    
    // Debug: Log elements to console
    console.log('Mobile Menu Elements:', {
        toggle: mobileMenuToggle,
        nav: mobileNav,
        overlay: mobileMenuOverlay,
        closeBtn: mobileCloseBtn,
        navLinks: mobileNavLinks
    });
    
    // Make sure mobile menu is hidden by default
    if (mobileNav) mobileNav.classList.remove('active');
    if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
    if (body) body.classList.remove('menu-open');
    
    // Show mobile menu toggle on mobile
    if (mobileMenuToggle) {
        mobileMenuToggle.style.display = 'flex';
    }

    // Show FABs with delay
    setTimeout(() => {
        if (fabContainer) {
            fabContainer.classList.add('visible');
        }
    }, 800);

    function toggleMobileMenu() {
        const isOpening = !mobileMenuToggle.classList.contains('active');
        
        // Toggle classes
        mobileMenuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Toggle FABs visibility when menu is open
        if (fabContainer) {
            if (isOpening) {
                fabContainer.style.opacity = '0';
                fabContainer.style.pointerEvents = 'none';
            } else {
                setTimeout(() => {
                    fabContainer.style.opacity = '1';
                    fabContainer.style.pointerEvents = 'auto';
                }, 300);
            }
        }
        
        // Prevent body scroll when menu is open
        if (isOpening) {
            body.style.overflow = 'hidden';
            // Add ripple effect to menu button
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            mobileMenuToggle.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        } else {
            body.style.overflow = '';
        }
    }

    // Toggle menu when clicking the hamburger button
    if (mobileMenuToggle) {
        console.log('Adding click event to mobile menu toggle');
        mobileMenuToggle.addEventListener('click', function(e) {
            console.log('Mobile menu toggle clicked');
            e.stopPropagation();
            e.preventDefault();
            
            // Toggle menu state
            const isOpening = !this.classList.contains('active');
            
            // Toggle active class on all elements
            if (mobileNav) mobileNav.classList.toggle('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.toggle('active');
            if (body) body.classList.toggle('menu-open');
            this.classList.toggle('active');
            
            // Toggle FABs visibility
            if (fabContainer) {
                if (isOpening) {
                    fabContainer.style.opacity = '0';
                    fabContainer.style.pointerEvents = 'none';
                } else {
                    setTimeout(() => {
                        fabContainer.style.opacity = '1';
                        fabContainer.style.pointerEvents = 'auto';
                    }, 300);
                }
            }
            
            // Prevent body scroll when menu is open
            if (body) {
                body.style.overflow = isOpening ? 'hidden' : '';
            }
            
            console.log('Menu toggled. isOpen:', isOpening);
        });
    }

    // Close menu when clicking overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                toggleMobileMenu();
            }
        });
    }

    // Close menu when clicking close button
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    // Close menu when clicking on nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            // Remove active class from all links
            mobileNavLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            
            // Switch to the corresponding tab
            const tabId = link.getAttribute('data-tab');
            if (tabId) {
                const tabElement = document.getElementById(tabId);
                if (tabElement) {
                    // Trigger click on the corresponding tab if it exists
                    tabElement.click();
                }
            }
            
            // Close menu after a short delay for better UX
            setTimeout(() => {
                toggleMobileMenu();
            }, 300);
        });
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Connect FAB buttons to their functions
    document.getElementById('generateReportBtn').addEventListener('click', () => {
        generateReport();
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        resetCounters();
    });

    // Add click effect to FABs
    document.querySelectorAll('.fab').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            this.appendChild(ripple);
            
            // Position the ripple effect
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    function closeMobileMenu() {
        mobileNav.classList.remove('mobile-nav-open');
        mobileMenuOverlay.style.opacity = '0';
        mobileMenuToggle.classList.remove('active');
        setTimeout(() => {
            mobileMenuOverlay.style.display = 'none';
        }, 300);
    }
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const mobileTabName = this.getAttribute('data-tab');
            if (!mobileTabName) return;

            let targetTabId = mobileTabName + '-tab';

            // Deactivate all tabs and content
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.querySelectorAll('.mobile-nav-link').forEach(link => link.classList.remove('active'));

            // Activate the selected tab and content
            const tabButton = document.querySelector(`.tab-button[data-tab='${targetTabId}']`);
            const tabContent = document.getElementById(targetTabId);

            if (tabButton) {
                tabButton.classList.add('active');
                // Trigger click event to handle logo switching
                tabButton.click();
            }
            if (tabContent) {
                tabContent.classList.add('active');
            }
            
            this.classList.add('active');
            closeMobileMenu();
        });
    });
}

// Package data
const packages = {
    virgin: [
        { id: 'virgin419', name: '419', value: 419 },
        { id: 'vnet355', name: 'في نت 355', value: 355 },
        { id: 'virgin345', name: '345 فليكس', value: 345 },
        { id: 'virgin212', name: '212', value: 212 },
        { id: 'virgin172', name: '172', value: 172 },
        { id: 'virgin126', name: '126', value: 126 },
        { id: 'virgin115flex', name: '115 فليكس', value: 115 },
        { id: 'virgin115', name: '115', value: 115 },
        { id: 'virgin103', name: '103', value: 103 },
        { id: 'virgin80', name: '80', value: 80 },
        { id: 'virgin69', name: '69 فليكس', value: 69 },
        { id: 'virgin51', name: '51', value: 51 }
    ],
    friendi: [
        { id: 'friendiFlex345', name: 'فليكس 345', value: 345 },
        { id: 'friendi126', name: '126', value: 126 },
        { id: 'friendiFlex115', name: '115 فليكس', value: 115 },
        { id: 'friendi114', name: '114', value: 114 },
        { id: 'friendi97', name: '97', value: 97 },
        { id: 'friendi80', name: '80', value: 80 },
        { id: 'friendiFlex69', name: '69 فليكس', value: 69 },
        { id: 'friendi63', name: '63', value: 63 },
        { id: 'friendi50', name: '50', value: 50 },
        { id: 'friendi34', name: '34', value: 34 },
        { id: 'friendi23', name: '23', value: 23 }
    ],
    switch: [
        { id: 'switch120', name: '120', value: 120 },
        { id: 'switch150', name: '150', value: 150 },
        { id: 'switch180', name: '180', value: 180 },
        { id: 'switch200', name: '200', value: 200 },
        { id: 'switch250', name: '250', value: 250 },
        { id: 'switch300', name: '300', value: 300 },
        { id: 'switch365', name: '365', value: 365 }
    ],
    data: [
        { id: 'data97', name: '97', value: 97 },
        { id: 'data172', name: '172', value: 172 },
        { id: 'data230', name: '230', value: 230 },
        { id: 'data253', name: '253', value: 253 },
        { id: 'data345', name: '345', value: 345 },
        { id: 'data517', name: '517', value: 517 },
        { id: 'data546', name: '546', value: 546 },
        { id: 'data1121', name: '1,121', value: 1121 },
        { id: 'data2242', name: '2,242', value: 2242 },
        { id: 'data4542', name: '4,542', value: 4542 }
    ],
    international: [
        { 
            id: 'intl_india', 
            name: 'الهند', 
            value: 50,
            minutes: 800,
            details: 'الهند: 50 ريال - 800 دقيقة'
        },
        { 
            id: 'intl_bangladesh', 
            name: 'بنجلاديش', 
            value: 50,
            minutes: 800,
            details: 'بنجلاديش: 50 ريال - 800 دقيقة'
        },
        { 
            id: 'intl_pakistan', 
            name: 'باكستان', 
            value: 50,
            minutes: 235,
            details: 'باكستان: 50 ريال - 235 دقيقة'
        },
        { 
            id: 'intl_nepal', 
            name: 'نيبال', 
            value: 50,
            minutes: 730, // 365+365
            details: 'نيبال: 50 ريال - 365+365 دقيقة'
        },
        { 
            id: 'intl_yemen', 
            name: 'اليمن', 
            value: 69,
            minutes: 210,
            details: 'اليمن: 69 ريال - 210 دقيقة'
        },
        { 
            id: 'intl_egypt', 
            name: 'مصر', 
            value: 50,
            minutes: 130,
            details: 'مصر: 50 ريال - 130 دقيقة'
        },
        { 
            id: 'intl_philippines', 
            name: 'الفلبين', 
            value: 50,
            minutes: 100,
            details: 'الفلبين: 50 ريال - 100 دقيقة'
        },
        { 
            id: 'intl_ethiopia', 
            name: 'إثيوبيا', 
            value: 50,
            minutes: 100,
            details: 'إثيوبيا: 50 ريال - 100 دقيقة'
        }
    ]
};

// Sort packages in descending order and add prefixes
function preparePackages() {
    // Sort virgin packages
    packages.virgin.sort((a, b) => b.value - a.value);
    packages.virgin.forEach(pkg => {
        pkg.displayName = `ڤيرجن ${pkg.name}`;
    });
    
    // Sort friendi packages
    packages.friendi.sort((a, b) => b.value - a.value);
    packages.friendi.forEach(pkg => {
        pkg.displayName = pkg.name.includes('فليكس') ? 
            `فريندي ${pkg.name}` : 
            `فريندي ${pkg.name}`;
    });
    
    // Sort switch packages
    packages.switch.sort((a, b) => b.value - a.value);
    packages.switch.forEach(pkg => {
        pkg.displayName = `سويتش ${pkg.name}`;
    });
    
    // Sort data packages
    packages.data.sort((a, b) => b.value - a.value);
    packages.data.forEach(pkg => {
        pkg.displayName = `بيانات ${pkg.name}`;
    });
    
    // Sort international packages
    packages.international.sort((a, b) => {
        // Sort by country name in Arabic
        return a.name.localeCompare(b.name, 'ar');
    });
    packages.international.forEach(pkg => {
        pkg.displayName = pkg.details; // Use the detailed description
    });
}

// Call this function to prepare packages when the script loads
preparePackages();

const services = [
    { id: 'ownershipTransfer', displayName: 'نقل ملكية' },
    { id: 'replacementSim', displayName: 'بدل فاقد' },
    { id: 'ownerUpdate', displayName: 'تحديث مالك' }
];

// Initialize counters
let counters = {};

// Initialize the app
function initApp() {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('saleDate').value = today;
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Setup tabs
    setupTabs();
    
    // Initialize counters
    initializeCounters();
    
    // Render package lists
    renderPackageList('virgin-packages', packages.virgin);
    renderPackageList('friendi-packages', packages.friendi);
    renderPackageList('switch-packages', packages.switch);
    renderPackageList('data-packages', packages.data);
    renderPackageList('international-packages', packages.international);
    renderPackageList('service-counters', services);
    
    // Initialize light effects
    initLightEffects();
}

// تأثير الأنوار على كلمة "أنوار العالم"
function initLightEffects() {
    const mainTitle = document.querySelector('.main-title');
    if (!mainTitle) return;
    
    // إنشاء جزيئات ضوئية عند النقر أو اللمس
    mainTitle.addEventListener('click', handleLightEffect);
    mainTitle.addEventListener('touchstart', handleLightEffect);
    
    function handleLightEffect(e) {
        e.preventDefault(); // منع السلوك الافتراضي للمس
        
        // إضافة تأثير قوس قزح
        mainTitle.classList.add('rainbow-effect');
        setTimeout(() => {
            mainTitle.classList.remove('rainbow-effect');
        }, 500);
        
        createLightParticles(e, mainTitle);
        createLightWave(mainTitle);
        
        // إضافة اهتزاز خفيف للجوال
        if ('vibrate' in navigator) {
            navigator.vibrate(50); // اهتزاز لمدة 50 ميلي ثانية
        }
        
        // إضافة صوت النقر (اختياري)
        playClickSound();
    }
    
    // إنشاء جزيئات ضوئية متحركة
    function createLightParticles(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // إنشاء 15 جزيئة ضوئية
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'light-particle';
            
            // موضع عشوائي حول نقطة النقر
            const angle = (Math.PI * 2 * i) / 15;
            const velocity = 50 + Math.random() * 50;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.position = 'absolute';
            
            element.appendChild(particle);
            
            // تحريك الجزيئة
            let frame = 0;
            const animate = () => {
                frame++;
                const progress = frame / 60;
                
                particle.style.transform = `
                    translate(${Math.cos(angle) * velocity * progress}px, 
                             ${Math.sin(angle) * velocity * progress - progress * progress * 100}px)
                    scale(${1 - progress})
                `;
                particle.style.opacity = 1 - progress;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }
    }
    
    // إنشاء موجة ضوئية
    function createLightWave(element) {
        const wave = document.createElement('div');
        wave.style.position = 'absolute';
        wave.style.left = '50%';
        wave.style.top = '50%';
        wave.style.transform = 'translate(-50%, -50%)';
        wave.style.width = '0';
        wave.style.height = '0';
        wave.style.borderRadius = '50%';
        wave.style.border = '2px solid rgba(255, 255, 255, 0.8)';
        wave.style.pointerEvents = 'none';
        
        element.appendChild(wave);
        
        // تحريك الموجة
        let scale = 0;
        const animateWave = () => {
            scale += 0.05;
            wave.style.width = scale * 200 + 'px';
            wave.style.height = scale * 200 + 'px';
            wave.style.opacity = 1 - scale / 3;
            
            if (scale < 3) {
                requestAnimationFrame(animateWave);
            } else {
                wave.remove();
            }
        };
        
        requestAnimationFrame(animateWave);
    }
    
    // دالة تشغيل صوت النقر (اختياري)
    function playClickSound() {
        // يمكن إضافة صوت هنا إذا أردت
        // const audio = new Audio('path/to/click-sound.mp3');
        // audio.play();
    }
}

// Initialize counters
function initializeCounters() {
    services.forEach(service => {
        counters[service.id] = 0;
    });
    // Initialize all package counters to 0
    Object.values(packages).forEach(category => {
        category.forEach(pkg => {
            counters[pkg.id] = 0;
        });
    });
}

// Set up tab switching functionality
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    const virginLogo = document.querySelector('.header-logo');
    const friendiLogoContainer = document.getElementById('friendi-logo-container');

    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // إضافة تأثير موجة عند النقر
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Remove active class from all buttons and contents with animation
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            
            // Add fade-out animation to current active content
            const currentActive = document.querySelector('.tab-content.active');
            if (currentActive) {
                currentActive.classList.add('fade-out');
                setTimeout(() => {
                    currentActive.classList.remove('active', 'fade-out');
                }, 300);
            }
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content with delay for smooth transition
            const tabId = button.getAttribute('data-tab');
            setTimeout(() => {
                document.getElementById(tabId).classList.add('active');
            }, 300);
            
            // إعادة تعيين كل الثيمات
            document.body.classList.remove('friendi-theme', 'international-theme');
            
            if (tabId === 'friendi-tab') {
                document.body.classList.add('friendi-theme');
                // حركة انتقالية لإخفاء شعار ڤيرجن
                if (virginLogo) {
                    virginLogo.style.opacity = '0';
                    virginLogo.style.transform = 'scale(0.5) rotate(-180deg)';
                    setTimeout(() => {
                        virginLogo.style.display = 'none';
                    }, 300);
                }
                
                // إظهار شعار فريندي مع حركة
                if (friendiLogoContainer) {
                    friendiLogoContainer.style.display = 'block';
                    friendiLogoContainer.innerHTML = `
                        <img src="images/image.png" alt="Friendi Logo" class="logo friendi-logo">
                    `;
                    setTimeout(() => {
                        friendiLogoContainer.style.opacity = '1';
                    }, 50);
                }
            } else if (tabId === 'international-tab') {
                document.body.classList.add('international-theme');
                // حركة انتقالية لإخفاء شعار ڤيرجن
                if (virginLogo) {
                    virginLogo.style.opacity = '0';
                    virginLogo.style.transform = 'scale(0.5) rotate(-180deg)';
                    setTimeout(() => {
                        virginLogo.style.display = 'none';
                    }, 300);
                }
                
                // إظهار شعار فريندي للمكالمات الدولية مع حركة
                if (friendiLogoContainer) {
                    friendiLogoContainer.style.display = 'block';
                    friendiLogoContainer.innerHTML = `
                        <img src="images/image.png" alt="International Logo" class="logo friendi-logo">
                    `;
                    setTimeout(() => {
                        friendiLogoContainer.style.opacity = '1';
                    }, 50);
                }
            } else {
                // إعادة شعار ڤيرجن مع حركة
                if (virginLogo) {
                    virginLogo.style.display = 'block';
                    setTimeout(() => {
                        virginLogo.style.opacity = '1';
                        virginLogo.style.transform = 'scale(1) rotate(0)';
                    }, 50);
                }
                
                // إزالة شعار فريندي مع حركة
                if (friendiLogoContainer) {
                    friendiLogoContainer.style.opacity = '0';
                    setTimeout(() => {
                        friendiLogoContainer.style.display = 'none';
                        friendiLogoContainer.innerHTML = '';
                    }, 300);
                }
            }
            
            // Update mobile nav active state
            const tabName = tabId.replace('-tab', '');
            document.querySelectorAll('.mobile-nav-link').forEach(link => {
                if (link.getAttribute('data-tab') === tabName) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        });
    });
}

// Render package list
function renderPackageList(containerId, packageList) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    packageList.forEach(pkg => {
        const packageElement = document.createElement('div');
        packageElement.className = 'package-card';
        packageElement.innerHTML = `
            <div class="package-info">
                <span class="package-name">${pkg.displayName}</span>
                <div class="counter">
                    <button type="button" aria-label="زيادة ${pkg.displayName}" onclick="updateCount('${pkg.id}', 1)"><i class="fas fa-plus"></i></button>
                    <span id="${pkg.id}" aria-live="polite">0</span>
                    <button type="button" aria-label="إنقاص ${pkg.displayName}" onclick="updateCount('${pkg.id}', -1)"><i class="fas fa-minus"></i></button>
                </div>
            </div>
        `;
        container.appendChild(packageElement);
    });
}

// Update counter value
function updateCount(id, change) {
    if (!counters.hasOwnProperty(id)) {
        counters[id] = 0;
    }
    
    counters[id] = Math.max(0, counters[id] + change);
    document.getElementById(id).textContent = counters[id];
}

function generateReport() {
    const employeeName = document.getElementById('employeeName').value.trim() || 'غير محدد';
    const userName = document.getElementById('userName').value.trim() || 'Dir-';
    const custody = document.getElementById('custody').value.trim() || '0';
    const location = document.getElementById('location').value.trim() || 'غير محدد';
    const discounts = document.getElementById('discounts').value.trim() || '0';
    const saleDate = document.getElementById('saleDate').value || new Date().toISOString().split('T')[0];

    const dateObj = new Date(saleDate);
    const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const dayName = dayNames[dateObj.getDay()];
    const formattedDate = `${dayName}, ${saleDate.split('-').join('-')}`;

    let report = 'تقرير المبيعات\n';
    report += `الموظف: ${employeeName}\n`;
    report += `اليوزر: ${userName}\n`;
    report += `الموقع: ${location}\n`;
    report += `التاريخ: ${formattedDate}\n`;
    report += '――――――――――――――\n';
    report += `العهدة: ${custody} ر.س\n`;
    report += `الخصومات: ${discounts} ر.س\n`; 
    report += '――――――――――――――\n\n';

    let totalItems = 0;
    let totalAmount = 0;
    let hasSales = false;

    const processSales = (title, packageList) => {
        let sectionReport = '';
        let sectionSales = packageList.filter(pkg => counters[pkg.id] > 0);
        if (sectionSales.length > 0) {
            hasSales = true;
            // حساب عدد الباقات في القسم
            const sectionTotal = sectionSales.reduce((sum, pkg) => sum + counters[pkg.id], 0);
            sectionReport += `${title}: (${sectionTotal})\n`;
            
            sectionSales.forEach(pkg => {
                const count = counters[pkg.id];
                totalItems += count;
                totalAmount += count * pkg.value;
                sectionReport += `- ${pkg.displayName}: ${count}\n`;
            });
            sectionReport += '\n';
        }
        return sectionReport;
    };

    report += processSales('باقات فيرجن', packages.virgin);
    report += processSales('باقات فريندي', packages.friendi);
    report += processSales('باقات سويتش', packages.switch);
    report += processSales('باقات البيانات', packages.data);
    report += processSales('باقات المكالمات الدولية', packages.international);

    if (hasSales) {
        report += '====================\n';
        report += `إجمالي عدد المبيعات: ${totalItems}\n`;
    } else {
        report += 'لا توجد مبيعات مسجلة.';
    }

    report += '\n\nالخدمات:\n';
    services.forEach(service => {
        report += `- ${service.displayName}: ${counters[service.id]}\n`;
    });

    const reportOutput = document.getElementById('reportOutput');
    reportOutput.value = report;
    reportOutput.style.height = 'auto';
    reportOutput.style.height = (reportOutput.scrollHeight) + 'px';

    // Automatically copy to clipboard and provide feedback
    reportOutput.select();
    reportOutput.setSelectionRange(0, 99999); // For mobile compatibility

    try {
        document.execCommand('copy');
        
        // Visual feedback on the generate button
        const reportBtn = document.getElementById('generateReportBtn');
        if (reportBtn) {
            const originalIcon = reportBtn.innerHTML;
            reportBtn.innerHTML = '<i class="fas fa-check"></i>';
            reportBtn.classList.add('success');
            
            setTimeout(() => {
                reportBtn.innerHTML = originalIcon;
                reportBtn.classList.remove('success');
            }, 2000);
        }
    } catch (err) {
        console.error('Failed to copy report automatically: ', err);
    }
}

// Copy report to clipboard
function copyToClipboard() {
    const reportOutput = document.getElementById('reportOutput');
    reportOutput.select();
    document.execCommand('copy');
    
    // Show copied message
    const copyButton = document.querySelector('.btn-copy');
    const originalText = copyButton.innerHTML;
    copyButton.innerHTML = '<i class="fas fa-check"></i> تم النسخ';
    
    setTimeout(() => {
        copyButton.innerHTML = originalText;
    }, 2000);
}

// Reset all counters
function resetAll() {
    if (confirm('هل أنت متأكد من إعادة تعيين كل العدادات؟')) {
        resetCounters();
    }
}

// Reset counters function (also used by FAB button)
function resetCounters() {
    // Reset all counters to 0
    Object.keys(counters).forEach(key => {
        counters[key] = 0;
        const element = document.getElementById(key);
        if (element) {
            element.textContent = '0';
        }
    });
    
    // Clear report
    document.getElementById('reportOutput').value = '';
    
    // Visual feedback on the reset button
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        const originalIcon = resetBtn.innerHTML;
        resetBtn.innerHTML = '<i class="fas fa-check"></i>';
        resetBtn.classList.add('success');
        
        setTimeout(() => {
            resetBtn.innerHTML = originalIcon;
            resetBtn.classList.remove('success');
        }, 2000);
    }
}

// Debug: Test if JavaScript is working
console.log('JavaScript is loaded!');

// Set today's date when the page loads
window.onload = function() {
    // Get current date in Saudi Arabia timezone
    const now = new Date();
    const options = { timeZone: 'Asia/Riyadh' };
    const saudiDate = new Date(now.toLocaleString('en-US', options));
    
    // Format as YYYY-MM-DD
    const year = saudiDate.getFullYear();
    const month = String(saudiDate.getMonth() + 1).padStart(2, '0');
    const day = String(saudiDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    // Set the date input value
    const dateInput = document.getElementById('saleDate');
    if (dateInput) {
        dateInput.value = formattedDate;
        // Allow manual editing
        dateInput.readOnly = false;
        
        // Log for debugging
        console.log('تم تعيين التاريخ التلقائي إلى:', formattedDate, 'بتوقيت السعودية');
    }
};

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة');
    
    // Get all necessary elements
    const menuButton = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeButton = document.querySelector('.mobile-close-btn');
    const body = document.body;
    
    console.log('Menu elements:', { menuButton, mobileNav, closeButton });
    
    // Function to open the menu
    function openMenu() {
        console.log('Opening menu...');
        if (mobileNav) mobileNav.classList.add('active');
        if (body) body.classList.add('menu-open');
        if (menuButton) menuButton.classList.add('active');
    }
    
    // Function to close the menu
    function closeMenu() {
        console.log('Closing menu...');
        if (mobileNav) mobileNav.classList.remove('active');
        if (body) body.classList.remove('menu-open');
        if (menuButton) menuButton.classList.remove('active');
    }
    
    // Toggle menu when clicking the menu button
    if (menuButton) {
        menuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu button clicked');
            
            if (mobileNav && mobileNav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }
    
    // Close menu when clicking the close button
    if (closeButton) {
        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMenu();
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileNav && mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            e.target !== menuButton && 
            !menuButton.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });
    
        // Initialize the app
    try {
        console.log('Initializing app...');
        
        // Initialize the main app
        if (typeof initApp === 'function') {
            initApp();
            console.log('App initialized successfully');
        } else {
            console.warn('initApp function not found, but continuing...');
        }
        
        // Log menu state for debugging
        console.log('Current menu state:', {
            menuButton: document.querySelector('.mobile-menu-toggle')?.classList,
            mobileNav: document.querySelector('.mobile-nav')?.classList,
            overlay: document.querySelector('.mobile-menu-overlay')?.classList
        });
        
        // Force show menu for testing (temporary)
        // setTimeout(() => {
        //     console.log('Forcing menu open for testing');
        //     document.querySelector('.mobile-menu-toggle')?.click();
        // }, 1000);
        
    } catch (error) {
        console.error('Error initializing app:', error);
    }
});
