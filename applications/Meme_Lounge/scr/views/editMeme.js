import { html } from '../../node_modules/lit-html/lit-html.js';

import {getCurrentMeme, editMeme} from '../crud.js'
import {notify} from  '../notification.js'

let editTemplate = (meme ,onEdit) => html`   <!-- Edit Meme Page ( Only for logged user and creator to this meme )-->
<section id="edit-meme">
    <form id="edit-form" @submit=${onEdit}>
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}>
                    Programming is often touted as a smart and lucrative career path.
                    It's a job that (sometimes) offers flexibility and great benefits.
                    But it's far from sunshine and Nyan Cat rainbows. The hours are long.
                    The mistakes are frustrating. And your eyesight is almost guaranteed to suffer.
                    These memes cover most of the frustration (and funny moments) of programming.
                    At least we can laugh through the pain. 
                </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`;

export async function editPage(context){
    let id = context.state.path.split('/')[2];
    let currentMeme = await getCurrentMeme(id);

    context.render(editTemplate(currentMeme , onEdit));

    async function onEdit(event){
        event.preventDefault();
        let title =  document.getElementById('title').value.trim();
        let description =  document.getElementById('description').value.trim();
        let imageUrl =  document.getElementById('imageUrl').value.trim();

        try{
             if(title=='' || description=='' || imageUrl==''){
            throw new Error('All fields are required!');
        }
        await editMeme(id ,title, description, imageUrl);
        context.page.redirect('/allMemes');
        }catch(err){
            notify(err);
        }
       

    }

}