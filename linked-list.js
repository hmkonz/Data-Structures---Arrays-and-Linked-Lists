/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    for (let val of vals) this.push(val);
  }

  /** _get(idx): retrieve node at idx. */

  _get(idx) {
    // assign head
    let currentNode = this.head;
    // initialize count
    let count = 0;

    // continue looping while currentNode !=null (list is not empty) and count !=idx (haven't reached idx in list)
    while (currentNode !== null && count != idx) {
      // increment count by 1
      count += 1;
      // assign currentNode to the next node
      currentNode = currentNode.next;
    }
    // return the node at idx
    return currentNode;
  }

  /** push(val): add new value to end of list 'vals' and increment length. */

  push(val) {
    // create newNode with value 'val'
    const newNode = new Node(val);
    // if the list is empty, assign head and tail to newNode
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    // otherwise, if list is not empty, assign tail.next to newNode (adds newNode after tail (at the end of the list)) and assign tail to newNode (newNode is last in the list)
    else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    // increment length of 'list' by 1 since added a newNode
    this.length += 1;
  }

  /** unshift(val): add new value to start of list and increment length */

  unshift(val) {
    // create newNode with value 'val'
    const newNode = new Node(val);
    // if the list is empty, assign head and tail to newNode
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    // otherwise, if list is not empty, assign newNode.next to head (adds newNode before head in the list) and assign head to newNode (newNode is first in the list)
    else {
      newNode.next = this.head;
      this.head = newNode;
    }
    // increment length of 'list' by 1 since added newNode
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    // assign nodeAtIdx to the result of _get(idx) function - finds the node at 'idx' passed in as a parameter
    let nodeAtIdx = this._get(idx);
    // assign the value of nodeOfIdx to 'val' passed in as a parameter
    nodeAtIdx.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    // if idx is outside of idx=0 and idx=this.length, throw an error
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    // if idx===0, execute the unshift function (adds a new value to the start of list and increments the list length by 1)
    if (idx === 0) return this.unshift(val);
    // if idx===this.length, execute push function (adds a new value to the end of a list and increments the list length by 1)
    if (idx === this.length) return this.push(val);

    // create newNode with value 'val'
    let newNode = new Node(val);
    // assign nodeBeforeIdx to the result of _get(idx-1) function - finds the node before the one with idx = idx (i.e. insertAt(2,12) into list = [2, 10, 15, 24] (want to insert 12 into 'list' before idx=2, between 10 and 15). nodeBeforeIdx = this._get(2-1) = 10
    let nodeBeforeIdx = this._get(idx - 1);
    // make a connection between newNode and the node after it (i.e. between 12 and 15)
    // (i.e. newNode = 12, nodeBeforeIdx = 10, nodeBeforeIdx.next = 15 => connect 12 to 15)
    newNode.next = nodeBeforeIdx.next;

    // make a connection between newNode and the node before it (i.e. between 10 and 12)
    // (i.e. nodeBeforeIdx.next connects nodeBeforeIdx (10) to newNode(12))
    nodeBeforeIdx.next = newNode;
    // increment the length of 'list' by 1 since added a new node
    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    // if idx is outside of idx=0 and idx=this.length, throw an error
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index");
    }

    // remove first item in the list (head) at idx = 0

    // if item to be removed is the first item in the list (idx=0)
    if (idx === 0) {
      // assign the value of the first node (being removed) so it can be returned
      let firstNodeVal = this.head.val;
      // assign the 2nd item in the list (this.head.next) to nextNode
      let nextNode = this.head.next;
      // Now assign head to nextNode (the node after the head that is being removed). This removes the connection between nextNode and head since we're removing head and makes nextNode the head)
      this.head = nextNode;
      // decrement the length of 'list' by 1 since removed a node
      this.length -= 1;
      // if the list has less than 2 items, make the tail and head equal eachother
      if (this.length < 2) this.tail = this.head;
      // return the value of the item removed
      return firstNodeVal;
    }

    // remove last item in the list (tail) at idx = this.length-1

    // assign lastNode to the last item in the list (tail) (result of _get(this.length-1) function - finds the node at idx=this.length-1 passed in as a parameter
    let lastNode = this._get(this.length - 1);
    // assign prevNode to the result of _get(idx-1) function - finds the node before the one with idx = this.length-1 (i.e. list = [10, 45, 70, 84], this.length-1 = 3, lastNode = 84 at idx=this.length-1, prevNode = 70 at idx=this.length-1-1)
    let prevNode = this._get(idx - 1);
    // if item to be removed is the last item in the list (has an idx=this.length-1)
    if (idx === this.length - 1) {
      // assign the value of the last node (being removed) so it can be returned
      let lastNodeVal = lastNode.val;
      // Now assign tail to prevNode (the node before the tail that is being removed). This removes the connection between prevNode and tail since we're removing tail and makes prevNode the tail)
      this.tail = prevNode;
      // since prevNode will now be the last node in the list (the tail), prevNode.next = null
      prevNode.next = null;

      // decrement the length of 'list' by 1 since removed a node
      this.length -= 1;
      // return the value of the item removed
      return lastNodeVal;
    }

    // remove an item from the middle of the list at idx

    // assign nodeToRemove to the result of _get(idx) function - finds the node at 'idx' passed in as a parameter
    let nodeToRemove = this._get(idx);
    // assign the value of nodeToRemove so it can be returned
    let nodeToRemoveVal = nodeToRemove.val;
    // assign nextNode to the result of _get(idx+1) function - finds the node (after the node to be removed) at idx=idx+1
    let nextNode = this._get(idx + 1);

    // Now assign the node before nodeToRemove to nextNode. This removes the connection between nodeToRemove and nextNode since we're deleting nodeToRemove
    prevNode = nextNode;
    // decrement the length of 'list' by 1 since removed a node
    this.length -= 1;
    // if the list has less than 2 items, make the tail and head equal eachother
    if (this.length < 2) this.tail = this.head;
    // return the value of the item removed
    return nodeToRemoveVal;
  }

  /** average(): return an average of all values in the list */

  average() {
    // if list doesn't have any items in it (length===0) then return 0
    if (this.length === 0) {
      return 0;
    }
    // otherwise, initialize 'sum' to zero and currentNode to 'head' (index of first item in list)
    else {
      let sum = 0;
      // assign currentNode to the index of the first item in the list (head)
      let currentNode = this.head;
      // while currentNode != null (while index of currentNode is within 'list')
      while (currentNode) {
        // add the value of the node at currentNode to 'sum'
        sum = sum + currentNode.val;
        // reassign currentNode to the next item in 'list'
        currentNode = currentNode.next;
      }
      // once all values of the items in 'list' have been added to 'sum', divide 'sum' by the length of 'list' to get the average
      return sum / this.length;
    }
  }
}

module.exports = LinkedList;
