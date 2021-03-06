function solve() {
    let lecture = document.querySelector('input[name="lecture-name"]');
    let dateTime = document.querySelector('input[name="lecture-date"]');
    let module = document.querySelector('select[name="lecture-module"]');
    let button = document.querySelector('form button');
    let newLecture = document.querySelector('div[class = "modules"]');
    button.addEventListener('click', addingNewLecture);
    let liInUl = {};

    function addingNewLecture(e) {
        e.preventDefault();
        if (!lecture.value || !dateTime.value || module.value == "Select module") {
            return;
        }
        let lectures = newLecture.children;
        let currentDiv;

        Array.from(lectures).forEach(div => {
            if (div.children[0].innerText === module.value.toUpperCase() + "-MODULE") {
                currentDiv = div;
            }
        })
        let [date, time] = dateTime.value.split('T');
        let s = date.split("-").join("/") + ' - ' + time;
        let li;
        if (currentDiv == undefined) {
            currentDiv = document.createElement('div');
            currentDiv.className = "module";
            let h3El = create('h3', currentDiv);
            h3El.innerText = module.value.toUpperCase() + "-MODULE";
            currentDiv.appendChild(h3El);
            let ulElement = document.createElement('ul');
            li = createLiElement(`${lecture.value} - ${s}`);
            liInUl[ulElement]= [];
            liInUl[ulElement].push({date: s, l: li});
            currentDiv.appendChild(ulElement);
            newLecture.appendChild(currentDiv);
        } else {

            let current = `${lecture.value} - ${s}`;
            li = createLiElement(current);
            liInUl[currentDiv.children[1]].push({date: s, l: li});
        }
        liInUl[currentDiv.children[1]].sort((a,b)=>
        a.date.localeCompare(b.date)).forEach(e=>
         currentDiv.children[1].appendChild(e.l)
        )
         




    }
    function create(type, parentElement) {
        let current = document.createElement(type);
        parentElement.appendChild(current);
        return current;
    }
    function createLiElement(h4text) {
        let liElement = document.createElement('li');
        liElement.className = 'flex';
        let h4Elemenet = document.createElement('h4');
        h4Elemenet.innerText = h4text;
        liElement.appendChild(h4Elemenet);
        let button = document.createElement('button');
        button.addEventListener('click', deleteLiElement)
        button.className = "red";
        button.innerText = "Del";
        liElement.appendChild(button);
        return liElement;
    }
    function deleteLiElement(e) {
        let ul = e.target.parentElement.parentElement;
        let li = e.target.parentElement;
        ul.removeChild(li);
        if (Array.from(ul.children).length === 0) {
            let div = ul.parentElement;
            div.parentElement.removeChild(div);
        }
    }
}