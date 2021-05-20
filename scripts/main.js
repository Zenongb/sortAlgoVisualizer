import {Node, NodeList} from '/scripts/nodes.js';
import {Sorter} from '/scripts/sorter.js'

//#############
// init orders
//#############

const parent = document.getElementById('display');
let nl = new NodeList(parent, 40),
    sorter = new Sorter(60, nl);


//#####################################
// sort selection & execution functions
//#####################################

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


//#####################
// Array edit functions
//#####################

const shuffleCall = () => {
  nl.shuffleList();
}
const changeLength = () => {
  let newValue = parseInt(document.getElementById('length').value);
  nl.length = newValue;
}
const getValueType = () => {
  let type = document.getElementById('valueType');
  switch (type.value) {
    case 'random':
      return true;
    case 'constInc':
      return false;
  }
}
const newArray = () => {
  parent.textContent = '';
  changeLength();
  nl.generateNodeList(getValueType());
}
//#######
// Events
//#######
let speedDial = document.getElementById('speed')
speedDial.addEventListener('change', function() { sorter.time = speedDial.value; });
document.querySelector('#sortBtn').addEventListener('click', selectAlgo);
document.querySelector('#shuffleBtn').addEventListener('click', shuffleCall);
document.querySelector('#newArrBtn').addEventListener('click', newArray);
