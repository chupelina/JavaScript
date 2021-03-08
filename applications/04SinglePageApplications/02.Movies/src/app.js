import {userController} from './userController.js'
import {movieController} from './moviesController.js'

let sections = {
    'home': document.getElementById('home-page'),
    'Add Movie': document.getElementById('add-movie'),
    'movie-example': document.getElementById('movie-example'),
    'Login': document.getElementById('form-login'),
    'Register': document.getElementById('form-sign-up'),
}
let ownControllers = {
    'Login': userController,
    'Register': userController,
    'Logout': userController,
    'Add Movie': movieController,
    'movie-example': movieController,

}

function appController(type, id) {
    document.getElementById('movie').style.display='none';
    document.getElementById('edit-movie').style.display='none';
      changeButtons();
    if (type == undefined) {
        for (const current in sections) {
            if (current == 'home') {
                sections['home'].style.display = 'block'
            } else {
                sections[current].style.display = 'none'
            }
        }
    } else {
        for (const current in sections) {
            if (current == type) {
                sections[type].style.display = 'block';
                if(current!='home'){
                 ownControllers[type]( type, sections[type], id); 
                }
                if(current=='home' && sessionStorage.getItem('token')!=null){
                    movieController('getAll',  document.getElementById('movie'));
                    document.getElementById('movie').style.display='block';
                }
            } else {
                sections[current].style.display = 'none'
            }
        }
    }
}
appController();
export function calledFromOderWorld( type){
      appController(type);
}
document.getElementsByTagName('nav')[0].addEventListener('click', (e)=>{
    if(sections[e.target.textContent]==undefined && e.target.textContent != 'Logout'){
          appController('home');
    }else if(e.target.textContent == 'Logout'){
        ownControllers['Logout']('Logout');
        appController('Register'); 
        document.getElementById('welcome').style.display='none';
        document.getElementById('logout').style.display='none';
        document.getElementById('login').style.display='inline-block';
        document.getElementById('register').style.display='inline-block';
    }else{
        appController(e.target.textContent)
    }
    
})

function changeButtons(){
    if(sessionStorage.getItem('token')==null){
        document.getElementById('welcome').style.display='none';
        document.getElementById('logout').style.display='none';
        document.getElementById('login').style.display='inline-block';
        document.getElementById('register').style.display='inline-block';
     }else{
        document.getElementById('welcome').style.display='inline-block';
        document.getElementById('welcome').children[0].innerText= 'Welcome, '+sessionStorage.getItem('email');
        document.getElementById('logout').style.display='inline-block';
        document.getElementById('login').style.display='none';
        document.getElementById('register').style.display='none';
     }
}

document.getElementById('movie').addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.id== '' && e.target.tagName!='BUTTON' ){
       appController(e.target.textContent) 
    }else if (e.target.tagName=='BUTTON'){
        appController('movie-example', e.target.id) 
    }else{
        appController('home')
    }   
})
