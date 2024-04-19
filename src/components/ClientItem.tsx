import avatar from "../../public/avatar.jpg"
import Image from "next/image"
import Link from "next/link";
export default function ClientItem({client}) {
  return (
    <div className="flex flex-col hover:scale-110 hover:cursor-pointer bg-white md:flex-row rounded-md shadow-md shadow-blue-300">
        <Image src={avatar} className="h-1/2 mx-2 hover:opacity-100 rounded-full hover:cursor-pointer md:h-full w-full opacity-50 md:w-1/6 justify-self-start" alt={client.name}/>
        <div className="flex flex-1 md:flex-row flex-col">
            <Link href={`/clients/${client._id}`}><span className="px-2 hover:underline hover:text-blue-400 text-md text-gray-400">{client.username}</span></Link>
        </div>
    </div>
  )
}
