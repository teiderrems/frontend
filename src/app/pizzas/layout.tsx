import SideBar from '@/components/SideBar'


export default function PizzaLayout({children}: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="flex text-2xl flex-row h-full w-full">
        <div className='min-h-screen md:w-1/6 bg-slate-200'><SideBar base="pizzas"/></div>
        <main className="flex-1 container mx-auto-">
            {children}
        </main>
    </div>
  )
}
