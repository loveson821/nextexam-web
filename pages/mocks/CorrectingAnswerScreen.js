import React, { Component,useEffect } from "react";
import { render } from "react-dom";

import CanvasDraw from "react-canvas-draw";
import Router, { useRouter } from "next/router";
// import classNames from "./index.css";

export default class CorrectingAnswerScreen extends Component {
  // router = useRouter()
  state = {
    color: "#000000",
    width: 400,
    height: 400,
    brushRadius: 1,
    lazyRadius: 2,
    backgroundImg: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg",
    imgs: [
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg",
      "https://i.imgur.com/a0CGGVC.jpg"
    ]
  };
  
  render() {
    // const router = useRouter()
    // console.log(url);
    return (
      <div id="demo">
        <p>Try it out! Draw something, hit "Save" and then "Load".--</p>
        <div className='flex justify-between '>
          <button
            onClick={() => {
              localStorage.setItem(
                "savedDrawing",
                this.saveableCanvas.getSaveData()
              );
              console.log(this.saveableCanvas.getSaveData());
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.eraseAll();
            }}
          >
            Erase
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.undo();
            }}
          >
            Undo
          </button>
          <button
            onClick={() => {
              console.log(this.saveableCanvas.getDataURL());
              // alert("DataURL written to console")
            }}
          >
            GetDataURL
          </button>
        </div>
        <CanvasDraw
          ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
          brushColor={this.state.color}
          brushRadius={this.state.brushRadius}
          lazyRadius={this.state.lazyRadius}
          canvasWidth={this.state.width}
          canvasHeight={this.state.height}
          imgSrc={this.state.backgroundImg}
        />


        <p>
          That's it for now! Take a look at the{" "}
          <a href="https://github.com/mBeierl/react-canvas-draw/tree/master/demo/src">
            source code of these examples
          </a>
          .
        </p>
      </div>
    );
  }
}

// if (typeof window !== 'undefined') {
//   render(<CorrectingAnswerScreen />, document.querySelector("#demo"));
// }
// render(<CorrectingAnswerScreen />, document.querySelector("#demo"));