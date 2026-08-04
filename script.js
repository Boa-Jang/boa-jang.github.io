// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle functionality
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

function setMenu(open) {
  menuToggle.classList.toggle('active', open);
  menu.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
}

menuToggle.addEventListener('click', () => {
  setMenu(!menu.classList.contains('active'));
});

// Close mobile menu when clicking on a link
const menuLinks = document.querySelectorAll('.menu a');
menuLinks.forEach(link => {
  link.addEventListener('click', () => setMenu(false));
});

// Active menu highlighting based on scroll position
function updateActiveMenu() {
  const sections = document.querySelectorAll('section, header');
  const menuLinks = document.querySelectorAll('.menu a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  // Handle header specially
  if (window.pageYOffset < 200) {
    current = 'home';
  }
  
  menuLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) {
      link.classList.add('active');
    }
  });
}

// Update active menu on scroll
window.addEventListener('scroll', updateActiveMenu);

// Set initial active menu
updateActiveMenu();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const isClickInsideMenu = menu.contains(e.target);
  const isClickOnToggle = menuToggle.contains(e.target);
  
  if (!isClickInsideMenu && !isClickOnToggle && menu.classList.contains('active')) {
    setMenu(false);
  }
});

// Prevent scrolling when mobile menu is open
menu.addEventListener('transitionstart', () => {
  if (menu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  }
});

menu.addEventListener('transitionend', () => {
  if (!menu.classList.contains('active')) {
    document.body.style.overflow = '';
  }
});

// Hide the media row's edge fade once it is scrolled to the end
const mediaRow = document.querySelector('.media-row');
const mediaScroller = document.querySelector('.media-scroller');

if (mediaRow && mediaScroller) {
  const updateMediaFade = () => {
    const atEnd = mediaRow.scrollLeft + mediaRow.clientWidth >= mediaRow.scrollWidth - 2;
    const noOverflow = mediaRow.scrollWidth <= mediaRow.clientWidth + 2;
    mediaScroller.classList.toggle('at-end', atEnd || noOverflow);
  };

  mediaRow.addEventListener('scroll', updateMediaFade, { passive: true });
  window.addEventListener('resize', updateMediaFade);
  updateMediaFade();
}

// Escape key to close mobile menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('active')) {
    setMenu(false);
    menuToggle.focus();
  }
});