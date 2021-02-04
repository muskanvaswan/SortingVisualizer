import React from "react";
import './Sorter.css';


export default class Sorter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
     "array_unsorted": [76, 46, 77, 88, 30, 18, 14, 20, 13, 26],
     "range": [10, 1000],
     "length_array": 40,
     "highlight_left": 0,
     "highlight_right": 0,
     "speed": 300,
     "thickness": 2
    };
  }
  render(){
    return (
      <div>
        <div className="mt-5">
          {this.state.array_unsorted.map((val, i)=> {
            return (
          <div className={"bar my-1 " + ( (i === this.state.highlight_left || i === this.state.highlight_right) ? 'highlight-bar-1' : 'hidden')}
            style={{width: val, padding: String(parseInt(230/this.state.length_array))+"px"}}
            key={i}>
          </div>)
          })}
        </div>
        <div className="fixed-bottom bg-dark text-white d-flex justify-content-end">
          <button className="btn rounded-pill border border-info text-white m-4 " onClick={this.quickSort}>Quick Sort</button>
          <button className="btn rounded-pill border border-info text-white m-4 " onClick={this.bubbleSort}>Bubble Sort</button>
          <button className="btn rounded-pill border border-info text-white my-4 " onClick={this.generateUnsortedArray}>Generate New Array</button>
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
  swapElementsInArray = (left, right) => {
    this.setState(state => {
      var arr = [];
      var leftElement = state.array_unsorted[left];
      var rightElement = state.array_unsorted[right];
      console.log("swapping"+left+"and"+right)
      console.log("swapping"+leftElement+"and"+rightElement)


      arr = [...state.array_unsorted];
      arr[left] = rightElement;
      arr[right] = leftElement;
      return {array_unsorted: arr, highlight_left: left, highlight_right: right}
    })
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
          await this.timeout(50)
          swapped = 1;
        }
      }

      // If there is not swapping in the last swap, then the array is already sorted.
      if (swapped == 0)
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

  timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
}
// [76,64,1,84,62,43,60,22,84,74]
// [76, 46, 77, 88, 30, 18, 14, 20, 13, 26]
