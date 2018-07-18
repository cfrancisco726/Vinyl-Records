'use strict';
import React, { Component } from 'react';
import {
	MenuItem,
	Well,
	Panel,
	FormControl,
	FormGroup,
	ControlLabel,
	Button,
	InputGroup,
	DropdownButton,
	Image,
	Col,
	Row
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import {
	postRecords,
	deleteRecords,
	getRecords,
	resetButton
} from '../../actions/recordsActions';
import axios from 'axios';

class RecordsForm extends Component {
	constructor() {
		super();
		this.state = {
			images: [{}],
			img: ''
		};
	}
	componentDidMount() {
		this.props.getRecords();
		axios
			.get('/api/images')
			.then(
				function(response) {
					this.setState({ images: response.data });
				}.bind(this)
			)
			.catch(
				function(err) {
					this.setState({
						images: 'error loading image files from the server',
						img: ''
					});
				}.bind(this)
			);
	}
	handleSubmit() {
		const record = [
			{
				artist: findDOMNode(this.refs.artist).value,
				album: findDOMNode(this.refs.album).value,
				images: findDOMNode(this.refs.image).value,
				price: findDOMNode(this.refs.price).value
			}
		];
		this.props.postRecords(record);
	}

	onDelete() {
		let recordId = findDOMNode(this.refs.delete).value;
		this.props.deleteRecords(recordId);
	}

	handleSelect(img) {
		this.setState({
			img: '/images/' + img
		});
	}

	resetForm() {
		this.props.resetButton();
		findDOMNode(this.refs.artist).value = '';
		findDOMNode(this.refs.album).value = '';
		findDOMNode(this.refs.price).value = '';
		this.setState({ img: '' });
	}

	render() {
		const recordsList = this.props.records.map(function(recordsArr) {
			return <option key={recordsArr._id}>{recordsArr._id}</option>;
		});

		const imgList = this.state.images.map(function(imgArr, i) {
			return (
				<MenuItem
					key={i}
					eventKey={imgArr.name}
					onClick={this.handleSelect.bind(this, imgArr.name)}
				>
					{imgArr.name}
				</MenuItem>
			);
		}, this);
		return (
			<Well>
				<Row>
					<Col xs={12} sm={6}>
						<Panel>
							<InputGroup>
								<FormControl type="text" ref="image" value={this.state.img} />
								<DropdownButton
									componentClass={InputGroup.Button}
									id="input-dropdown-addon"
									artist="Select an Image"
									bsStyle="primary"
								>
									{imgList}
								</DropdownButton>
							</InputGroup>
							<Image src={this.state.img} responsive />
						</Panel>
					</Col>
					<Col xs={12} sm={6}>
						<Panel>
							<FormGroup
								controlId="artist"
								validationState={this.props.validation}
							>
								<ControlLabel>Artist</ControlLabel>
								<FormControl
									type="text"
									placeholder="Enter Artist Name"
									ref="artist"
								/>
								<FormControl.Feedback />
							</FormGroup>
							<FormGroup
								controlId="album"
								validationState={this.props.validation}
							>
								<ControlLabel>Album</ControlLabel>
								<FormControl
									type="text"
									placeholder="Enter Album Title"
									ref="album"
								/>
								<FormControl.Feedback />
							</FormGroup>
							<FormGroup
								controlId="price"
								validationState={this.props.validation}
							>
								<ControlLabel>Price</ControlLabel>
								<FormControl
									type="text"
									placeholder="Enter Price"
									ref="price"
								/>
								<FormControl.Feedback />
							</FormGroup>
							<Button
								onClick={
									!this.props.msg
										? this.handleSubmit.bind(this)
										: this.resetForm.bind(this)
								}
								bsStyle={!this.props.style ? 'primary' : this.props.style}
							>
								{!this.props.msg ? 'Save Record' : this.props.msg}
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
					</Col>
				</Row>
			</Well>
		);
	}
}

function mapStateToProps(state) {
	return {
		records: state.records.records,
		msg: state.records.msg,
		style: state.records.style,
		validation: state.records.validation
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{ postRecords, deleteRecords, getRecords, resetButton },
		dispatch
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsForm);
