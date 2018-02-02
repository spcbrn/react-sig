import React, { Component } from 'react';
import SignatureCanvas from 'react-signature-canvas';

import './App.css';


class App extends Component {

  componentDidMount = () => {
    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext('2d');

    this.cW = this.canvas.width;
    this.cH = this.canvas.height;
    this.coords = { pX: 0, pY: 0, cX: 0, cY: 0 };
    this.isTracking = false;

    this.canvas.addEventListener('mousedown', e => this.handleCanvasEvent('down', e), false);
    this.canvas.addEventListener('mousemove', e => this.handleCanvasEvent('move', e), false);
    this.canvas.addEventListener('mouseup', e => this.handleCanvasEvent('up', e), false);
    this.canvas.addEventListener('mouseout', e => this.handleCanvasEvent('out', e), false);
    this.canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      let touch = e.touches[0];
      this.handleCanvasEvent('down', touch);
    }, false);
    this.canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      let touch = e.touches[0];
      this.handleCanvasEvent('move', touch);
    }, false);
    this.canvas.addEventListener('touchend', e => {
      e.preventDefault()
      let touch = e.touches[0];
      this.handleCanvasEvent('up', touch);
    }, false);

  }

  draw = () => {
    if (!this.isTracking) return;

    let { ctx, coords } = this;
    let { pX, pY, cX, cY } = coords;

    ctx.beginPath();
    ctx.moveTo(pX, pY);
    ctx.lineTo(cX, cY);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }

  handleCanvasEvent = (type, e) => {
    let { canvas, ctx, draw } = this;
    let eventMethods = {
      down: e => {
        this.isTracking = true;
        this.coords.pX = this.coords.cX;
        this.coords.pY = this.coords.cY;
        this.coords.cX = e.clientX - canvas.offsetLeft;
        this.coords.cY = e.clientY - canvas.offsetTop;

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(this.coords.cX, this.coords.cY, 1, 0, Math.PI*2)
        ctx.stroke();
        ctx.closePath();
      },
      move: e => {
        if (!this.isTracking) return;
        this.coords.pX = this.coords.cX;
        this.coords.pY = this.coords.cY;
        this.coords.cX = e.clientX - canvas.offsetLeft;
        this.coords.cY = e.clientY - canvas.offsetTop;
        draw();
      },
      up: e => this.isTracking = false,
      out: e => null
    }

    return eventMethods[type](e);
  }

  captureCanvas = () => {
    let { canvas } = this;
    console.log(canvas.toDataURL())
  }

  clearCanvas = () => this.ctx.clearRect(0, 0, this.cW, this.cH);

  drawSig = url => {
    this.clearCanvas();
    let image = new Image();
    image.src = url;
    image.onload = () => this.ctx.drawImage(image, 0, 0);
  }


  render() {
    return (
      <section className="sig_box_main">
        <h4>Custom React signature component:</h4>
        <canvas id='canvas'
                ref="canvas"
                height="200"
                width="450"
                style={{"border":"2px solid black"}} >
        </canvas><br />
        <button onClick={this.captureCanvas}>Save</button>
        <button onClick={this.clearCanvas}>Clear</button>
        <button onClick={() => this.drawSig(data)}>Print</button><br />
        <h4>Open source React signature component:</h4>
        <SignatureCanvas canvasProps={{ width: 450, height: 200, className: "r-sig"}} />
      </section>
    )
  }
};

export default App;




const data = 'data:image/png;base64,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'
