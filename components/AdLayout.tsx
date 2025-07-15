import AdUnit from './AdUnit'

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
          <AdUnit 
            type="leaderboard" 
            position="header" 
            responsive={true}
            className="hidden md:block"
          />
          <AdUnit 
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
              <AdUnit 
                type="rectangle" 
                position="in-content" 
                responsive={true}
              />
            </div>
          )}
        </div>

        {/* Sidebar with Ads */}
        {showSidebar && (
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-4 space-y-6">
              <AdUnit 
                type="rectangle" 
                position="sidebar" 
                responsive={false}
              />
              <AdUnit 
                type="sidebar" 
                position="sidebar" 
                responsive={false}
              />
            </div>
          </aside>
        )}
      </div>

      {/* Footer Ad */}
      <div className="w-full bg-gray-50 py-4 mt-12">
        <div className="container mx-auto px-4 flex justify-center">
          <AdUnit 
            type="leaderboard" 
            position="footer" 
            responsive={true}
            className="hidden md:block"
          />
          <AdUnit 
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
          <AdUnit 
            type="sticky-footer" 
            position="sticky" 
            responsive={true}
          />
        </div>
      )}
    </>
  )
}