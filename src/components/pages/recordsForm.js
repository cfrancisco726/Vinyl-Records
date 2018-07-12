'use strict';

import React, { Component } from 'react';
import {
	Well,
	Panel,
	FormControl,
	FormGroup,
	ControlLabel,
	Button
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import { postRecords } from '../../actions/recordsActions';

class RecordsForm extends Component {
	handleSubmit() {
		const record = [
			{
				title: findDOMNode(this.refs.title).value,
				description: findDOMNode(this.refs.description).value,
				price: findDOMNode(this.refs.price).value
			}
		];
		this.props.postRecords(record);
	}

	render() {
		return (
			<Well>
				<Panel>
					<FormGroup controlId="title" style={{ margin: '10px' }}>
						<ControlLabel>Title</ControlLabel>
						<FormControl type="text" placeholder="Enter Title" ref="title" />
					</FormGroup>
					<FormGroup controlId="description" style={{ margin: '10px' }}>
						<ControlLabel>Description</ControlLabel>
						<FormControl
							type="text"
							placeholder="Enter Description"
							ref="description"
						/>
					</FormGroup>
					<FormGroup controlId="price" style={{ margin: '10px' }}>
						<ControlLabel>Price</ControlLabel>
						<FormControl type="text" placeholder="Enter Price" ref="price" />
					</FormGroup>
					<Button
						onClick={this.handleSubmit.bind(this)}
						bsStyle="primary"
						style={{ margin: '10px' }}
					>
						Save record
					</Button>
				</Panel>
			</Well>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ postRecords, dispatch });
}

export default connect(null, mapDispatchToProps)(RecordsForm);
