function search() {
 let towns =Array.from(document.getElementsByTagName('ul')[0].children);
 console.log(towns);
 let surching = document.getElementById('searchText').value;
 console.log(surching);
 let result = document.getElementById('result');
 let count = 0;
for (const li of towns) {
  if((li.textContent).toLowerCase().includes(surching.toLowerCase())){
    li.style.fontWeight = 'bold';
    li.style.textDecoration = 'underline';
    count++;
  }else{
   li.style.fontWeight = '';
   li.style.textDecoration = '';
  }
}
result.textContent = count+ ' matches found';
}
