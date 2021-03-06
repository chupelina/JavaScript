function walk(steps, footprint, speed){
const distance = steps*footprint;
let rest = distance/500;
speed = speed*1000/3600;
let time = distance/speed + Math.floor(rest)*60;


let hour = Math.floor(time/3600).toFixed(0).padStart(2, "0");
time = time - hour*3600;
let min = Math.floor(time/60).toFixed(0).padStart(2, "0");
time = time - min*60;
let sec = Math.ceil(time).toFixed(0).padStart(2, "0");
return `${hour}:${min}:${sec}`;
}

console.log(walk(4000, 0.60, 5));
console.log(walk(2564, 0.70, 5.5));