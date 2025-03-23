import React from 'react'
import github from '../../assets/github-mark.png'
import '../../styles/style.css'

export default function Footer() {
    return (
        <footer className='bg-white shadow-lg p-3 ' >
            <div className="w-full flex justify-around">
                <p className="footer-text">CodeBox © {new Date().getFullYear()} by Emanuel Sleyman</p>
                <div className="flex flex-col justify-between">
                    <a href="https://github.com/EmSley77" className="flex gap-2 p-1 bg-gray-300 rounded-xl hover:bg-gray-500 transition-all" target='_blank'><img src={github} alt='github icon' className='h-6' />GitHub</a>
                    <a href="#" className="social-icon">LinkedIn</a>
                    <a href="#" className="social-icon">Twitter</a>
                </div>
            </div>
        </footer>
    );
}