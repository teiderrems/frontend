

export default function PizzaLayout({children}: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="flex text-xl flex-col h-full w-full">
        <main className="flex-1 container mx-auto">
           {children}
        </main>
    </div>
  )
}
