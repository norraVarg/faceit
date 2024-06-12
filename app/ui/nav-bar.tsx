'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'
import useClickOutside from '../lib/hooks/useClickOutside'

const NAV_ITEMS = [
  { name: 'Feed', href: '/feed' },
  { name: 'Users', href: '/users' },
]

const NavBar = () => {
  const [showNavMenu, setShowNavMenu] = useState(false)
  const pathname = usePathname()

  const navMenuRef = useRef(null)
  const hideNavMenu = () => {
    if (showNavMenu) {
      setShowNavMenu(false)
    }
  }
  useClickOutside(navMenuRef, hideNavMenu)

  const toggleNavMenu = () => {
    setShowNavMenu(!showNavMenu)
  }

  return (
    <nav className="bg-sky-500">
      <div className="max-w-7xl ">
        <div className="relative flex h-12 items-center sm:px-7">
          <div className="mobile-nav absolute inset-y-0 left-3 flex items-center sm:hidden">
            <button onClick={toggleNavMenu} type="button" className="relative inline-flex items-center justify-center rounded-md p-1 text-white hover:bg-sky-700 hover:text-white focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg className="fill-curretn size-5 block h-6 w-6 stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <span className="flex flex-shrink-0 items-center text-white font-bold">FACEIT</span>
            <div className="hidden menu sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {NAV_ITEMS.map((item) => (
                  <Link onClick={() => setShowNavMenu(false)} href={item.href} key={item.name} className={`text-white hover:bg-sky-600 hover:text-white block rounded-md px-3 py-2 text-base font-medium ${pathname === item.href ? 'bg-sky-700' : ''}`}> {item.name}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNavMenu && (
        <div ref={navMenuRef} className="mobile-menu space-y-1 p-2">
          {NAV_ITEMS.map((item) => (
            <Link onClick={() => setShowNavMenu(false)} href={item.href} key={item.name} className={`text-white hover:bg-sky-600 hover:text-white block rounded-md px-3 py-2 text-base font-medium ${pathname === item.href ? 'bg-sky-700' : ''}`}> {item.name}</Link>
          ))}
        </div>
      )}
    </nav >
  )
}

export default NavBar