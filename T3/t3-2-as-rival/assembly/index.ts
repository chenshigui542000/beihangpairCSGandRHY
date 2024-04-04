// The entry file of your WebAssembly module.



export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function mancalaOperator( flag : i32 , status : Array<i32>): i32 {
  
  var box = new Array<i32>(14);
  
  var flag1 : i32; //0 - 6
  var flag2 : i32; //7-13
  flag1 = 6;
  flag2 = 13;

  for(let i=0; i<14; i++) {
    box[i] = status[i];

  }

  // 分两大类

  // 1.落计分洞
  if(flag == 1){   
    
    for(let i=0; i<6; i++) {
      if(i+box[i] == flag1) {
        return 11 + i;

      }
    }  
  } else {
    for(let i=7; i<13; i++) {
      if(i + box[i] == flag2) {
        return 14 + i;
      }
    }

  }
  
  // 2. 提防对面取子，看对面哪个空洞对应己方棋子最多
  if(flag == 1) {
    var max:i32 = 0;
    var max_index : i32 = 0;

    for(let i=7; i<13; i++) {
      if(box[i] == 0 && box[12-i] > max) {
        max_index = 12 - i;
        max = box[12-i];
      }


    }

    if(max > 0 ) {
      return 11 + max_index;
    }


  } else {
    max = 0;
    max_index = 0;

    for(let i=0; i<6; i++) {
      if(box[i] == 0 && box[12-i] > max) {
        max_index = 12 - i;
        max = box[12-i];
      }


    }

    if(max > 0 ) {
      return 14 + max_index;
    }

  }


  // 3. 保持清空己方最右洞
  if(flag == 1) {
    if(box[5] > 0) {
      return 11 + 5;
    }

  } else {
    if(box[12] > 0) {
      return 14 + 12;
    }

  }

  // 4.看己方空洞，取对方最多子
  if(flag == 1) {
    max = 0;
    max_index = 0;

    for(let i=0; i<6; i++) {
      if(box[i] <= 13 && box[i] > 0){
        var tmp_index : i32 = (i + box[i]) % 13 
        if(tmp_index >= 0 && tmp_index < 6) {
          if(tmp_index == i || box[tmp_index] == 0) {
            if(box[12-tmp_index] > max) {
              max = box[12 - tmp_index];
              max_index = tmp_index;
            }
           

          }

        }

      }


    }

    if(max > 0) {
      return 11 + max_index;
    }

  } else {
    max = 0;
    max_index = 0;

    for(let i=7; i<13; i++) {
      if(box[i] <= 13 && box[i] > 0){
        tmp_index = (i + box[i]) % 13 
        if(tmp_index >= 7 && tmp_index < 13) {
          if(tmp_index == i || box[tmp_index] == 0) {
            if(box[12-tmp_index] > max) {
              max = box[12 - tmp_index];
              max_index = tmp_index;
            }
           

          }

        }

      }


    }

    if(max > 0) {
      return 14 + max_index;
    }

  }

  // 5.常规取法
  var min : i32 = 80;
  var min_index : i32 = 0;
  if(flag == 1) {
    for(let i=0; i<6; i++) {
      if(box[i] > 0 && (i + box[i]) >= flag1) {  // 过计分板就行
        if((i + box[i])%13 < min) {
          min = i + box[i] % 13;
          min_index = i;
        }
      }
    }

    if(min < 13) {
      return 11 + min_index;
    }

  } else {
    min = 80;
    min_index = 0;

    for(let i=7; i<13; i++) {
      if(box[i] > 0 && (i + box[i]) >= flag2) {  // 过计分板就行
        if((i + box[i])%13 < min) {
          min = i + box[i] % 13;
          min_index = i;
        }
      }
    }

    if(min < 13) {
      return 14 + min_index;
    }
  }

  // 6. 随机选择
  if(flag == 1) {
    for(let i=0; i<6; i++) {
      if(box[i] > 0) {
        return 11 + i;
      }

    }
  } else {
    for(let i =7; i<13; i++) {
      if(box[i] > 0) {
        return 14 + i;
      }

    }

  }


  return 0;


}
