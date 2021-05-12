export {Node, NodeList};


class NodeList {
	/*
		Class that comprises the methods to iterate over the list
	*/
	constructor(parent, length, random) {

		this.parent = parent; //parent is HTML element
		this.maxRange = 350;
		this.minRange = 40;
		this.length = length;
		this.generateNodeList(random);
		this.parent.style.height = `${this.maxRange +50}px`;

	}



	//####################################################################
	//####################################################################

	generateNodeList(random=true) {
		// constructor function that generates a list of nodes
		console.log('length '+this.length);
		let arr, nodeArr = [];
		if (random) {
			arr = this.createRandomArray(this.length);
		}
		else {
			arr = this.createLinearArray(this.length);
		}
		console.log('arr ' + arr.length);
		for (var i = 0; i < arr.length; i++) {
			nodeArr.push(new Node(arr[i], i, this.parent));
		}
		this.list = nodeArr;
		console.log('nodearr '+nodeArr.length);
		this.shuffleList();
	}

	createRandomArray(length) {
		// crea un array con enteros al azar menores
		// la variable range
		var arr = new Array(length);
		for (var i = 0; i < arr.length; i++) {
			arr[i] = Math.floor(Math.random() * (this.maxRange - this.minRange) + this.minRange);
		}
		return arr;
	}
	createLinearArray(length) {
		let arr = new Array(length),
			flow = this.minRange;
		for (var i = 0; i < arr.length; i++) {
			arr[i] = flow;
			flow += Math.floor((this.maxRange - this.minRange) / length);
		}
		return arr;
	}

	generateArr() {
		let arr = []
		for (var i = 0; i < this.list.length; i++) {
			 let dict = {value: this.list[i].value,
			 						 id: this.list[i].id};

			 arr[i] = dict;
		}
		return arr;
	}
	getNodeById(id) {
		for (var i = 0; i < this.list.length; i++) {
			if(this.list[i].id == id) {
				return this.list[i];
			}
		}
		return undefined;
	}
	shuffleList() {
		// body...
		this.allReUsed();
		for (var i = this.list.length - 1; i >= 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));

			let temp = this.list[i].value;
			this.list[i].updateValue(this.list[j].value);
			this.list[j].updateValue(temp);
		}
	}
	allReUsed() {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].reUse();
		}
	}
	allCompared() {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].inItsPlace();
		}
	}
	isSorted() {
		for (var i = 0; i < this.list.length -1; i++) {
			if (this.list[i] > this.list[i +1]) {return false}
		}
		return true;
	}
	printItems() {
		let strOut = `long: ${this.list.length}; items:`;
		for (var i = 0; i < this.list.length; i++) {
			strOut += this.list[i].value + ', '
		}

		console.log(strOut);
	}
}


//######################################################################
//######################################################################
//######################################################################
//######################################################################

class Node {
	/*
	This class contains the value, index, HTML element that comprises it, and the  methods
	to handle interactions between the sorting algorithms and the HTML element itself
	*/
	constructor(value, id, parent) {

		this.value = value;
		this.id = id;
		this.parent = parent;
		// DOM handlers
		this.HTMLElement = document.createElement('div');
		this.HTMLElement.classList.add('idle', 'bar');
		this.parent.appendChild(this.HTMLElement);
		this.setHeight();
	}
	// HTML HANDLING
	// status
	comparing() {
		this.changeStatus('idle', 'comparing');
	}
	compared() {
		this.changeStatus('comparing', 'idle');
	}
	inItsPlace () {
		this.HTMLElement.classList.remove('selected');
		this.HTMLElement.classList.add('compared');
	}
	reUse() {
		this.HTMLElement.classList.remove('compared');
		this.HTMLElement.classList.remove('selected');
	}
	selected() {
		this.changeStatus('idle', 'selected');
	}
	unSelect() {
		this.changeStatus('selected', 'idle');

	}

	changeStatus(oldStatus, newStatus){
		this.HTMLElement.classList.remove(oldStatus);
		this.HTMLElement.classList.add(newStatus);
	}

	// Height
	updateValue(value){
		this.value = value;
		this.setHeight();
	}
	setHeight(){
		this.HTMLElement.style.height = `${this.value}px`
	}
}
