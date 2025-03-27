import React from 'react'
import '../../styles/style.css'
import Landing from '../about/Landing.jsx'
import Hero from '../about/Hero.jsx'
import HeroSaveSection from '../about/HeroSaveSection.jsx'
import Footer from './Footer.jsx'
import Header from './Header.jsx'

export default function About() {
    return (
    <>
        <Header />
        <Landing />
        <Hero />
        <HeroSaveSection />
        <Footer />
    </>
    )
}
