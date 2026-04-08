const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeButton = document.getElementById('lightboxClose');

for (const image of document.querySelectorAll('.gallery-item img')) {
  image.classList.add('lightboxable');
  image.addEventListener('click', () => {
    lightboxImage.src = image.src;
    lightboxCaption.textContent = image.closest('figure')?.querySelector('figcaption')?.textContent || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
}

closeButton.addEventListener('click', () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
});

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }
});

const sections = [...document.querySelectorAll('.mass-section')];
const tocLinks = [...document.querySelectorAll('.toc a')];

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        continue;
      }
      const id = entry.target.id;
      for (const link of tocLinks) {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      }
    }
  },
  { rootMargin: '-40% 0px -45% 0px', threshold: 0.01 }
);

for (const section of sections) {
  observer.observe(section);
}

const donationForm = document.getElementById('donation-form');
const donationAmount = document.getElementById('donation-amount');
const donationMessage = document.getElementById('donation-message');
const paypalBaseUrl = 'https://www.paypal.com/paypalme/myturtlenamesthis';

if (donationForm && donationAmount && donationMessage) {
  donationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const amount = Number(donationAmount.value);
    let targetUrl = paypalBaseUrl;

    if (Number.isFinite(amount) && amount > 0) {
      targetUrl = `${paypalBaseUrl}/${amount.toFixed(2)}`;
    }

    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    donationMessage.textContent =
      'Redirecting to PayPal in a new tab. If it did not open, please allow pop-ups and try again.';
  });
}
