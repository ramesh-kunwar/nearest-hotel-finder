import React from 'react'
import { Card } from '../ui/card'

import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,

} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';

const Navbar = () => {
    return (

        <div className=" bg-white   w-full ">
            <div className="container mx-auto">
                <Card className=" w-full bg-card py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-2xl mt-5">
                    {/* <ShadcnKit className="text-primary cursor-pointer" /> */}
                    <h3 className="text-xl text-primary cursor-pointer">
                        <Link to="/">Home</Link>
                    </h3>
                    <ul className="hidden md:flex items-center gap-10 text-card-foreground">
                        <li>
                            <Link to="#features">Features</Link>
                        </li>
                        <li>
                            <Link to="#pricing">Pricing</Link>
                        </li>
                        <li>
                            <Link to="#faqs">FAQs</Link>
                        </li>
                        <li>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <span className="cursor-pointer">Pages</span>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="start">
                                    {landings.map((page) => (
                                        <DropdownMenuItem key={Math.random()}>
                                            <Link href={page.route}>{page.title}</Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>

                    <div className="flex items-center">
                        <Button variant="secondary" className="hidden md:block px-2">
                            <Link to="/login"> Login</Link>
                        </Button>
                        <Button className="hidden md:block ml-2 mr-2 bg-black text-white">
                            <Link to="/register"> Register</Link>
                        </Button>

                        <div className="flex md:hidden mr-2 items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <span className="py-2 px-2 bg-gray-100 rounded-md">Pages</span>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="start">
                                    {landings.map((page) => (
                                        <DropdownMenuItem key={Math.random()}>
                                            <Link to={page.route}>{page.title}</Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Menu className="h-5 w-5 rotate-0 scale-100" />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Link to="#home">Home</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link to="#features">Features</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link to="#pricing">Pricing</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link to="#faqs">FAQs</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Button variant="secondary" className="w-full text-sm">
                                            Login
                                        </Button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Button className="w-full text-sm">Get Started</Button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* <ThemeToggle /> */}
                    </div>
                </Card>
            </div>
        </div>
    )
}

const landings = [
    {
        //         id: nanoid(),
        title: "Landing 01",
        route: "/project-management",
    },
    {
        //         id: nanoid(),
        title: "Landing 02",
        route: "/crm-landing",
    },
    {
        //         id: nanoid(),
        title: "Landing 03",
        route: "/ai-content-landing",
    },
    {
        //         id: nanoid(),
        title: "Landing 04",
        route: "/new-intro-landing",
    },
    {
        //         id: nanoid(),
        title: "Landing 05",
        route: "/about-us-landing",
    },
    {
        //         id: nanoid(),
        title: "Landing 06",
        route: "/contact-us-landing",
    },
    {
        //         id: nanoid(),
        title: "Landing 07",
        route: "/faqs-landing",
    },
    {
        //         id: nanoid(),
        title: "Landing 08",
        route: "/pricing-landing",
    },
    {
        //         id: nanoid(),
        title: "Landing 09",
        route: "/career-landing",
    },
];


export default Navbar