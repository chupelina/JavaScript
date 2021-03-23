import { html, render } from '../../node_modules/lit-html/lit-html.js';
import{getAllMine } from '../crud.js';

let template = (allCards) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
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
export async function myItems(context) {
    let data = await getAllMine();
    let allCards = data.map((k, v) => singleCard(k));
    context.render(template(allCards))
}