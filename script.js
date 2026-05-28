/**
 * INSTAGRAM CLONE - INTERACTIVE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    // Select main elements
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const usernameWrapper = document.getElementById('usernameWrapper');
    const passwordWrapper = document.getElementById('passwordWrapper');
    const togglePassword = document.getElementById('togglePassword');
    const submitBtn = document.getElementById('submitBtn');
    
    // Links and buttons triggering modals
    const backBtn = document.getElementById('backBtn');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const fbLoginBtn = document.getElementById('fbLoginBtn');
    const createAccountBtn = document.getElementById('createAccountBtn');

    // Setup input interactions (focus/blur/floating placeholder)
    setupInputEvents(usernameInput, usernameWrapper);
    setupInputEvents(passwordInput, passwordWrapper);

    // Watch password input to show/hide "Show" button
    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length > 0) {
            togglePassword.style.display = 'block';
        } else {
            togglePassword.style.display = 'none';
        }
        validateForm();
    });

    usernameInput.addEventListener('input', validateForm);

    // Toggle password visibility (Show / Hide text)
    togglePassword.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.textContent = 'Hide';
        } else {
            passwordInput.type = 'password';
            togglePassword.textContent = 'Show';
        }
    });

    // Form Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form states
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        usernameInput.disabled = true;
        passwordInput.disabled = true;

        // Simulate API network check
        setTimeout(() => {
            const username = usernameInput.value.trim();
            
            // Show Success Modal
            document.getElementById('displayUsername').textContent = username;
            document.getElementById('avatarInitial').textContent = username.charAt(0).toUpperCase();
            
            openModal('successModal');

            // Reset form elements
            loginForm.reset();
            usernameWrapper.classList.remove('filled');
            passwordWrapper.classList.remove('filled');
            togglePassword.style.display = 'none';
            submitBtn.classList.remove('loading');
            submitBtn.classList.remove('active');
            
            // Re-enable inputs
            usernameInput.disabled = false;
            passwordInput.disabled = false;
        }, 1500);
    });

    // Main buttons event bindings
    backBtn.addEventListener('click', () => {
        showToast('Navigation back simulated');
    });

    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('forgotModal');
    });

    fbLoginBtn.addEventListener('click', () => {
        openModal('fbModal');
    });

    createAccountBtn.addEventListener('click', () => {
        openModal('registerModal');
    });

    // Help function to manage focus/blur styling
    function setupInputEvents(input, wrapper) {
        input.addEventListener('focus', () => {
            wrapper.classList.add('focus');
        });

        input.addEventListener('blur', () => {
            wrapper.classList.remove('focus');
            if (input.value.trim() !== '') {
                wrapper.classList.add('filled');
            } else {
                wrapper.classList.remove('filled');
            }
        });

        // Initialize state on load (if pre-filled by browser)
        if (input.value.trim() !== '') {
            wrapper.classList.add('filled');
        }
    }

    // Dynamic field validation
    function validateForm() {
        const usernameVal = usernameInput.value.trim();
        const passwordVal = passwordInput.value.trim();

        // Instagram enables submission when password is at least 6 characters
        if (usernameVal.length > 0 && passwordVal.length >= 6) {
            submitBtn.classList.add('active');
            submitBtn.disabled = false;
        } else {
            submitBtn.classList.remove('active');
            submitBtn.disabled = true;
        }
    }
});

// ==================== MODAL HELPERS ====================

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('open');
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('open');
    }
}

// Simulated Facebook connection
function simulateFbConnection() {
    closeModal('fbModal');
    document.getElementById('displayUsername').textContent = 'Facebook_User';
    document.getElementById('avatarInitial').textContent = 'F';
    openModal('successModal');
}

// Simulated Forgot Password link dispatch
function handleForgotSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('forgotEmailInput').value;
    closeModal('forgotModal');
    document.getElementById('forgotEmailInput').value = '';
    showToast(`Simulated reset email sent to: ${email}`);
}

// Simulated Registration flow
function handleRegisterSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('regUsernameInput').value.trim();
    closeModal('registerModal');
    
    // Reset inputs
    document.getElementById('regEmailInput').value = '';
    document.getElementById('regNameInput').value = '';
    document.getElementById('regUsernameInput').value = '';
    document.getElementById('regPassInput').value = '';

    // Show Success login screen for the new user
    document.getElementById('displayUsername').textContent = username;
    document.getElementById('avatarInitial').textContent = username.charAt(0).toUpperCase();
    openModal('successModal');
}

// Simple dynamic Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    
    // Quick inline styling for the simulated toast
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%) translateY(100px)',
        backgroundColor: '#262626',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '30px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        zIndex: '9999',
        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s',
        opacity: '0',
        border: '1px solid #363636'
    });

    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
        toast.style.opacity = '1';
    }, 50);

    // Dismiss & clean up
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 3000);
}
