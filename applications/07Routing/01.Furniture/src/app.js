
import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { catalog } from './views/catalog.js';
import { create } from './views/create.js';
import { dashboard } from './views/dashboard.js';
import { details } from './views/details.js';
import { edit } from './views/edit.js';
import { login } from './views/login.js';
import { myItems } from './views/myItems.js';
import { registerPage } from './views/register.js';
import { logout } from './crud.js';

let container = document.getElementsByClassName('container')[0];
page('/catalog', middle, catalog);
page('/create', middle, create);
page('/', middle, dashboard);
page('/details/:id', middle, details);
page('/edit/:id', middle, edit);
page('/login', middle, login);
page('/myItems', middle, myItems);
page('/register', middle, registerPage);
page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    navigation();
    page.redirect('/')
});



function middle(context, next) {
    context.render = (content) => render(content, container);
    navigation();
    next();
}

function navigation() {
    console.log()
    if (sessionStorage.getItem('userId') == null) {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    } else {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    }
}