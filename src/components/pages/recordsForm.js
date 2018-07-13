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
import { postRecords, deleteRecords } from '../../actions/recordsActions';

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

	onDelete() {
		let recordId = findDOMNode(this.refs.delete).value;
		this.props.deleteRecords(recordId);
	}

	render() {
		const recordsList = this.props.records.map(recordsArr => {
			return <option key={recordsArr._id}>{recordsArr._id}</option>;
		});
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
				<Panel>
					<FormGroup controlId="formControlsSelect">
						<ControlLabel>Select a record id to delete</ControlLabel>
						<FormControl
							ref="delete"
							componentClass="select"
							placeholder="select"
						>
							<option value="select">select</option>
							{recordsList}
						</FormControl>
					</FormGroup>
					<Button onClick={this.onDelete.bind(this)} bsStyle="danger">
						Delete record
					</Button>
				</Panel>
			</Well>
		);
	}
}

function mapStateToProps(state) {
	return {
		records: state.records.records
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			postRecords,
			deleteRecords
		},
		dispatch
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsForm);
