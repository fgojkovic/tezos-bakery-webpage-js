

import Hero from './components/Hero'
import BakerStatus from './components/BakerStatus'
import Features from './components/Features'
import Rewards from './components/Rewards'
import Stats from './components/Stats'
import PayoutTable from './components/PayoutTable'
import AdvancedBakerStats from './components/AdvancedBakerStats'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'

// Main server component for the landing page
export default function Page() {
  return (
    <main>
      <BakerStatus />
      <Hero />
      <Features />
      <Rewards />
      <Stats />
      <PayoutTable />
      <AdvancedBakerStats />
      <Testimonials />
      <CTA />
    </main>
  )
}