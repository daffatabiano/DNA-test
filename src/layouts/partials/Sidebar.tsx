'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { links } from './Sidebar.data';
import { SUB_IMAGE } from '@/data/sub/data';
import { useDispatch } from 'react-redux';
import { toggle } from '@/redux/features/searchbarSlice';

export function MainSidebar({ children }: Maintype) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    return (
        <div
            className={cn(
                'rounded-md z-1 flex flex-col md:flex-row bg-[rgba(255,255,255, 0.001)]  w-full flex-1 mx-auto border border-neutral-200  overflow-y-auto',
                'h-screen w-screen '
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10 z-1">
                    <div className="flex flex-col flex-1 overflow-y-auto">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2 z-1">
                            {links.map((link, idx) => (
                                <SidebarLink
                                    key={idx}
                                    link={link}
                                    onClick={() => dispatch(toggle())}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: 'Guest',
                                href: '#',
                                icon: (
                                    <Image
                                        src={SUB_IMAGE}
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
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <img
                    src="/immersive/sidebar-open.png"
                    alt="logo-sidebar-open"
                    className="h-24 w-[100%]"
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
            <img
                src="/immersive/sidebar.png"
                alt="logo-sidebar"
                className="h-10 w-10 object-cover rounded-full"
            />
        </Link>
    );
};

// Dummy dashboard component with content
const Dashboard = ({ children }: Maintype) => {
    return (
        <div className="flex flex-1">
            <div className="p-2 md:p-4 rounded-tl-2xl border border-neutral-200 bg-transparent  flex flex-col gap-2 flex-1 w-full h-full overflow-y-auto">
                {children}
            </div>
        </div>
    );
};
