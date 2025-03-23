import React from 'react'
import github from '../../assets/github-mark.png'
import '../../styles/style.css'

export default function Footer() {
    return (
        <footer className='bg-gray-900 shadow-lg p-3 text-white h-50 ' >
            <div className="w-full flex justify-around h-full p-3">
                <p className="footer-text">CodeBox © {new Date().getFullYear()} by Emanuel Sleyman</p>
                <div className="flex justify-between  gap-4 ">
                    <a href="https://github.com/EmSley77" className="flex h-fit gap-4 p-2 bg-gray-300 rounded-xl hover:bg-gray-500 transition-all text-black" target='_blank'><img src={github} alt='github icon' className='h-6' />GitHub</a>
                    <a href="#" className="social-icon">LinkedIn</a>
                    <a href="#" className="social-icon">Twitter</a>
                </div>
            </div>
        </footer>
    );
}