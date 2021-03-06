function sameNumber(input){
    let curr = input+'';
    let sum =0;
    let isOk=true;
    let firstChar= curr[0];
    for (let i = 0 ; i < curr.length ; i++){
        sum+= parseInt(curr[i]);
        if(curr[i]!=firstChar){
            isOk=false;
        }
    }
    console.log(isOk);
    console.log(sum);
}

sameNumber(2222222);
sameNumber(1234);
