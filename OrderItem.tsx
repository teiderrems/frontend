export default function ClientItem({client}) {
  return (
    <div className="flex flex-col rounded-md shadow-sm shadow-blue-200">
        <h1>{client._id}</h1>
        <div className="flex md:flex-row flex-col">
            <div className="h-1/2 md:h-full w-full bg-gray-600 opacity-50 md:w-1/2">

            </div>
            <ul className="h-1/2 md:h-full w-full md:w-1/2">
                <li>{client.name}</li>
                <li>{client.firstname}</li>
            </ul>
        </div>
    </div>
  )
}
