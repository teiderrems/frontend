import Link from "next/link";
import pizzaImg from "../../public/pizza.jpg"
import Image from "next/image"
export default function ClientItem({pizza}) {
  const getString=(str:String)=>{
    console.log(str.substring(1,10));
  };
  
  return (
    <div className="flex flex-col h-3/4 w-1/6 rounded-xl shadow-md shadow-blue-300">
        <Image src={pizzaImg} className=" hover:opacity-100 hover:cursor-pointer w-full opacity-50" alt={pizza.name}/>
        <div className="container mx-auto">
          <div className="flex flex-col  md:h-5/6 md:w-full h-1/2">
              <h1 className=" italic text-wrap text-sm capitalize">{pizza.name}</h1>
          </div>
          <div className="flex flex-col">
            <Link  href={`/pizzas/${pizza._id}`} className="rounded-md self-start bg-blue-500 text-white">Show more</Link>
          </div>
        </div>
    </div>
  )
}
