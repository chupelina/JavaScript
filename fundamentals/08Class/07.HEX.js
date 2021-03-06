class Hex{
   constructor(number){
       this.number=number;
   }
   valueOf(){
       return this.number.toString(10);
   }
   toString(){
       return '0x'+this.number.toString(16).toUpperCase();
   }
   plus(secondNumber){
      let h = new Hex((Number(this.number)+Number(secondNumber.toString(10))));
      return h;
   }
   minus(secondNumber){
    let h = new Hex((Number(this.number)-Number(secondNumber.toString(10))));
    return h;
   }
   static parse(string){
       return Number(string).toString(10);
   }
}
let FF = new Hex(255);
console.log(FF.toString());
console.log(Hex.parse(FF));
console.log(FF.valueOf());
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = new Hex(5);
console.log(a.plus(b).toString());
console.log(a.plus(b).toString()==='0xF');