import GoogleAdUnit from './GoogleAdUnit'
import InFeedAd from './InFeedAd'

interface AdLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  showInContent?: boolean
  showStickyFooter?: boolean
}

export default function AdLayout({ 
  children, 
  showSidebar = true, 
  showInContent = true,
  showStickyFooter = true
}: AdLayoutProps) {
  return (
    <>
      {/* Header Ad */}
      <div className="w-full bg-gray-50 py-4">
        <div className="container mx-auto px-4 flex justify-center">
          <GoogleAdUnit 
            type="leaderboard" 
            position="header" 
            responsive={true}
            className="hidden md:block"
          />
          <GoogleAdUnit 
            type="mobile-banner" 
            position="header" 
            responsive={true}
            className="block md:hidden"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 flex gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {children}
          
          {/* In-Content Ad */}
          {showInContent && (
            <div className="my-8 flex justify-center">
              <GoogleAdUnit 
                type="rectangle" 
                position="in-content" 
                responsive={true}
              />
            </div>
          )}
          
          {/* In-Feed Ad */}
          {showInContent && (
            <InFeedAd 
              slot="3637571023"
              className="my-8"
            />
          )}
        </div>

        {/* Sidebar with Ads */}
        {showSidebar && (
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-4 space-y-6">
              <GoogleAdUnit 
                type="rectangle" 
                position="sidebar" 
                responsive={false}
              />
              <GoogleAdUnit 
                type="sidebar" 
                position="sidebar" 
                responsive={false}
              />
              <InFeedAd 
                slot="2324489353"
                className="mt-6"
              />
            </div>
          </aside>
        )}
      </div>

      {/* Footer Ad */}
      <div className="w-full bg-gray-50 py-4 mt-12">
        <div className="container mx-auto px-4 flex justify-center">
          <GoogleAdUnit 
            type="leaderboard" 
            position="footer" 
            responsive={true}
            className="hidden md:block"
          />
          <GoogleAdUnit 
            type="mobile-banner" 
            position="footer" 
            responsive={true}
            className="block md:hidden"
          />
        </div>
      </div>

      {/* Sticky Footer Ad (Mobile) */}
      {showStickyFooter && (
        <div className="block md:hidden">
          <GoogleAdUnit 
            type="sticky-footer" 
            position="sticky" 
            responsive={true}
          />
        </div>
      )}
    </>
  )
}