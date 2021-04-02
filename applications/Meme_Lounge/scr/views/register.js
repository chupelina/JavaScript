import { html } from '../../node_modules/lit-html/lit-html.js';

import { registerUser } from '../crud.js';
import { notify } from '../notification.js'

let registerTemplate = (onSubmit) => html`<!-- Register Page ( Only for guest users ) -->
<section id="register">
    <form id="register-form" @submit=${onSubmit}>
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export function registerPage(context) {
    context.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        let username = document.getElementById('username').value.trim();
        let email = document.getElementById('email').value.trim();
        let password = document.getElementById('password').value.trim();
        let repeatPass = document.getElementById('repeatPass').value.trim();
        let gender = document.getElementById('female').checked ? 'female' : 'male';

        try {
            if (username == '' || email == '' || password == '' || repeatPass == '') {
                throw new Error('All fields are required!');
            }
            if (password != repeatPass) {
                throw new Error('Please enter matching passwords!')
            }
            await registerUser(username, email, password, gender);

            context.page.redirect('/allMemes');
        } catch (err) {
            notify(err)
        }


    }

}