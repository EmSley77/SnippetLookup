import React from 'react'
import '../../styles/style.css'
import Landing from './Landing.jsx'
import Hero from './Hero.jsx'
import HeroSaveSection from './HeroSaveSection.jsx'
import Footer from '../Shared/Footer.jsx'

export default function About() {
    return (<>
        <Landing />
        <Hero />
        <HeroSaveSection />
        <Footer />
    </>
    )
}
