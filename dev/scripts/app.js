import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Main from './components/Main.js';
import ImageUpload from './components/ImageUpload.js';





const auth = firebase.auth();
//provider is giving us access to googleAuth in our application
const provider = new firebase.auth.GoogleAuthProvider();
const dbRef = firebase.database().ref('/');


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
	}
	handleSubmit(e) {
		e.preventDefault();
		const userId = this.state.user.uid
		//creates subfolder in firebase with user's id as the key of the subfolder
		const userRef = firebase.database().ref(userId);
	}
	login() {
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
		      					<a href="/home" className="logoBtn"><img src="dev/assets/logo.png" alt="logo" /></a>
		      				</li>
		      				<li>
		      					<h1>FILTER</h1>
		      				</li>

		      				<li>
		      					<ul>

		      						<li><button onClick={this.logout}>Log Out</button></li>
		      					</ul>
		      				</li>
		      				
		      			</ul>
		      		</nav>
		      		<ImageUpload />
		       	</div>

		      )
    		} else {
    			return (
    				//if logged in is NOT true, show log in button only.
    				<div>
    					<p>Please Log in.</p>
    					<button onClick={this.login}>Log In</button>
    				</div>
    			)
    		}
    	}
		return (
			<div>
				{showApp()}
			</div>
		)
	}
}
ReactDOM.render(<App />, document.getElementById('app'));
