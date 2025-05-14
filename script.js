// HTML-Elemente
const generateBtn = document.getElementById('generatePassword');
const passwordOutput = document.getElementById('passwordOutput');
const copyBtn = document.getElementById('copyPassword');
const passwordLengthInput = document.getElementById('passwordLength');
const passwordStrength = document.getElementById('passwordStrength');

// Zeichen, die im Passwort enthalten sein können
const charset = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    digits: '0123456789',
    specialChars: '!@#$%^&*()_+[]{}|;:,.<>?/~'
};

// Passwort generieren
function generatePassword(length) {
    const allChars = charset.lowercase + charset.uppercase + charset.digits + charset.specialChars;
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }
    return password;
}

// Stärke des Passworts prüfen
function checkPasswordStrength(password) {
    const lengthCriteria = password.length >= 12;
    const lowerCase = /[a-z]/.test(password);
    const upperCase = /[A-Z]/.test(password);
    const digits = /\d/.test(password);
    const specialChars = /[!@#$%^&*()_+[\]{}|;:,.<>?/~]/.test(password);

    if (lengthCriteria && lowerCase && upperCase && digits && specialChars) {
        return 'strong';
    } else if (password.length < 6) {
        return 'weak';
    } else {
        return 'medium';
    }
}

// Passwort generieren und anzeigen
generateBtn.addEventListener('click', () => {
    const length = parseInt(passwordLengthInput.value);
    if (length < 4 || length > 32) {
        alert('Passwort muss zwischen 4 und 32 Zeichen liegen!');
        return;
    }
    const password = generatePassword(length);
    passwordOutput.value = password;

    // Stärke des Passworts überprüfen und anzeigen
    const strength = checkPasswordStrength(password);
    passwordStrength.textContent = `Sicherheit: ${strength.charAt(0).toUpperCase() + strength.slice(1)}`;
    passwordStrength.className = strength; // Für Styling (strong/weak)
});

// Passwort kopieren
copyBtn.addEventListener('click', () => {
    passwordOutput.select();
    document.execCommand('copy');
    alert('Passwort wurde in die Zwischenablage kopiert!');
});
