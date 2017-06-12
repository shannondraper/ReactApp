import React from 'react';
import $ from 'jquery';

export default class Screenshot extends React.Component {
	constructor() {
		super();
		this.state = {
			screenshot: ''
		}
		this.getScreenshot = this.getScreenshot.bind(this);
	}
	getScreenshot(e) {
		e.preventDefault();
		html2canvas(document.body,{
			onrendered: function(canvas) {
				$('.screenshotContainer').append(canvas);
			}
		});
	}
	render() {
		return (
			<div>
				<form onSubmit={this.getScreenshot}>
					<input type="submit" value="Save Image"/>
				</form>
				<div className="screenshotContainer">
				</div>
			</div>
		)
	}
}

