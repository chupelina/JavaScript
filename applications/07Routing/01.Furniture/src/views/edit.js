import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getOne, put } from '../crud.js';

let template = (data) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form id="editForm">
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${data.make.trim()==''? "form-control is-invalid" : "form-control is-valid"}  id="new-make" type="text" name="make" .value=${data.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${data.model.trim()==''? "form-control is-invalid" : "form-control is-valid"} id="new-model" type="text" name="model" .value=${data.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${Number(data.year)==''? "form-control is-invalid" : "form-control is-valid"} id="new-year" type="number" name="year"
                    .value=${Number(data.year)}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${data.description.trim()==''? "form-control is-invalid" : "form-control is-valid"} id="new-description" type="text" name="description"
                    .value=${data.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${Number(data.price)==''? "form-control is-invalid" : "form-control is-valid"} id="new-price" type="number" name="price" .value=${Number(data.price)}>
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
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`
export async function edit(context) {
    let id = context.state.path.split('/')[2];
    let data = await getOne(id);
    context.render(template(data));
    
    document.getElementById('editForm').addEventListener('submit',async (e) => {
    e.preventDefault();
    let form = new FormData(e.target);
    let object = {
        make: form.get('make'),
        model : form.get('model'),
        description: form.get('description'),
        price: Number(form.get('price')),
        year: Number(form.get('year')),
        material: form.get('material'),
        img: form.get('img')
    }
    if(object.make.trim()=='' || object.model.trim()=='' || object.description.trim()=='' || 
    object.price=='' || object.year=='' || object.img.trim()=='' ){
        context.render(template(object));
    }else{
      await  put(object, id);
     context.page.redirect("/");
    }
})

}

