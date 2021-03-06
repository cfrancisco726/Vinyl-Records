'use strict';
import React, { Component } from 'react';
import { Nav, NavItem, Navbar, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Menu extends Component {
	render() {
		return (
			<Navbar inverse fixedTop>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="/">Vinyl Records</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<LinkContainer to="/about">
							<NavItem eventKey={1}>About</NavItem>
						</LinkContainer>
						<LinkContainer to="/contacts">
							<NavItem eventKey={2}>Contact Us</NavItem>
						</LinkContainer>
					</Nav>
					<Nav pullRight>
						<NavItem eventKey={1} href="/admin">
							Admin
						</NavItem>
						<NavItem eventKey={2} href="/cart">
							Your Cart
							{this.props.cartItemsNumber > 0 ? (
								<Badge className="badge">{this.props.cartItemsNumber}</Badge>
							) : (
								''
							)}
						</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default Menu;
