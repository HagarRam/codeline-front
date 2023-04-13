import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/newlogo.png';
import './NavBar.css';
const NavBar: React.FC = () => {
	const navigate = useNavigate();
	return (
		<div id="NavBar">
			<img
				src={logo}
				alt="logo"
				id="logo"
				onClick={() => navigate(`/`)}
			/>
		</div>
	);
};

export default NavBar;
