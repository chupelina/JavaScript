import { calledFromOderWorld } from './app.js';


function movieController(input, section, id) {
    if (input == 'getAll') {
        getAllMovies(section);
    } else if (input == 'Add Movie') {
        section.addEventListener('submit', (e) => addNewMovie(section, e));
    } else if (input == 'movie-example') {
        loadMovie(section, id);
        section.addEventListener('click', (e) => {
            if (e.target.tagName == "A") {
                if (e.target.textContent == 'Edit') {
                    section.style.display = 'none';
                    editCurrentFilm(e, id)
                } else if (e.target.textContent == 'Delete') {
                    deleteCurrentFilm(id)
                } else if (e.target.textContent == 'Like') {
                    likeCurrentFilm(id)
                }
            }
        })
    }
}
export {
    movieController,
}

async function getAllMovies(section) {
    let container = section.children[2].children[0].children[0];
    container.innerHTML = '';
    let response = await fetch('http://localhost:3030/data/movies')
    let data = await response.json();
    Object.values(data).map((d) => {
        container.innerHTML += makeMovieCard(d);
    })

}

function makeMovieCard(movie) {
    let current = `<div class="card mb-4">
  <img class="card-img-top" src="${movie.img}"
      alt="Card image cap" width="400">
  <div class="card-body">
      <h4 class="card-title">${movie.title}</h4>
  </div>
  <div class="card-footer">
      <a href="#/details/6lOxMFSMkML09wux6sAF">
          <button type="button" id="${movie._id}" class="btn btn-info">Details</button>
      </a>
  </div>
</div>`
    return current;
}

async function addNewMovie(section, e) {
    e.preventDefault();
    let form = new FormData(section.children[0]);
    let token = sessionStorage.getItem('token');
    let _ownerId = sessionStorage.getItem('userId');
    let title = form.get('title');
    let description = form.get('description');
    let img = form.get('imageUrl');

    if (title == '' || desription == '' || img == '') {
        alert('All fields are requierd');
        return;
    }

    let response = await fetch('http://localhost:3030/data/movies', {
        method: 'post',
        headers: { 'X-Authorization': token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ _ownerId, title, description, img })
    })
    calledFromOderWorld('home');
}

async function loadMovie(section, id) {
    section.innerHTML = '';
    let userId = sessionStorage.getItem('userId');
    let current = await fetch('http://localhost:3030/data/movies/' + id);
    let movie = await current.json();
    let cur = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    let likes = await cur.json();
    let shown = ` <div class="container">
   <div class="row bg-light text-dark">
       <h1>Movie title: ${movie.title}</h1>

       <div class="col-md-8">
           <img class="img-thumbnail" src="${movie.img}"
               alt="Movie">
       </div>
       <div class="col-md-4 text-center">
           <h3 class="my-3 ">Movie Description</h3>
           <p>${movie.description}</p>`
    if (movie._ownerId == sessionStorage.getItem('userId')) {
        shown += ` <a class="btn btn-danger" id="${movie._id}" href="#">Delete</a>
    <a class="btn btn-warning" href="#" id="${movie._id}" >Edit</a>
    <span class="enrolled-span">Liked ${likes}</span>
</div>
</div>
</div>`
    } else {
        shown += `  <a class="btn btn-primary" href="#" id="${movie._id}" >Like</a>
    <span class="enrolled-span">Liked ${likes}</span>
</div>
</div>
</div>`
    }
    section.innerHTML = shown;

}

async function deleteCurrentFilm(id) {
    let token = sessionStorage.getItem('token');
    let response = await fetch('http://localhost:3030/data/movies/' + id, {
        method: 'delete',
        headers: { 'X-Authorization': token, 'Content-Type': 'application/json' }
    })
    calledFromOderWorld('home')
}
async function editCurrentFilm(e, id) {
    e.preventDefault();
    let edit = document.getElementById('edit-movie');
    let current = await fetch('http://localhost:3030/data/movies/' + id);
    let movie = await current.json();
    edit.style.display = 'block';
    let title = edit.children[0].children[1].children[1];
    title.value = movie.title;
    let description = edit.children[0].children[2].children[1];
    description.value = movie.description;
    let img = edit.children[0].children[3].children[1];
    img.value = movie.img;
    edit.children[0].addEventListener('submit', (e) => saveNewFilm(e, id))

}
async function saveNewFilm(e, id) {
    let token = sessionStorage.getItem('token');
    e.preventDefault();
    let form = new FormData(e.target);
    let title = form.get('title');
    let description = form.get('description');
    let img = form.get('imageUrl');

    if (title == '' || description == '' || img == '') {
        alert('all fields are requierd!');
        return;
    }
    let a = await fetch('http://localhost:3030/data/movies/' + id, {
        method: 'put',
        headers: { 'X-Authorization': token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, img })
    })
    calledFromOderWorld('home');
}


async function likeCurrentFilm(id) {
    let token = sessionStorage.getItem('token');
    let userId = sessionStorage.getItem('userId');
    let response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22`, {
        method: 'get',
        headers: { 'X-Authorization': token },
    })
    let a = await response.json();
    console.log(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22`);
}