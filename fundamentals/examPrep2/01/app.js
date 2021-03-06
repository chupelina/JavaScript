function solution() {
    let container = document.querySelector('body>div');
    let addingGiftContainer = container.children[0];
    let listOfGiftsContainer = container.children[1];
    let sentGiftsContainer = container.children[2];
    let discardedGiftsContainer = container.children[3];
    let orderdLiElementsinGift = [];
    let orderdLiElementsinSend= [];
    let orderdLiElementsinDisc = [];

    container.addEventListener('click', buttonManioutalions);
    function buttonManioutalions(e) {
        if (e.target.tagName === 'BUTTON') {
            e.preventDefault();
            if (e.target.innerText === 'Add gift') {
                addingGift(e);
            } else if (e.target.innerText === 'Send') {
                sendGift(e);
            } else if (e.target.innerText === 'Discard') {
                discardGift(e);
            }
        }
    }
    function addingGift(e) {
        let giftName = addingGiftContainer.children[1].children[0].value;
        addingGiftContainer.children[1].children[0].value = '';
        let ulInListOfGifts = listOfGiftsContainer.children[1];
        let liEl = makeLi(giftName);
        orderdLiElementsinGift[giftName] = liEl;
         Object.entries(orderdLiElementsinGift).filter(key=> Array.from(key[1].children).length>1).sort((key1, key2)=> key1[0].localeCompare(key2[0]))
         .forEach(e=> ulInListOfGifts.appendChild(e[1]));
             
    }
    function sendGift(e) {
     let liEl =  e.target.parentElement;
     let ul= liEl.parentElement;
     ul.removeChild(liEl);
     liEl.removeChild(liEl.children[0]);
     liEl.removeChild(liEl.children[0]); 
     orderdLiElementsinSend[liEl.innerText]= liEl;
     let ulInSend = sentGiftsContainer.children[1];
     ulInSend.appendChild(liEl); 
     
    }
    function discardGift(e) {
    let liEl =  e.target.parentElement;
     let ul= liEl.parentElement;
     ul.removeChild(liEl);
     liEl.removeChild(liEl.children[0]);
     liEl.removeChild(liEl.children[0]);
     orderdLiElementsinDisc[liEl.innerText]= liEl;
     let ulInSend = discardedGiftsContainer.children[1];
     ulInSend.appendChild(liEl); 

    }
    function makeLi(textFromAdding) {
        let liElement = document.createElement('li');
        liElement.className = 'gift';
        liElement.innerText = textFromAdding;
        let sendButton = document.createElement('button');
        sendButton.innerText = "Send"
        sendButton.setAttribute('id', 'sendButton');
        liElement.appendChild(sendButton);
        let discardButton = document.createElement('button');
        discardButton.setAttribute('id', 'discardButton')
        discardButton.innerText = 'Discard';
        liElement.appendChild(discardButton);
        return liElement;
    }
}