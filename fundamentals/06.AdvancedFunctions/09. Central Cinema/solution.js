function solve() {
    let clear = document.querySelector('#archive>button');
    let parrentElement = document.getElementById('container');
    let moviesUl = document.querySelector('#movies>ul');
    let archiveUl = document.querySelector('#archive>ul');
    let onScreen = document.querySelector('#container>button')
    onScreen.addEventListener('click', onClick);
    function onClick(e) {
        e.preventDefault();
        let tokens = parrentElement.children;
        let name = tokens[0];
        let hall = tokens[1];
        let price = tokens[2];
        if (!name.value || !hall.value || !Number(price.value)) {
            return
        }
        let liElement = document.createElement('li');
        appending('span', name.value, liElement);
        appending('strong', `Hall: ${hall.value}`, liElement)
        let divElement = document.createElement('div');
        appending('strong', Number(price.value).toFixed(2), divElement);
        let input = document.createElement('input');
        input.placeholder = 'Tickets Sold';
        divElement.appendChild(input);
        let button = document.createElement('button');
        button.innerText = 'Archive';
        divElement.appendChild(button);
        button.addEventListener('click', archive);
        liElement.appendChild(divElement);
        moviesUl.appendChild(liElement);
        name.value = '';
        hall.value = '';
        price.value = '';
    }

    clear.addEventListener('click', clearing);
    function clearing(element) {
      let allElements = Array.from(archiveUl.children);
      for (let i = 0; i < allElements.length; i++) {
          archiveUl.removeChild(allElements[i]);
          
      }
    }

    function appending(type, value, parrent) {
        let curentElement = document.createElement(type);
        curentElement.textContent = value;
        parrent.appendChild(curentElement);
    }
    function archive(e) {
        let div =e.target.parentElement;
        let input = div.children[1];
        if(!Number.isInteger(Number(input.value)) || Number(input.value)===0){
            return;
        }
        let liElement = div.parentElement;
        let name = liElement.children[0].innerText;
        let price = div.children[0].innerText;
        let luElement = liElement.parentElement;
        let total = Number(price)*Number(input.value);
        liElement.remove();
        
        let li = document.createElement('li');
        appending('span', name, li);
        appending('strong', `Total amount: ${total.toFixed(2)}`, li);
        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', deleteFunc);
        li.appendChild(deleteBtn);
        archiveUl.appendChild(li);
       console.log(name, price);

    }
    function deleteFunc(e){
       let li =  e.target.parentElement;
       archiveUl.removeChild(li);
    }
}