'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { links } from './Sidebar.data';

export function MainSidebar({ children }: Maintype) {
    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(
                'rounded-md flex flex-col md:flex-row bg-gray-100  w-full flex-1 mx-auto border border-neutral-200  overflow-hidden',
                'h-screen w-screen'
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: 'Manu Arora',
                                href: '#',
                                icon: (
                                    <Image
                                        src="https://assets.aceternity.com/manu.png"
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <Dashboard>{children}</Dashboard>
        </div>
    );
}
export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <img
                    src="/immersive/sidebar-open.png"
                    alt="logo-sidebar-open"
                />
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <img src="/immersive/sidebar.png" alt="logo-sidebar" />
        </Link>
    );
};

// Dummy dashboard component with content
const Dashboard = ({ children }: Maintype) => {
    return (
        <div className="flex flex-1">
            <div className="p-2 md:p-4 rounded-tl-2xl border border-neutral-200 bg-transparent  flex flex-col gap-2 flex-1 w-full h-full">
                {children}
            </div>
        </div>
    );
};
