document.addEventListener('DOMContentLoaded', function () {
  /* ── Toast ─────────────────────────────────────── */
  let toastTimer
  function showToast(msg, tipo) {
    const toast = document.getElementById('toastNotif')
    const body = document.getElementById('toastBody')
    if (!toast) return
    body.textContent = msg
    toast.style.borderColor =
      tipo === 'success' ? 'rgba(163,217,165,0.4)' : 'rgba(242,139,130,0.4)'
    toast.classList.add('show')
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3500)
  }
  document
    .getElementById('toastClose')
    ?.addEventListener('click', () =>
      document.getElementById('toastNotif').classList.remove('show'),
    )

  /* ── Field validation ───────────────────────────── */
  function setFieldError(field, msg) {
    field.classList.add('input-error')
    if (!field.parentElement.querySelector('.field-error')) {
      const err = document.createElement('small')
      err.className = 'field-error'
      err.textContent = msg
      field.parentElement.appendChild(err)
    }
  }
  function clearFieldError(field) {
    field.classList.remove('input-error')
    field.parentElement.querySelector('.field-error')?.remove()
  }
  function isValidEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
  }

  /* ── Scroll progress ────────────────────────────── */
  const progressBar = document.getElementById('scrollProgress')
  window.addEventListener(
    'scroll',
    () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      progressBar.style.width = (window.scrollY / total) * 100 + '%'
    },
    { passive: true },
  )

  /* ── Back to Top ────────────────────────────────── */
  const backToTop = document.getElementById('backToTop')
  window.addEventListener(
    'scroll',
    () => backToTop.classList.toggle('visible', window.scrollY > 400),
    { passive: true },
  )
  backToTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' }),
  )

  /* ── Navbar scrolled ────────────────────────────── */
  const navbar = document.getElementById('mainNav')
  function onNavScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50)
  }
  window.addEventListener('scroll', onNavScroll, { passive: true })
  onNavScroll()

  /* ── Mobile menu ─────────────────────────────────── */
  const menuToggle = document.getElementById('menuToggle')
  const mobileMenu = document.getElementById('mobileMenu')
  menuToggle?.addEventListener('click', () =>
    mobileMenu.classList.toggle('open'),
  )
  mobileMenu
    ?.querySelectorAll('a')
    .forEach((a) =>
      a.addEventListener('click', () => mobileMenu.classList.remove('open')),
    )

  /* ── Active nav link by current page ───────────── */
  const pageFile = window.location.pathname.split('/').pop() || 'index.html'
  const pageHref =
    pageFile === 'index.html' || pageFile === '' ? '#inicio' : pageFile
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle('active-link', link.getAttribute('href') === pageHref)
  })
  document.querySelectorAll('#mobileMenu a').forEach((link) => {
    link.classList.toggle('mobile-active', link.getAttribute('href') === pageHref)
  })

  /* ── Reveal on scroll ───────────────────────────── */
  const revealObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('block')
          obs.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 },
  )
  document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el))

  /* ── Stats counter ──────────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10)
    const step = target / (1600 / 16)
    let cur = 0
    const t = setInterval(() => {
      cur += step
      if (cur >= target) {
        el.textContent = target
        clearInterval(t)
      } else el.textContent = Math.floor(cur)
    }, 16)
  }
  const statsObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target)
          obs.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )
  document
    .querySelectorAll('.stat-number')
    .forEach((el) => statsObs.observe(el))

  /* ── Swiper gallery ─────────────────────────────── */
  if (typeof Swiper !== 'undefined' && document.querySelector('.gallery-swiper')) {
    new Swiper('.gallery-swiper', {
      slidesPerView: 1.2,
      spaceBetween: 16,
      grabCursor: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        576: { slidesPerView: 1.8, spaceBetween: 16 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        992: { slidesPerView: 3, spaceBetween: 24 },
      },
    })
  }

  /* ── Testimonials ───────────────────────────────── */
  const slides = document.querySelectorAll('.testimonial-slide')
  const dots = document.querySelectorAll('.testimonial-dot')
  let cur = 0,
    rotTimer = null
  function showSlide(idx) {
    slides.forEach((s) => s.classList.remove('active'))
    dots.forEach((d) => d.classList.remove('active'))
    slides[idx].classList.add('active')
    dots[idx].classList.add('active')
    cur = idx
  }
  function startRotation() {
    clearInterval(rotTimer)
    rotTimer = setInterval(() => showSlide((cur + 1) % slides.length), 5000)
  }
  dots.forEach((dot) =>
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.dataset.slide, 10))
      startRotation()
    }),
  )
  if (slides.length) startRotation()

  /* ── Auth Modal ─────────────────────────────────── */
  const authModal = document.getElementById('authModal')
  function openModal() {
    authModal.classList.add('open')
  }
  function closeModal() {
    authModal.classList.remove('open')
  }

  document.querySelectorAll('[data-open-modal]').forEach((btn) =>
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      openModal()
    }),
  )
  document.getElementById('closeModal')?.addEventListener('click', closeModal)
  authModal?.addEventListener('click', (e) => {
    if (e.target === authModal) closeModal()
  })

  /* ── Auth tabs ──────────────────────────────────── */
  document.querySelectorAll('.auth-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document
        .querySelectorAll('.auth-tab')
        .forEach((t) => t.classList.remove('active'))
      document
        .querySelectorAll('.tab-pane')
        .forEach((p) => p.classList.remove('active'))
      tab.classList.add('active')
      document.querySelector(tab.dataset.target)?.classList.add('active')
    })
  })

  /* ── Password strength ──────────────────────────── */
  const regPwd = document.getElementById('regPassword')
  const sBar = document.getElementById('strengthBar')
  const sTxt = document.getElementById('strengthText')
  if (regPwd) {
    regPwd.addEventListener('input', () => {
      const v = regPwd.value
      let score = 0
      if (v.length >= 6) score++
      if (v.length >= 10) score++
      if (/[A-Z]/.test(v)) score++
      if (/[0-9]/.test(v)) score++
      if (/[^A-Za-z0-9]/.test(v)) score++
      const lvls = [
        { pct: '0%', color: '', label: '' },
        { pct: '25%', color: '#f28b82', label: 'Fraca' },
        { pct: '50%', color: '#ffd666', label: 'Razoável' },
        { pct: '75%', color: '#a3d9a5', label: 'Boa' },
        { pct: '100%', color: '#c9923a', label: 'Forte' },
        { pct: '100%', color: '#c9923a', label: 'Muito forte' },
      ]
      const l = lvls[Math.min(score, lvls.length - 1)]
      sBar.style.width = v.length ? l.pct : '0%'
      sBar.style.backgroundColor = l.color
      sTxt.textContent = v.length ? l.label : ''
      sTxt.style.color = l.color
    })
  }

  /* ── Date of birth: max = 18 years ago ─────────── */
  const regDobField = document.getElementById('regDob')
  if (regDobField) {
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() - 18)
    regDobField.max = maxDate.toISOString().split('T')[0]
  }

  /* ── Auth message ───────────────────────────────── */
  const authMsg = document.getElementById('authMessage')
  function showAuthMsg(msg, tipo) {
    const colors = {
      success: 'text-[#a3d9a5] border-[#a3d9a5] bg-[rgba(163,217,165,0.1)]',
      warning: 'text-[#c9923a] border-[#c9923a] bg-[rgba(220,165,75,0.1)]',
      danger: 'text-[#f28b82] border-[#f28b82] bg-[rgba(242,139,130,0.1)]',
    }
    authMsg.textContent = msg
    authMsg.className =
      'text-sm text-center rounded-xl mb-4 p-3 block border font-sans ' +
      (colors[tipo] || colors.danger)
    setTimeout(() => {
      authMsg.className = 'hidden'
    }, 4000)
  }

  /* ── Login form ─────────────────────────────────── */
  document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.getElementById('loginEmail').value.trim()
    const senha = document.getElementById('loginPassword').value.trim()
    if (!email || !senha) {
      showAuthMsg('Por favor, preencha todos os campos.', 'danger')
      return
    }
    showAuthMsg('Bem-vindo de volta! Você foi logado com sucesso.', 'success')
    e.target.reset()
    setTimeout(closeModal, 2000)
  })

  /* ── Register form ──────────────────────────────── */
  document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputs = [...e.target.querySelectorAll('input, select')]
    if (inputs.some((f) => !f.value.trim())) {
      showAuthMsg('Preencha todos os campos para se registrar.', 'danger')
      return
    }
    const senha = document.getElementById('regPassword').value.trim()
    const conf = document.getElementById('regConfirmPassword').value.trim()
    if (senha.length < 6) {
      showAuthMsg('A senha deve ter pelo menos 6 caracteres.', 'warning')
      return
    }
    if (senha !== conf) {
      showAuthMsg('As senhas não coincidem. Tente novamente.', 'danger')
      return
    }
    showAuthMsg(
      'Conta criada com sucesso! Você já pode fazer login.',
      'success',
    )
    e.target.reset()
    if (sBar) sBar.style.width = '0%'
    if (sTxt) sTxt.textContent = ''
    setTimeout(() => {
      document.querySelector('.auth-tab[data-target="#loginPane"]')?.click()
      authMsg.className = 'hidden'
    }, 2000)
  })

  /* ── SAC form ───────────────────────────────────── */
  const sacForm = document.getElementById('sacForm')
  if (sacForm) {
    const fields = sacForm.querySelectorAll('input, select, textarea')
    fields.forEach((f) => {
      f.addEventListener('input', () => {
        if (f.value.trim()) clearFieldError(f)
      })
      f.addEventListener('change', () => {
        if (f.value.trim()) clearFieldError(f)
      })
    })
    sacForm.addEventListener('submit', (e) => {
      e.preventDefault()
      let valid = true
      fields.forEach((f) => {
        clearFieldError(f)
        if ('optional' in f.dataset) return
        if (!f.value.trim()) {
          setFieldError(f, 'Campo obrigatório.')
          valid = false
        } else if (f.type === 'email' && !isValidEmail(f.value.trim())) {
          setFieldError(f, 'Informe um e-mail válido.')
          valid = false
        }
      })
      if (!valid) return
      showToast('Mensagem enviada! Entraremos em contato em breve.', 'success')
      sacForm.reset()
    })
  }
})
