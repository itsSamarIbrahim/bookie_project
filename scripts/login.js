document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    clearErrors();

    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');

    var isValid = true;

    // Validate email format
    if (!isValidEmail(emailInput.value)) {
        isValid = false;
        showError('emailError', 'Please enter a valid email address.');
    }

    // Validate password length
    if (passwordInput.value.length < 8) {
        isValid = false;
        showError('passwordError', 'Password must be at least 8 characters long.');
    }

    // Proceed with login if valid
    if (isValid) {
        // Simulate login process or submit form to backend
        console.log('Login successful!');
        // Replace with actual login logic here
    }
});

function isValidEmail(email) {
    // Basic email format validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearErrors() {
    var errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(element) {
        element.textContent = '';
    });
}

function showError(id, message) {
    var errorElement = document.getElementById(id);
    errorElement.textContent = message;
}