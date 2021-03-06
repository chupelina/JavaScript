function solve() {
    let info = document.getElementById('info');
    let depBtn = document.getElementById('depart');
    let arrBtn = document.getElementById('arrive');
    let currentStopName = 'depot';
    let nexStopId = "0361";
    let data = undefined;

    async function depart() {
        let url = ' http://localhost:3030/jsonstore/bus/schedule/' + nexStopId;
        const respone = await fetch(url);
        data = await respone.json();
        info.innerText = 'Next stop ' + currentStopName;
        depBtn.disabled = true;
        arrBtn.disabled = false;
    }

    function arrive() {
        info.innerText = 'Arriving at ' + currentStopName;
        depBtn.disabled = false;
        arrBtn.disabled = true;
        currentStopName = data.name;
        nexStopId = data.next;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();