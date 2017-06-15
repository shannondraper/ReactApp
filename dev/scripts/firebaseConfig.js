import firebase from 'firebase';
var config = {
	apiKey: "AIzaSyA1hGfATnz8PiTDPk6JDCaP61xoawA_3hU",
	authDomain: "filter-react-app.firebaseapp.com",
	databaseURL: "https://filter-react-app.firebaseio.com",
	projectId: "filter-react-app",
	storageBucket: "filter-react-app.appspot.com",
	messagingSenderId: "118217503062"
};
firebase.initializeApp(config);

export default firebaseConfig