function addItem() {
    let text = document.getElementById('newItemText');
    let textValue = document.getElementById('newItemValue');
    console.log(text);
    console.log(textValue);

    let menu = document.getElementById('menu');
     let optionEl =document.createElement('option');

    optionEl.textContent = text.value;
    optionEl.value = textValue.value;  
    menu.appendChild(optionEl);
    text.value = '';
    textValue.value = '';
}