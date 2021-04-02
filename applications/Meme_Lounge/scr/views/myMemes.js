import { html } from '../../node_modules/lit-html/lit-html.js';

import { getAllMineMemes } from '../crud.js';

let myMemesTemplate = (allMemes, username, email, gender) => html`<!-- Profile Page ( Only for logged users ) -->
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${gender}.png">
        <div class="user-content">
            <p>Username: ${username}</p>
            <p>Email: ${email}</p>
            <p>My memes count: ${allMemes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${allMemes.length == 0 ? html`<p class="no-memes">No memes in database.</p>` : allMemes}
    </div>
</section>
`;

let memeCard = (meme) => html`<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/details/${meme._id}">Details</a>
</div>
`;


export async function myMemesPage(context) {
    let allMemes = await getAllMineMemes();
    let username = sessionStorage.getItem('username');
    let email = sessionStorage.getItem('email');
    let gender = sessionStorage.getItem('gender');
    context.render(myMemesTemplate(allMemes.map(memeCard), username, email, gender));

}