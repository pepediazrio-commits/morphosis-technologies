import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { BackgroundGradientAnimation } from './ui/background-gradient-animation'

export default function Layout() {
  const location = useLocation()
  const isContact = location.pathname === '/contact'

  return (
    <div className="relative min-h-screen">
      {/* Animated gradient — fixed full-screen background */}
      <div className="fixed inset-0 -z-10">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(10, 5, 40)"
          gradientBackgroundEnd="rgb(18, 6, 38)"
          firstColor="40, 25, 120"
          secondColor="65, 22, 110"
          thirdColor="80, 30, 140"
          fourthColor="25, 15, 85"
          fifthColor="90, 28, 125"
          pointerColor="196, 181, 253"
          interactive={true}
        />
      </div>

      {/* Page content */}
      <div className="relative z-0 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        {!isContact && <Footer />}
      </div>
    </div>
  )
}
