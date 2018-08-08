'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Panel,
	Col,
	Row,
	Well,
	Button,
	ButtonGroup,
	Label,
	Modal
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { deleteCartItem, updateCart, getCart } from '../../actions/cartActions';

class Cart extends Component {
	componentDidMount() {
		this.props.getCart();
	}
	onDelete(_id) {
		const currentRecordToDelete = this.props.cart;

		const indexToDelete = currentRecordToDelete.findIndex(cart => {
			return cart._id === _id;
		});
		let cartAfterDelete = [
			...currentRecordToDelete.slice(0, indexToDelete),
			...currentRecordToDelete.slice(indexToDelete + 1)
		];
		this.props.deleteCartItem(cartAfterDelete);
	}
	onIncrement(_id) {
		this.props.updateCart(_id, 1, this.props.cart);
	}
	onDecrement(_id, quantity) {
		if (quantity > 1) {
			this.props.updateCart(_id, -1, this.props.cart);
		}
	}

	constructor(props, context) {
		super(props, context);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			show: false
		};
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}

	render() {
		if (this.props.cart[0]) {
			return this.renderCart();
		} else {
			return this.renderEmpty();
		}
	}

	renderEmpty() {
		return <div />;
	}

	renderCart() {
		const cartItemsList = this.props.cart.map(function(cartArr) {
			return (
				<Panel key={cartArr._id}>
					<Row style={{ margin: '20px' }}>
						<Col xs={12} sm={4}>
							<h6>{cartArr.artist}</h6>
							<span> </span>
						</Col>
						<Col xs={12} sm={4}>
							<h6>usd. {cartArr.price}</h6>
						</Col>
						<Col xs={12} sm={4}>
							<h6>
								qty. <Label bsStyle="success">{cartArr.quantity}</Label>
							</h6>
						</Col>
						<Col xs={6} sm={4}>
							<ButtonGroup style={{ minWidth: '300px' }}>
								<Button
									onClick={this.onDecrement.bind(
										this,
										cartArr._id,
										cartArr.quantity
									)}
									bsStyle="default"
									bsSize="small"
								>
									-
								</Button>
								<Button
									onClick={this.onIncrement.bind(this, cartArr._id)}
									bsStyle="default"
									bsSize="small"
								>
									+
								</Button>
								<span> </span>
								<Button
									onClick={this.onDelete.bind(this, cartArr._id)}
									bsStyle="danger"
									bsSize="small"
								>
									DELETE
								</Button>
							</ButtonGroup>
						</Col>
					</Row>
				</Panel>
			);
		}, this);
		return (
			<Panel header="Cart" bsStyle="primary">
				{cartItemsList}
				<Row style={{ margin: '20px' }}>
					<Col xs={12}>
						<h6>Total amount: {this.props.totalAmount}</h6>
						<Button
							onClick={this.handleShow.bind(this)}
							Style="success"
							bsSize="small"
						>
							Proceed to Checkout
						</Button>
					</Col>
				</Row>
				<Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
					<Modal.Header closeButton>
						<Modal.Title>Check out</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h6>Your order has been saved</h6>
						<p>You will receive an email confirmation </p>
					</Modal.Body>
					<Modal.Footer>
						<Col xs={6}>
							<h6>total $:{this.props.totalAmount}</h6>
						</Col>
						<Button onClick={this.handleClose.bind(this)}>Close</Button>
					</Modal.Footer>
				</Modal>
			</Panel>
		);
	}
}

function mapStateToProps(state) {
	return {
		cart: state.cart.cart,
		totalAmount: state.cart.totalAmount
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			deleteCartItem: deleteCartItem,
			updateCart: updateCart,
			getCart: getCart
		},
		dispatch
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
