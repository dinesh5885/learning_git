// E-Commerce Login Form JavaScript with jQuery

$(document).ready(function() {
    
    // Initialize form validation and event handlers
    initializeLoginForm();
    initializePasswordToggle();
    initializeForgotPassword();
    initializeRememberMe();
    initializeSocialLogin();
    
    // Check for remembered user on page load
    checkRememberedUser();
    
    /**
     * Initialize login form validation and submission
     */
    function initializeLoginForm() {
        $('#loginForm').on('submit', function(e) {
            e.preventDefault();
            
            // Clear previous alerts
            hideAlerts();
            
            // Validate form
            if (!validateLoginForm()) {
                return false;
            }
            
            // Show loading state
            showLoadingState();
            
            // Simulate login process (replace with actual API call)
            simulateLogin();
        });
        
        // Real-time validation
        $('#email').on('blur', function() {
            validateEmail($(this));
        });
        
        $('#password').on('blur', function() {
            validatePassword($(this));
        });
        
        // Clear validation on input
        $('#email, #password').on('input', function() {
            $(this).removeClass('is-invalid is-valid');
        });
    }
    
    /**
     * Validate the entire login form
     */
    function validateLoginForm() {
        let isValid = true;
        
        // Validate email
        if (!validateEmail($('#email'))) {
            isValid = false;
        }
        
        // Validate password
        if (!validatePassword($('#password'))) {
            isValid = false;
        }
        
        return isValid;
    }
    
    /**
     * Validate email field
     */
    function validateEmail($emailField) {
        const email = $emailField.val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            $emailField.addClass('is-invalid').removeClass('is-valid');
            $emailField.next('.invalid-feedback').text('Email is required.');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            $emailField.addClass('is-invalid').removeClass('is-valid');
            $emailField.next('.invalid-feedback').text('Please enter a valid email address.');
            return false;
        }
        
        $emailField.addClass('is-valid').removeClass('is-invalid');
        return true;
    }
    
    /**
     * Validate password field
     */
    function validatePassword($passwordField) {
        const password = $passwordField.val();
        
        if (!password) {
            $passwordField.addClass('is-invalid').removeClass('is-valid');
            $passwordField.closest('.mb-3').find('.invalid-feedback').text('Password is required.');
            return false;
        }
        
        if (password.length < 6) {
            $passwordField.addClass('is-invalid').removeClass('is-valid');
            $passwordField.closest('.mb-3').find('.invalid-feedback').text('Password must be at least 6 characters long.');
            return false;
        }
        
        $passwordField.addClass('is-valid').removeClass('is-invalid');
        return true;
    }
    
    /**
     * Show loading state during form submission
     */
    function showLoadingState() {
        const $submitBtn = $('#loginBtn');
        const $spinner = $('#loginSpinner');
        
        $submitBtn.prop('disabled', true);
        $spinner.removeClass('d-none');
        $submitBtn.find('i.fas').hide();
    }
    
    /**
     * Hide loading state
     */
    function hideLoadingState() {
        const $submitBtn = $('#loginBtn');
        const $spinner = $('#loginSpinner');
        
        $submitBtn.prop('disabled', false);
        $spinner.addClass('d-none');
        $submitBtn.find('i.fas').show();
    }
    
    /**
     * Simulate login process (replace with actual API call)
     */
    function simulateLogin() {
        const email = $('#email').val().trim();
        const password = $('#password').val();
        const rememberMe = $('#rememberMe').is(':checked');
        
        // Simulate API delay
        setTimeout(function() {
            hideLoadingState();
            
            // Demo credentials for testing
            if (email === 'admin@ecommerce.com' && password === 'admin123') {
                // Success scenario
                handleLoginSuccess(email, rememberMe);
            } else if (email === 'demo@test.com' && password === 'demo123') {
                // Another success scenario
                handleLoginSuccess(email, rememberMe);
            } else {
                // Error scenario
                handleLoginError('Invalid email or password. Please try again.');
            }
        }, 2000); // 2-second delay to simulate network request
    }
    
    /**
     * Handle successful login
     */
    function handleLoginSuccess(email, rememberMe) {
        // Store user data if remember me is checked
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
            localStorage.setItem('rememberUser', 'true');
        } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberUser');
        }
        
        // Show success message
        showSuccessAlert('Login successful! Redirecting to dashboard...');
        
        // Simulate redirect to dashboard (replace with actual redirect)
        setTimeout(function() {
            // window.location.href = '/dashboard'; // Uncomment for actual redirect
            showSuccessAlert('Welcome to your dashboard! (This is a demo - no actual redirect)');
        }, 1500);
    }
    
    /**
     * Handle login error
     */
    function handleLoginError(errorMessage) {
        showErrorAlert(errorMessage);
        
        // Clear password field on error
        $('#password').val('').removeClass('is-valid is-invalid');
        
        // Focus on email field for retry
        $('#email').focus();
    }
    
    /**
     * Show error alert
     */
    function showErrorAlert(message) {
        const $errorAlert = $('#errorAlert');
        $('#errorMessage').text(message);
        $errorAlert.addClass('show');
        
        // Auto-hide after 5 seconds
        setTimeout(function() {
            $errorAlert.removeClass('show');
        }, 5000);
    }
    
    /**
     * Show success alert
     */
    function showSuccessAlert(message) {
        const $successAlert = $('#successAlert');
        $('#successMessage').text(message);
        $successAlert.addClass('show');
        
        // Auto-hide after 3 seconds
        setTimeout(function() {
            $successAlert.removeClass('show');
        }, 3000);
    }
    
    /**
     * Hide all alerts
     */
    function hideAlerts() {
        $('#errorAlert, #successAlert').removeClass('show');
    }
    
    /**
     * Initialize password toggle functionality
     */
    function initializePasswordToggle() {
        $('#togglePassword').on('click', function() {
            const $passwordField = $('#password');
            const $toggleIcon = $(this).find('i');
            
            if ($passwordField.attr('type') === 'password') {
                $passwordField.attr('type', 'text');
                $toggleIcon.removeClass('fa-eye').addClass('fa-eye-slash');
                $(this).attr('title', 'Hide password');
            } else {
                $passwordField.attr('type', 'password');
                $toggleIcon.removeClass('fa-eye-slash').addClass('fa-eye');
                $(this).attr('title', 'Show password');
            }
        });
    }
    
    /**
     * Initialize forgot password functionality
     */
    function initializeForgotPassword() {
        $('#sendResetBtn').on('click', function() {
            const email = $('#resetEmail').val().trim();
            
            if (!email) {
                $('#resetEmail').addClass('is-invalid');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                $('#resetEmail').addClass('is-invalid');
                return;
            }
            
            // Simulate sending reset email
            $(this).prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...');
            
            setTimeout(function() {
                $('#forgotPasswordModal').modal('hide');
                showSuccessAlert('Password reset link has been sent to your email address.');
                $('#sendResetBtn').prop('disabled', false).html('<i class="fas fa-paper-plane me-2"></i>Send Reset Link');
                $('#resetEmail').val('').removeClass('is-invalid');
            }, 2000);
        });
        
        // Clear validation on input
        $('#resetEmail').on('input', function() {
            $(this).removeClass('is-invalid');
        });
        
        // Reset modal when closed
        $('#forgotPasswordModal').on('hidden.bs.modal', function() {
            $('#resetEmail').val('').removeClass('is-invalid');
            $('#sendResetBtn').prop('disabled', false).html('<i class="fas fa-paper-plane me-2"></i>Send Reset Link');
        });
    }
    
    /**
     * Initialize remember me functionality
     */
    function initializeRememberMe() {
        // Load remembered email if exists
        if (localStorage.getItem('rememberUser') === 'true') {
            const rememberedEmail = localStorage.getItem('rememberedEmail');
            if (rememberedEmail) {
                $('#email').val(rememberedEmail);
                $('#rememberMe').prop('checked', true);
            }
        }
    }
    
    /**
     * Check for remembered user on page load
     */
    function checkRememberedUser() {
        if (localStorage.getItem('rememberUser') === 'true') {
            const rememberedEmail = localStorage.getItem('rememberedEmail');
            if (rememberedEmail) {
                $('#email').val(rememberedEmail).addClass('is-valid');
                $('#rememberMe').prop('checked', true);
                $('#password').focus();
            }
        }
    }
    
    /**
     * Initialize social login buttons
     */
    function initializeSocialLogin() {
        // Google login
        $('.btn-outline-danger').on('click', function() {
            showLoadingState();
            // Simulate Google OAuth process
            setTimeout(function() {
                hideLoadingState();
                showErrorAlert('Social login is not implemented in this demo. Please use the regular login form.');
            }, 1500);
        });
        
        // Facebook login
        $('.btn-outline-primary').on('click', function() {
            showLoadingState();
            // Simulate Facebook OAuth process
            setTimeout(function() {
                hideLoadingState();
                showErrorAlert('Social login is not implemented in this demo. Please use the regular login form.');
            }, 1500);
        });
    }
    
    /**
     * Add some demo functionality for testing
     */
    function addDemoHelpers() {
        // Add demo credentials hint
        const demoHint = $(`
            <div class="alert alert-info mt-3">
                <strong>Demo Credentials:</strong><br>
                Email: admin@ecommerce.com | Password: admin123<br>
                Email: demo@test.com | Password: demo123
            </div>
        `);
        
        // Add to form (uncomment for demo purposes)
        // $('.login-form-container').append(demoHint);
    }
    
    // Call demo helpers (uncomment for demo)
    // addDemoHelpers();
    
    /**
     * Add keyboard shortcuts
     */
    $(document).on('keydown', function(e) {
        // Enter key in forgot password modal
        if ($('#forgotPasswordModal').hasClass('show') && e.key === 'Enter') {
            $('#sendResetBtn').click();
        }
    });
    
    /**
     * Add form animations
     */
    function addFormAnimations() {
        // Animate form elements on page load
        $('.login-form-container').addClass('animate__animated animate__fadeInUp');
        
        // Add focus animations
        $('.form-control').on('focus', function() {
            $(this).closest('.mb-3').addClass('focused');
        }).on('blur', function() {
            $(this).closest('.mb-3').removeClass('focused');
        });
    }
    
    addFormAnimations();
    
    /**
     * Handle browser back button
     */
    window.addEventListener('popstate', function(e) {
        // Clear any sensitive data if needed
        if (!$('#rememberMe').is(':checked')) {
            $('#password').val('');
        }
    });
    
    /**
     * Add touch support for mobile devices
     */
    if ('ontouchstart' in window) {
        $('.login-form-container').addClass('touch-device');
    }
    
    console.log('E-Commerce Login Form initialized successfully!');
});