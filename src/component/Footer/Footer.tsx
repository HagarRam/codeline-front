import React from 'react';
import './Footer.css';
const Footer: React.FC = () => {
	return (
		<footer id="footerPage">
			<hr className="footer-hr" />
			<div className="footer-info">
				<div id="info"> Term of Use</div>
				<div id="info">Privacy Policy</div>
			</div>
		</footer>
	);
};

export default Footer;
