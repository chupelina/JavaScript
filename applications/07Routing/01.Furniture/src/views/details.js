import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getOne, del } from '../crud.js';

let template = (item, onDelete) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${item.img.slice(1, item.img.length)} />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${item.make}</span></p>
        <p>Model: <span>${item.model}</span></p>
        <p>Year: <span>${item.year}</span></p>
        <p>Description: <span>${item.description}</span></p>
        <p>Price: <span>${item.price}</span></p>
        <p>Material: <span>${item.material}</span></p>
        ${item._ownerId == sessionStorage.getItem('userId') ? html`<div>
            <a href="/edit/${item._id}" class="btn btn-info">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="btn btn-red">Delete</a>
        </div>` : ''}
    </div>
</div>`;

export async function details(context) {
    let id = context.state.path.split('/')[2];
    let item = await getOne(id);
    context.render(template(item, onDelete))

    async function onDelete(){
        const confirmed = confirm('Are you sure you want to delete this item?');
        if (confirmed){
            await del(item._id);
            context.page.redirect('/');
        }
    }

}