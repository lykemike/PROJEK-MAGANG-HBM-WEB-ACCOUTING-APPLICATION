import React from 'react';
import { Navbar, Nav, NavDropdown , Form } from 'react-bootstrap';
import { Formik, Form as Forms } from 'formik';
import { useRouter } from 'next/router'
import Axios from 'axios'


export default function navbar() {
	const url = 'http://localhost:3000/api/user/logout';
    const router = useRouter()
	return (
		<Formik
		initialValues={{
			loginEmail: '',
			loginPassword: '',
		}}

		// validationSchema={Logi}
		onSubmit={async (values) => {
			Axios.post(url, values).
				then(function (response) {
					if (response.data.data !== null) {
						alert("Logout Berhasil")
					   
						// console.log(response.data)
						localStorage.setItem('user_login', JSON.stringify(response.data.data));
						router.push('login')

					} else {
						alert("Logout gagal")
						router.push('/')
					}
				}).
				catch(function (error) { console.log(error) })
		}}
	>
		{(props) => (
			<Forms noValidate>
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

							<NavDropdown.Item onClick={props.handleSubmit}>Logout</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
		</Forms>
        )}
    </Formik>
	);
}
