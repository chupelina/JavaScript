import { html } from '../../node_modules/lit-html/lit-html.js';

import { getAllArticlesForHome } from '../crud.js';

let homeTemplate = (java, js, c, p) => html`<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
        <h2>JavaScript</h2>
        ${article(js)}
    </section>
    <section class="recent csharp">
        <h2>C#</h2>
        ${article(c)}
    </section>
    <section class="recent java">
        <h2>Java</h2>
        ${article(java)}
    </section>
    <section class="recent python">
        <h2>Python</h2>
        ${article(p)}
    </section>

</section>`;

let article = (current) => current ? html`<article>
        <h3>${current.title}</h3>
        <p>${current.content}</p>
        <a href="/details/${current._id}" class="btn details-btn">Details</a>
    </article>`: html` <h3 class="no-articles">No articles yet</h3>`;

export async function homePage(context) {
    let articles = await getAllArticlesForHome();
    let javaArticle = articles.filter(a => a.category == 'Java')[0];
    let javaScriptArticle = articles.filter(a => a.category == 'JavaScript')[0];
    let cArticle = articles.filter(a => a.category == 'C#')[0];
    let pythonArticle = articles.filter(a => a.category == 'Python')[0];
    context.render(homeTemplate(javaArticle, javaScriptArticle, cArticle, pythonArticle));
}