// Chandu Real Estate - Core Client-Side Logic

let currentLanguage = 'en';
const whatsappNumber = '+919381129488';
let projectData = {};

// On DOMContentLoaded, initialize everything
document.addEventListener('DOMContentLoaded', () => {
  // Set default active tab and scroll to top
  window.scrollTo(0, 0);
  
  // Parse any hash inside URL for routing, default to 'home'
  const initialTab = window.location.hash ? window.location.hash.substring(1) : 'home';
  navigateTo(initialTab);

  // Initialize projects data structure
  initProjectData();

  // Set default city selection in "Our Projects"
  const citySelect = document.getElementById('city-select');
  if (citySelect) {
    citySelect.value = 'parlakimidi';
    onCityChange('parlakimidi');
  }

  // Trigger initial language translation rendering
  updateTranslations();
});

// Mobile Menu toggle action
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav');
  const menuIcon = document.getElementById('menu-btn-icon');
  
  if (mobileNav.style.display === 'block') {
    mobileNav.style.display = 'none';
    menuIcon.className = 'fa-solid fa-bars';
  } else {
    mobileNav.style.display = 'block';
    menuIcon.className = 'fa-solid fa-xmark';
  }
}

// Navigation controller to switch between different sections (tabs)
function navigateTo(targetId, event) {
  if (event) {
    event.preventDefault();
  }

  // Hide mobile nav on click
  const mobileNav = document.getElementById('mobile-nav');
  const menuIcon = document.getElementById('menu-btn-icon');
  if (mobileNav) {
    mobileNav.style.display = 'none';
  }
  if (menuIcon) {
    menuIcon.className = 'fa-solid fa-bars';
  }

  // Set hashes
  window.location.hash = targetId;

  // Deactivate all sections and links
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(sec => sec.classList.remove('active'));

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => link.classList.remove('active'));

  const mobLinks = document.querySelectorAll('.mob-link');
  mobLinks.forEach(link => link.classList.remove('active'));

  // Activate targets
  const targetSection = document.getElementById(`section-${targetId}`);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  const targetLink = document.getElementById(`nav-${targetId}`);
  if (targetLink) {
    targetLink.classList.add('active');
  }

  const targetMobLink = document.getElementById(`mob-nav-${targetId}`);
  if (targetMobLink) {
    targetMobLink.classList.add('active');
  }

  // Toggle hero section visibility (only display banner for Home, About, and Projects tabs)
  const heroBanner = document.getElementById('hero-banner');
  if (heroBanner) {
    if (targetId === 'home' || targetId === 'about' || targetId === 'projects') {
      heroBanner.style.display = 'flex';
    } else {
      heroBanner.style.display = 'none';
    }
  }

  // Show hero-container (title, subtitle, buttons) only on Home section
  const heroContainer = document.querySelector('.hero-container');
  if (heroContainer) {
    heroContainer.style.display = targetId === 'home' ? 'flex' : 'none';
  }

  // Scroll smoothly to top of main content on page switch
  if (targetId !== 'home' || !heroBanner) {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Language Toggle Controller
function changeLanguage(langCode) {
  currentLanguage = langCode;
  
  // Sync select element state just in case
  const selectElement = document.getElementById('language-select');
  if (selectElement) {
    selectElement.value = langCode;
  }

  // Apply translations to layout
  updateTranslations();
  
  // Refresh project card according to active selected city to display it in the chosen language
  const activeCity = document.getElementById('city-select').value;
  onCityChange(activeCity);
}

// Core Translation Engine
function updateTranslations() {
  const t = window.translations[currentLanguage];
  if (!t) return;

  // Header and Brand Texts
  document.getElementById('site-title').innerText = t.title;
  document.getElementById('site-subtitle').innerText = t.subtitle;
  
  // Navigation Menus
  document.getElementById('nav-home').innerText = t.menuHome;
  document.getElementById('nav-about').innerText = t.menuAbout;
  document.getElementById('nav-projects').innerText = t.menuProjects;
  document.getElementById('nav-gallery').innerText = t.menuGallery;
  document.getElementById('nav-site-visit').innerText = t.menuSiteVisit;
  document.getElementById('nav-contact').innerText = t.menuContact;

  // Mobile Navigation Menus
  document.getElementById('mob-nav-home').innerText = t.menuHome;
  document.getElementById('mob-nav-about').innerText = t.menuAbout;
  document.getElementById('mob-nav-projects').innerText = t.menuProjects;
  document.getElementById('mob-nav-gallery').innerText = t.menuGallery;
  document.getElementById('mob-nav-site-visit').innerText = t.menuSiteVisit;
  document.getElementById('mob-nav-contact').innerText = t.menuContact;

  // Hero Section
  document.getElementById('hero-title').innerText = t.homeTitle;
  document.getElementById('hero-subtitle').innerText = t.homeSubtitle;
  document.getElementById('hero-btn-explore').innerText = t.menuProjects;
  document.getElementById('hero-btn-book').innerText = t.menuSiteVisit;

  // Home Section Content
  document.getElementById('home-title').innerText = t.homeTitle;
  document.getElementById('home-desc-1').innerText = t.homeDesc1;
  document.getElementById('home-desc-2').innerText = t.homeDesc2;
  
  document.getElementById('feature-1-title').innerText = t.homeFeature1Title;
  document.getElementById('feature-1-desc').innerText = t.homeFeature1Desc;
  document.getElementById('feature-2-title').innerText = t.homeFeature2Title;
  document.getElementById('feature-2-desc').innerText = t.homeFeature2Desc;
  document.getElementById('feature-3-title').innerText = t.homeFeature3Title;
  document.getElementById('feature-3-desc').innerText = t.homeFeature3Desc;

  // About Section Content
  document.getElementById('about-title').innerText = t.aboutTitle;
  document.getElementById('about-subtitle').innerText = t.aboutSubtitle;
  document.getElementById('about-story').innerText = t.aboutStory;
  document.getElementById('about-vision-title').innerText = t.aboutVisionTitle;
  document.getElementById('about-vision-desc').innerText = t.aboutVisionDesc;
  document.getElementById('about-mission-title').innerText = t.aboutMissionTitle;
  document.getElementById('about-mission-desc').innerText = t.aboutMissionDesc;

  // Projects Section
  document.getElementById('projects-title').innerText = t.projectsTitle;
  document.getElementById('projects-subtitle').innerText = t.projectsSubtitle;
  document.getElementById('select-city-label').innerText = t.selectCity;
  document.getElementById('opt-parlakimidi').innerText = t.cityParlakimidi;
  document.getElementById('opt-vizag').innerText = t.cityVizag;
  document.getElementById('opt-vizianagaram').innerText = t.cityVizianagaram;
  document.getElementById('project-view-btn-text').innerText = t.viewDetailsBtn;

  // Gallery Section
  document.getElementById('gallery-title').innerText = t.galleryTitle;
  document.getElementById('gallery-subtitle').innerText = t.gallerySubtitle;
  document.getElementById('gallery-img-1-desc').innerText = t.galleryImg1Desc;
  document.getElementById('gallery-img-2-desc').innerText = t.galleryImg2Desc;
  document.getElementById('gallery-img-3-desc').innerText = t.galleryImg3Desc;
  document.getElementById('gallery-img-4-desc').innerText = t.galleryImg4Desc;
  document.getElementById('gallery-img-5-desc').innerText = t.galleryImg5Desc;
  document.getElementById('gallery-img-6-desc').innerText = t.galleryImg6Desc;

  // Site Visit Form Section
  document.getElementById('site-visit-title').innerText = t.siteVisitTitle;
  document.getElementById('site-visit-subtitle').innerText = t.siteVisitSubtitle;
  document.getElementById('lbl-first-name').innerHTML = `${t.formFirstName} <span class="required">*</span>`;
  document.getElementById('lbl-last-name').innerHTML = `${t.formLastName} <span class="required">*</span>`;
  document.getElementById('lbl-mobile').innerHTML = `${t.formMobile} <span class="required">*</span>`;
  document.getElementById('lbl-date-time').innerHTML = `${t.formDateTime} <span class="required">*</span>`;
  document.getElementById('btn-submit-text').innerText = t.formSubmit;
  document.getElementById('success-msg').innerText = t.formSuccessMsg;
  
  // Set Placeholders
  document.getElementById('first-name').placeholder = t.formPlaceholderFirst;
  document.getElementById('last-name').placeholder = t.formPlaceholderLast;
  document.getElementById('mobile-number').placeholder = t.formPlaceholderMobile;

  // Contact Page Section
  document.getElementById('contact-title').innerText = t.contactTitle;
  document.getElementById('contact-subtitle').innerText = t.contactSubtitle;
  document.getElementById('contact-head-office').innerText = t.contactHeadOffice;
  document.getElementById('contact-office-desc').innerText = t.contactOfficeDesc;
  document.getElementById('contact-phone').innerText = t.contactPhone;
  document.getElementById('contact-email').innerText = t.contactEmail;
  document.getElementById('contact-office-hours').innerText = t.contactOfficeHours;
  document.getElementById('contact-office-hours-desc').innerText = t.contactOfficeHoursDesc;
  
  document.getElementById('contact-send-query').innerText = t.contactSendQuery;
  document.getElementById('lbl-contact-name').innerText = t.contactYourName;
  document.getElementById('lbl-contact-email').innerText = t.contactYourEmail;
  document.getElementById('lbl-contact-msg').innerText = t.contactMessage;
  document.getElementById('btn-send-contact').innerText = t.contactSendBtn;
}

// Define the static cities and their plot/flat metadata structures
function initProjectData() {
  projectData = {
    parlakimidi: {
      image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=800&q=80",
      tagKey: "pkProjectType",
      locationKey: "pkProjectLoc",
      nameKey: "pkProjectName",
      descKey: "pkProjectDesc",
      priceKey: "pkProjectPrice",
      feats: ["pkProjectFeature1", "pkProjectFeature2", "pkProjectFeature3"]
    },
    vizag: {
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      tagKey: "vzProjectType",
      locationKey: "vzProjectLoc",
      nameKey: "vzProjectName",
      descKey: "vzProjectDesc",
      priceKey: "vzProjectPrice",
      feats: ["vzProjectFeature1", "vzProjectFeature2", "vzProjectFeature3"]
    },
    vizianagaram: {
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      tagKey: "vznProjectType",
      locationKey: "vznProjectLoc",
      nameKey: "vznProjectName",
      descKey: "vznProjectDesc",
      priceKey: "vznProjectPrice",
      feats: ["vznProjectFeature1", "vznProjectFeature2", "vznProjectFeature3"]
    }
  };
}

// Triggers whenever user selects a different city on "Our Projects" tab
function onCityChange(cityValue) {
  const p = projectData[cityValue];
  const t = window.translations[currentLanguage];
  if (!p || !t) return;

  // Render elements
  document.getElementById('project-img').src = p.image;
  document.getElementById('project-tag').innerText = t[p.tagKey];
  document.getElementById('project-location').innerText = t[p.locationKey];
  document.getElementById('project-name').innerText = t[p.nameKey];
  document.getElementById('project-description').innerText = t[p.descKey];
  document.getElementById('project-price').innerText = t[p.priceKey];
  
  // Render key feature bullets
  document.getElementById('project-feat-1').innerText = t[p.feats[0]];
  document.getElementById('project-feat-2').innerText = t[p.feats[1]];
  document.getElementById('project-feat-3').innerText = t[p.feats[2]];
}

// Formatting dates for WhatsApp output layout (Readable layout)
function formatDateTime(dateTimeString) {
  try {
    const d = new Date(dateTimeString);
    if (isNaN(d.getTime())) return dateTimeString;
    
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 12-hour converter
    
    return `${day}/${month}/${year} at ${hours}:${minutes} ${ampm}`;
  } catch (e) {
    return dateTimeString;
  }
}

// Site Visit Booking Form Submission Handler (WhatsApp redirection)
function handleFormSubmit(event) {
  event.preventDefault();

  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const mobileNumber = document.getElementById('mobile-number').value.trim();
  const visitTime = document.getElementById('visit-time').value;

  // Basic Mobile Number validation
  if (!/^[0-9]{10}$/.test(mobileNumber)) {
    alert(currentLanguage === 'te' 
      ? 'దయచేసి సరైన 10 అంకెల మొబైల్ సంఖ్యను నమోదు చేయండి.' 
      : currentLanguage === 'or' 
        ? 'ଦୟାକରି ଏକ ସଠିକ୍ ୧୦ ଅଙ୍କ ବିଶିଷ୍ଟ ମୋବାଇଲ୍ ନମ୍ବର ପ୍ରଦାନ କରନ୍ତୁ।'
        : 'Please enter a valid 10-digit mobile number.');
    return;
  }

  // Show visual loading/redirect state
  const alertBox = document.getElementById('form-success-alert');
  if (alertBox) {
    alertBox.style.display = 'flex';
  }

  // Format WhatsApp message text
  const cleanTime = formatDateTime(visitTime);
  const fullName = `${firstName} ${lastName}`;
  
  const lineDivider = "-----------------------------------------";
  const messageText = 
`🏡 *CHANDU REAL ESTATE - SITE VISIT BOOKING*
${lineDivider}
*Client Details:*
👤 *Name:* ${fullName}
📞 *Mobile:* ${mobileNumber}
⏰ *Preferred Visit Time:* ${cleanTime}

*Status:* Requesting physical site visit & call back.
${lineDivider}
_This message is automatically generated from the Chandu Real Estate web application._`;

  // Clean WhatsApp Number (Remove spaces, special characters, and '+' for API url layout)
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');

  // Build redirection URL (Uses api.whatsapp.com for broad cross-platform compatibility)
  const encodedText = encodeURIComponent(messageText);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedText}`;

  // Redirect after a short delay to allow the user to see the success message
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
    
    // Hide the loading state and reset form
    if (alertBox) {
      alertBox.style.display = 'none';
    }
    document.getElementById('site-visit-form').reset();
  }, 1500);
}
