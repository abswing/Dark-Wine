document.addEventListener("DOMContentLoaded", function () {


    function showToast(msg, tipo) {
        const toastEl   = document.getElementById("toastNotif");
        const toastBody = document.getElementById("toastBody");
        if (!toastEl) return;
        toastBody.textContent = msg;
        toastEl.style.borderColor = tipo === "success"
            ? "rgba(163,217,165,0.4)"
            : "rgba(242,139,130,0.4)";
        bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3500 }).show();
    }

    function setFieldError(field, msg) {
        field.classList.add("input-error");
        const existing = field.parentElement.querySelector(".field-error");
        if (!existing) {
            const err = document.createElement("small");
            err.className = "field-error";
            err.textContent = msg;
            field.parentElement.appendChild(err);
        }
    }

    function clearFieldError(field) {
        field.classList.remove("input-error");
        const err = field.parentElement.querySelector(".field-error");
        if (err) err.remove();
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }



    const progressBar = document.getElementById("scrollProgress");
    function updateProgress() {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = (window.scrollY / total * 100) + "%";
    }
    window.addEventListener("scroll", updateProgress, { passive: true });


    const backToTop = document.getElementById("backToTop");
    window.addEventListener("scroll", function () {
        backToTop.classList.toggle("visible", window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    const navbar = document.getElementById("mainNav");
    function onNavScroll() {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
    window.addEventListener("scroll", onNavScroll, { passive: true });
    onNavScroll();


    document.querySelectorAll("#navbarNav .nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
            const navCollapse = document.getElementById("navbarNav");
            const bsCollapse  = bootstrap.Collapse.getInstance(navCollapse);
            if (bsCollapse) bsCollapse.hide();
        });
    });


    const sections = document.querySelectorAll("section[id]");
    const navLinks  = document.querySelectorAll("#mainNav .nav-link[href^='#']");
    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                navLinks.forEach(function (link) {
                    link.classList.toggle(
                        "active-link",
                        link.getAttribute("href").replace("#", "") === entry.target.id
                    );
                });
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(function (s) { sectionObserver.observe(s); });




    const heroOverlay = document.querySelector(".hero-overlay");
    if (heroOverlay) {
        window.addEventListener("scroll", function () {
            if (window.scrollY < window.innerHeight) {
                heroOverlay.style.transform =
                    "scale(1.05) translateY(" + (window.scrollY * 0.15) + "px)";
            }
        }, { passive: true });
    }


    const revealObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("block");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach(function (el) {
        revealObserver.observe(el);
    });




    function animateCounter(el) {
        const target    = parseInt(el.dataset.target, 10);
        const increment = target / (1600 / 16);
        let current = 0;
        const timer = setInterval(function () {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 16);
    }

    const statsObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll(".stat-number").forEach(function (el) {
        statsObserver.observe(el);
    });




    new Swiper(".gallery-swiper", {
        slidesPerView: 1.2,
        spaceBetween: 16,
        grabCursor: true,
        pagination:  { el: ".swiper-pagination", clickable: true },
        navigation:  { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        breakpoints: {
            576: { slidesPerView: 1.8, spaceBetween: 16 },
            768: { slidesPerView: 2,   spaceBetween: 20 },
            992: { slidesPerView: 3,   spaceBetween: 24 },
        },
    });




    const slides = document.querySelectorAll(".testimonial-slide");
    const dots   = document.querySelectorAll(".testimonial-dot");
    let current  = 0;
    let timer    = null;

    function showSlide(idx) {
        slides.forEach(function (s) { s.classList.remove("active"); });
        dots.forEach(function (d)   { d.classList.remove("active"); });
        slides[idx].classList.add("active");
        dots[idx].classList.add("active");
        current = idx;
    }

    function startRotation() {
        clearInterval(timer);
        timer = setInterval(function () {
            showSlide((current + 1) % slides.length);
        }, 5000);
    }

    dots.forEach(function (dot) {
        dot.addEventListener("click", function () {
            showSlide(parseInt(dot.dataset.slide, 10));
            startRotation();
        });
    });

    if (slides.length > 0) { startRotation(); }



    const regPassword  = document.getElementById("regPassword");
    const strengthBar  = document.getElementById("strengthBar");
    const strengthText = document.getElementById("strengthText");

    if (regPassword) {
        regPassword.addEventListener("input", function () {
            const val    = regPassword.value;
            let score = 0;
            if (val.length >= 6)           score++;
            if (val.length >= 10)          score++;
            if (/[A-Z]/.test(val))         score++;
            if (/[0-9]/.test(val))         score++;
            if (/[^A-Za-z0-9]/.test(val))  score++;

            const levels = [
                { pct: "0%",   color: "",              label: ""            },
                { pct: "25%",  color: "#f28b82",        label: "Fraca"       },
                { pct: "50%",  color: "#ffd666",        label: "Razoável"    },
                { pct: "75%",  color: "#a3d9a5",        label: "Boa"         },
                { pct: "100%", color: "var(--gold)",    label: "Forte"       },
                { pct: "100%", color: "var(--gold)",    label: "Muito forte" },
            ];

            const lvl = levels[Math.min(score, levels.length - 1)];
            strengthBar.style.width           = val.length === 0 ? "0%" : lvl.pct;
            strengthBar.style.backgroundColor = lvl.color;
            strengthText.textContent          = val.length === 0 ? "" : lvl.label;
            strengthText.style.color          = lvl.color;
        });
    }


    const loginForm    = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const authMessage  = document.getElementById("authMessage");

    function showAuthMessage(msg, tipo) {
        authMessage.textContent = msg;
        authMessage.className   = "alert font-sans text-sm text-center d-block rounded-3 mb-4 alert-" + tipo;
        setTimeout(function () {
            authMessage.classList.replace("d-block", "d-none");
        }, 4000);
    }

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value.trim();
        const senha = document.getElementById("loginPassword").value.trim();
        if (!email || !senha) {
            showAuthMessage("Por favor, preencha todos os campos.", "danger");
            return;
        }
        showAuthMessage("Bem-vindo de volta! Você foi logado com sucesso.", "success");
        loginForm.reset();
        setTimeout(function () {
            bootstrap.Modal.getInstance(document.getElementById("authModal")).hide();
        }, 2000);
    });

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const nome         = document.getElementById("regName").value.trim();
        const email        = document.getElementById("regEmail").value.trim();
        const senha        = document.getElementById("regPassword").value.trim();
        const confirmSenha = document.getElementById("regConfirmPassword").value.trim();

        if (!nome || !email || !senha || !confirmSenha) {
            showAuthMessage("Preencha todos os campos para se registrar.", "danger");
            return;
        }
        if (senha.length < 6) {
            showAuthMessage("A senha deve ter pelo menos 6 caracteres.", "warning");
            return;
        }
        if (senha !== confirmSenha) {
            showAuthMessage("As senhas não coincidem. Tente novamente.", "danger");
            return;
        }
        showAuthMessage("Conta criada com sucesso! Você já pode fazer login.", "success");
        registerForm.reset();
        if (strengthBar)  strengthBar.style.width = "0%";
        if (strengthText) strengthText.textContent = "";
        setTimeout(function () {
            document.querySelector('[data-bs-target="#loginPane"]').click();
            authMessage.classList.replace("d-block", "d-none");
        }, 2000);
    });



    const sacForm = document.getElementById("sacForm");

    if (sacForm) {
        const sacFields = sacForm.querySelectorAll("input, select, textarea");

        sacFields.forEach(function (field) {
            field.addEventListener("input",  function () { if (field.value.trim()) clearFieldError(field); });
            field.addEventListener("change", function () { if (field.value.trim()) clearFieldError(field); });
        });

        sacForm.addEventListener("submit", function (e) {
            e.preventDefault();
            let valid = true;

            sacFields.forEach(function (field) {
                clearFieldError(field);
                const empty = !field.value.trim();
                const isEmailField = field.type === "email";
                const invalidEmail = isEmailField && field.value.trim() && !isValidEmail(field.value.trim());

                if (empty) {
                    setFieldError(field, "Campo obrigatório.");
                    valid = false;
                } else if (invalidEmail) {
                    setFieldError(field, "Informe um e-mail válido.");
                    valid = false;
                }
            });

            if (!valid) return;

            showToast("Mensagem enviada! Entraremos em contato em breve.", "success");
            sacForm.reset();
        });
    }




});
