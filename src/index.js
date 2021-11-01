import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Login} from './component/loginapp.js';


class Image extends React.Component{
  render(){
    return (
          <div className="container">
            <div className="heading">
              <h1>PHYSIOAI</h1>
              <h3>WELCOME BACK</h3>
            </div>

          <Login />

          </div>

    )
  }
}

ReactDOM.render(<Image/> , document.getElementById('root'));


