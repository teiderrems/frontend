"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname=usePathname();
  return (
    <header className="flex z-10 items-center fixed top-0 left-0 w-full flex-row bg-gradient-to-tr from-purple-400 to-pink-400 justify-between">
        <Link href="/"><h1 className={`py-2 pl-2 hover:scale-110 hover:cursor-pointer text-3xl`}><strong>Pizza-Lito</strong></h1></Link>
        <nav className="flex md:gap-6 gap-4 py-2">
            <Link href="/pizzas" className={`link ${pathname==='/pizzas'?'active':''}`}>Pizzas</Link>
            <Link href="/clients" className={`link ${pathname==='/clients'?'active':''}`}>Clients</Link>
            <Link href="/orders" className={`link ${pathname==='/orders'?'active':''}`}>Orders</Link>
        </nav>
        <h1 className="py-2 h-8 pr-2 rounded-full border-1 hover:scale-110 hover:cursor-pointer">About</h1>
    </header>
  )
}
