'use client'

import { useEffect, useRef, useState } from 'react'

interface AdUnitProps {
  type: 'leaderboard' | 'rectangle' | 'mobile-banner' | 'sidebar' | 'sticky-footer'
  position: 'header' | 'sidebar' | 'in-content' | 'footer' | 'sticky'
  responsive?: boolean
  className?: string
}

const AD_SIZES = {
  leaderboard: { width: 728, height: 90 },
  rectangle: { width: 300, height: 250 },
  'mobile-banner': { width: 320, height: 50 },
  sidebar: { width: 300, height: 600 },
  'sticky-footer': { width: 320, height: 50 }
}

export default function AdUnit({ 
  type, 
  position, 
  responsive = true, 
  className = '' 
}: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [adLoaded, setAdLoaded] = useState(false)
  const size = AD_SIZES[type]

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
      // Simulate ad loading delay
      await new Promise(resolve => setTimeout(resolve, 500))
      setAdLoaded(true)
    } catch (error) {
      console.error('Failed to load ad:', error)
    }
  }

  const getAdContent = () => {
    // Placeholder ad content - replace with actual ad network integration
    const adContent = {
      leaderboard: {
        title: 'Virtual Reality Headsets',
        description: 'Discover the latest VR technology',
        cta: 'Shop Now'
      },
      rectangle: {
        title: 'Cloud Computing',
        description: 'Scale your virtual infrastructure',
        cta: 'Learn More'
      },
      'mobile-banner': {
        title: 'VR Apps',
        description: 'Download now',
        cta: 'Get App'
      },
      sidebar: {
        title: 'Virtual Courses',
        description: 'Master virtual technologies with expert-led courses',
        cta: 'Enroll Today'
      },
      'sticky-footer': {
        title: 'Virtual Tools',
        description: 'Professional grade',
        cta: 'Try Free'
      }
    }

    return adContent[type]
  }

  const content = getAdContent()

  return (
    <div
      ref={adRef}
      className={`ad-unit ${className}`}
      style={{
        minWidth: responsive ? 'auto' : `${size.width}px`,
        minHeight: `${size.height}px`,
        maxWidth: responsive ? '100%' : `${size.width}px`,
      }}
    >
      {isVisible && (
        <div
          className={`
            bg-gray-100 border border-gray-200 rounded-lg
            flex items-center justify-center
            transition-opacity duration-300
            ${adLoaded ? 'opacity-100' : 'opacity-0'}
            ${type === 'sticky-footer' ? 'fixed bottom-0 left-0 right-0 z-50' : ''}
          `}
          style={{
            width: responsive ? '100%' : `${size.width}px`,
            height: `${size.height}px`,
          }}
        >
          {!adLoaded ? (
            <div className="animate-pulse">
              <div className="bg-gray-300 h-4 w-24 rounded mb-2"></div>
              <div className="bg-gray-300 h-3 w-32 rounded"></div>
            </div>
          ) : (
            <div className="text-center p-4">
              <div className="text-xs text-gray-500 mb-1">Advertisement</div>
              <div className="text-sm font-semibold text-gray-800 mb-1">
                {content.title}
              </div>
              <div className="text-xs text-gray-600 mb-2">
                {content.description}
              </div>
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600">
                {content.cta}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}