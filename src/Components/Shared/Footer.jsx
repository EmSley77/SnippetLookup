import React from 'react'
import '../../Styles/footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">Solo Dev © {new Date().getFullYear()}</p>
                <div className="social-links">
                    <a href="#" className="social-icon">GitHub</a>
                    <a href="#" className="social-icon">LinkedIn</a>
                    <a href="#" className="social-icon">Twitter</a>
                </div>
            </div>
        </footer>
    );
}