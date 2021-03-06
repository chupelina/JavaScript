function solve() {
  const [inputArea, outputArea] = document.getElementsByTagName('textarea');
  const [generateButton, buyButton] = document.getElementsByTagName('button');

  const tableBody = document.getElementsByTagName('tbody')[0];
  let furniture = [];

  generateButton.addEventListener('click', () => {
      let input = JSON.parse(inputArea.value);
      inputArea.value = '';

      input.forEach(data => {
          // image
          let imageElement = document.createElement('img');
          imageElement.setAttribute('src', data.img)
          let imageData = document.createElement('td');
          imageData.appendChild(imageElement);

          // name
          let nameParagraph = document.createElement('p');
          nameParagraph.textContent = data.name;
          let nameData = document.createElement('td');
          nameData.appendChild(nameParagraph);

          // price
          let priceParagraph = document.createElement('p');
          priceParagraph.textContent = data.price;
          let priceData = document.createElement('td');
          priceData.appendChild(priceParagraph);

          // decoration factor
          let decorationParagraph = document.createElement('p');
          decorationParagraph.textContent = data.decFactor;
          let decorationData = document.createElement('td');
          decorationData.appendChild(decorationParagraph);

          // checkbox
          let checkbox = document.createElement('input');
          checkbox.setAttribute('type', 'checkbox');
          let checkboxData = document.createElement('td');
          checkboxData.appendChild(checkbox);

          let tableRow = document.createElement('tr');
          tableRow.appendChild(imageData);
          tableRow.appendChild(nameData);
          tableRow.appendChild(priceData);
          tableRow.appendChild(decorationData);
          tableRow.appendChild(checkboxData);

          tableBody.appendChild(tableRow);
      });
  });

  buyButton.addEventListener('click', () => {
      let rows = Array.from(tableBody.children);
      furniture = [];
      rows.forEach(data => {
          if(data.children[4].children[0].checked) {
              furniture.push({
                  name: data.children[1].children[0].textContent,
                  price: Number(data.children[2].children[0].textContent),
                  decoration: Number(data.children[3].children[0].textContent)
              });
          }
      });

      let names = furniture.map(x => x.name);
      let totalPrice = furniture.reduce((a, x) => a + x.price, 0);
      let decorationFactor = furniture.reduce((a, x) => a + x.decoration, 0);
      decorationFactor /= furniture.length;

      outputArea.value = `Bought furniture: ${names.join(', ')}\n`;
      outputArea.value += `Total price: ${totalPrice.toFixed(2)}\n`;
      outputArea.value += `Average decoration factor: ${decorationFactor}`;
  });
}