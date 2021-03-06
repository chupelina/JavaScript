function getArticleGenerator(articles) {
    let content = document.getElementById('content');
    return  function showNext() {
        if(articles.length==0){
            return;
        }
        let div = document.createElement('article');
        div.innerText = articles.shift();
        content.appendChild(div);
    }
}

// function getArticleGenerator(articles) {
//     let content = document.getElementById("content");
 
//     return next = () => {
//         let first = articles.shift();
//         if (first != undefined) {
//             let article = document.createElement("article");
//             article.textContent += first;
//             content.appendChild(article)
//             return content
//         }
//     }
// }