import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { loginUser } from '../crud.js';

let template = () => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form id='loginForm'>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">

                <input type="submit" class="btn btn-primary" value="Login" />
            </div>
        </div>
</form>`;



export function login(context) {
 context.render(template())
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        await loginUser(email, password);
        context.page.redirect('/');
    })
}