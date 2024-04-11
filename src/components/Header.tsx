"use client"
import { LoginOutlined } from "@ant-design/icons";
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export default function Header() {
  const pathname=usePathname();
  const router=useRouter();
  const logOut=()=>{
    localStorage.removeItem("token");
    router.push(`/clients/auth?url=${pathname}`);
  }
  return (
    <header className="flex items-center h-full w-full flex-row bg-white justify-between">
        <Link href="/"><h1 className={`py-2 pl-2 hover:cursor-pointer md:text-3xl text-sm`}><strong>Pizza-Lito</strong></h1></Link>
        {
          localStorage.getItem("token")? (
            <nav className="flex md:gap-6 gap-4 py-2">
              <Link href="/pizzas" className={`link ${pathname==='/pizzas'?'active':''}`}>Pizzas</Link>
              <Link href="/clients" className={`link ${pathname==='/clients'?'active':''}`}>Clients</Link>
              <Link href="/orders" className={`link ${pathname==='/orders'?'active':''}`}>Orders</Link>
          </nav>
            ):(<nav className="flex md:gap-6 gap-4 py-2">
                <Link href="/auth/add" className={`link ${pathname==='/auth/add'?'active':''}`}>Register</Link>
                <Link href="/auth" className={`link ${pathname==='/auth'?'active':''}`}> Log In</Link>
            </nav>)
        }
        {
        
          localStorage.getItem("token")?(<a onClick={logOut} className=" h-8 pr-2 text-center w-8 text-3xl hover:cursor-pointer"><LoginOutlined/></a>):(<h1 className="px-2 h-8 text-center hover:bg-blue-500 border rounded-full border-1 hover:cursor-pointer">About</h1>)
        }
    </header>
  )
}
