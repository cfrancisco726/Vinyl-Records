import React, { Component } from 'react';

class Contact extends Component {
	render() {
		return (
			<div className="container">
				<div>
					<img
						width={900}
						height={300}
						alt="900x300"
						src="/images/contact_us.jpg"
					/>
				</div>
				<address style={{ marginTop: '10px' }}>
					<span>Vinyl Records</span>
					<br />
					<span>48 West 1st St. bet 3rd + 4th Aves.</span>
					<br />
					<span>New York, NY 10003</span>
					<br />
					<span>212-555-0657</span>
					<br />
					<span>hours:</span>
					<br />
					<span>12-8pm, 7 Days A Week</span>
				</address>
			</div>
		);
	}
}
export default Contact;
