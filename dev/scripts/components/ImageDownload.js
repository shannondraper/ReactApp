import React from 'react';
import $ from 'jquery';
import firebase from 'firebase';
import { 
    BrowserRouter as Router, 
    Route, Link } from 'react-router-dom';

export default class ImageDownload extends React.Component {
	constructor() {
		super();
		this.state = {
			filterData: []
		}
	}
	componentDidMount() {
		//takes filter values of user's edited images and stores them in firebase database with a key.
		const imageRef = firebase.database().ref('/');
		imageRef.on('value', (snapshot) => {
			const userImages = snapshot.val();
			const filterData = [];
			for (let key in userImages) {
				filterData.push({
					key: key,
					singleData: userImages[key]
				})
				// console.log(key, userImages[key]);
			}
			this.setState({
				filterData
			})
		})
	}
	render() {
		return (
			<ul className="downloadedImages">
				{this.state.filterData.map( (singleFilter) => {
					const filter = singleFilter.singleData
					return (
						<li key={singleFilter.key}>
							<img 
								src={filter.url} 
								alt="" 
								style={{WebkitFilter:
									`contrast(${filter.contrast}%)` +
									`brightness(${filter.brightness}%)` +
									`saturate(${filter.saturate}%)` +
									`sepia(${filter.sepia}%)` +
									`invert(${filter.invert}%)` + 
									`blur(${filter.blur}px)`
								}}
							/>
						</li>
					)
				})}
			</ul>
		)
	}
}