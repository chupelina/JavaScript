import { html } from '../../node_modules/lit-html/lit-html.js';
import { registerUser } from '../crud.js';

let registerTemplate = (onSubmit)=> html ` <!-- Register Page -->
<section id="register">
    <div class="container">
        <form id="register-form" @submit=${onSubmit}>
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
</section>`;

export function registerPage(context){
     context.render(registerTemplate(onSubmit));

     async function onSubmit(event){
        event.preventDefault();
       let username =  document.getElementsByName('username')[0].value.trim();
       let password =  document.getElementsByName('password')[0].value.trim();
       let repeatPass =  document.getElementsByName('repeatPass')[0].value.trim();

       if(username=='' || password==''){
           alert("All fields are requierd!");
           return;
       }
       if(password!=repeatPass){
           alert('Please enter matching passwords!');
           return;
       }

       await registerUser(username, password);
       context.page.redirect("/allListing");
     }
}