// The entry file of your WebAssembly module.



export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function bocchiShutUp( flag : i32 , seq : Array<i32>, size : i32): i32 {


  


  var countArr = new Array<i32>(30);
  for(let i = 0;i < size ;++i){
    countArr[i] = 0;
  }


  if(flag == 1){
    var i : i32;
    

    for(let i = 0;i < size ;++i){
      if(seq[i] < 20 && seq[i] >= 10){
        countArr[seq[i]]++;
      }
    }


  }else if(flag == 2){

    for(let i = 0;i < size ;++i){
      if(seq[i] < 30 && seq[i] >= 20){
        countArr[seq[i]]++;
      }
    }

  }

 var existMagic : i32;
 existMagic = 0;
 var max : i32;
 max = 0;

 var maxSeq : i32;
 maxSeq = 0;


 for(let i = 0;i < 30; ++i){
  if(countArr[i] > max){
    max = countArr[i];
    maxSeq = i;
  }

 }

 var maxCount : i32;
 maxCount = 0;

 for(let i = 0;i < 30; ++i){
  if(countArr[i] == max){
    maxCount++;
  }

 }

 if(maxCount > 1){
  return 10;
 }else{
  return maxSeq;
 }


}
