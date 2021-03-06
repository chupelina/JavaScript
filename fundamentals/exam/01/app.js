function solve() {
   let form = document.querySelector('section > form');
   let posts = document.querySelector('.site-content > main >section');
   let btn = document.querySelector('section > form > button');
   let arhive = document.querySelector('aside > section > ol');
   let elements = [];
   btn.addEventListener('click', create)
   function create(e) {
      e.preventDefault();
      let paragraphs = form.children;
      let creator = paragraphs[0].children[1];
      let title = paragraphs[1].children[1];
      let category = paragraphs[2].children[1];
      let content = paragraphs[3].children[1];
      if (!creator.value.trim() || !title.value.trim() || !category.value.trim() || !content.value.trim()) {
         return;
      }
      let article = document.createElement('article');
      let h1 = createElement('h1', title.value);
      let pCategory = createElement('p', 'Category:', createElement('strong', category.value));
      let pCreator = createElement('p', 'Creator:', createElement('strong', creator.value));
      let pText = createElement('p', content.value);
      let divBtns = document.createElement('div');
      divBtns.setAttribute('class', 'buttons');
      let delBtn = document.createElement('button');
      delBtn.innerText='Delete';
      delBtn.setAttribute('class', 'btn delete');
      delBtn.addEventListener('click', () => posts.removeChild(article));
      let arhBtn = document.createElement('button');
      arhBtn.innerText = 'Archive';
      arhBtn.setAttribute('class', 'btn archive');
      arhBtn.addEventListener('click', () => {
         let title = article.children[0].innerText;
         article.parentNode.removeChild(article);
         let li = createElement('li', title);
         elements.push([title, li]);
         elements.sort((a, b) => a[0].localeCompare(b[0]))
            .forEach(e => arhive.appendChild(e[1]));
      });


      divBtns.appendChild(delBtn);
      divBtns.appendChild(arhBtn);
      article.appendChild(h1);
      article.appendChild(pCategory);
      article.appendChild(pCreator);
      article.appendChild(pText);
      article.appendChild(divBtns);
      posts.appendChild(article);
      creator.value = '';
      title.value = '';
      category.value = '';
      content.value = '';
   }

   function createElement(type, value, inner) {
      let current = document.createElement(type);
      current.innerText = value;
      if (inner) {
         current.appendChild(inner)
      }
return current
   }
}
