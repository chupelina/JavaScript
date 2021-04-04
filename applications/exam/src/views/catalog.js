import { html } from '../../node_modules/lit-html/lit-html.js';

import {getAllArticles} from '../crud.js'

let catalogTemplate =(allArticles)=>html` <section id="catalog-page" class="content catalogue">
<h1>All Articles</h1>
${allArticles.length==0? html`<h3 class="no-articles">No articles yet</h3>` : allArticles}
</section>`;

let article= (current)=> html`
<a class="article-preview" href="/details/${current._id}">
<article>
    <h3>Topic: <span>${current.title}</span></h3>
    <p>Category: <span>${current.category}</span></p>
</article>
</a>`;

export async function catalogPage(context){
   let allArticles= await getAllArticles();
   context.render(catalogTemplate(allArticles.map(article)));
}