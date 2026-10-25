// ==================== NAVBAR SCROLL ====================
(function () {
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
})();

// ==================== MOBILE MENU ====================
(function () {
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function () {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();

// ==================== GALLERY LIGHTBOX ====================
(function () {
  var galleryImages = [
    { url: 'https://images.pexels.com/photos/6739958/pexels-photo-6739958.jpeg?auto=compress&cs=tinysrgb&w=1200', label: 'القاعة الرئيسية' },
    { url: 'https://images.pexels.com/photos/6050745/pexels-photo-6050745.png?auto=compress&cs=tinysrgb&w=1200', label: 'أجهزة الحديد' },
    { url: 'https://images.pexels.com/photos/3888405/pexels-photo-3888405.jpeg?auto=compress&cs=tinysrgb&w=1200', label: 'تدريب الرجال' },
    { url: 'https://images.pexels.com/photos/14524650/pexels-photo-14524650.jpeg?auto=compress&cs=tinysrgb&w=1200', label: 'تدريب السيدات' },
    { url: 'https://images.pexels.com/photos/5750886/pexels-photo-5750886.jpeg?auto=compress&cs=tinysrgb&w=1200', label: 'منطقة الملاكمة' },
    { url: 'https://images.pexels.com/photos/4753885/pexels-photo-4753885.jpeg?auto=compress&cs=tinysrgb&w=1200', label: 'أجهزة حديد' },
    { url: 'https://images.pexels.com/photos/5327539/pexels-photo-5327539.jpeg?auto=compress&cs=tinysrgb&w=1200', label: 'تمارين القوة' },
    { url: 'https://images.pexels.com/photos/3931370/pexels-photo-3931370.jpeg?auto=compress&cs=tinysrgb&w=1200', label: 'تمارين السيدات' },
    { url: 'https://images.pexels.com/photos/38882512/pexels-photo-38882512.jpeg?auto=compress&cs=tinysrgb&w=1200', label: 'دراجات هوائية' },
    { url: 'https://images.pexels.com/photos/5750760/pexels-photo-5750760.jpeg?auto=compress&cs=tinysrgb&w=1200', label: 'ملاكمة للسيدات' },
    { url: 'https://images.pexels.com/photos/7427565/pexels-photo-7427565.jpeg?auto=compress&cs=tinysrgb&w=1200', label: 'برامج الأطفال' },
    { url: 'https://images.pexels.com/photos/9545909/pexels-photo-9545909.jpeg?auto=compress&cs=tinysrgb&w=1200', label: 'قاعة الأجهزة' }
  ];

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxLabel = document.getElementById('lightboxLabel');
  var currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].url;
    lightboxImg.alt = galleryImages[currentIndex].label;
    lightboxLabel.textContent = galleryImages[currentIndex].label;
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function nextImage() { showImage(currentIndex + 1); }
  function prevImage() { showImage(currentIndex - 1); }

  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var index = parseInt(item.getAttribute('data-index'), 10);
      openLightbox(index);
    });
  });

  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxNext').addEventListener('click', function (e) { e.stopPropagation(); nextImage(); });
  document.getElementById('lightboxPrev').addEventListener('click', function (e) { e.stopPropagation(); prevImage(); });
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') nextImage();
    if (e.key === 'ArrowRight') prevImage();
  });
})();

// ==================== JOIN FORM ====================
(function () {
  var FORMSPREE_URL = 'https://formspree.io/f/xqpaqwqy';
  var form = document.getElementById('joinForm');
  var successDiv = document.getElementById('formSuccess');
  var errorDiv = document.getElementById('formError');
  var submitBtn = document.getElementById('submitBtn');
  var resetBtn = document.getElementById('resetForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> جاري الإرسال...';
    errorDiv.style.display = 'none';

    var formData = new FormData(form);

    fetch(FORMSPREE_URL, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          form.style.display = 'none';
          successDiv.style.display = 'block';
          form.reset();
        } else {
          response.json().catch(function () { return null; }).then(function (data) {
            errorDiv.textContent = 'حدث خطأ أثناء الإرسال. حاول مرة أخرى';
            errorDiv.style.display = 'block';
          });
        }
      })
      .catch(function () {
        errorDiv.textContent = 'تحقق من اتصالك بالإنترنت وحاول مرة أخرى';
        errorDiv.style.display = 'block';
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-text">انضم للساحة</span>';
      });
  });

  resetBtn.addEventListener('click', function () {
    successDiv.style.display = 'none';
    form.style.display = 'flex';
  });
})();
