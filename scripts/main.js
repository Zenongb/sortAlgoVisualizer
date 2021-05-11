import {Node, NodeList} from '/scripts/nodes.js';
import {Sorter} from '/scripts/sorter.js'

// init orders
const parent = document.getElementById('display');

   

let nl = new NodeList(parent, 20),
    sorter = new Sorter(60, nl);



// sort selection & execution functions
const selectAlgo = () => {
  let selector = document.getElementById('sortAlgos');
  switch (selector.value) {
    case 'quickSort':
      return quickCall()
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
const quickCall = async () => {
  await sorter.quickSort(nl.list, 0, nl.list.length -1);
  if (nl.isSorted()) { nl.allCompared() }
}
const mergeCall = async () => {
  let arr = nl.generateArr();
  arr = await sorter.mergeSort(arr);
}


// Array edit functions
const shuffleCall = () => {
  nl.shuffleList();
}

const changeLength = () => {
  console.log(document.getElementById('length').value);
  nl.length = document.getElementById('length').value;
  console.log(nl.length);
}
const newArray = () => {
  parent.textContent = '';
  nl.generateNodeList();
}
// Events 

document.querySelector('#sortBtn').addEventListener('click', selectAlgo);

document.querySelector('#lengthBtn').addEventListener('click', changeLength);
document.querySelector('#shuffleBtn').addEventListener('click', shuffleCall);
document.querySelector('#newArrBtn').addEventListener('click', newArray);

