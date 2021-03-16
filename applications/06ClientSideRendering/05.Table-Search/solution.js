import { html, render } from 'https://unpkg.com/lit-html?module';

let student = (student) => html`<tr>
   <td>${student.firstName} ${student.lastName}</td>
   <td>${student.email}</td>
   <td>${student.course}</td>
</tr>`

let container = document.getElementsByTagName('tbody')[0];

async function getAllStudents() {
   let result = await (await fetch('http://localhost:3030/jsonstore/advanced/table')).json();
   return Object.values(result);
}

async function solve() {
   let students = await getAllStudents();
   render(students.map(student), container);
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick(e) {
      e.preventDefault();
      let input = e.target.parentNode.children[0];
      let rows = [...container.children]

      for (let row in rows) {
         let constainsIt = false;
         let current = rows[row].children;

         for (let sell in current) {
            let text = current[sell].innerText;
            if (!text) {
               break;
            }
            if (text.toLowerCase().includes(input.value.toLowerCase())) {
               constainsIt = true;
            }
         }
         constainsIt ? rows[row].classList.add('select') : rows[row].classList.remove('select');
      }
       input.value='';
   }
}
solve();