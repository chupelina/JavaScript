import { html } from '../../node_modules/lit-html/lit-html.js';
import {getCurrentCar, updateCar} from '../crud.js'

let editTemplate =(car, onSubmit) => html` <!-- Edit Listing Page -->
<section id="edit-listing">
    <div class="container">

        <form id="edit-form" @submit=${onSubmit}>
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value=${car.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value=${car.model}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value=${car.description}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value=${car.year}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.imageUrl}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value=${car.price}>

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>
`;

export async function EditPage(context){
    let id = context.state.path.split('/')[2];
    let car = await getCurrentCar(id);
    context.render(editTemplate(car, onSubmit));

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
        await updateCar(id, brand, model, description, year, imageUrl, price);
        context.page.redirect("/allListing")
    }
}