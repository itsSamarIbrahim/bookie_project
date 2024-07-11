document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting
    
    // Clear previous error messages
    document.getElementById('usernameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';
    
    let isValid = true;
    
    // Username validation
    const username = document.getElementById('username').value;
    if (username.length < 3) {
        isValid = false;
        document.getElementById('usernameError').textContent = 'Username must be at least 3 characters long';
    }
    
    // Email validation
    const email = document.getElementById('email').value;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
    if (!emailPattern.test(email)) {
        isValid = false;
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
    }
    
    // Password validation
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const lengthRequirement = document.getElementById('lengthRequirement');
    const uppercaseRequirement = document.getElementById('uppercaseRequirement');
    const lowercaseRequirement = document.getElementById('lowercaseRequirement');
    const numberRequirement = document.getElementById('numberRequirement');
    const symbolRequirement = document.getElementById('symbolRequirement');
    
    let passwordValid = true;
    
    if (password.length < 8) {
        lengthRequirement.classList.remove('valid');
        lengthRequirement.classList.add('invalid');
        passwordValid = false;
    } else {
        lengthRequirement.classList.remove('invalid');
        lengthRequirement.classList.add('valid');
    }
    
    if (!/[A-Z]/.test(password)) {
        uppercaseRequirement.classList.remove('valid');
        uppercaseRequirement.classList.add('invalid');
        passwordValid = false;
    } else {
        uppercaseRequirement.classList.remove('invalid');
        uppercaseRequirement.classList.add('valid');
    }
    
    if (!/[a-z]/.test(password)) {
        lowercaseRequirement.classList.remove('valid');
        lowercaseRequirement.classList.add('invalid');
        passwordValid = false;
    } else {
        lowercaseRequirement.classList.remove('invalid');
        lowercaseRequirement.classList.add('valid');
    }
    
    if (!/[0-9]/.test(password)) {
        numberRequirement.classList.remove('valid');
        numberRequirement.classList.add('invalid');
        passwordValid = false;
    } else {
        numberRequirement.classList.remove('invalid');
        numberRequirement.classList.add('valid');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        symbolRequirement.classList.remove('valid');
        symbolRequirement.classList.add('invalid');
        passwordValid = false;
    } else {
        symbolRequirement.classList.remove('invalid');
        symbolRequirement.classList.add('valid');
    }
    
    if (!passwordValid) {
        isValid = false;
        document.getElementById('passwordError').textContent = 'Password does not meet the requirements';
    } else if (password !== confirmPassword) {
        isValid = false;
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
    }
    
    if (isValid) {
        // If all validations pass, submit the form
        alert('Form submitted successfully!');
        // Here you can also send form data to the server
    }
});

document.getElementById('email').addEventListener('input', function() {
    const email = document.getElementById('email').value;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
    const emailFormatRequirement = document.getElementById('emailFormatRequirement');
    
    if (emailPattern.test(email)) {
        emailFormatRequirement.classList.add('valid');
        emailFormatRequirement.classList.remove('invalid');
    } else {
        emailFormatRequirement.classList.remove('valid');
        emailFormatRequirement.classList.add('invalid');
    }
});

document.getElementById('password').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    
    const lengthRequirement = document.getElementById('lengthRequirement');
    const uppercaseRequirement = document.getElementById('uppercaseRequirement');
    const lowercaseRequirement = document.getElementById('lowercaseRequirement');
    const numberRequirement = document.getElementById('numberRequirement');
    const symbolRequirement = document.getElementById('symbolRequirement');
    
    if (password.length >= 8) {
        lengthRequirement.classList.add('valid');
        lengthRequirement.classList.remove('invalid');
    } else {
        lengthRequirement.classList.remove('valid');
        lengthRequirement.classList.add('invalid');
    }
    
    if (/[A-Z]/.test(password)) {
        uppercaseRequirement.classList.add('valid');
        uppercaseRequirement.classList.remove('invalid');
    } else {
        uppercaseRequirement.classList.remove('valid');
        uppercaseRequirement.classList.add('invalid');
    }
    
    if (/[a-z]/.test(password)) {
        lowercaseRequirement.classList.add('valid');
        lowercaseRequirement.classList.remove('invalid');
    } else {
        lowercaseRequirement.classList.remove('valid');
        lowercaseRequirement.classList.add('invalid');
    }
    
    if (/[0-9]/.test(password)) {
        numberRequirement.classList.add('valid');
        numberRequirement.classList.remove('invalid');
    } else {
        numberRequirement.classList.remove('valid');
        numberRequirement.classList.add('invalid');
    }
    
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        symbolRequirement.classList.add('valid');
        symbolRequirement.classList.remove('invalid');
    } else {
        symbolRequirement.classList.remove('valid');
        symbolRequirement.classList.add('invalid');
    }
});