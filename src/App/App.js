import React, { Component } from 'react';
import SignatureCanvas from 'react-signature-canvas';

import './App.css';

import SigBox from './SigBox';


class App extends Component {

  testMethod = ({hi, there}) => console.log(hi, there)

  render() {
    return (
      <main className="demo_main">
        <h4>{`Custom React signature box (mouse/touch):`}</h4>
        <p>{`First prototype, custom React component using canvas, no math yet, utterly basic.`}</p>

          <SigBox />

        <div className="vert_divider"></div>
        <h4>{`Open-source React signature box (mouse/touch):`}</h4>
        <p>{`Integrated throttling, Bezier curve function, and velocity based point thickness.  #goals`}</p>

          <SignatureCanvas canvasProps={{ width: 450, height: 200, className: "r-s-canvas"}} />

      </main>
    )
  }
};

export default App;
