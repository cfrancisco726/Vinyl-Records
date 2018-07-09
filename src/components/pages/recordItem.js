'use strict';
import React, { Component } from 'react';

import { Row, Col, Well, Button } from 'react-bootstrap';

class RecordItem extends Component {
	render() {
		return (
			<Well>
				<Row>
					<Col xs={12}>
						<h6>{this.props.title}</h6>
						<p>{this.props.description}</p>
						<h6>{this.props.price}</h6>
						<Button bsStyle="primary">Buy now</Button>
					</Col>
				</Row>
			</Well>
		);
	}
}

export default RecordItem;
