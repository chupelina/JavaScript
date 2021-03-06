function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      let search = document.getElementById('searchField').value;
      let listOfElements = document.querySelectorAll('tbody>tr');
      for (const li of listOfElements) {
         if (li.textContent.toLowerCase().includes(search.toLowerCase())) {
            li.classList.add('select');
         } else {
            li.removeAttribute('class');
         }
      }
   }
}