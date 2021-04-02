import { html } from '../../node_modules/lit-html/lit-html.js';

import {createCar} from '../crud.js'

let createTemplate = (onSubmit)=> html `  <!-- Create Listing Page -->
<section id="create-listing">
    <div class="container">
        <form id="create-form" @submit=${onSubmit}>
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>
`

export function createCarPage(context){

    context.render(createTemplate(onSubmit));
    async function onSubmit(event){
        event.preventDefault();

        let brand =  document.getElementsByName('brand')[0].value.trim();
        let model =  document.getElementsByName('model')[0].value.trim();
        let description =  document.getElementsByName('description')[0].value.trim();
        let year =  Number(document.getElementsByName('year')[0].value.trim());
        let imageUrl =  document.getElementsByName('imageUrl')[0].value.trim();
        let price =  Number(document.getElementsByName('price')[0].value.trim());
        
        if(brand=='' || model=='' || description=='' || !year ||  imageUrl=='' || !price ){
              alert('All fields are requierd!');
              return;
        }
        if( year<=0 || price<=0){
            alert('Please enter positive numbers!');
              return;
        }
        await createCar(brand, model, description, year, imageUrl, price);
        context.page.redirect("/allListing")
    }
}