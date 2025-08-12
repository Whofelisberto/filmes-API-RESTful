import Link from "next/link"

export default function Header(){
  return(
    <>
    <header className="bg-black text-white p-4 uppercase font-semibold">
      <nav className="container mx-auto">
        <ul className="flex gap-5">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/">Contact</Link></li>
        </ul>
      </nav>
      </header>
    </>
  )
}