function attachEvents() {
    let button = document.getElementById('submit');
    let input = document.getElementById('location');
    button.addEventListener('click', getLocatino);

    async function getLocatino() {
        const url = 'http://localhost:3030/jsonstore/forecaster/locations';
        const response = await fetch(url);
        const result = await response.json();
        const location = Object.values(result).find(e => e.name.toLowerCase() === input.value.toLowerCase());
        if (!location) {
            alert('Invalid input!');
            return;
        }
        getWeather(location.code);
        input.value= ''
    }
}
let weather = {
    "Sunny": '\u2600',
    "Partly sunny": '\u26C5',
    "Overcast": '\u2601',
    "Rain": '\u2614',
    "Degrees": '\u00B0',
}

async function getWeather(code) {
    const currentForcastUrl = 'http://localhost:3030/jsonstore/forecaster/today/' + code;
    const upcomingForcastUrl = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code;

    const [current, upcoming] = await Promise.all([
        fetch(currentForcastUrl),
        fetch(upcomingForcastUrl)
    ]);

    const currentData = await current.json();
    const upcomingData = await upcoming.json();
    let forecast = document.getElementById('forecast');
    forecast.style.display = '';

    createCurrentForecast(currentData);
    createUpcomingForecast(upcomingData);
}
function createCurrentForecast(currentData) {
    if (document.getElementById('current').children.length != 1) {
        document.getElementById('current').children[1].remove();
    }
    let div = document.createElement('div');
    div.className = 'forecasts';
    createElement('condition symbol', weather[currentData.forecast.condition], div);
    let span = document.createElement('span');
    div.appendChild(span);
    span.className = 'condition';
    createElement('forecast-data', currentData.name, span);
    createElement('forecast-data', `${currentData.forecast.low}${weather["Degrees"]}/${currentData.forecast.high}${weather["Degrees"]}`, span);
    createElement('forecast-data', currentData.forecast.condition, span);
    document.getElementById('current').appendChild(div);
}
function createUpcomingForecast(upcomingData) {
    if (document.getElementById('upcoming').children.length != 1) {
        document.getElementById('upcoming').children[1].remove();
    }
    let div = document.createElement('div');
    div.className = 'forecast-info';
    let values =Object.values(upcomingData)[0];
    values.map(data=> {
        let span = document.createElement('span');
        span.className = 'upcoming';
        createElement('symbol', weather[data.condition], span);
        createElement('forecast-data', `${data.low}${weather["Degrees"]}/${data.high}${weather["Degrees"]}`, span);
        createElement('forecast-data', data.condition, span);
        div.appendChild(span);
    });
    document.getElementById('upcoming').appendChild(div);
}

function createElement(classType, text, parrent) {
    let span = document.createElement('span');
    span.className = classType;
    span.innerText = text;
    parrent.appendChild(span);
    return span;
}

attachEvents();