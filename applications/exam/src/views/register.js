import { html } from '../../node_modules/lit-html/lit-html.js';
import {registerUser} from '../crud.js'

let registerTemplate = (onSubmit)=>html`<section id="register-page" class="content auth">
<h1>Register</h1>

<form id="register" @submit=${onSubmit}>
    <fieldset>
        <blockquote>Knowledge is not simply another commodity. On the contrary. Knowledge is never used up.
            It
            increases by diffusion and grows by dispersion.</blockquote>
        <p class="field email">
            <label for="register-email">Email:</label>
            <input type="email" id="register-email" name="email" placeholder="maria@email.com">
        </p>
        <p class="field password">
            <label for="register-pass">Password:</label>
            <input type="password" name="password" id="register-pass">
        </p>
        <p class="field password">
            <label for="register-rep-pass">Repeat password:</label>
            <input type="password" name="rep-pass" id="register-rep-pass">
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Register">
        </p>
        <p class="field">
            <span>If you already have profile click <a href="/login">here</a></span>
        </p>
    </fieldset>
</form>
</section>`;

export function registerPage(context){
    context.render(registerTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        let email  = document.getElementsByName('email')[0].value.trim();
        let password  = document.getElementsByName('password')[0].value.trim();
        let rePassword  = document.getElementsByName('rep-pass')[0].value.trim();

        if(email=='' || password == '' || rePassword==''){
            alert('All fields are requerd!');
            return;
        }
        if(password!= rePassword){
            alert('Please enter matching passwords!');
            return;
        }
        await registerUser(email, password);
        context.page.redirect('/');
    }

}