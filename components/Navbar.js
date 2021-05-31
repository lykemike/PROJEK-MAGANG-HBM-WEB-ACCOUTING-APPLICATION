import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default function navbar() {
	return (
		<div>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Navbar.Brand href="#home">PT. Hexaon Mitrasindo</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto" />
					<Nav>
						<NavDropdown title="Welcome, Admin" id="collasible-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}
