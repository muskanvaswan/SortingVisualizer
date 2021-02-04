import React from "react";
import './Sorter.css';


export default class Sorter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
     "array_unsorted": [76, 46, 77, 88, 30, 18, 14, 20, 13, 26],
     "range": [10, 1000],
     "length_array": 60,
     "highlight_left": 0,
     "highlight_right": 0,
     "speed": 50,
    };
  }
  render(){
    return (
      <div>
        <div className="mt-5 mr-2">
          {this.state.array_unsorted.map((val, i)=> {
            return (
          <div className={"bar my-1 " + ( (i === this.state.highlight_left || i === this.state.highlight_right) ? 'highlight-bar-1' : 'hidden')}
            style={{width: String(parseInt(100*val/(this.state.range[1]-this.state.range[0])))+"%", padding: String(parseInt(230/this.state.length_array))+"px"}}
            key={i}>
          </div>)
          })}
        </div>
        <div className="fixed-bottom bg-black text-white d-sm-flex p-3 justify-content-end">
          <button className="btn rounded-pill border border-info text-white my-auto " onClick={this.quickSort}>Quick Sort</button>
          <button className="btn rounded-pill border border-info text-white my-auto mx-3" onClick={this.mergeSort}>Merge Sort</button>
          <button className="btn rounded-pill border border-info text-white my-auto " onClick={this.heapSort}>Heap Sort</button>
          <button className="btn rounded-pill border border-info text-white my-auto mx-3" onClick={this.bubbleSort}>Bubble Sort</button>
          <button className="btn rounded-pill border border-info text-white my-auto " onClick={this.selectionSort}>Selection Sort</button>
          <button className="btn rounded-pill border border-info text-white my-auto mx-3" onClick={this.insertionSort}>Insertion Sort</button>
          <button className="btn rounded-pill border border-info text-white my-auto " onClick={this.generateUnsortedArray}>Generate New Array</button>
        </div>
      </div>
    )
  }
  componentDidMount = () =>{
    this.generateUnsortedArray();
  }
  generateUnsortedArray = () => {
    this.setState(state => {
      var arr = []
      for (var i = 0; i < state.length_array; i++){
        arr.push(this.getRndInteger(state.range[0], state.range[1]))
      }
      return { array_unsorted: arr}
    })
  }
  setElementValue = (index, value, side) => {
    this.setState(state => {
      var arr = [];
      arr = [...state.array_unsorted];
      arr[index] = value;
      var left = this.state.highlight_left;
      var right = this.state.highlight_right;
      if(side==="left"){
        left = index;
      }
      else{
        right = index;
      }
      console.log("setting value", value)
      return {array_unsorted: arr, highlight_left:left, highlight_right: right}
    })
  }
  swapElementsInArray = (left, right) => {
    this.setState(state => {
      var arr = [];
      var leftElement = state.array_unsorted[left];
      var rightElement = state.array_unsorted[right];
      //console.log("swapping"+left+"and"+right)
      //console.log("swapping"+leftElement+"and"+rightElement)


      arr = [...state.array_unsorted];
      arr[left] = rightElement;
      arr[right] = leftElement;
      return {array_unsorted: arr, highlight_left: left, highlight_right: right}
    })
  }

  // main function to do heap sort
  heapSort = async (object, n = this.state.length_array - 1) => {
    //console.log(n)
    // Build max heap
    for (let i = parseInt(n/2) - 1; i >= 0; i--){
      await this.heapify(n, i);
      //console.log(n, i)
    }

    // Heap sort
    for (let i = n - 1; i >= 0; i--) {
      await this.swapElementsInArray(0, i);
      await this.timeout(this.state.speed)

      // Heapify root element to get highest element at root again
      await this.heapify(i, 0);
    }
  }
  mergeSort = async (object, l = 0, r =  this.state.length_array - 1) => {
    if(l >= r){
        return;//returns recursively
    }
    var m = l+ parseInt((r-l)/2);
    await this.mergeSort(4, l,m);
    await this.mergeSort(4, m+1,r);
    await this.merge(l,m,r);
  }
  //Function to perform the insertion sort Algorithm
  insertionSort = async () => {
    var size = this.state.length_array;
     var i, key, j;
     for (i = 1; i < size; i++)
     {
         key = this.state.array_unsorted[i];
         j = i - 1;

         /* Move elements of arr[0..i-1], that are
         greater than key, to one position ahead
         of their current position */
         while (j >= 0 && this.state.array_unsorted[j] > key)
         {
             await this.setElementValue(j + 1, this.state.array_unsorted[j], "left");
             await this.timeout(this.state.speed)
             j = j - 1;
         }
         await this.setElementValue(j + 1, key, "right");

     }
  }
  //Function to perform the selection Sort Algorithm
  selectionSort = async () => {
    var size = this.state.length_array;

    for (var i = 0; i < size; i++){
      var min = i;
      /* check the element to be minimum */
      for (var j = i+1; j < size; j++) {
        if (this.state.array_unsorted[j] < this.state.array_unsorted[min]){
            min = j;
        }
      }
      /* swap the minimum element with the current element*/
      if (min !== i){
        await this.swapElementsInArray(min, i)
        await this.timeout(this.state.speed)
      }
    }
  }
  //Function for performing the bubble sort algorith
  bubbleSort = async () => {
    var size = this.state.length_array
    for (var step = 0; step < size - 1; ++step) {
      // Run loops two times: one for walking throught the array
      // and the other for comparison
      var swapped = 0;
      for (var i = 0; i < size - step - 1; ++i) {
        // To sort in descending order, change > to < in this line.
        if (this.state.array_unsorted[i] > this.state.array_unsorted[i + 1]) {

          // Swap if greater is at the rear position
          await this.swapElementsInArray(i, i+1)
          await this.timeout(this.state.speed)
          swapped = 1;
        }
      }

      // If there is not swapping in the last swap, then the array is already sorted.
      if (swapped === 0)
        break;
    }
  }
  //Function performing quick Sort Algorithm
  quickSort = async (object, start = 0, end = 100000001) => {
    if (end === 100000001){
      end = this.state.array_unsorted.length -1;
    }
    if (end <= 1 || end - start <= 1){
      if(this.state.array_unsorted[start]>this.state.array_unsorted[end]){
        await this.swapElementsInArray(start, end);
      }
      return "NO"
    }
    var leftPointer = start;
    var rightPointer = end;
    console.log("start: " + String(start) + "end: ", end)
    var p = start + parseInt((end-start)/2)
    var pivot = this.state.array_unsorted[p]
    console.log("pivot:", pivot)
    while(!(leftPointer >= rightPointer)){
      for (; this.state.array_unsorted[leftPointer] <= pivot && leftPointer < end && !(leftPointer === rightPointer); leftPointer++) {}
      for (; (this.state.array_unsorted[rightPointer] > pivot) && !(leftPointer === rightPointer) && (rightPointer > start); rightPointer--) {}
      console.log("l: "+String(leftPointer)+"R:",rightPointer)

      if (leftPointer !== rightPointer){
        await this.swapElementsInArray(leftPointer, rightPointer);
        await this.timeout(this.state.speed)
        if (rightPointer - leftPointer>1){
          leftPointer++;
          rightPointer--;
        }
      }
      else{
        if (this.state.array_unsorted[leftPointer] > pivot){
          leftPointer--;
          rightPointer--;
        }
        if(leftPointer === end ){
          if(this.state.array_unsorted[start] !== pivot){
            leftPointer = start;
            rightPointer = end;
            pivot = this.state.array_unsorted[start]
          }
          else{
            leftPointer = start;
            rightPointer = end;
            pivot = this.state.array_unsorted[end]
          }
        }
      }

    }
    console.log(this.state.array_unsorted[leftPointer], this.state.array_unsorted[rightPointer])
    if (this.state.array_unsorted[leftPointer] > pivot){
      leftPointer--;
      rightPointer--;
    }

    var a = await this.quickSort(3,start, rightPointer);
    a = await this.quickSort(3,rightPointer+1, end);
    return a
  }

  //Helper Function for mergeSort
  merge = async (left, mid, right) => {

    var n1 = mid - left + 1;
    var n2 = right - mid;
    var L = [], R = [];
    for (let i = 0; i < n1; i++)
        L[i] = this.state.array_unsorted[left + i];
    for (let j = 0; j < n2; j++)
        R[j] = this.state.array_unsorted[mid + 1 + j];

    var i = 0;
    var j = 0;
    var k = left;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            await this.setElementValue(k, L[i], "left");
            await this.timeout(this.state.speed);
            i++;
        }
        else {
          await this.setElementValue(k, R[j], "right");
          await this.timeout(this.state.speed);
            j++;
        }
        k++;
    }
    while (i < n1) {
      await this.setElementValue(k, L[i], "left");
      await this.timeout(this.state.speed);
        i++;
        k++;
    }
    while (j < n2) {
      await this.setElementValue(k, R[j], "right");
      await this.timeout(this.state.speed);
        j++;
        k++;
    }
  }

  //Helper function for heapSort
  heapify = async (n, i) => {
    var largest = i;
    var left = 2 * i + 1;
    var right = 2 * i + 2;

    if (left < n && this.state.array_unsorted[left] > this.state.array_unsorted[largest])
      largest = left;

    if (right < n && this.state.array_unsorted[right] > this.state.array_unsorted[largest])
      largest = right;

    // Swap and continue heapifying if root is not largest
    if (largest !== i) {
      await this.swapElementsInArray(i, largest);
      await this.timeout(this.state.speed)
      await this.heapify( n, largest);
    }
  }
  timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
}
// [76,64,1,84,62,43,60,22,84,74]
// [76, 46, 77, 88, 30, 18, 14, 20, 13, 26]
