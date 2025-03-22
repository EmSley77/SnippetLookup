import React from 'react'
import '../../Styles/footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">CodeBox © {new Date().getFullYear()} by Emanuel Sleyman</p>
                <div className="social-links">
                    <a href="https://github.com/EmSley77" className="social-icon" target='_blank'>GitHub</a>
                    <a href="#" className="social-icon">LinkedIn</a>
                    <a href="#" className="social-icon">Twitter</a>
                </div>
            </div>
        </footer>
    );
}