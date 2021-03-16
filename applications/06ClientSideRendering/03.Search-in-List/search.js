import { html, render } from 'https://unpkg.com/lit-html?module';
import { towns } from './towns.js'
let container = document.getElementById('towns');

const townTemplate = [];
for (const t of towns) {
   townTemplate.push(html`<li>${t}</li>`);
}

let unorderdList = html`<ul> ${townTemplate} </ul>`;

render(unorderdList, container);

document.getElementsByTagName('button')[0].addEventListener('click', (e) => {
   let lookingFor = document.getElementsByTagName('input')[0];
   let ulList = [...document.getElementsByTagName('ul')[0].children];
   for (const li of ulList) {
      if (li.innerText.toLocaleLowerCase().includes(lookingFor.value.toLocaleLowerCase())) {
         li.classList.add('active');
      } else {
        li.classList.remove('active');
      }
   }
   lookingFor.value='';
})
