import { render, html } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import {logoutUser} from './crud.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/search.js';

let container = document.getElementById('main-content');
document.getElementById('logout').addEventListener('click', logoutFunction);

page('/', middle, homePage)
page('/login', middle, loginPage);
page('/register', middle, registerPage);
page('/catalog', middle, catalogPage);
page('/create', middle, createPage);
page('/details/:id', middle, detailsPage);
page('/edit/:id', middle, editPage);
page('/search', middle, searchPage);

page.start();



function middle(context, next){
    context.render = (data) => render(data, container);
    navigation();
    next();
}

function navigation(){
    let email = sessionStorage.getItem('email');
    if(email!=null){
        document.getElementById('user').style.display='block';
        document.getElementById('guest').style.display='none';
    }else{
        document.getElementById('user').style.display='none';
        document.getElementById('guest').style.display='block';

    }
}

async function logoutFunction(){
  await logoutUser();
  navigation();
  page.redirect('/');
}