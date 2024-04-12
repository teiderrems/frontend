import SideBar from '@/components/SideBar'


export default function ClientLayout({children}: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="flex text-xl flex-col min-h-screen w-full">

        <main className="flex-1 md:container mx-auto">
            {children}
        </main>
    </div>
  )
}
