import { html } from '../../node_modules/lit-html/lit-html.js';

import {getAllByTitle} from '../crud.js'

let searchTemplate = (onSubmit , allArticles)=>html `<section id="search-page" class="content">
<h1>Search</h1>
<form id="search-form" @submit=${onSubmit}>
    <p class="field search">
        <input type="text" placeholder="Search by article title" name="search">
    </p>
    <p class="field submit">
        <input class="btn submit" type="submit" value="Search">
    </p>
</form>
<div class="search-container">
    ${(!allArticles || allArticles.length==0)? html`   <h3 class="no-articles">No matching articles</h3>`: allArticles.map(article)}
 
</div>
</section>`;

let article =(current)=> html `<a class="article-preview" href="/details/${current._id}">
<article>
    <h3>Topic: <span>${current.title}</span></h3>
    <p>Category: <span>${current.category}</span></p>
</article>
</a>`;

export async function searchPage(context){
    context.render(searchTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        let title  = document.getElementsByName('search')[0].value.trim();
        let allArticles = await getAllByTitle(title);
        context.render(searchTemplate(onSubmit, allArticles))
    }
}