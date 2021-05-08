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
  async selectionSort() {
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
    if (outArr.length == this.nl.list.length) {
      this.changeAllValues(outArr);
      this.nl.allCompared();
    }
    return outArr;
  }
  rearangeDisplay(arr) {
    
  }
  changeAllValues(newValues) {
    for (var i = 0; i < this.nl.list.length; i++) {
      this.nl.list[i].updateValue(newValues[i].value);
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
