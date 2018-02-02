import React, { Component } from 'react';
import axios from 'axios';


class SigBox extends Component {

  componentDidMount = () => {
    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext('2d');

    this.cW = this.canvas.width;
    this.cH = this.canvas.height;
    this.coords = { pX: 0, pY: 0, cX: 0, cY: 0 };
    this.isTracking = false;

    this.ctx.strokeStyle = '#222222';
    this.ctx.fillStyle = '#222222';;

    this.canvas.addEventListener('mousedown', e => this.handleCanvasEvent('down', e), false);
    this.canvas.addEventListener('mousemove', e => this.handleCanvasEvent('move', e), false);
    document.addEventListener('mouseup', e => this.handleCanvasEvent('up', e), false);
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
        ctx.arc(this.coords.cX, this.coords.cY, .7, 0, Math.PI * 2)
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
      up: e => this.isTracking = false
    }

    return eventMethods[type](e);
  }

  captureCanvas = () => {
    let { canvas } = this;
    let body = { id: null, data: canvas.toDataURL() };
    // console.log(body)

    axios.post('/api/signature/new', body)
      .then(resp => console.log('Entries: ', resp.data))
      .catch(err => console.log(err));
  }

  clearCanvas = () => this.ctx.clearRect(0, 0, this.cW, this.cH);

  getSig = () => {
    axios.get('/api/signature/3')
      .then(resp => this.writeSig(resp.data.data))
      .catch(err => console.log(err))
  }



  writeSig = url => {
    this.clearCanvas();
    let image = new Image();
    image.src = url;
    image.onload = () => this.ctx.drawImage(image, 0, 0);
  }


  render() {
    // const dummySig = () => {
      // return (`data:image/png;base64,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`) }



    return (
      <section className="sig_box_main">
        <canvas id='canvas'
                ref="canvas"
                height="200"
                width="450"
                style={{ "border":"2px solid #222222" }} >
        </canvas><br />
        <button onClick={this.captureCanvas}>Save</button>
        <button onClick={this.clearCanvas}>Clear</button>
        <button onClick={this.getSig}>Print</button><br />
      </section>
    )
  }
};

export default SigBox;




const Bezier = (startPoint, control1, control2, endPoint) => {
  this.startPoint = startPoint;
  this.control1 = control1;
  this.control2 = control2;
  this.endPoint = endPoint;
}

// Returns approximated length.
Bezier.prototype.length = function () {
  const steps = 10;
  let length = 0;
  let px;
  let py;

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const cx = this._point(
      t,
      this.startPoint.x,
      this.control1.x,
      this.control2.x,
      this.endPoint.x,
    );
    const cy = this._point(
      t,
      this.startPoint.y,
      this.control1.y,
      this.control2.y,
      this.endPoint.y,
    );
    if (i > 0) {
      const xdiff = cx - px;
      const ydiff = cy - py;
      length += Math.sqrt((xdiff * xdiff) + (ydiff * ydiff));
    }
    px = cx;
    py = cy;
  }

  return length;
};

/* eslint-disable no-multi-spaces, space-in-parens */
Bezier.prototype._point = function (t, start, c1, c2, end) {
  return (       start * (1.0 - t) * (1.0 - t)  * (1.0 - t))
       + (3.0 *  c1    * (1.0 - t) * (1.0 - t)  * t)
       + (3.0 *  c2    * (1.0 - t) * t          * t)
       + (       end   * t         * t          * t);
};
/* eslint-enable no-multi-spaces, space-in-parens */
