'use client'

import { useEffect, useRef, useState } from 'react'

interface GoogleAdUnitProps {
  type: 'leaderboard' | 'rectangle' | 'mobile-banner' | 'sidebar' | 'sticky-footer'
  position: 'header' | 'sidebar' | 'in-content' | 'footer' | 'sticky'
  responsive?: boolean
  className?: string
}

const AD_SLOTS = {
  leaderboard: '3137758017', // display_horizontal
  rectangle: '4431777949', // Display_responsive_square
  'mobile-banner': '3137758017', // display_horizontal
  sidebar: '4175507517', // display_vertical
  'sticky-footer': '3137758017' // display_horizontal
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export default function GoogleAdUnit({ 
  type, 
  position, 
  responsive = true, 
  className = '' 
}: GoogleAdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [adLoaded, setAdLoaded] = useState(false)
  const adSlot = AD_SLOTS[type]

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
      console.error('Failed to load AdSense ad:', error)
      setAdLoaded(true) // Set to true to prevent retrying
    }
  }

  return (
    <div
      ref={adRef}
      className={`ad-unit ${className}`}
      style={{
        minWidth: responsive ? 'auto' : '300px',
        minHeight: type === 'leaderboard' ? '90px' : type === 'mobile-banner' ? '50px' : '250px',
        maxWidth: responsive ? '100%' : '728px',
      }}
    >
      {isVisible && (
        <div
          className={`
            transition-opacity duration-300
            ${adLoaded ? 'opacity-100' : 'opacity-50'}
            ${type === 'sticky-footer' ? 'fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg' : ''}
          `}
        >
          {!adLoaded && (
            <div className="flex items-center justify-center h-full animate-pulse">
              <div className="bg-gray-300 h-4 w-24 rounded mb-2"></div>
            </div>
          )}
          
          <ins 
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-5635114711353420"
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          
          {type === 'sticky-footer' && (
            <button
              onClick={() => {
                const element = adRef.current
                if (element) {
                  element.style.display = 'none'
                }
              }}
              className="absolute top-1 right-1 bg-gray-500 text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
            >
              ×
            </button>
          )}
        </div>
      )}
    </div>
  )
}