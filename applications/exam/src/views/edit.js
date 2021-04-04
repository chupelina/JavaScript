import { html } from '../../node_modules/lit-html/lit-html.js';

import {getArticleById, editArticle} from '../crud.js';

let editTemplate = (current ,onSubmit)=> html`   <section id="edit-page" class="content">
<h1>Edit Article</h1>

<form id="edit" @submit=${onSubmit}>
    <fieldset>
        <p class="field title">
            <label for="title">Title:</label>
            <input type="text" name="title" id="title" placeholder="Enter article title" .value=${current.title}>
        </p>

        <p class="field category">
            <label for="category">Category:</label>
            <input type="text" name="category" id="category" placeholder="Enter article category" .value=${current.category}>
        </p>
        <p class="field">
            <label for="content">Content:</label>
            <textarea name="content" id="content" .value=${current.content}></textarea>
        </p>

        <p class="field submit">
            <input class="btn submit" type="submit" value="Save Changes">
        </p>

    </fieldset>
</form>
</section>`;

export async function editPage(context){
    let id = context.params.id;
    let current = await getArticleById(id);
    let categories = ["JavaScript", "C#", "Java", "Python"];


    context.render(editTemplate(current , onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        let category  = document.getElementsByName('category')[0].value.trim();
        let content  = document.getElementsByName('content')[0].value.trim();
        let title  = document.getElementsByName('title')[0].value.trim();

        if(category=='' || content=='' || title==''){
            alert('All fields are requerd!');
            return;
        }
        if(!categories.includes(category)){
          alert('Please enter some valid caregory!');
          return;
        }
        await editArticle(id, title, category, content);
        context.page.redirect('/details/'+id);
    }
}