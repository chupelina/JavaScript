import { html } from '../../node_modules/lit-html/lit-html.js';
import {getAllByYear} from '../crud.js'

let searchBarTemplate = (onSubmit, allCards)=> html` <section id="search-cars">
<h1>Filter by year</h1>

<div class="container">
    <input type="text" id="search-input" name="search" placeholder="Enter desired production year">
    <button class="button-list" @click=${onSubmit}>Search</button>
</div>

<h2>Results:</h2>
<div class="listings">
${(allCards==undefined || allCards.length ==0)? html`  <p class="no-cars"> No results.</p>`: allCards}  
</div>
</section>`;

let oneCard = (car) => html`<div class="listing">
<div class="preview">
    <img src=${car.imageUrl}>
</div>
<h2>${car.brand} ${car.model}</h2>
<div class="info">
    <div class="data-info">
        <h3>Year: ${car.year}</h3>
        <h3>Price: ${car.price} $</h3>
    </div>
    <div class="data-buttons">
        <a href="/details/${car._id}" class="button-carDetails">Details</a>
    </div>
</div>
</div>`

export async function SearchPage(context){
  
    context.render(searchBarTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        let year =  Number(document.getElementsByName('search')[0].value.trim());
        let cars = await getAllByYear(year);
        context.render(searchBarTemplate(onSubmit, cars.map(oneCard)));
        document.getElementsByName('search')[0].textContent='';

    }
}