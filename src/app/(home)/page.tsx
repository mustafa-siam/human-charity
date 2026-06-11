import { About } from '@/components/PageComponents/HomePage/About'
import { Advisor } from '@/components/PageComponents/HomePage/Advisor'
import { Contact } from '@/components/PageComponents/HomePage/Contact'
import { Focus } from '@/components/PageComponents/HomePage/Focus'
import { Hero } from '@/components/PageComponents/HomePage/Hero'
import { ImpactStory } from '@/components/PageComponents/HomePage/ImpactStory'
import { Notices } from '@/components/PageComponents/HomePage/Notices'
import { Projects } from '@/components/PageComponents/HomePage/Projects'
import { Team } from '@/components/PageComponents/HomePage/Team'
import { db } from '@/lib/db'
import React from 'react'

const page = async() => {
  return (
    <div>
      <Hero></Hero>
      <Projects></Projects>
      <Focus></Focus>
      <Notices></Notices>
      {/* <Advisor></Advisor> */}
      {/* <Team></Team> */}
      <About></About>
      <ImpactStory></ImpactStory>
      <Contact></Contact>
    </div>
  )
}

export default page