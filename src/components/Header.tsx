"use client"
import { LoginOutlined } from "@ant-design/icons";
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function Header() {
  const pathname=usePathname();
  const router=useRouter();
  const[username,setUsername]=useState("");
  const[id,setId]=useState("");
  const logOut=()=>{
    localStorage.removeItem("token");
    router.push(`/auth?url=${pathname}`);
  }

  useEffect(()=>{
    setUsername(localStorage?.getItem("token")&&JSON.parse(atob(localStorage?.getItem("token")?.split(".")[1] as string)).email);
    setId(localStorage?.getItem("token")&&JSON.parse(atob(localStorage?.getItem("token")?.split(".")[1] as string))._id);
    router.refresh();
  },[localStorage?.getItem("token")]);
  return (
    <header className="flex h-full w-full flex-row md:flex-col shadow bg-cyan-100 justify-between">
        <Link href="/"><h1 className={`py-2 pl-2 hover:cursor-pointer md:text-3xl`}><strong>Pizza-Lito</strong></h1></Link>
        {
          localStorage?.getItem("token")? (
            <nav className="flex  mx-2 items-center md:space-y-6 flex-row md:flex-col py-2">
              <Link href="/pizzas" className={`link ${pathname==='/pizzas'?'active':''}`}>Pizzas</Link>
              <Link href="/clients" className={`link ${pathname==='/clients'?'active':''}`}>Clients</Link>
              <Link href="/orders" className={`link ${pathname==='/orders'?'active':''}`}>Orders</Link>
              <Link href={`/clients/${id}`} className="px-2 h-8 text-center hover:bg-blue-300 hover:underline hover:text-blue-400 rounded-full hover:cursor-pointer" >{username}</Link>
          </nav>
            ):(<nav className="flex mx-2 flex-row md:flex-col md:gap-6 gap-4 py-2">
                <Link href="/auth/add" className={`link ${pathname==='/auth/add'?'active':''}`}>Register</Link>
                <Link href="/auth" className={`link ${pathname==='/auth'?'active':''}`}> Log In</Link>
            </nav>)
        }
        {

          localStorage?.getItem("token")?
              (<a onClick={logOut} className=" flex text-center mb-2 w-full hover:bg-gray-100 hover:text-white border rounded-full border-1 space-x-2 items-center px-2 text-2xl hover:cursor-pointer"><LoginOutlined/> <span className="">LogOut</span></a>):
              (<h1 className="px-2 h-8 text-center hover:bg-blue-500 border rounded-full border-1 hover:cursor-pointer">About</h1>)
        }
    </header>
  )
}
