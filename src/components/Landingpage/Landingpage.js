import React from 'react'
import Head from 'next/head'
import {Header} from '@/components/Landingpage/Header'
import {Hero} from '@/components/Landingpage/Hero'
import {PrimaryFeatures} from '@/components/Landingpage/PrimaryFeatures'
import {SecondaryFeatures} from '@/components/Landingpage/SecondaryFeatures'
import {Testimonials} from '@/components/Landingpage/Testimonials'
import Footer from '@/components/Landingpage/Footer'

const LandingPage = () => {
    return (
        <>
            <Head>
                <title>Crisissim</title>
                <meta
                    name="description"
                    content="Online crises management tool."
                />
            </Head>
            <Header />
            <main>
                <Hero />
                <PrimaryFeatures />
                <SecondaryFeatures />
            </main>
            <Footer />
        </>
    )
}

export default LandingPage
