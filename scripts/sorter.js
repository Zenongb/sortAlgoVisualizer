export {Sorter}

/*
Class that contains the functions related to the sorting of the
algorithms

*/

class Sorter {

  constructor (time, nl) {
    this.time = time;
    this.nl = nl;
  }
//######################################################################
//######################################################################

  async bubbleSort() {
    let noChange;
    for (var i = 0; i < this.nl.list.length; i++) {
      noChange = true;
      for (var j = 0; j < this.nl.list.length-i-1; j++) {

        if (await this.biggerThan(this.nl.list[j], this.nl.list[j+1])) {
          this.swap(this.nl.list[j+1], this.nl.list[j]);

          noChange = false;
        }
        if (j == this.nl.list.length-i-2) {
          this.nl.list[j+1].inItsPlace();
        }
      }
      if (noChange) {
        for (var k = 0; k < j; k++) {
          this.nl.list[k].inItsPlace();
        }
        break;
      }
    }
  }
  //######################################################################
  //######################################################################
  async insertionSort() {
    let temp, j, needSort = false;
    for (let i = 1; i < this.nl.list.length; i++) {
      if (await this.biggerThan(this.nl.list[i-1], this.nl.list[i])) {
        needSort = true;
        j = i;
      }
      while (needSort && (j > 0)) {
        if (await this.biggerThan(this.nl.list[j-1], this.nl.list[j])) {
          this.swap(this.nl.list[j-1], this.nl.list[j]);
          j--;
        } else { break; }
      }
      needSort = false
    }
    this.nl.allCompared();
  }
  //######################################################################
  //######################################################################
  
  async  selectionSort() {
    let min = await this.isMin(this.nl.list[0]), 
        j = 0;

    while (j < this.nl.list.length) {
      for (var i = j+1; i < this.nl.list.length; i++) {
        if (await this.biggerThan(min, this.nl.list[i])) {
          min.unSelect();
          min = await this.isMin(this.nl.list[i]);
          
        }
      }
      await this.sleep();
      this.swap(this.nl.list[j], min);
      this.nl.list[j].inItsPlace();
      await this.sleep();
      min.unSelect();
      min = await this.isMin(this.nl.list[++j]);
    }
  }

  async isMin(n) {
    n.selected()
    await this.sleep()
    return n
  }
  //######################################################################
  //######################################################################

  async mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    let mid = Math.floor(arr.length / 2),
        l = arr.slice(0, mid),
        r = arr.slice(mid, arr.length);

    l = await this.mergeSort(l);
    r = await this.mergeSort(r);

    return await this.merge(l,r);
  }
  async merge(l, r) {
    let i = 0, j = 0, k = 0,
        outArr = [];
    while ((i < l.length) && (j < r.length)) {
      if (l[i].value > r[j].value) {
        outArr[k++] = r[j++];
      } else {
        outArr[k++] = l[i++];
      }
    }
    while (i < l.length) {
      outArr[k++] = l[i++];
    }
    while (j < r.length) {
      outArr[k++] = r[j++];
    }
    let range = this.getRange(outArr);
    this.switchState(range, true);
    await this.changeSomeValues(outArr, range);
    this.switchState(range, false);
    if (outArr.length == this.nl.list.length) {
      this.nl.allCompared();
    }
    return outArr;
  }

  getRange(arr) {
    let min = Infinity,
        max = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id < min) { min = arr[i].id}
      if (arr[i].id > max) { max = arr[i].id}
    }
    return [min, max];
  }
  async changeSomeValues(newValues, range) {
    let k = 0,
        min = range[0],
        max = range[1];
    for (var j = min; j <= max; j++) {
      this.nl.list[j].updateValue(newValues[k++].value);
      await this.sleep()
    }
  }
  switchState(range, comparing) {
    let min = range[0],
        max = range[1];
        for (var i = min; i <= max; i++) {
          if (comparing) {this.nl.list[i].comparing()}
          else {this.nl.list[i].compared();}
        }
  }

  //######################################################################
  //######################################################################

  updateWholeList (start, oldArr) {
      for (var i = 0; i < oldArr.length; i++) {
        this.getNodeByIndex(start + i).updateValue(oldArr[i].value);
      }
  }


  swap(n1, n2){
    let temp = n1.value;
    n1.updateValue(n2.value);
    n2.updateValue(temp);
  }

  async biggerThan(n1, n2) {
    let out;
    n1.comparing();
    n2.comparing();
    await this.sleep(out);
    if (n1.value > n2.value) {
      out = true;
    }
    else {
      out = false;
    }
    n1.compared();
    n2.compared();
    await this.sleep(out);
    return out;
  }



  async sleep(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, this.time);
    })
  }
}
