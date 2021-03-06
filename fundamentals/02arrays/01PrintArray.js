function print(arr , delimiter){
 return arr.join(`${delimiter}`)
}

console.log(print(['One', 
'Two', 
'Three', 
'Four', 
'Five'], 
'-'));
console.log(print(['How about no?', 
'I',
'will', 
'not', 
'do', 
'it!'], 
'_'
));