import { html } from '../../node_modules/lit-html/lit-html.js';

import {getAllMemes} from '../crud.js';

let allMemesTemplate = (allMemes) => html` <!-- All Memes Page ( for Guests and Users )-->
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
       ${allMemes.length==0? html`<p class="no-memes">No memes in database.</p>` : allMemes}
    </div>
</section>`;

let memeCard = (meme)=>html `<div class="meme">
<div class="card">
    <div class="info">
        <p class="meme-title">${meme.title}</p>
        <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
    </div>
    <div id="data-buttons">
        <a class="button" href="/details/${meme._id}">Details</a>
    </div>
</div>
</div>`;

export async function allMemesPage(context){
    let allMemes = await getAllMemes();
    context.render(allMemesTemplate(allMemes.map(memeCard)));

}