import React from 'react';
import $ from 'jquery';
import Screenshot from './Screenshot.js'
import { 
    BrowserRouter as Router, 
    Route, Link } from 'react-router-dom';

// const dbRef = firebase.database().ref('/');

export default class ImageUpload extends React.Component {
	constructor() {
		super();
		this.state = {
			currentImage: '',
			contrast: '100',
			brightness: '100',
			saturate: '100',
			sepia: '0',
			invert: '0',
			blur: '0'
		}
		this.handleFile = this.handleFile.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.resetFilters = this.resetFilters.bind(this);
		this.saveChange = this.saveChange.bind(this);
	}
	handleFile(e) {
		this.setState({
			value: e.target.value
		});
	}

	handleSubmit(e) {
	    e.preventDefault();
	    var file = this.file.files[0]
	    console.log(file)
	    const imgUrl = this.state.value
	    
	    var storageRef = firebase.storage().ref();
	    //create a space for the image in the storageRef.child in firebase.
	    const mainImage = storageRef.child(this.file.files[0].name)

	    //upload file
	    mainImage.put(file).then((snapshot) => {
	    	//get url from uploaded image
	    	mainImage.getDownloadURL().then((url) => {
	    		console.log(url);
	    		this.setState({
	    			//add url to current image to put onto the page
	    			currentImage: url
	    		})
	    	})
	    });
	}
	resetFilters(e) {
		e.preventDefault();
		this.setState ({
			contrast: '100',
			brightness: '100',
			saturate: '100',
			sepia: '0',
			invert: '0',
			blur: '0'
		})
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value	
		})
	}
	saveChange(e) {
		e.preventDefault();
		const photoEdit = {
			url: this.state.currentImage,
			contrast: this.state.contrast,
			brightness: this.state.brightness,
			saturate: this.state.saturate,
			sepia: this.state.sepia,
			invert: this.state.invert,
			blur: this.state.blur
		}
		firebase.database().ref('/').push(photoEdit);
		console.log('its been saved!')
	}
	// for in over each object, display image on the page
    render() {
		return (
		<div className="ImageUpload">
			<form className="uploadImage" onSubmit={this.handleSubmit}>
				<input type="file" ref={(ref)=> {this.file = ref}}/>
				<input type="submit" value="upload" />
			</form>
			<div className="filters">
				<form onSubmit={this.resetFilters}>
					<h4>Contrast:</h4>
					<input
						type="range" 
						name="contrast"
						value={this.state.contrast}
						min="0"
						max="200"
						onChange={this.handleChange}
					/>
					<h4>Brightness:</h4>
					<input
						type="range" 
						name="brightness"
						value={this.state.brightness}
						min="0"
						max="200"
						onChange={this.handleChange}
					/>
					<h4>Saturation:</h4>
					<input
						type="range" 
						name="saturate"
						value={this.state.saturate}
						min="0"
						max="200"
						onChange={this.handleChange}
					/>
					<h4>Sepia:</h4>
					<input
						type="range" 
						name="sepia"
						value={this.state.sepia}
						min="0"
						max="100"
						onChange={this.handleChange}
					/>
					<h4>Invert:</h4>
					<input
						type="range" 
						name="invert"
						value={this.state.invert}
						min="0"
						max="100"
						onChange={this.handleChange}
					/>
					<h4>Blur:</h4>
					<input
						type="range" 
						name="blur"
						value={this.state.blur}
						min="0"
						max="10"
						onChange={this.handleChange}
					/>
					<div className="resetBtn">
						<input type="submit" value="RESET" />
					</div>
				</form>
				<form onSubmit={this.saveChange}>
					<input type="submit" value="Save Image"/>
				</form>
			</div>

			<div className="imgContainer">
				<div className="loader">
				</div>
				<img 
					src={this.state.currentImage} 
					alt="" 
					style={{WebkitFilter:
						`contrast(${this.state.contrast}%)` +
						`brightness(${this.state.brightness}%)` +
						`saturate(${this.state.saturate}%)` +
						`sepia(${this.state.sepia}%)` +
						`invert(${this.state.invert}%)` + 
						`blur(${this.state.blur}px)`
					}}
				/>
			</div>
			<div>
				
			</div>

		</div>
		)
    }
}

// firebase photo uploader
// url photo, key value pair for each css filter (contrast, saturate, etc.)
// send url and snapshot of key value pairs
// pushes into firebase

// object with url, 
// retrieve objects from firebase