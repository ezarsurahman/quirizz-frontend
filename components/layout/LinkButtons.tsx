"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface LinkButtonsInterface {
    text : string,
    href : string,
    className?: string,
}

export const LinkButtons = ({text,href,className=""}:LinkButtonsInterface) => {
    const pathname = usePathname()
    const isActive = pathname === href
    return(
        <Link 
        href={href}
        className={`hover:text-[#bc3892] text-xl ${isActive ? "text-[#bc3892] font-bold" : ""} ${className}`}
        >
            {text}
        </Link>
    )
}