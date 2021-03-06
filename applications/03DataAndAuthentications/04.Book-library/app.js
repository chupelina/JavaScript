async function crud(url, options) {
    const address = await fetch(url, options);
    const result = await address.json();
    return result;
}

function control() {
    document.getElementById('loadBooks').addEventListener('click', loadAllBooks);
    document.getElementById('creat').addEventListener('submit', (e) => creatNewBook(e));
    document.getElementById('body').addEventListener('click', (e) => {
        if (e.target.innerText == 'Delete' && e.target.tagName == "BUTTON") {
            deleteBook(e);
        } else if (e.target.innerText == 'Edit' && e.target.tagName == "BUTTON") {
            editBook(e);
        }
    })
}
control();

async function loadAllBooks() {
    const result = await crud('http://localhost:3030/jsonstore/collections/books');
    let tbody = document.getElementById('body');
    tbody.innerHTML = '';
    Object.entries(result).map((b) => {
        let row = document.createElement('tr');
        let thTitle = document.createElement('th');
        thTitle.innerText = b[1].title;
        let thAuthor = document.createElement('th');
        thAuthor.innerText = b[1].author;
        let buttons = document.createElement('th');
        let edit = document.createElement('button');
        edit.id = b[0];
        edit.innerText = 'Edit';
        buttons.appendChild(edit);
        let deleteBTN = document.createElement('button');
        deleteBTN.id = b[0];
        deleteBTN.innerText = 'Delete';
        buttons.appendChild(deleteBTN);
        row.appendChild(thTitle);
        row.appendChild(thAuthor);
        row.appendChild(buttons);
        tbody.appendChild(row);
    })

}
async function creatNewBook(e) {
    e.preventDefault();
    let form = new FormData(document.getElementById('creat'));
    if (form.get('title').trim() == '' || form.get('author').trim() == '') {
        alert('All fields are requierd!');
        return;
    }
    let title = form.get('title');
    let author = form.get('author');
    await crud('http://localhost:3030/jsonstore/collections/books', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "author": author,
            "title": title
        }),
    });
    document.querySelectorAll('form>input').forEach(e => e.value = '');
    loadAllBooks();
}
async function deleteBook(e) {
    let yes = confirm('Are you shure?');
    if (yes) {
        await crud('http://localhost:3030/jsonstore/collections/books/' + e.target.id, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' }
        })
        loadAllBooks();
    }
}
async function editBook(e) {
    e.preventDefault();
    document.getElementById('creat').style.display = 'none';
    document.getElementById('edit').style.display = 'block';
    let currentBook = await crud('http://localhost:3030/jsonstore/collections/books/' + e.target.id);

    let author = document.getElementById('author');
    author.value = currentBook.author;
    let title = document.getElementById('title');
    title.value = currentBook.title;
    document.getElementById('edit').addEventListener('submit', (ev)=>changeBook(ev, e.target.id));
    loadAllBooks();

}

async function changeBook(e , id){
    e.preventDefault();
    let form = new FormData(document.getElementById('edit'));
    if (form.get('title').trim() == '' || form.get('author').trim() == '') {
        alert('All fields are requierd!');
        return;
    }
    let title = form.get('title');
    let author = form.get('author');
    console.log(id)
    await crud('http://localhost:3030/jsonstore/collections/books/'+id, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "author": author,
            "title": title })
    });
    document.querySelectorAll('form>input').forEach(e => e.value = '');
    loadAllBooks();
    document.getElementById('creat').style.display = 'block';
    document.getElementById('edit').style.display = 'none';
}