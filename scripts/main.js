import {Node, NodeList} from '/scripts/nodes.js';
import {Sorter} from '/scripts/sorter.js'

const parent = document.getElementById('display');
var nl = new NodeList(parent, 20);
var sorter = new Sorter(60, nl);



const shuffleCall = () => {
  nl.shuffleList();
}
const selectAlgo = () => {
  let selector = document.getElementById('sortAlgos');
  switch (selector.value) {
    case 'bubbleSort':
      return sorter.bubbleSort();
    case 'selectionSort':
      return sorter.selectionSort();
    case 'mergeSort':
      return mergeCall();
    case  'insertSort':
      return sorter.insertionSort();
  }
}

document.querySelector('#sortBtn').addEventListener('click', selectAlgo);
document.querySelector('#shuffleBtn').addEventListener('click', shuffleCall);

let printArr = (arr) => {
  let strOut = '';
  for (var i = 0; i < arr.length; i++) {
    strOut += `${arr[i].id} : ${arr[i].value} `

  }
  console.log(strOut);
}
const mergeCall = async () => {
  let arr = nl.generateArr();
  printArr(arr);
  arr = await sorter.mergeSort(arr);
  printArr(arr);
}
