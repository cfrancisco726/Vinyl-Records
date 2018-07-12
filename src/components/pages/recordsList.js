'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecords } from '../../actions/recordsActions';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import RecordItem from './recordItem';
import RecordsForm from './recordsForm';
import Cart from './cart';

class RecordsList extends Component {
	componentDidMount() {
		this.props.getRecords();
	}
	render() {
		const recordsList = this.props.records.map(recordsArr => {
			return (
				<Col xs={12} sm={6} md={4} key={recordsArr._id}>
					<RecordItem
						_id={recordsArr._id}
						title={recordsArr.title}
						description={recordsArr.description}
						price={recordsArr.price}
					/>
				</Col>
			);
		});
		return (
			<Grid>
				<Row>
					<Cart />
				</Row>
				<Row style={{ marginTop: '15px' }}>
					<Col xs={12} sm={6}>
						<RecordsForm />
					</Col>
					{recordsList}
				</Row>
			</Grid>
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
			getRecords: getRecords
		},
		dispatch
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsList);
