function encodeAndDecodeMessages() {
    let main = document.getElementById('main');

    main.addEventListener('click', message);

    function message(e) {
        if (e.target.tagName === 'BUTTON' && e.target.innerHTML === 'Encode and send it') {
            let input = e.target.parentNode.querySelector('textarea');
           let output = e.target.parentNode.parentNode.querySelector('div:nth-child(2)>textarea');
            output.value = encode(input.value);
            input.value='';
            
        } else if (e.target.tagName === 'BUTTON' && e.target.innerHTML === 'Decode and read it') {
            let output = e.target.parentNode.querySelector('textarea');
            let decodeMessage = decode(output.value);
            output.value = decodeMessage;
        }

    }

    function encode(text){
       let inElement = text.split('');
       let outElement =[];

       for (let i = 0; i < inElement.length; i++) {
          let n =Number(inElement[i].charCodeAt(0))+1;
          outElement.push(String.fromCharCode(n)); 
       }
       return outElement.join('');
    }

    function decode(text){
        let inElement = text.split('');
        let outElement =[];
 
        for (let i = 0; i < inElement.length; i++) {
           let n =Number(inElement[i].charCodeAt(0))-1;
           outElement.push(String.fromCharCode(n)); 
        }
        return outElement.join('');
    }
}