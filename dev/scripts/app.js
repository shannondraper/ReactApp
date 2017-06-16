import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import Main from './components/Main.js';
import ImageUpload from './components/ImageUpload.js';
import ImageDownload from './components/ImageDownload.js';
import { 
    BrowserRouter as Router, 
    Route, Link } from 'react-router-dom';

var config = {
		    apiKey: "AIzaSyA1hGfATnz8PiTDPk6JDCaP61xoawA_3hU",
		    authDomain: "filter-react-app.firebaseapp.com",
		    databaseURL: "https://filter-react-app.firebaseio.com",
		    projectId: "filter-react-app",
		    storageBucket: "filter-react-app.appspot.com",
		    messagingSenderId: "118217503062"
		};
		firebase.initializeApp(config);




export default class App extends React.Component {
	constructor() {
		super();
		//these are default states when the application is first opened.
		this.state = {
			loggedIn: false,
			user: null
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);

	
	const auth = firebase.auth();
	//provider is giving us access to googleAuth in our application
	const provider = new firebase.auth.GoogleAuthProvider();
	const dbRef = firebase.database().ref('/');
	}


	handleSubmit(e) {
		e.preventDefault();
		const userId = this.state.user.uid
		//creates subfolder in firebase with user's id as the key of the subfolder
		const userRef = firebase.database().ref(userId);
	}
	login() {
		const auth = firebase.auth();
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider)
			.then((result) => {
				//this is where we get info about the user
				const user = result.user;
				//when sign up is successful, store user in state of component, and update logged in to be true
				//need to bind login in the constructor to get access to 'this'
				this.setState({
					user: user,
					loggedIn: true
				})
			})
	}
	logout() {
		const auth = firebase.auth();
		auth.signOut()
			//when the user is signed out, then:
			.then(() => {
				this.setState({
					user: null,
					loggedIn: false
				})
			})
	}
	componentDidMount() {
		const auth = firebase.auth();
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					user,
					loggedIn: true
				})
			}
		})
	}
    render() {
    	const showApp = () => {
    		//function is going to return jsx
    		if (this.state.loggedIn === true) {
		      return (
		      	<div className="mainPhoto">
					<nav>
						<ul>
							<li>
								<a href="/" className="logoBtn"><img src="dev/assets/logo.png" alt="Filtergram logo" /></a>
							</li>
							<li>
								<a href="https://filter-react-app.firebaseapp.com"><h1>Filtergram</h1></a>
							</li>
							<li>
								<Link className="Link" to="/">EDIT</Link>
								<Link className="Link" to="/view">VIEW</Link>
								<button className="logOutBtn" onClick={this.logout}>Log Out</button>
							</li>
						</ul>
					</nav>
		      		<div className="wrapper">
						<div>
							<Route exact path="/" component={ImageUpload} />
							<Route path="/view" component={ImageDownload} />
						</div>
		      		</div>
		      		<footer className="wrapper">
		      			<span><a href="http://shannondraper.com/">Shannon Draper 2017 &copy;</a></span>
		      		</footer>
		       	</div>
		      )
    		} else {
    			return (
    				//if logged in is NOT true, show log in button only.
    				<div className="logInPage">
    					<div className="logInContainer">
	    					<h1>Filtergram
	    					</h1>
	    					<img src="dev/assets/logo.png" alt="logo" />
	    					<button onClick={this.login}>Log In</button>
    					</div>
    				</div>
    			)
    		}
    	}
		return (
			<Router>
				<div>
					{showApp()}
				</div>
			</Router>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
