import React from 'react'
import '../../styles/style.css'
import Landing from '../home/Landing.jsx'
import Hero from '../Pages/Hero.jsx'
import HeroSaveSection from '../Pages/HeroSaveSection.jsx'
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
