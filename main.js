/**
 * MIDJUMAN - Interactive JavaScript
 * Gestion de la navigation, du mockup interactif et de l'authentification
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initCvMockupSwitcher();
  initAuthPages();
});

/* ==========================================================================
   1. NAVBAR SCROLL EFFECT
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   2. MENU MOBILE
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-menu-drawer');
  if (!toggleBtn || !mobileDrawer) return;

  toggleBtn.addEventListener('click', () => {
    mobileDrawer.classList.toggle('open');
    const isExpanded = mobileDrawer.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isExpanded);
    toggleBtn.innerHTML = isExpanded 
      ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  });

  // Fermer le menu lors d'un clic sur un lien
  mobileDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      toggleBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });
  });
}

/* ==========================================================================
   3. HERO CV MOCKUP SWITCHER (INTERACTIF)
   ========================================================================== */
const cvProfiles = {
  dev: {
    initials: 'AM',
    name: 'Alexandre Martin',
    role: 'Développeur Fullstack Senior',
    email: 'alex.martin@email.com',
    location: 'Paris, France',
    expTitle: 'Lead Dev Fullstack — TechCorp',
    expDate: '2022 - Présent',
    expDesc: 'Architecture microservices, refonte API et optimisation des performances de 40%.',
    skills: ['TypeScript', 'React.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS']
  },
  marketing: {
    initials: 'SD',
    name: 'Sophie Dumont',
    role: 'Responsable Marketing Digital & Growth',
    email: 'sophie.dumont@email.com',
    location: 'Lyon, France',
    expTitle: 'Growth Marketing Manager — ScaleUp',
    expDate: '2021 - 2024',
    expDesc: 'Pilotage de campagnes omnicanales, acquisition de +150k leads et gestion de budget ROIste.',
    skills: ['SEO / SEA', 'Google Analytics 4', 'HubSpot', 'Copywriting', 'Growth Strategy']
  },
  manager: {
    initials: 'TB',
    name: 'Thomas Benali',
    role: 'Chef de Projet IT & Agile Coach',
    email: 't.benali@email.com',
    location: 'Bordeaux, France',
    expTitle: 'Senior Project Manager — FinServices',
    expDate: '2020 - Présent',
    expDesc: 'Coordination de squads pluridisciplinaires (15 pers.) et livraison continue en méthode Scrum.',
    skills: ['Scrum / Kanban', 'Jira Software', 'Gestion des risques', 'Budget P&L', 'Leadership']
  }
};

function initCvMockupSwitcher() {
  const tabs = document.querySelectorAll('.mockup-tab-btn');
  if (!tabs.length) return;

  const initialsElem = document.getElementById('cv-preview-initials');
  const nameElem = document.getElementById('cv-preview-name');
  const roleElem = document.getElementById('cv-preview-role');
  const emailElem = document.getElementById('cv-preview-email');
  const expTitleElem = document.getElementById('cv-preview-exp-title');
  const expDateElem = document.getElementById('cv-preview-exp-date');
  const expDescElem = document.getElementById('cv-preview-exp-desc');
  const skillsElem = document.getElementById('cv-preview-skills');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const profileKey = tab.getAttribute('data-profile');
      const data = cvProfiles[profileKey];
      if (!data) return;

      // Animation subtile de transition
      const previewCard = document.querySelector('.cv-sheet-preview');
      if (previewCard) {
        previewCard.style.opacity = '0.5';
        setTimeout(() => {
          if (initialsElem) initialsElem.textContent = data.initials;
          if (nameElem) nameElem.textContent = data.name;
          if (roleElem) roleElem.textContent = data.role;
          if (emailElem) emailElem.textContent = `${data.email} • ${data.location}`;
          if (expTitleElem) expTitleElem.textContent = data.expTitle;
          if (expDateElem) expDateElem.textContent = data.expDate;
          if (expDescElem) expDescElem.textContent = data.expDesc;

          if (skillsElem) {
            skillsElem.innerHTML = data.skills
              .map(skill => `<span class="cv-skill-pill">${skill}</span>`)
              .join('');
          }
          previewCard.style.opacity = '1';
        }, 150);
      }
    });
  });
}

/* ==========================================================================
   4. GESTION DES PAGES D'AUTHENTIFICATION (LOGIN / REGISTER)
   ========================================================================== */
function initAuthPages() {
  // Toggle affichage du mot de passe
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.input-with-icon').querySelector('.form-input');
      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
      } else {
        input.type = 'password';
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
      }
    });
  });

  // Calculateur de force de mot de passe (Register page)
  const regPasswordInput = document.getElementById('register-password');
  const strengthFill = document.querySelector('.strength-fill');
  const strengthText = document.querySelector('.strength-text');

  if (regPasswordInput && strengthFill && strengthText) {
    regPasswordInput.addEventListener('input', () => {
      const val = regPasswordInput.value;
      if (!val) {
        strengthFill.className = 'strength-fill';
        strengthText.textContent = 'Indiquez au moins 8 caractères';
        return;
      }

      let strength = 0;
      if (val.length >= 8) strength++;
      if (/[A-Z]/.test(val) && /[a-z]/.test(val)) strength++;
      if (/[0-9]/.test(val) || /[^A-Za-z0-9]/.test(val)) strength++;

      strengthFill.className = 'strength-fill';
      if (strength === 1) {
        strengthFill.classList.add('strength-weak');
        strengthText.textContent = 'Faible (ajoutez des majuscules ou chiffres)';
        strengthText.style.color = '#F43F5E';
      } else if (strength === 2) {
        strengthFill.classList.add('strength-medium');
        strengthText.textContent = 'Moyen (ajoutez des caractères spéciaux)';
        strengthText.style.color = '#F59E0B';
      } else if (strength >= 3) {
        strengthFill.classList.add('strength-strong');
        strengthText.textContent = 'Fort et sécurisé ✨';
        strengthText.style.color = '#10B981';
      }
    });
  }

  // Soumission Formulaire Connexion (Simulé)
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const submitBtn = loginForm.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Connexion en cours...</span>`;

      setTimeout(() => {
        showToast('Connexion réussie ! Bienvenue sur Midjuman.', 'success');
        submitBtn.innerHTML = `<span>Connecté ✓</span>`;
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1200);
      }, 1000);
    });
  }

  // Soumission Formulaire Inscription (Simulé)
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-password-confirm');
      const submitBtn = registerForm.querySelector('button[type="submit"]');

      if (confirmPassword && password !== confirmPassword.value) {
        showToast('Les mots de passe ne correspondent pas.', 'error');
        confirmPassword.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Création de votre espace IA...</span>`;

      setTimeout(() => {
        showToast('Compte créé avec succès ! Prêt à générer votre CV.', 'success');
        submitBtn.innerHTML = `<span>Compte validé ✓</span>`;
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1200);
      }, 1000);
    });
  }
}

/* ==========================================================================
   5. TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message, type = 'info') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.className = `toast show ${type}`;
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'success' 
        ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>' 
        : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'}
    </svg>
    <span>${message}</span>
  `;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
