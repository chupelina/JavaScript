import { html, render } from '../../node_modules/lit-html/lit-html.js';
import {post} from '../crud.js';

let template = (data )=> html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form id="createForm">
<div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class=${data.make.trim().length <4 ? "form-control is-invalid" : "form-control is-valid"}  id="new-make" type="text" name="make" .value=${data.make}>
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class=${data.model.trim().length <4 ? "form-control is-invalid" : "form-control is-valid"} id="new-model" type="text" name="model" .value=${data.model}>
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
              <input class=${(data.year>1950 && data.year<2050 )==''? "form-control is-invalid" : "form-control is-valid"} id="new-year" type="number" name="year"
                    .value=${Number(data.year)}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                       <input class=${data.description.trim().length 
                        <10 ? "form-control is-invalid" : "form-control is-valid"} id="new-description" type="text" name="description"
                    .value=${data.description}>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                           <input class=${Number(data.price) < 0? "form-control is-invalid" : "form-control is-valid"} id="new-price" type="number" name="price" .value=${Number(data.price)}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                            <input class=${data.img.trim()==''? "form-control is-invalid" : "form-control is-valid"} id="new-image" type="text" name="img" .value=${data.img}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                      <input class="form-control" id="new-material" type="text" name="material" .value=${data.material ?
                    data.material : '' }>
                    </div>
                    <div>
                    <input type="submit" class="btn btn-primary" value="Create" />
                   </div>
            </div>
            
    </div>
</form>`



export async function create(context){
 let object={ 
     make: '',
     model : '',
    description: '',
    price: 0,
    year: 0,
    material: '',
    img: ''
};
    context.render(template(object))


 document.getElementById('createForm').addEventListener('submit',async (e) => {
    e.preventDefault();
    let form = new FormData(e.target);
        object.make = form.get('make');
        object.model =form.get('model');
        object.description=form.get('description');
        object.price= Number(form.get('price'));
        object.year=Number(form.get('year'));
        object.material= form.get('material');
        object.img=form.get('img');

    if(object.make.trim().length < 4  || object.model.trim().length <4  || object.description.trim().length <10  || 
    object.price< 0 || (object.year<1950 || object.year>2050 )|| object.img.trim()=='' ){
        console.log(object)
        context.render(template(object));
    }else{
      await  post(object);
     context.page.redirect("/");
    }

    })
}