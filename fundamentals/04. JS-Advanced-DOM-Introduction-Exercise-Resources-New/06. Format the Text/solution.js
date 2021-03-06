function solve() {
  let input = document.getElementById('input').value;
  let array = input.split('.');
  let output = document.getElementById('output');
  let string = [];
  let curr = '';
  for (let i = 0; i < array.length; i++) {

    if (i % 3 === 0 && i !==0 || i === array.length-1) {
      string.push(curr);
      curr = '';
    }
    curr += array[i] + '.';

  }
  for (let i = 0; i < string.length; i++) {
    output.innerHTML+=`<p>${string[i]}</p>`
    
  }
}