function solve() {
  let text = document.getElementById('text').value;
  text = text.toLowerCase();
  let converting = document.getElementById('naming-convention').value;
  let result = '';
  let current = text.split(' ');
  if (converting.localeCompare('Camel Case') == 0) {
    result += current[0];
    for (let i = 1; i < current.length; i++) {
      let token = current[i];
      result += token[0].toUpperCase();
      result += token.slice(1,token.length);
    }
  } else if (converting.localeCompare('Pascal Case') == 0) {
    for (let i = 0; i < current.length; i++) {
      let token = current[i];
      result += token[0].toUpperCase() + token.slice(1,token.length);
    }
  } else {
    result = 'Error!';
  }
  let output = document.getElementById('result');
  output.innerHTML += result;
}