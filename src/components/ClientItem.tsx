import avatar from "../../public/avatar.jpg"
import Image from "next/image"
export default function ClientItem({client}) {
  return (
    <div className="flex flex-col hover:scale-110 hover:cursor-pointer md:flex-row rounded-md shadow-md shadow-blue-300">
        
        <Image src={avatar} className="h-1/2 hover:opacity-100 hover:cursor-pointer md:h-full w-full opacity-50 md:w-1/2" alt={client.name}/>
        <div className="flex md:flex-row flex-col">
            <ul className="flex-1 h-full w-full">
                <li className="px-2 text-md text-gray-400">{client.username}</li>
                <li className="px-2 text-md text-gray-400">{client.firstname}</li>
            </ul>
        </div>
    </div>
  )
}
