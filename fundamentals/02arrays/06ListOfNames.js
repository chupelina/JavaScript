function orderd(names){
  names.sort();
  let n =1;
  for( let i = 0; i <names.length ; i++){
      console.log(`${n}.${names[i]}`);
      n++;
  }
}

orderd(["John", "Bob", "Charly", "Christina", "Ema"]);

