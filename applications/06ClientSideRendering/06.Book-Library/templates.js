import { html, render } from 'https://unpkg.com/lit-html?module';

let book = (book) => html` <tr>
<td>${book.title}</td>
<td>${book.author}</td>
<td id=${book.id}>
    <button>Edit</button>
    <button>Delete</button>
</td>
</tr>`;

let addBook= ()=>html` <form id="add-form">
<h3>Add book</h3>
<label>TITLE</label>
<input type="text" name="title" placeholder="Title...">
<label>AUTHOR</label>
<input type="text" name="author" placeholder="Author...">
<input type="submit" value="Submit">
</form>`;

let editBook= ()=> html `<form id="edit-form">
<input type="hidden" name="id">
<h3>Edit book</h3>
<label>TITLE</label>
<input type="text" name="title" placeholder="Title...">
<label>AUTHOR</label>
<input type="text" name="author" placeholder="Author...">
<input type="submit" value="Save">
</form>`;

let table =()=> html` <button id="loadBooks">LOAD ALL BOOKS</button>
 <table>
<thead>
    <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
    </tr>
</thead>
<tbody>
</tbody>
</table>`
export{
    book,
    addBook,
    editBook,
    table
}