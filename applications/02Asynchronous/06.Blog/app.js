function attachEvents() {
    let btnLoad = document.getElementById('btnLoadPosts');
    btnLoad.addEventListener('click', () => dropDown());
    let veiw = document.getElementById('btnViewPost');
    veiw.addEventListener('click', () => loadDetails());
}

attachEvents();

async function dropDown() {
    let select = document.getElementById('posts');
    select.innerHTML = '';
    const url = 'http://localhost:3030/jsonstore/blog/posts';
    const response = await fetch(url);

    const data = await response.json();

    Object.values(data).map(d => {
        let opt = document.createElement('option');
        opt.value = d.id;
        opt.innerText = d.title;
        select.appendChild(opt);
    })
}

async function loadDetails() {
    let selectedId = document.getElementById('posts').value;
    const url = 'http://localhost:3030/jsonstore/blog/posts/' +
        selectedId;
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

    const [body, comments] = await Promise.all([
        fetch(url),
        fetch(commentsUrl)
    ]);

    let bodyData = await body.json();
    document.getElementById('post-title').innerText = bodyData.title;
    document.getElementById('post-body').innerText = bodyData.body;

    let commentsData = await comments.json();
    let ul = document.getElementById('post-comments');
    ul.innerHTML = '';
    let currentComments = Object.entries(commentsData).map(c => {
        if (c[1].postId == selectedId) {
            let li = document.createElement('li');
            li.innerText = c[1].text;
            ul.appendChild(li);
        }
    }
    );

}