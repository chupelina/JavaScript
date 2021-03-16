import { html, render } from 'https://unpkg.com/lit-html?module';

async function getAllItems(){
  return await(await fetch('http://localhost:3030/jsonstore/advanced/dropdown')).json();
}

let currentData = (data)=> html`<option value=${data._id}>${data.text}</option>`


async function addItem() {
 let allItems =Object.values(await getAllItems());
    let container = document.getElementById('menu');
     render(allItems.map(currentData), container);
}
addItem();
document.getElementsByTagName('form')[0].addEventListener('submit', (e)=>{
    e.preventDefault();
    let input = e.target.getElementsByTagName('input')[0];
    if(input.value.trim()!=''){
       sendToTheServer(input.value); 
       addItem(); 
       input.value='';
    }
})


async function sendToTheServer(value){
    await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method:"post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text:value})
    })
}