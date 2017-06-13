import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import config from './common/config.js';
import ImageUpload from './components/ImageUpload.js'
import ImageDownload from './components/ImageDownload.js'
import { 
    BrowserRouter as Router, 
    Route, Link } from 'react-router-dom';


//Set up firebase database
firebase.initializeApp(config);
const dbRef = firebase.database().ref('/');


class App extends React.Component {
    render() {
      return (
      	<Router>
	      	<div className="mainPhoto">
	      		<nav>
	      			<ul>
	      				<li>
	      					<a href="/home" className="logoBtn"><img src="dev/assets/logo.png" alt="logo" /></a>
	      				</li>
	      				<li>
	      					<h1>FILTER</h1>
	      				</li>

	      				<li>
	      					<ul>
	      						<li><Link to="/home" className="navBtn">EDIT</Link></li>
	      						<li><Link to="/view" className="navBtn">VIEW POSTS</Link></li>
	      					</ul>
	      				</li>
	      				
	      			</ul>
	      		</nav>
	      		<div className="edit wrapper">
	      			<Route path="/home" component={ImageUpload} />
	      		</div>
	      		<div className="view">
	      			<Route path="/view" component={ImageDownload} />
	      		</div>
	       	</div>
      	</Router>
      )
    }
}
ReactDOM.render(<App />, document.getElementById('app'));





