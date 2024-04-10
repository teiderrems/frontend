"use client"
import {  PlusOutlined, UserAddOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar({base}) {
  const pathname=usePathname();
  return (
    <div className="flex flex-col gap-5 w-full h-full">
      <div className="w-full">
        <h1 className="text-2xl capitalize font-semibold ml-2">{base}</h1>
        <hr className="border-1 border-cyan-400 w-full" />
      </div>
      <nav className="flex flex-col mt-3 justify-center w-full">
        <Link href={`/${base}/add`} className={`link ${pathname===`/${base}/add`?'active':''}`}><PlusOutlined className="mr-2" />Add</Link>
      </nav>
    </div>
  )
}
