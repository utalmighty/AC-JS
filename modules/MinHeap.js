
const DataNode = require('./DataNode')

class MinHeap {

    constructor() {
        this.heap = [null];
    }

    getLeftChild(parent) {
        return parent*2;
    }

    getRightChild(parent) {
        return (parent*2)+1;
    }

    swap(i, j) {
        let temp = this.heap[i]
        this.heap[i] = this.heap[j];
        this.heap[j] = temp 
    }

    getParent(child) {
        if (child == 1) {
            return 1;
        }
        return parseInt(child/2);
    }

    addNode(data, value) {
        this.heap.push(new DataNode(data, value));
        let curr = this.heap.length-1;
        let parent = this.getParent(curr)
        while(this.heap[curr].value < this.heap[parent].value) {
            this.swap(curr, parent);
            curr = parent;
            parent = this.getParent(parent);
        }
    }

    isEmpty(){
        if (this.heap.length == 1) {
            return true;
        }    
        return false;
    }
    
    getTree(){
        return this.heap;
    }

    getMinimum() {
        if (this.heap.length == 1) {
            return null;
        }
        this.swap(this.heap.length-1, 1);
        let ret = this.heap.pop();
        let curr = 1;
        while(
            this.getLeftChild(curr) < this.heap.length && this.heap[curr].value > this.heap[this.getLeftChild(curr)].value || 
            this.getRightChild(curr) < this.heap.length && this.heap[curr].value > this.heap[this.getRightChild(curr)].value
            ){
            let swap = this.getLeftChild(curr);
            if (this.getRightChild(curr) < this.heap.length){
                if (this.heap[this.getRightChild(curr)].value < this.heap[this.getLeftChild(curr)].value) {
                    swap = this.getRightChild(curr);
                }
            }
            this.swap(curr, swap);
            curr = swap;
        }
        return ret;
    }
    display() {
        console.log(this.heap);
    }
}

module.exports = MinHeap;


