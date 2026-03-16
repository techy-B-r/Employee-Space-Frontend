class Auth {
    static async login(username, password) {
        try {
            const response = await API.login(username, password);
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                window.location.href = 'index.html';
            } else {
                showError('Invalid credentials');
            }
        } catch (error) {
            showError('Login failed: ' + error.message);
        }
    }

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }

    static isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    static getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (!Auth.isLoggedIn() && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            Auth.login(username, password);
        });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            Auth.logout();
        });
    }
});