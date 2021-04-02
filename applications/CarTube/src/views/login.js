import { html } from '../../node_modules/lit-html/lit-html.js';

import {loginUser} from '../crud.js'

let loginTemplate = (onSubmit) => html`<!-- Login Page -->
<section id="login">
    <div class="container">
        <form id="login-form" @submit=${onSubmit}>
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" id="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" id="password"  name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>`;

export function loginPage(context) {
    context.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        let username = document.getElementById('username').value.trim();
        let password = document.getElementById('password').value.trim();
        await loginUser(username, password);
        context.page.redirect("/allListing")
    }
}