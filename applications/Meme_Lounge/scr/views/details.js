import { html } from '../../node_modules/lit-html/lit-html.js';

import {getCurrentMeme, delCurrentMeme} from '../crud.js'

let detailTemplate = (meme , delMeme) => html` <!-- Details Meme Page (for guests and logged users) -->
<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            ${meme._ownerId== sessionStorage.getItem('userId')? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button class="button danger" @click=${delMeme}>Delete</button>`: ''}
            
            
        </div>
    </div>
</section>`;

export async function detailPage(context){
    let id = context.state.path.split('/')[2];
    let currentMeme = await getCurrentMeme(id);
   
    context.render(detailTemplate(currentMeme, delMeme));
    async function delMeme(){
     let shure = confirm("Are you shure?");
     if(shure){
         delCurrentMeme(currentMeme._id);
         context.page.redirect('/allMemes');
     }

    }

}