import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../crud.js';
let template = () => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form id="registerForm">
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class="form-control" id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`

export function registerPage(context) {
    context.render(template())
    document.getElementById('registerForm').addEventListener('submit', onSubmit);


    function onSubmit(e){
        e.preventDefault();
        let form = new FormData(e.target);
        if(form.get('password').trim()=='' ||form.get('rePass').trim()=='' || form.get('email').trim()==''){
            alert('All fields are required');
            return;
        }else if(form.get('rePass').trim()!= form.get('password')){
            alert('The passwords do not match');
            return;
        }
        register(form.get('email'),form.get('password'));
        context.page.redirect('/');
    }
}