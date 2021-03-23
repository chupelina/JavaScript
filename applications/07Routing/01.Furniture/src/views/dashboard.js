import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { get } from '../crud.js'
let template = (allCards) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">
    ${allCards}
</div>`

let singleCard = (fur) => html`<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${fur.img.slice(1, fur.img.length)} />
            <p>${fur.description}</p>
            <footer>
                <p>Price: <span>${fur.price} $</span></p>
            </footer>
            <div>
                <a href="/details/${fur._id}" class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>`

export async function dashboard(context) {
    let data = await get();
    let allCards = data.map((k, v) => singleCard(k));
    context.render(template(allCards))
}