import page from '../node_modules/page/page.mjs';
import { render, html } from '../node_modules/lit-html/lit-html.js';

import {loginPage} from './views/login.js';
import { registerPage } from './views/register.js';
import { welcomePage } from './views/welcome.js';
import { allMemesPage } from './views/allMemes.js';
import { createPage } from './views/createMeme.js';
import { detailPage } from './views/details.js';
import { editPage } from './views/editMeme.js';
import { myMemesPage } from './views/myMemes.js';


import { logoutUser } from './crud.js';


page('/login', middle,  loginPage);
page('/register', middle, registerPage);
page('/', middle, welcomePage);
page('/allMemes', middle, allMemesPage);
page('/create', middle, createPage);
page('/details/:id', middle, detailPage);
page('/edit/:id', middle, editPage);
page('/myMemes', middle, myMemesPage);

let container = document.getElementsByTagName('main')[0];
page.start();

function middle(context, next){
    context.render = (data) => render(data, container);
    navigation();
    next();
}


function navigation() {
    let email = sessionStorage.getItem("email");
    if (email != null) {
       document.getElementsByClassName('user')[0].style.display= 'block';
       document.getElementsByClassName('profile')[0].children[0].textContent = `Welcome, ${email}`;
       document.getElementsByClassName('guest')[0].style.display='none';
    } else {
        document.getElementsByClassName('user')[0].style.display= 'none';
        document.getElementsByClassName('guest')[0].style.display='block';
    }
}
document.getElementById('logout').addEventListener('click', async () =>{
    await logoutUser();
    navigation;
    page.redirect('/');
});

