import SideBar from '@/components/SideBar'
import React from 'react'
//import RootLayout from '../layout';

export default function PizzaLayout({children}: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="flex text-2xl flex-row min-h-screen w-full">
        <div className='min-h-screen fixed md:w-1/6 bg-gradient-to-tr from-green-400 to-cyan-400'><SideBar base="orders"/></div>
        <main className="flex-1 md:absolute md:left-52 md:right-4">
            {children}
        </main>
    </div>
  )
}
