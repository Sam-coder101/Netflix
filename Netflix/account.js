/* Account Management and Profile Selection */
(function() {
  const PROFILES_KEY = 'netflix_profiles';
  const ACTIVE_PROFILE_KEY = 'netflix_active_profile';
  const SIGNED_IN_KEY = 'netflix_signed_in';

  // Helper functions
  function load(key) {
    try { return JSON.parse(localStorage.getItem(key)) || null; } 
    catch(e) { return null; }
  }

  function save(key, data) {
    try { localStorage.setItem(key, JSON.stringify(data)); } 
    catch(e) { console.warn('Failed to save data:', e); }
  }

  // Load HTML template and inject it
  async function injectAccountModal() {
    // If the modal is already present in the DOM (inlined), skip fetching
    try {
      if (document.getElementById('accountModal')) {
        // Ensure CSS is present
        if (!document.querySelector('link[href="account-styles.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'account-styles.css';
          document.head.appendChild(link);
        }
        return;
      }

      // Fallback: try to fetch the template (useful when modal wasn't inlined)
      const response = await fetch('account-modal.html');
      if (!response.ok) throw new Error('Network response not ok');
      const html = await response.text();
      document.body.insertAdjacentHTML('beforeend', html);

      // Also inject CSS if missing
      if (!document.querySelector('link[href="account-styles.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'account-styles.css';
        document.head.appendChild(link);
      }
    } catch(e) {
      // Non-fatal: log and continue; modal may already be in DOM or fetch failed (file://)
      console.warn('Failed to load account modal via fetch (this is ok if modal is inlined):', e);
    }
  }

  // Initialize profiles if none exist
  function initializeProfiles() {
    const existingProfiles = load(PROFILES_KEY);
    if (!existingProfiles) {
      const defaultProfiles = [
        {
          id: 'profile1',
          name: 'User 1',
          avatar: 'https://i.pravatar.cc/150?img=1',
          theme: 'dark',
          language: 'en'
        },
        {
          id: 'profile2',
          name: 'User 2',
          avatar: 'https://i.pravatar.cc/150?img=2',
          theme: 'light',
          language: 'es'
        }
      ];
      save(PROFILES_KEY, defaultProfiles);
    }
  }

  // Show specific view in modal
  function showView(viewId) {
    const views = ['signInView', 'profileView', 'addProfileView'];
    views.forEach(v => {
      const el = document.getElementById(v);
      if (el) el.style.display = v === viewId ? 'block' : 'none';
    });
  }

  // Show/hide account modal
  function toggleAccountModal(show) {
    const modal = document.getElementById('accountModal');
    if (!modal) return;

    if (show) {
      modal.classList.add('active');
      if (isSignedIn()) {
        showView('profileView');
      } else {
        showView('signInView');
      }
    } else {
      modal.classList.remove('active');
    }
  }

  // Check if user is signed in
  function isSignedIn() {
    return load(SIGNED_IN_KEY) === true;
  }

  // Handle sign in form submission
  function handleSignIn(e) {
    e.preventDefault();
    save(SIGNED_IN_KEY, true);
    showView('profileView');
  }

  // Handle profile selection
  function selectProfile(profile) {
    save(ACTIVE_PROFILE_KEY, profile);
    applyProfileSettings(profile);
    toggleAccountModal(false);
  }

  // Apply profile settings (theme and language)
  function applyProfileSettings(profile) {
    // Apply theme
    if (profile.theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }

    // Apply language
    const langSelect = document.getElementById('lang');
    if (langSelect && profile.language) {
      langSelect.value = profile.language;
      const event = new Event('change');
      langSelect.dispatchEvent(event);
    }
  }

  // Handle adding new profile
  function handleAddProfile(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[type="text"]').value;
    const theme = form.querySelector('select[name="theme"]').value;
    const language = form.querySelector('select[name="language"]').value;

    const profiles = load(PROFILES_KEY) || [];
    const newProfile = {
      id: 'profile' + (profiles.length + 1),
      name,
      avatar: `https://i.pravatar.cc/150?img=${profiles.length + 3}`,
      theme,
      language
    };

    profiles.push(newProfile);
    save(PROFILES_KEY, profiles);
    renderProfiles();
    showView('profileView');
  }

  // Render profile grid
  function renderProfiles() {
    const profiles = load(PROFILES_KEY) || [];
    const grid = document.querySelector('.profiles-grid');
    if (!grid) return;

    const profilesHtml = profiles.map(profile => `
      <div class="profile-item" data-id="${profile.id}" data-theme="${profile.theme}" data-lang="${profile.language}">
        <img src="${profile.avatar}" alt="${profile.name}">
        <span>${profile.name}</span>
      </div>
    `).join('');

    grid.innerHTML = `
      ${profilesHtml}
      <div class="profile-item add-profile">
        <div class="add-icon">+</div>
        <span>Add Profile</span>
      </div>
    `;
  }

  // Expose a small API for inline onclick handlers (legacy HTML may use showView)
  try { window.showView = showView; } catch (e) { /* ignore in stricter envs */ }

  // Initialize everything once DOM is loaded
  document.addEventListener('DOMContentLoaded', async () => {
    await injectAccountModal();
    initializeProfiles();

    // Ensure a Sign In button exists in the header and is wired to open the modal
    const headerRight = document.querySelector('.header-right');
    if (headerRight) {
      const existingBtn = headerRight.querySelector('.sign-in-btn');
      if (existingBtn) {
        // Update label to reflect sign-in state and attach handler
        existingBtn.textContent = isSignedIn() ? 'Switch Profile' : 'Sign In';
        existingBtn.addEventListener('click', () => toggleAccountModal(true));
      } else if (!document.querySelector('.sign-in-btn')) {
        const signInBtn = document.createElement('button');
        signInBtn.className = 'btn outline sign-in-btn';
        signInBtn.textContent = isSignedIn() ? 'Switch Profile' : 'Sign In';
        signInBtn.addEventListener('click', () => toggleAccountModal(true));
        headerRight.appendChild(signInBtn);
      }
    }

    // Wire up event listeners
    const modal = document.getElementById('accountModal');
    if (modal) {
      modal.addEventListener('click', e => {
        if (e.target === modal) toggleAccountModal(false);
      });

      const signInForm = document.getElementById('signInForm');
      if (signInForm) {
        signInForm.addEventListener('submit', handleSignIn);
      }

      const addProfileForm = document.getElementById('addProfileForm');
      if (addProfileForm) {
        addProfileForm.addEventListener('submit', handleAddProfile);
      }

      // Delegate profile selection clicks
      const profilesGrid = modal.querySelector('.profiles-grid');
      if (profilesGrid) {
        profilesGrid.addEventListener('click', e => {
          const profileItem = e.target.closest('.profile-item');
          if (!profileItem) return;

          if (profileItem.classList.contains('add-profile')) {
            showView('addProfileView');
          } else {
            const profileId = profileItem.dataset.id;
            const profiles = load(PROFILES_KEY) || [];
            const profile = profiles.find(p => p.id === profileId);
            if (profile) selectProfile(profile);
          }
        });
      }
    }

    // Check for active profile and apply settings
    const activeProfile = load(ACTIVE_PROFILE_KEY);
    if (activeProfile) {
      applyProfileSettings(activeProfile);
    }

    // Initial render of profiles
    renderProfiles();
  });
})();