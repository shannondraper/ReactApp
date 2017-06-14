import React from 'react';
import ReactDOM from 'react-dom';
import ImageUpload from './ImageUpload.js';
import ImageDownload from './ImageDownload.js';
import App from '../app.js';
import firebase from 'firebase';

import { 
    BrowserRouter as Router, 
    Route, Link } from 'react-router-dom';


export default class Main extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={App} />
					<Route path="/edit" component={ImageUpload} />
					<Route path="/view" component={ImageDownload} />
				</div>
			</Router>
		)
	}
	componentDidMount() {
		var config = {
		    apiKey: "AIzaSyA1hGfATnz8PiTDPk6JDCaP61xoawA_3hU",
		    authDomain: "filter-react-app.firebaseapp.com",
		    databaseURL: "https://filter-react-app.firebaseio.com",
		    projectId: "filter-react-app",
		    storageBucket: "filter-react-app.appspot.com",
		    messagingSenderId: "118217503062"
		};
		firebase.initializeApp(config);
		console.log(firebase);
	}
}

ReactDOM.render(<Main />, document.getElementById('app'));