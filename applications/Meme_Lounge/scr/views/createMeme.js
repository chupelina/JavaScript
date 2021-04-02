import { html } from '../../node_modules/lit-html/lit-html.js';

import { createMeme } from '../crud.js'
import {notify} from  '../notification.js'

let createTemplate = (onSubmit) => html`<!-- Create Meme Page ( Only for logged users ) -->
<section id="create-meme">
    <form id="create-form" @submit=${onSubmit}>
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`;

export function createPage(context) {
    context.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        let title = document.getElementById('title').value.trim();
        let description = document.getElementById('description').value.trim();
        let imageUrl = document.getElementById('imageUrl').value.trim();

        try {
            if (title == '' || description == '' || imageUrl == '') {
                throw new Error('All fields are required!');
            }
            await createMeme(title, description, imageUrl);
            context.page.redirect('/allMemes');

        } catch (err) {
           notify(err)
        }
    }

}