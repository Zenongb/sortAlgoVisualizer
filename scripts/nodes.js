export {Node, NodeList};


class NodeList {
	/*
		Class that comprises the methods to iterate over the list
	*/
	constructor(parent, length, random=false) {

		this.parent = parent; //parent is HTML element
		this.generateNodeList(length, random);


	}

	//####################################################################
	//####################################################################

	generateNodeList(length, random) {
		// constructor function that generates a list of nodes
		let arr, nodeArr = [];
		if (random) {
			arr = this.createRandomArray(length);
		}
		else {
			arr = this.createLinearArray(length);
		}
		for (var i = 0; i < arr.length; i++) {
			nodeArr.push(new Node(arr[i], i, this.parent));
		}
		this.list = nodeArr;
		this.shuffleList();
	}

	createRandomArray(length) {
		// crea un array con enteros al azar menores
		// la variable range
		let maxRange = 350,
			minRange = 40;
		var arr = new Array(length);
		for (var i = 0; i < arr.length; i++) {
			arr[i] = Math.floor(Math.random() * (maxRange - minRange) + minRange);
		}
		return arr;
	}
	createLinearArray(length) {
		let maxRange = 350,
			minRange = 40,
			arr = new Array(length),
			flow = minRange;
		for (var i = 0; i < arr.length; i++) {
			arr[i] = flow;
			flow += Math.floor((maxRange - minRange) / length);
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
