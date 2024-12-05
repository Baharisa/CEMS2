document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (response.ok) {
            messageElement.style.color = 'green';
            messageElement.textContent = 'Login successful!';
            // Redirect or update UI after successful login
        } else {
            messageElement.style.color = 'red';
            messageElement.textContent = result.message || 'Login failed!';
        }
    } catch (error) {
        messageElement.style.color = 'red';
        messageElement.textContent = 'An error occurred. Please try again.';
        console.error('Login error:', error);
    }
});