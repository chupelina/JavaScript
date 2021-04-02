import { html } from '../../node_modules/lit-html/lit-html.js';

import {getCurrentCar, deleteCurrentCar} from '../crud.js';


let currentCarTemplate = (car ,  onDelete)=>html`<!-- Listing Details Page -->
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}</li>
        </ul>

        <p class="description-para">${car.description}</p>
${car._ownerId==sessionStorage.getItem('userId')? html`
 <div class="listings-buttons">
            <a href="/edit/${car._id}" class="button-list">Edit</a>
            <a href="javascript:void(0)" @click=${onDelete} class="button-list">Delete</a>
        </div>` : ''}
       
    </div>
</section>`;


export async function detailsPage(context){
    let id = context.state.path.split('/')[2];
    let car = await getCurrentCar(id);

    context.render(currentCarTemplate(car, onDelete));

    async function onDelete(){
      let ok = confirm('Are you sure?');
      if(ok){
          deleteCurrentCar(id);
          context.page.redirect('/allListing');
      }
     
    }
}