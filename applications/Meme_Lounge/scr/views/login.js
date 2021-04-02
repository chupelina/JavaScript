import { html } from '../../node_modules/lit-html/lit-html.js';
import { loginUser } from '../crud.js';
import { notify } from '../notification.js'

let loginTemplate = (onSubmit) => html`<!-- Login Page ( Only for guest users ) -->
<section id="login">
    <form id="login-form" @submit=${onSubmit}>
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export function loginPage(context) {
    context.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        let email = document.getElementById('email').value.trim();
        let password = document.getElementById('password').value.trim();
        try {

            if(email=='' || password==''){
                throw new Error('All fields are requierd!')
            }

            await loginUser(email, password);
            context.page.redirect('/allMemes');
        } catch(err){
            notify(err.message);
        }
       
      
    }

}