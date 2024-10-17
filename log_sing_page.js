const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Add this line
const validator = require("validator")
const fs = require("fs")

const app = express();

app.use(cors());  // Add this line to enable CORcS for all routes
app.use(bodyParser.json());

// Utility functions for password validation
function isUpper(str) {
    return /[A-Z]/.test(str);
}

function hasLowerCase(str) {
    return /[a-z]/.test(str);
}

function hasSpecialCharacter(str) {
    return /[@,#,$,&]/.test(str);
}

function hasNumber(str) {
    return /[0-9]/.test(str);
}

function checkPassword(password) {
    if (password.length >= 8 && password.length <= 12 &&
        hasLowerCase(password) &&
        isUpper(password) &&
        hasSpecialCharacter(password) &&
        hasNumber(password)) {
        return true;
    }
    return false;
}

// Signup route
app.post('/signup', (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Validate password
    if (!checkPassword(password)) {
        return res.status(400).json({ message: 'Password does not meet the criteria' });
    }

    // Create user object
    const userData = {
        firstName,
        lastName,
        email,
        password
    };

    // Save user data to JSON file
    fs.writeFile('user_data.json', JSON.stringify(userData), (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to create account' });
        }
        res.status(201).json({ message: 'Account created successfully' });
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Read the saved user data
    fs.readFile('user_data.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to read user data' });
        }

        const userData = JSON.parse(data);

        // Check if the email and password match
        if (userData.email === email && userData.password === password) {
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
