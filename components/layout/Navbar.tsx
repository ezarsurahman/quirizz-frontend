import Link from "next/link";
import { LinkButtons } from "@/components/layout/LinkButtons"
export const Navbar = () => {
    return (  
        <nav className="fixed inset-x-0 top-0 z-[1000] h-[80px] bg-white shadow-lg rounded-b-3xl">
            <div id="web" className="h-full flex justify-between px-6 items-center">
                <Link href="/" className="cursor-pointer">
                    <p className="font-bold text-3xl">Qui<span className="text-[#bc3892] ">rizz</span></p>
                    <p className="text-xs opacity-50">Quiz by rizztech</p>
                </Link>
                <div className="flex gap-5">
                    <LinkButtons 
                    href="/"
                    text="Home"
                    ></LinkButtons>
                    <LinkButtons 
                    href="/quiz"
                    text="Quiz"
                    ></LinkButtons>
                    {/* <LinkButtons 
                    href="/myquiz"
                    text="My Quiz"
                    ></LinkButtons> */}
                </div>
            </div>
            <div id="mobile">

            </div>
        </nav>
    );
}




