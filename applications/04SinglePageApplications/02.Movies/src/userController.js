import { calledFromOderWorld } from './app.js';

function userController(type, section) {
    if (type == 'Login') {
        section.children[0].addEventListener('submit', (e) => loginUser(e, section));
    } else if (type == 'Logout') {
        logoutUser();
    } else if (type == 'Register') {
        section.children[0].addEventListener('submit', (e) => registerUser(e, section))
    }
}

export {
    userController,
}

async function loginUser(e, section) {
    e.preventDefault();
    let form = new FormData(e.target);
    let email = form.get('email');
    let password = form.get('password');
    let response = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    let result = await response.json();
    if (result.message != undefined) {
        alert(result.message);
        return;
    }
    sessionStorage.setItem('token', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('email', result.email);
    e.target.reset();
    section.style.display = 'none';
    calledFromOderWorld('home');
}

async function logoutUser() {
    await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: { 'X-Authorization': sessionStorage.getItem('token') },
    });
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('userId');
}
async function registerUser(e, section) {
    e.preventDefault();
    let form = new FormData(e.target);
    let email = form.get('email');
    let password = form.get('password');
    let repeatPassword = form.get('repeatPassword');

    if (email.trim() == '') {
        alert('The email input must be filled');
        return;
    }

    if (password.trim().length <= 5) {
        alert('The password should be at least 6 characters long');
        return;
    }
    if (password.trim() != repeatPassword.trim()) {
        alert('The repeat password should be equal to the password');
        return;
    }
    let response = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    let result = await response.json();
    if (result.message != undefined) {
        alert(result.message);
        return;
    }
    sessionStorage.setItem('token', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('email', result.email);
    e.target.reset();
    section.style.display = 'none';
    calledFromOderWorld('home');
}