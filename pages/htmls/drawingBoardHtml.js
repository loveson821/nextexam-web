// @flow
export const html = `
<html>
<head>
  <style>
    html,
    body {
      margin: 0;
    }

    #drawing-area {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
    }
  </style>
</head>

<body class="frame">
  <canvas id="drawing-area" class="drawing-area"></canvas>
  <script>
    var c = document.getElementById("drawing-area");
    var ctx = c.getContext("2d");
    var image = new Image();
    image.onload = function() {
      // c.height = image.height;
      // c.width = image.width;
      c.width = window.innerWidth;
      var r = image.width / image.height;
      c.height = c.width / r;
      var img_h = c.width / r;
      var img_w = c.width;
      ctx.drawImage(image, 0, 0, img_w, img_h);
    };
    image.crossOrigin = "anonymous"; 
    image.src = "[[URL]]"
</script>
  <script>
    var node;
    var rotation = 0;
    var gestureStartRotation = 0;
    var gestureStartScale = 0;
    var scale = 1;
    var posX = 0;
    var posY = 0;
    var startX;
    var startY;

    window.node = document.querySelector('.drawing-area')
    var pan = 0;

    var render = () => {

      window.requestAnimationFrame(() => {
        var val = "translate3D("+posX+"px, "+posY+"px, 0px) rotate("+rotation+"deg) scale("+scale+")"
        node.style.transform = val
        console.log(val)
      })

    }

    // window.addEventListener('wheel', (e) => {
    //   e.preventDefault();

    //   if (e.ctrlKey) {
    //     scale -= e.deltaY * 0.01;
    //   } else {
    //     posX -= e.deltaX * 2;
    //     posY -= e.deltaY * 2;
    //   }

    //   render();
    // });


    window.addEventListener("gesturestart", function (e) {
      e.preventDefault();
      pan = 1;

      startX = e.pageX - posX;
      startY = e.pageY - posY;
      // gestureStartRotation = rotation;
      gestureStartScale = scale;
    });

    window.addEventListener("gesturechange", function (e) {
      e.preventDefault();

      // rotation = gestureStartRotation + e.rotation;
      scale = gestureStartScale * e.scale;

      posX = e.pageX - startX;
      posY = e.pageY - startY;

      render();

    })

    window.addEventListener("gestureend", function (e) {
      e.preventDefault();
      pan = 0;
    });

    function setCanvasHeightAuto() {
      var documentWidth = document.documentElement ? document.documentElement.clientWidth : 0;
      var documentHeight = document.documentElement ? document.documentElement.clientHeight : 0;
      var innerWidth = window.innerWidth;
      var innerHeight = window.innerHeight;
      var screenWidth = screen.width;
      var screenHeight = screen.height;

      var width = screen.width * window.devicePixelRatio;
      var height = screen.height * window.devicePixelRatio;

      var setWidth = documentWidth && documentWidth > innerWidth ? documentWidth : innerWidth;
      var setHeight = documentHeight && documentHeight > innerHeight ? documentHeight : innerHeight;

      if (setWidth > width) {
        width = setWidth;
        height = setHeight;
      }

      document.getElementById("drawing-area").width = width;
      document.getElementById("drawing-area").height = height;
    }

    setCanvasHeightAuto();

    // =============
    // == Globals ==
    // =============
    const canvas = document.getElementById("drawing-area");
    const canvasContext = canvas.getContext("2d");

    const state = {
      mousedown: false,
    };

    // ===================
    // == Configuration ==
    // ===================
    const lineWidth = 12;
    const strokeStyle = "#000";

    canvasContext.lineCap = "round";
    canvasContext.lineWidth = lineWidth;
    canvasContext.strokeStyle = strokeStyle;
    canvasContext.fillStyle="#ffffff";

    let points = [];
    let allPoints = [];

    let addPointsThrottle = null;

    // =====================
    // == Event Listeners ==
    // =====================
    canvas.addEventListener("mousedown", handleWritingStart);
    canvas.addEventListener("mousemove", handleWritingInProgress);
    canvas.addEventListener("mouseup", handleDrawingEnd);
    canvas.addEventListener("mouseout", handleDrawingEnd);

    canvas.addEventListener("touchstart", handleWritingStart);
    canvas.addEventListener("touchmove", handleWritingInProgress);
    canvas.addEventListener("touchend", handleDrawingEnd);

    // ====================
    // == Event Handlers ==
    // ====================
    function handleWritingStart(event) {
      event.preventDefault();
      if (pan) {
        return
      }

      const mousePos = getMosuePositionOnCanvas(event);

      canvasContext.beginPath();

      canvasContext.moveTo(mousePos.x, mousePos.y);

      points.push({
        x: mousePos.x,
        y: mousePos.y,
        c: canvasContext.strokeStyle,
      });

      canvasContext.fill();

      state.mousedown = true;
    }

    function handleWritingInProgress(event) {
      event.preventDefault();
      if (pan) {
        return
      }

      if (state.mousedown) {
        const mousePos = getMosuePositionOnCanvas(event);

        canvasContext.lineTo(mousePos.x, mousePos.y);

        points.push({
          x: mousePos.x,
          y: mousePos.y,
          c: canvasContext.strokeStyle,
        });

        canvasContext.stroke();
      }
    }

    function redrawAllLines() {
      const existingStrokeStyle = canvasContext.strokeStyle;
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);

      for (let allPt of allPoints) {
        canvasContext.strokeStyle = allPt[0].c;
        console.log(allPt[0].c);

        canvasContext.beginPath();
        canvasContext.moveTo(allPt[0].x, allPt[0].y);
        canvasContext.fill();

        for (let pt of allPt) {
          canvasContext.lineTo(pt.x, pt.y);
          canvasContext.stroke();
        }

        canvasContext.closePath();
      }

      canvasContext.strokeStyle = existingStrokeStyle;
    }

    function setColor(colour) {
      canvasContext.strokeStyle = colour;
    }

    function setStrokeWidth(width) {
      canvasContext.lineWidth = width;
    }

    function setLineCap(c){
      canvasContext.lineCap = c; 
    }

    function undoLines() {
      allPoints.pop();
      redrawAllLines();
    }

    function clearDrawing() {
      points = [];
      allPoints = [];
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    }

    function handleDrawingEnd(event) {
      event.preventDefault();

      if (state.mousedown) {
        canvasContext.stroke();
      }
      state.mousedown = false;
      if (points.length > 0) {
        allPoints.push(points);
        points = [];
      }

      canvasContext.closePath();
    }

    // ======================
    // == Helper Functions ==
    // ======================
    function getMosuePositionOnCanvas(event) {
      const clientX = event.clientX || event.touches[0].clientX;
      const clientY = event.clientY || event.touches[0].clientY;
      const {
        offsetLeft,
        offsetTop
      } = event.target;

      
      const mouseX = clientX - offsetLeft;
      const mouseY = clientY - offsetTop;

      const originX = node.getBoundingClientRect().x;
      const originY = node.getBoundingClientRect().y;

      const canvasX = (mouseX - originX)/ scale;
      const canvasY = (mouseY - originY)/ scale;

      return {
        x: canvasX,
        y: canvasY
      };
    }
  </script>
  <script>
    function getImageData(){
      // window.postMessage(canvas.toDataURL())
      setColor('red');
      var dataurl = document.getElementById("drawing-area").toDataURL();
      window.ReactNativeWebView.postMessage(dataurl);
    }
    window.onload = function() {
      window.ReactNativeWebView.postMessage('load_success');
      setLineCap("round");
      setStrokeWidth(8);
      setColor('[[COLOR]]');
    };
  </script>
</body>

</html>`;
