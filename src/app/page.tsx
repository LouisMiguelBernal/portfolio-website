'use client'

import { useState } from 'react'
import IntroLoader from '@/components/IntroLoader'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Certificates from '@/components/Certificates'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Page() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      {!introDone && (
        <IntroLoader onDone={() => setIntroDone(true)} />
      )}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Certificates />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
