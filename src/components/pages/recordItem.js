import React, { Component } from 'react';
import { Row, Col, Well, Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart, updateCart } from '../../actions/cartActions';

class RecordItem extends Component {
	handleCart() {
		const record = [
			...this.props.cart,
			{
				_id: this.props._id,
				artist: this.props.artist,
				album: this.props.album,
				images: this.props.images,
				price: this.props.price,
				quantity: 1
			}
		];
		if (this.props.cart.length > 0) {
			let _id = this.props._id;

			let cartIndex = this.props.cart.findIndex(cart => {
				return cart._id === _id;
			});
			if (cartIndex === -1) {
				this.props.addToCart(record);
			} else {
				this.props.updateCart(_id, 1, this.props.cart);
			}
		} else {
			this.props.addToCart(record);
		}
	}

	constructor() {
		super();
		this.state = {
			isClicked: false
		};
	}

	onReadMore() {
		this.setState({ isClicked: true });
	}

	render() {
		return (
			<Well>
				<Row>
					<Col xs={12} sm={4}>
						<Image src={this.props.images} responsive />
					</Col>
					<Col xs={6} sm={8}>
						<h6>{this.props.artist}</h6>
						<p>
							{this.props.album.length > 50 && this.state.isClicked === false
								? this.props.album.substring(0, 50)
								: this.props.album}{' '}
							<button className="link" onClick={this.onReadMore.bind(this)}>
								{this.state.isClicked === false &&
								this.props.album !== null &&
								this.props.album.length > 50
									? '...read more'
									: ''}
							</button>
						</p>
						<h6>usd {this.props.price}</h6>
						<Button onClick={this.handleCart.bind(this)} bsStyle="primary">
							buy now
						</Button>
					</Col>
				</Row>
			</Well>
		);
	}
}
function mapStateToProps(state) {
	return {
		cart: state.cart.cart
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			addToCart: addToCart,
			updateCart: updateCart
		},
		dispatch
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordItem);
