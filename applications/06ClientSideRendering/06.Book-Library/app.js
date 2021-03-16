import { html, render } from 'https://unpkg.com/lit-html?module';
import { editBook, book, addBook, table } from './templates.js';
import { post, get, put, del, getCurrentBook } from './crud.js';

let editCurrentBook = false;
let tableForAllBooks = table();
let container = document.getElementsByTagName('body')[0];
render([tableForAllBooks, editCurrentBook ? editBook() : addBook()], container);

container.getElementsByTagName('button')[0].addEventListener('click', async () => {
    let allBooks = Object.entries(await get()).map(([k, v]) => {
        return {
            id: k,
            author: v.author,
            title: v.title
        }
    });
    let tbody = container.getElementsByTagName('tbody')[0];
    tbody.addEventListener('click', onClick);
    let allBooksInHTMl = allBooks.map(book);
    render(allBooksInHTMl, tbody)
});
document.getElementById('add-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let inputs = e.target.children;
    let title = inputs[2];
    let author = inputs[4];
    if (title.value.trim() == '' || author.value.trim() == '') {
        alert('All fields are required');
        return;
    }
    post({ title: title.value, author: author.value });
    title.value = '';
    author.value = '';
})

async function onClick(e) {
    if (e.target.tagName == 'BUTTON' && e.target.innerText == 'Delete') {
       let conf = confirm('Are you shure :?');
       if(conf){
           del(e.target.parentNode.id);
       }
    } else if (e.target.tagName == 'BUTTON' && e.target.innerText == 'Edit') {
        editCurrentBook = true;
        render([tableForAllBooks, editCurrentBook ? editBook() : addBook()], container);
        let currentBook =await getCurrentBook(e.target.parentNode.id);
        let inputs = document.getElementById('edit-form').children;
        inputs[3].value = currentBook.title;
        inputs[5].value = currentBook.author;
        document.getElementById('edit-form').addEventListener('submit',(ev)=> editForm(ev, e.target.parentNode.id))
    }
}

async function editForm(e, id){
    e.preventDefault();
      let inputs = e.target.children;
      let title = inputs[3];
      let author = inputs[5];
      if (title.value.trim() == '' || author.value.trim() == '') {
          alert('All fields are required');
          return;
      }
      await put(id, {title:title.value, author: author.value })
      title.value = '';
      author.value = '';
      editCurrentBook = false;
      render([tableForAllBooks, editCurrentBook ? editBook() : addBook()], container);
}
