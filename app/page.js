

import Hero from './components/Hero'
import Features from './components/Features'
import Rewards from './components/Rewards'
import Stats from './components/Stats'
import PayoutTable from './components/PayoutTable'
import AdvancedBakerStats from './components/AdvancedBakerStats'
import Testimonials from './components/Testimonials'
import CallToAction from './components/CTA'

// Main server component for the landing page
export default function Page() {
  return (
    <main>
      <Hero />
      <Features />
      <Rewards />
      <Stats />
      <PayoutTable />
      <AdvancedBakerStats />
      <div className="pt-16 md:pt-24">
        <Testimonials />
      </div>
      <CallToAction />
    </main>
  )
}