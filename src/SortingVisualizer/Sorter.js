import React from "react";
import './Sorter.css';


export default class Sorter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
     "array_unsorted": [76, 46, 77, 88, 30, 18, 14, 20, 13, 26],
     "range": [10, 1000],
     "length_array": 20,
     "highlight_left": 0,
     "highlight_right": 0
    };
  }
  render(){
    return (
      <div>
        {this.state.array_unsorted.map((val, i)=> {
          return (<div className={"bar my-1 " + ( (i === this.state.highlight_left || i === this.state.highlight_right) ? 'highlight-bar-1' : 'hidden')} style={{width: val}} key={i}>{val}</div>)
        })}
        <button className="btn rounded-pill btn-info m-4" onClick={this.quickSort}>Quick Sort</button>
        <button className="btn rounded-pill btn-info m-4" onClick={this.generateUnsortedArray}>Generate New Array</button>
      </div>
    )
  }
  componentDidMount = () =>{
    this.generateUnsortedArray();
  }
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
        await this.timeout(500)
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

  timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
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
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
}
// [76,64,1,84,62,43,60,22,84,74]
// [76, 46, 77, 88, 30, 18, 14, 20, 13, 26]
