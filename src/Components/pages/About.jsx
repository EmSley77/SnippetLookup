import React from 'react'
import '../../styles/style.css'
import Hero from '../about/Hero.jsx'
import HeroSaveSection from '../about/HeroSaveSection.jsx'
import Landing from '../about/Landing.jsx'
import Footer from './Footer.jsx'
import Header from './Header.jsx'
import Bar from '../chart/Bar.jsx'

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

