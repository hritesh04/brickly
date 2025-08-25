"use client";

import { usePathname } from "next/navigation"

const homeNav = [
    {
        name:"Template",
        path:"/template"
    },
    {
        name:"Assets",
        path:"/assets"
    },
    {
        name:"Pricing",
        path:"/pricing"
    }
]

export default function NavItem(){
    const path = usePathname()
    
    if (path==="/"){
        return(
            <div className=" flex gap-18 flex-1 items-center justify-center">
                {homeNav.map((nav)=>{
                    return(
                        <a
                        href={nav.path}>
                            <div className="hover:border-b border-black">
                                <p>{nav.name}</p>
                            </div>
                        </a>
                    )
                })}
            </div>
        )
    }

    return(
        <div>

        </div>
    )
}