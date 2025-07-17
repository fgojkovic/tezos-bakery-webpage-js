'use client'

import { useEffect } from 'react'
import { useAnimation } from 'framer-motion'
import { useInView } from 'framer-motion'

export const useScrollAnimation = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return [ref, controls]
}