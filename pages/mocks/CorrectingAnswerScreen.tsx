import { useRef, useState } from "react";

import { useRouter } from "next/router";
import CanvasDraw from "react-canvas-draw";
// import classNames from "./index.css";

import html2canvas from "html2canvas";

export default function CorrectingAnswerScreen(props: any) {
    let saveableCanvas = useRef()
    const router = useRouter()
    const [data] = useState({
      color: "red",
      width: 400,
      height: 400,
      brushRadius: 1,
      lazyRadius: 2,
      backgroundImg:
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg",
      imgs: [
        "https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg",
        "https://i.imgur.com/a0CGGVC.jpg",
      ],
    })
   
    // console.log(url);
    return (
      <div id="demo">
        <p>{router.query.url}   Try it out! Draw something, hit "Save" and then "Load".--</p>
        <div className="flex justify-between ">
          <button
            onClick={() => {
              localStorage.setItem(
                "savedDrawing",
                saveableCanvas.getSaveData()
              );
              console.log(saveableCanvas.getSaveData());
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              saveableCanvas.eraseAll();
            }}
          >
            Erase
          </button>
          <button
            onClick={() => {
              saveableCanvas.undo();
            }}
          >
            Undo
          </button>
          <button
            onClick={() => {
              // this.saveableCanvas.getDataURL("png", true, "white")
              // console.log(this.saveableCanvas.getDataURL("png", true, "white"));
              // alert("DataURL written to console")
              html2canvas(document.querySelector("#drawing-area")).then(canvas => {
                console.log(canvas.toDataURL())
              });

            }}
          >
            GetDataURL
          </button>
        </div>

        <div id="drawing-area" style={{ display: "inline-flex" }}>
          <CanvasDraw
            style={{ display: "inline-flex" }}
            ref={(canvasDraw: any) => (saveableCanvas = canvasDraw)}
            brushColor={data.color}
            brushRadius={data.brushRadius}
            lazyRadius={data.lazyRadius}
            canvasWidth={data.width}
            canvasHeight={data.height}
            imgSrc={data.backgroundImg}
          />
        </div>

        {/* <p>
          That's it for now! Take a look at the{" "}
          <a href="https://github.com/mBeierl/react-canvas-draw/tree/master/demo/src">
            source code of these examples
          </a>
          .
        </p> */}
      </div>
    );
  
}