 function getInfo() {
    let button = document.getElementById('submit');
    let stopId = document.getElementById('stopId');
    button.addEventListener('click', () => fullInfo(stopId));
}
getInfo();

async function fullInfo(stopId) {
    const url = 'http://localhost:3030/jsonstore/bus/businfo/' + stopId.value;
    const response = await fetch(url);
    let stopName = document.getElementById('stopName');
    let buses = document.getElementById('buses');
    buses.innerHTML='';
    stopName.innerText='';
    try {
        const data = await response.json();
        stopName.innerText = data.name;
        Object.entries(data.buses).map(([bus, time])=>{
          let li = document.createElement('li');
          li.innerText= `Bus ${bus} arrives in ${time} minutes`;
         buses.appendChild(li);
         stopId.value='';
        })
    } catch {
     stopName.innerText='Error';
    
    }
}