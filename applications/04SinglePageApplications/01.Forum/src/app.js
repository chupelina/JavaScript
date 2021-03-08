
function appController() {
    document.getElementsByTagName('main')[0].style.display = 'block';
    document.getElementsByTagName('main')[1].style.display = 'none';
    document.getElementsByTagName('button')[1].addEventListener('click', addPost);
    document.getElementsByTagName('button')[0].addEventListener('click', cencelPost);
    getAllPosts();
}
appController();

async function addPost(e) {
    e.preventDefault();
    let form = new FormData(e.target.parentNode.parentNode);
    let newTopic = {
        title: form.get('topicName'),
        username: form.get('username'),
        post: form.get('postText'),
        time: (new Date(Date.now())).toISOString().replace('T',' ').slice(0,19),
        subscribers: (Math.random() * 100).toFixed(0),
        likes:(Math.random() * 10).toFixed(0)
    }

    if (newTopic.title.trim() == '' || newTopic.username.trim() == ''
        || newTopic.post.trim() == '' || !newTopic.title
        || !newTopic.username || !newTopic.post) {
        alert('All fields are required!');
        return;
    }

    let post = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: 'post',
        head: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTopic)
    })
    let response = await post;
    if (!response.ok) {
        alert(response.statusText);
        return;
    } else {
        getAllPosts()
        e.target.parentNode.parentNode.reset();
    }
}

function cencelPost(e) {
    document.querySelector('form').reset();
    getAllPosts()
}

async function getAllPosts() {
    let newTitles = document.querySelector('div.topic-title');
    newTitles.innerHTML = '';
    let post = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
    let result = await post.json();
    Object.entries(result).map(([k, v]) => {
        newTitles.innerHTML += formatCurrentArticle(v)
    })

    document.querySelectorAll('a').forEach(a => a.addEventListener('click', redirectTo));
}

function formatCurrentArticle(article) {

    const newPostFromWeb = `
         <div class="topic-container">
         <div class="topic-name-wrapper">
             <div class="topic-name">
                 <a href="#" id="${article._id}" class="normal">
                     <h2>${article.title}</h2>
                 </a>
                 <div class="columns">
                     <div>
                         <p>Date: <time>${article.time}</time></p>
                         <div class="nick-name">
                             <p>Username: <span>${article.username}</span></p>
                         </div>
                     </div>
                     <div class="subscribers">
                         <!-- <button class="subscribe">Subscribe</button> -->
                         <p>Subscribers: <span>${article.subscribers}</span></p>
                     </div>
                 </div>
             </div>
         </div>
     </div>`;
    return newPostFromWeb;
}

function redirectTo(e) {
    e.preventDefault();
    if (e.target.textContent == 'Home') {
        document.querySelector('main.new-topic-border').style.display = 'block';
        document.querySelector('main.theme-content').style.display = 'none';
        getAllPosts();
    } else{
        document.querySelector('main.new-topic-border').style.display = 'none';
        document.querySelector('main.theme-content').style.display = 'block';
        loadCurrentArticle(e , e.target.parentNode);
    }
}

async function loadCurrentArticle(e, aTag) {
    let post = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts/' + aTag.id);
    let data = await post.json();
    let bigDiv = document.querySelector('div.theme-content');
    bigDiv.innerHTML = '';
    let currentTitle = ` <div class="theme-title">
    <div class="theme-name-wrapper">
        <div class="theme-name">
            <h2>${data.title}</h2>
            <p>Date: <time>${data.time}</time></p>
        </div>
        <div class="subscribers">
            <p>Subscribers: <span>${data.subscribers}</span></p>
            <!-- <button class="subscribe">Subscribe</button>
                <button class="unsubscribe">Unsubscribe</button> -->
        </div>
    </div>
</div>`
  let bigArticle = `<div class="comment">
  <header class="header">
      <p><span>${data.username}</span> posted on <time>${data.time}</time></p>
  </header>
  <div class="comment-main">
      <div class="userdetails">
          <img src="./static/profile.png" alt="avatar">
      </div>
      <div class="post-content">
         <p>${data.post}</p>
      </div>
  </div>
  <div class="footer">
      <p><span>${data.likes}</span> likes</p>
  </div>
</div>`
    let comments =await getAllComments(e ,aTag.id);
    let form =`             <div class="answer-comment">
    <p><span>currentUser</span> comment:</p>
    <div class="answer">
        <form>
            <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
            <div>
                <label for="username">Username <span class="red">*</span></label>
                <input type="text" name="username" id="username">
            </div>
            <button>Post</button>
        </form>
    </div>

</div>`;
   bigDiv.innerHTML = currentTitle+ bigArticle+ comments + form;
   document.querySelector('div.answer > form').addEventListener('submit', (ev) => sendComment(ev, aTag, e));
}

async function sendComment(e, aTag, bigEvent) {
    e.preventDefault();
    let form = new FormData(e.target);
    if (form.get('username').trim() == '' || form.get('postText').trim() == '') {
        alert('All fields are requierd');
        return;
    }
    let comment = {
        ownerId: aTag.id,
        username: form.get('username'),
        postText: form.get('postText'),
        likes: (Math.random() * 10).toFixed(0),
        date: (new Date(Date.now())).toISOString().replace('T',' ').slice(0,19)
    }
    await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });
    e.target.reset();
    loadCurrentArticle(bigEvent, aTag)
}

async function getAllComments(e , id){
    let data = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');
    let comments = await data.json();
    let currentComments='';
    Object.entries(comments).map(([k,v])=>{
        console.log(v.ownerId==id)
        if(v.ownerId==id){
            currentComments+=`<div class="comment">
            <header class="header">
                <p><span>${v.username}</span> posted on <time>${v.date}</time></p>
            </header>
            <div class="comment-main">
                <div class="userdetails">
                    <img src="./static/profile.png" alt="avatar">
                </div>
                <div class="post-content">
                    <p>${v.postText}</p>
                </div>
            </div>
            <div class="footer">
                <p><span>${v.likes}</span> likes</p>
            </div>
        </div>`;
        }
    });
  return currentComments;
}