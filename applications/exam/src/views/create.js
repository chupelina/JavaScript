import { html } from '../../node_modules/lit-html/lit-html.js';

import {createArticle} from '../crud.js'

let createTemplate= (onSubmit)=> html`<section id="create-page" class="content">
<h1>Create Article</h1>

<form id="create" @submit=${onSubmit}>
    <fieldset>
        <p class="field title">
            <label for="create-title">Title:</label>
            <input type="text" id="create-title" name="title" placeholder="Enter article title">
        </p>

        <p class="field category">
            <label for="create-category">Category:</label>
            <input type="text" id="create-category" name="category" placeholder="Enter article category">
        </p>
        <p class="field">
            <label for="create-content">Content:</label>
            <textarea name="content" id="create-content"></textarea>
        </p>

        <p class="field submit">
            <input class="btn submit" type="submit" value="Create">
        </p>

    </fieldset>
</form>
</section>`

export function createPage(context){
    context.render(createTemplate(onSubmit));

    let categories = ["JavaScript", "C#", "Java", "Python"];
    
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
       await createArticle(title, category, content);
       context.page.redirect('/');

    }

}