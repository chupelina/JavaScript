function create(words) {
   let parrent =  document.getElementById('content');
   parrent.addEventListener('click', onclick);
   console.log(parrent);
   words.map(word=> {
      let divEl = document.createElement('div');
     let pElement = document.createElement('p');
     pElement.innerText = word;
     pElement.style.display = 'none';
     divEl.appendChild(pElement);
     parrent.appendChild(divEl);
   })

   function onclick(e){
      let current = Array.from(e.target.children)[0];
      isVisible = current.style.display==='block'
      current.style.display = isVisible? 'none': 'block';
   }
}