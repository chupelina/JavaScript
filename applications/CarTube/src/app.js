import { render, html } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

import {logoutUser} from './crud.js'
import { allListingsPage } from './views/allListings.js';
import { createCarPage } from './views/createCar.js';
import { detailsPage } from './views/details.js';
import { EditPage } from './views/editCar.js';
import { myListPage } from './views/myList.js';
import { SearchPage } from './views/searchBar.js';


let container = document.getElementById('site-content');
let logout = document.getElementById('logout');

page('/', middle, homePage);
page('/login', middle, loginPage);
page('/register', middle, registerPage);
page('/allListing', middle, allListingsPage);
page('/create', middle, createCarPage);
page('/details/:id', middle, detailsPage);
page('/edit/:id', middle, EditPage);
page('/allMyItems', middle, myListPage)
page('/search', middle, SearchPage)


page.start();

function middle(context, next){
    context.render = (data) => render(data, container);
    navigation();
    next();
}

 function navigation(){
    let user = sessionStorage.getItem('username')
    if(user!=null){
        document.getElementById('guest').style.display='none';
        document.getElementById('welcome').innerText = `Welcome ${user}`;
        document.getElementById('profile').style.display='block';
    }else{
        document.getElementById('guest').style.display='block';
        document.getElementById('profile').style.display='none';
    }
}
logout.addEventListener('click', async (e)=>{
  await logoutUser();
  navigation();
  page.redirect('/');
})