function notify(message) {
  let notification = document.getElementById('notification');
     notification.style.display = 'block';
     notification.innerText = message;
     notification.addEventListener('click', hideMe);

  function hideMe(e){
     notification.style.display= 'none';
  }
}