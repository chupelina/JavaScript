import { html, render } from 'https://unpkg.com/lit-html?module';
import {cats} from './catSeeder.js';

cats.forEach(c=> c.isHidden = true)

let catCard = (cat)=> html`<li>
<img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
<div class="info">
    <button class="showBtn">Show status code</button>
    <div class="status" style=${cat.isHidden? "display: none" : "" } id=${cat.id}>
        <h4>Status Code: ${cat.statusCode}</h4>
        <p>${cat.statusMessage}</p>
    </div>
</div>
</li>`;

let container = document.getElementById('allCats');
let seedCats =() => html`<ul>${cats.map(c=>catCard(c))}</ul>`

render(seedCats(), container);

document.addEventListener('click', (e)=>{
   e.preventDefault();
   if(e.target.classList.contains('showBtn') &&  e.target.innerText == 'Show status code'){
       e.target.innerText = 'Hide status code';
       let cat = cats.find(c => c.id == e.target.parentNode.children[1].id);
       cat.isHidden=false;
   }else if(e.target.classList.contains('showBtn') && e.target.innerText == 'Hide status code') {
        e.target.innerText = 'Show status code';
        let cat = cats.find(c => c.id == e.target.parentNode.children[1].id);
       cat.isHidden=true;
     
   }
    render(seedCats(), container);
})


