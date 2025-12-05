const slides = document.querySelectorAll('.slider__slide');
const nextBtn = document.getElementById('nextBtn');
const bulletsContainer = document.getElementById('bullet');
let current = 0;

// generate bullets for indicator
slides.forEach((_, i) => {
  const bullet = document.createElement('div');
  bullet.classList.add('indicator__bullet');
  if (i === 0) bullet.classList.add('active');
  bulletsContainer.appendChild(bullet);
});

const bullets = document.querySelectorAll('.indicator__bullet');

function goToSlide(next) {
    const tl = gsap.timeline();

    tl.to(slides[current], { 
        x: '-100%', 
        opacity: 0, 
        duration: 0.5 
    })
    .fromTo(
        slides[next],
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        '<'
    );

    // move slide
    slides[current].classList.remove('active');
    slides[next].classList.add('active');
    current = next;

    // update bullet indicator
    bullets.forEach(b => b.classList.remove('active'));
    bullets[current].classList.add('active');

    // change button text on last slide
    if(current === slides.length - 1) {
        nextBtn.textContent = 'Get started'
        nextBtn.classList.add('btn--secondary')
        nextBtn.classList.remove('btn--hollow')
    }
}

nextBtn.addEventListener('click', () => {
    if (current < slides.length - 1) {
        goToSlide(current + 1);
    } else {
        console.log('Trigger final action');
        window.location.href = '/question.html';
    }
});