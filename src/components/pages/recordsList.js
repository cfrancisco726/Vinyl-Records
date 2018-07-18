'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRecords } from '../../actions/recordsActions';
import { Carousel, Grid, Col, Row, Button, Well } from 'react-bootstrap';
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
						artist={recordsArr.artist}
						album={recordsArr.album}
						images={recordsArr.images}
						price={recordsArr.price}
					/>
				</Col>
			);
		});
		return (
			<Grid>
				<Row>
					<Carousel>
						<Carousel.Item>
							<img
								width={900}
								height={300}
								alt="900x300"
								src="/images/hero_image1.jpg"
							/>
							<Carousel.Caption>
								<h3>First slide label</h3>
								<p>
									Nulla vitae elit libero, a pharetra augue mollis interdum.
								</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<img
								width={900}
								height={300}
								alt="900x300"
								src="/images/hero_image2.jpg"
							/>
							<Carousel.Caption>
								<h3>Second slide label</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<img
								width={900}
								height={300}
								alt="900x300"
								src="/images/hero_image3.jpg"
							/>
							<Carousel.Caption>
								<h3>third slide label</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
				</Row>
				<Row />
				<Row style={{ marginTop: '15px' }}>{recordsList}</Row>
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
