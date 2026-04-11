const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('abierto');
  navLinks.classList.toggle('abierto');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('abierto');
    navLinks.classList.remove('abierto');
  });
});

const secciones = document.querySelectorAll('section[id]');
const links     = document.querySelectorAll('.navbar__links a');

function actualizarActivo() {
  let actual = '';
  secciones.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) actual = sec.id;
  });
  links.forEach(link => {
    link.classList.toggle('activo', link.getAttribute('href') === `#${actual}`);
  });
}
window.addEventListener('scroll', actualizarActivo, { passive: true });
actualizarActivo();

// --- Galerías (toggle) ---
document.querySelectorAll('.realizada__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const realizada = btn.closest('.realizada');
    const extra = realizada.querySelector('.galeria__extra');
    const abierta = !extra.hidden;
    extra.hidden = abierta;
    btn.classList.toggle('abierto', !abierta);
    btn.innerHTML = abierta
      ? '<i class="fa-solid fa-images"></i> Ver fotos'
      : '<i class="fa-solid fa-xmark"></i> Cerrar fotos';
  });
});

// --- Lightbox ---
const overlay = document.createElement('div');
overlay.style.cssText = `
  display:none; position:fixed; inset:0; z-index:9999;
  background:rgba(0,0,0,0.88); align-items:center; justify-content:center; cursor:zoom-out;
`;
const imgGrande = document.createElement('img');
imgGrande.style.cssText = `max-width:92vw; max-height:90vh; border-radius:10px; box-shadow:0 10px 50px rgba(0,0,0,0.6);`;
overlay.appendChild(imgGrande);
document.body.appendChild(overlay);

document.addEventListener('click', e => {
  if (e.target.closest('.galeria__preview, .galeria__extra') && e.target.tagName === 'IMG') {
    imgGrande.src = e.target.src;
    overlay.style.display = 'flex';
  }
});
overlay.addEventListener('click', () => { overlay.style.display = 'none'; });
document.addEventListener('keydown', e => { if (e.key === 'Escape') overlay.style.display = 'none'; });

document.querySelectorAll('.carrusel').forEach(carrusel => {
  const slides = carrusel.querySelector('.carrusel__slides');
  const btnPrev = carrusel.querySelector('.carrusel__btn--prev');
  const btnNext = carrusel.querySelector('.carrusel__btn--next');
  const total = slides.children.length;
  let actual = 0;

  function irA(index) {
    actual = (index + total) % total;
    slides.style.transform = `translateX(-${actual * 100}%)`;
  }

  btnNext.addEventListener('click', () => irA(actual + 1));
  btnPrev.addEventListener('click', () => irA(actual - 1));

  irA(0);
});