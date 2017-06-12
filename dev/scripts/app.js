import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import config from './common/config.js';
import ImageUpload from './components/ImageUpload.js'
import ImageDownload from './components/ImageDownload.js'


//Set up firebase database
firebase.initializeApp(config);
const dbRef = firebase.database().ref('/');


class App extends React.Component {
    render() {
      return (
      	<div className="mainPhoto">
      		  <ImageUpload />
      		  <ImageDownload />
       	</div>
      )
    }
}
ReactDOM.render(<App />, document.getElementById('app'));





