import { html } from '../../node_modules/lit-html/lit-html.js';
import {getArticleById, deleteArticle as delCurrentOne} from '../crud.js'

let detailsTemplate =(article, isOwner, deleteArticle)=> html`<section id="details-page" class="content details">
<h1>${article.title}</h1>

<div class="details-content">
    <strong>Published in category ${article.category}</strong>
    <p>${article.content}</p>
<div class="buttons"></div>
    ${isOwner? html `
        <a href="javascript:void(0)" class="btn delete" @click=${deleteArticle}>Delete</a>
        <a href="/edit/${article._id}" class="btn edit">Edit</a>`
        : ''}
    <a href="/" class="btn edit">Back</a>
    </div>
</div>
</section>`;

export async function detailsPage(context){
    let id = context.params.id;
    let current = await getArticleById(id);
    let ownerId = sessionStorage.getItem('userId');
    let isOwner = ownerId==current._ownerId
    context.render(detailsTemplate(current, isOwner, deleteArticle))

    async function deleteArticle(){
       let isShure= confirm('Are you shure???')
       if(isShure){
          await delCurrentOne(id);
          context.page.redirect('/');
       }
    }
}