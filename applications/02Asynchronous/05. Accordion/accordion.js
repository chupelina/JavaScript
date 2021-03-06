async function loadAllTitles() {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const response = await fetch(url);
    const result = await response.json();


    const main = document.getElementById('main');
    Object.values(result).map(article => createArticle(article, main));
}

loadAllTitles();


function createArticle(article, main) {
    const container = document.createElement('div');
    container.className = 'accordion';
    let div = document.createElement('div');
    div.className = 'head';
    let span = document.createElement('span');
    span.innerText = article.title;
    div.appendChild(span);
    let btn = document.createElement('button');
    btn.className = 'button';
    btn.id = article._id;
    btn.innerText = "More";
    btn.addEventListener('click', (e)=>showMore(e, container));
    div.appendChild(btn);
    container.appendChild(div);
    main.appendChild(container);
}

async function showMore(e, container) {
    
    if(e.target.innerText=="MORE"){
    const url = 'http://localhost:3030/jsonstore/advanced/articles/details/'
    +e.target.id;
    const response = await fetch(url);
    const result = await response.json();
    console.log(result)
    let div = document.createElement('div');
    div.className="extra";
    let p = document.createElement('p');
    p.innerText = result.content;
    div.appendChild(p);
    container.appendChild(div);
    e.target.innerText='LESS';
     
    }else if (e.target.innerText== "LESS"){
       container.children[1].remove();
       e.target.innerText="MORE";
    }
}