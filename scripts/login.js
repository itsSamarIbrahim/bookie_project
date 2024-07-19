document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    clearErrors();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const isValid = validateForm(emailInput, passwordInput);

    if (isValid) {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: emailInput.value, password: passwordInput.value })
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('message').innerText = data.message;
                document.getElementById('message').style.color = 'green';
                // Redirect or update UI on successful login
            } else {
                showError('emailError', data.error);
            }
        } catch (error) {
            showError('emailError', 'An error occurred during login.');
        }
    }
});

function validateForm(emailInput, passwordInput) {
    let isValid = true;

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

    return isValid;
}

function isValidEmail(email) {
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