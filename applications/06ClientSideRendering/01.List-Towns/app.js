import { html, render } from 'https://unpkg.com/lit-html?module';

let unorderdList = (towns) => html`<ul>${towns.map(t => {
    return html`<li>${t}</li>`;
})}</ul>`;

document.getElementsByTagName('form')[0].addEventListener('submit', (e) => {
    e.preventDefault();
    let towns = e.target.getElementsByTagName('input')[0].value.split(", ");
    let container = document.getElementById('root');
    render(unorderdList(towns), container);
    e.target.getElementsByTagName('input')[0].value = '';
})


