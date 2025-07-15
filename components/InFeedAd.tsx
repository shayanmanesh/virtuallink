'use client'

import { useEffect, useRef, useState } from 'react'

interface InFeedAdProps {
  slot: string
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export default function InFeedAd({ 
  slot, 
  className = '' 
}: InFeedAdProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [adLoaded, setAdLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !adLoaded) {
          setIsVisible(true)
          loadAd()
        }
      },
      { threshold: 0.1 }
    )

    if (adRef.current) {
      observer.observe(adRef.current)
    }

    return () => observer.disconnect()
  }, [adLoaded])

  const loadAd = async () => {
    if (adLoaded) return
    
    try {
      // Wait for AdSense script to load
      await new Promise(resolve => setTimeout(resolve, 100))
      
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
      
      setAdLoaded(true)
    } catch (error) {
      console.error('Failed to load AdSense in-feed ad:', error)
      setAdLoaded(true)
    }
  }

  return (
    <div
      ref={adRef}
      className={`ad-unit ${className} my-8`}
    >
      {isVisible && (
        <div className="transition-opacity duration-300 opacity-100">
          <ins 
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-format="autorelaxed"
            data-ad-client="ca-pub-5635114711353420"
            data-ad-slot={slot}
          />
        </div>
      )}
    </div>
  )
}