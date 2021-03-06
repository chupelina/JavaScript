class Rectangle{
    constructor(width, height, color){
        this._height=height;
        this._width=width;
        this._color = color;
    }

    get height(){
        return this._height;
    }
    get width(){
         return this._width;
    }
    get color(){
        return this._color
    }
    set height(value){
        this.height = value;
    }
    set width(value){
        this.width=value;
    }
    set color(value){
        if(value[0] == value.toUpperCase())
        this.color=value
    }
    calcArea(){
        return this.width*this.height;
    }
}

let rect = new Rectangle(4, 5, 'Red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());