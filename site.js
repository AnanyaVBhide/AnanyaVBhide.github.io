// ---------- Glass circles: specular highlight follows the pointer ----------
document.querySelectorAll('.orb').forEach((orb) => {
    orb.addEventListener('pointermove', (e) => {
        const r = orb.getBoundingClientRect();
        orb.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
        orb.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
    });
    orb.addEventListener('pointerleave', () => {
        orb.style.removeProperty('--mx');
        orb.style.removeProperty('--my');
    });
});

// ---------- Lightbox (PDFs, images, video) ----------
let lightbox, lbContainer;

function buildLightbox() {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.innerHTML =
        '<button class="close-btn" aria-label="Close">&times;</button>' +
        '<div id="lightbox-container"></div>';
    lbContainer = lightbox.querySelector('#lightbox-container');
    lightbox.addEventListener('click', closeLightbox);
    lbContainer.addEventListener('click', (e) => e.stopPropagation());
    document.body.appendChild(lightbox);
}

function openLightbox(src, type) {
    if (!lightbox) buildLightbox();
    lbContainer.innerHTML = '';
    let el;
    if (type === 'img') {
        el = document.createElement('img');
        el.src = src;
        el.alt = '';
    } else if (type === 'video') {
        el = document.createElement('video');
        el.src = src;
        el.controls = true;
        el.autoplay = true;
    } else {
        el = document.createElement('iframe');
        el.src = src;
        el.className = 'pdf-viewer';
        el.title = 'Project document';
    }
    lbContainer.appendChild(el);
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.close-btn').focus();
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.style.display = 'none';
    lbContainer.innerHTML = '';
    document.body.style.overflow = 'auto';
}

document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-lightbox]');
    if (t) openLightbox(t.dataset.lightbox, t.dataset.type);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});
