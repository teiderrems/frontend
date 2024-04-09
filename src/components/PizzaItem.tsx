import pizzaImg from "../../public/pizza.jpg"
import Image from "next/image"
export default function ClientItem({pizza}) {
  return (
    <div className="flex flex-col md:flex-row rounded-md shadow-md shadow-blue-300">
        <Image src={pizzaImg} className="h-1/2 hover:opacity-100 hover:cursor-pointer md:h-full w-full opacity-50 md:w-1/2" alt={pizza.name}/>
        <div className="flex flex-col md:h-full h-1/2 md:1/2">
            <h1 className=" italic text-2xl capitalize pl-1">{pizza.name}</h1>
            <p className="h-3/4 pl-1 md:h-full w-full text-justify text-xl text-wrap">
                {pizza.description}
            </p>
        </div>
    </div>
  )
}
