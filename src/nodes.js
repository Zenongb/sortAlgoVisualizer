export {Node, NodeList};

//######################################################################
//##################    NODE LIST OBJECT   #############################
//######################################################################
//######################################################################

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
	//################   LIST GENERATION FUNCS   #########################
	//####################################################################

	generateNodeList(random=false) {
		// constructor function that generates a list of nodes
		let arr, nodeArr = [],
				width = this.getBarWidth()
		if (random) {
			arr = this.createRandomArray(this.length);
		}
		else {
			arr = this.createLinearArray(this.length);
		}

		for (var i = 0; i < arr.length; i++) {
			nodeArr.push(new Node(arr[i], i, this.parent, width));
		}
		this.list = nodeArr;
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
	getBarWidth () {
		let totalWidth = this.parent.offsetWidth;
		return totalWidth / this.length;
	}
	//####################################################################
	//#############   LIST INTERACTION FUNCS   ###########################
	//####################################################################

	generateArr() {
		// Function used in the merge sort algorithm, it creates an array of
		// objects that has each node value & it's id, so the merge sort
		// algorithm can create multiple lists of these objects without
		// having memory problems
		
		let arr = []
		for (var i = 0; i < this.list.length; i++) {
			 let dict = {value: this.list[i].value,
			 						 id: this.list[i].id};

			 arr[i] = dict;
		}
		return arr;
	}
	allReUsed() {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].reUse();
		}
	}
	allCompared() {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].sorted();
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
//#######################   NODE OBJECT   ##############################
//######################################################################
//######################################################################

class Node {
	/*
	This class contains the value, index, HTML element that comprises it,
	and the  methods to handle interactions between the sorting algorithms
	and the HTML element itself
	*/
	constructor(value, id, parent, width) {

		this.value = value;
		this.id = id;
		this.parent = parent;
		// DOM handlers
		this.HTMLElement = document.createElement('div');
		this.HTMLElement.classList.add('idle', 'bar');
		this.setWidth(width);
		this.parent.appendChild(this.HTMLElement);

		this.setHeight();
	}

	//####################################################################
	//################   HTML HANDLING FUNCS   ###########################
	//####################################################################

	// status
	comparing() {
		this.changeStatus('idle', 'comparing');
	}
	compared() {
		this.changeStatus('comparing', 'idle');
	}
	sorted () {
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

	//width
	setWidth(width) {
		this.HTMLElement.style.width = `${Math.floor(width * 0.8)}px`
		this.HTMLElement.style.margin = `0px ${Math.floor(width * 0.2)}px`

	}
}
