// The entry file of your WebAssembly module.



export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function mancalaBoard( flag : i32 , seq : Array<i32>, size : i32): Array<i32> {
  
  var box = new Array<i32>(15);
  
  var flag1 : i32; //0 - 6
  var flag2 : i32; //7-13
  flag1 = 6;
  flag2 = 13;

  var priFlag : i32;

  priFlag = seq[0] / 10;

  for(let i = 0;i < 14;++i){
    if(i != flag1 && i != flag2){
      box[i] = 4;
    }else{
      box[i] = 0
    }
  }

  box[14] = 0;

  var status : i32;

  status = priFlag;    // 标记当前是谁在下


 for(let i=0; i<size; ++i){

  if(seq[i] / 10 != status) {

    //该不合法 棋盘数状态是正确的
    if(flag == 1){
      box[14] = 200 + 2 * box[flag1] - 48;
    }else{
      box[14] = 200 + 48 - 2 * box[flag2];
    }
    return box;
  } 

  var index : i32;  // 个位数-棋盘编号

  index = seq[i] % 10 - 1;  //这里有bug

  if(status == 2) {
    index += 7;
  }



  var chessNum : i32;
  chessNum = box[index];
  box[index] = 0;

  if(chessNum == 0) {
    box[index] = chessNum;
    //该不合法 棋盘数状态是正确的
    if(flag == 1){
      box[14] = 200 + 2 * box[flag1] - 48;
    }else{
      box[14] = 200 + 48 - 2 * box[flag2];
    }
    return box;
  }

  var lastIndex: i32;    // 

  lastIndex = index;

  for(let j=0; j<chessNum; ++j) {        //撒播
      lastIndex++;

      if(lastIndex == 14) {
        lastIndex = 0;
      }

      if(status == 1 && lastIndex == flag2) {
        lastIndex++;
      } else if(status == 2 && lastIndex == flag1) {
        lastIndex++;
      }

      if(lastIndex == 14) {
        lastIndex = 0;
      }


      box[lastIndex]++;


  }

  if(status == 1 && lastIndex == flag1) {
    continue;
  }

  if(status == 1 && lastIndex < 6 && lastIndex >= 0 && box[lastIndex] == 1 && box[12 - lastIndex] > 0) {
    var tmp : i32;

    tmp = 1;
    box[lastIndex] = 0;
    tmp += box[12 - lastIndex];
    box[12-lastIndex] = 0;

    box[flag1] += tmp;

  }

  if(status == 2 && lastIndex == flag2) {
    continue;
  }

  if(status == 2 && lastIndex >= 7 && lastIndex < 13 && box[lastIndex] == 1 && box[12 - lastIndex] > 0) {
    

    tmp = 1;
    box[lastIndex] = 0;
    tmp += box[12-lastIndex];
    box[12-lastIndex] = 0;

    box[flag2] += tmp;



  }

  status = 3 - status;   // 换边



 }

//现在操作结束

var isEmpty : i32;
isEmpty = 1;

for(let i=0; i<6; ++i) {
  if(box[i] != 0) {
    isEmpty = 0;
    break;
  }

}

if(isEmpty == 1) {
  var ret : i32;
  var oppositeSum : i32;
  for(let k = 7;k < 13;++k){
    box[flag1] += box[k];
    box[k] = 0;
  }
  ret = box[flag1];
  ret = ret - box[flag2];
  if(ret == 0){
    box[14] = 200;
  }else{
    box[14] = 200 + ret;
  }
  return box;
  
  
}

isEmpty = 1;

for(let i=7; i<13; i++) {
  if(box[i] != 0) {
    isEmpty = 0;
    break;
  }


}
 

if(isEmpty == 1) {
  
  for(let k = 0;k < 6;++k){
    box[flag2] += box[k];
    box[k] = 0;
  }
  ret = box[flag1];
  ret = ret - box[flag2];
 if(ret == 0){
  box[14] = 200;
 }else{
  box[14] = 200 + ret;
 }
 return box;

  
}

box[14] = status;
return box;

  



}
