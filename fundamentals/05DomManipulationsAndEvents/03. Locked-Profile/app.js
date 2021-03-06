function lockedProfile() {
    let main = document.getElementById('main');
    main.addEventListener('click', onClick);

    function onClick(e) {
        if (e.target.tagName === 'BUTTON') {
            const profile = e.target.parentNode;
            const isLocked = profile.querySelector('input[type=radio]:checked').value === 'lock';
            if (isLocked) {
                return;
            }
            let div = profile.querySelector('div');
            let isVisible = div.style.display === 'block';
            div.style.display = isVisible ? 'none' : 'block';
            e.target.textContent = isVisible ? 'Show more' : 'Hide it';
        }
        // let currentUser = e.target.parentElement;
        // let listElemnts = currentUser.children;
        // let button = listElemnts[10];
        // if (button.innerHTML == 'Show more' && !listElemnts[2].checked) {
        //     button.addEventListener('click', showingInfo);
        // } else if (button.innerHTML == 'Hide it' && !listElemnts[2].checked) {
        //     button.addEventListener('click', hiddingInfo);
        // }
    }

    // function showingInfo(e) {
    //     let c = e.target.parentElement;
    //     c.children[9].style.display = "block";
    //     e.target.innerHTML = 'Hide it';
    //     c.children[2].checked = true;
    // }
    // function hiddingInfo(e) {
    //     let c = e.target.parentElement;
    //     c.children[9].style.display = "none";
    //     e.target.innerHTML = 'Show more';
    //     c.children[2].checked = true;
    // }
}