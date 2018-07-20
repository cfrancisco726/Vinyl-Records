import React, { Component } from 'react';

class About extends Component {
	render() {
		return (
			<div className="container">
				<div>
					<img
						width={900}
						height={300}
						alt="900x300"
						src="/images/about_us.jpg"
					/>
				</div>
				<div>
				<p style={{ marginTop: '10px' }}>
					At Vinyl Records, our DJs select songs from infinite choices,
					skillfully mix them together, and maintain a certain relation /
					obligation to their audience. We pride ourselves in extracting its
					catalog selections from diverse sources: from skateboarding, pop
					culture, audiophile stereo and more. <br /> <br />Much of our
					knowledge comes from our first-hand interactions with the customer.
					Our business model and dedicated customer base allowed Vinyl Records
					to rapidly grow. We are always fairly priced and are willing to work
					with you.
				</p>
				</div>
			</div>
		);
	}
}
export default About;
