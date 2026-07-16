'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Navigation, Home, History, Settings } from "lucide-react";

export default function HomePage() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleCTAClick = () => {
        alert('Location confirmed! Proceeding to the next step...');
    };

    return (
        <main className="relative flex flex-col h-dvh w-full overflow-hidden bg-slate-900 select-none">

            {/* 1. Header / Navigation Bar */}
            <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-slate-900/80 to-transparent backdrop-blur-[2px]">
                <div className="flex items-center gap-2">
                    {/* shadcn Ghost Button for Menu */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10 active:scale-95 transition-transform"
                        aria-label="Menu"
                    >
                        <Menu className="w-6 h-6" />
                    </Button>
                    <span className="font-bold text-white tracking-wide">GeoPWA</span>
                </div>

                {/* shadcn Avatar */}
                <Avatar className="w-9 h-9 border-2 border-emerald-500 cursor-pointer active:scale-95 transition-transform">
                    <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                    <AvatarFallback className="bg-slate-700 text-white text-xs font-semibold">
                        JD
                    </AvatarFallback>
                </Avatar>
            </header>

            {/* 2. Map Canvas Container */}
            <div className="relative flex-1 w-full h-full bg-slate-850">
                {isMounted ? (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                        {/* Replace this placeholder with your actual Map component */}
                        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                            <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
                            <p className="text-slate-500 text-sm animate-pulse">Interactive Map Loading...</p>
                        </div>
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-slate-900" />
                )}

                {/* 3. Centered Action Target / Marker */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center -translate-y-12">
                        <span className="absolute inline-flex h-8 w-8 rounded-full bg-emerald-400 opacity-20 animate-ping" />
                        <div className="z-10 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg" />
                    </div>
                </div>

                {/* 4. Raised Round CTA Button (Using shadcn Button as a FAB) */}
                <div className="absolute inset-x-0 bottom-24 z-10 flex justify-center">
                    <Button
                        onClick={handleCTAClick}
                        size="icon"
                        className="w-16 h-16 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-xl shadow-emerald-950/45 border border-emerald-400/30 active:scale-90 transition-all duration-150"
                        aria-label="Confirm Location"
                    >
                        {/* Lucide Navigation Icon */}
                        <Navigation className="w-7 h-7 fill-white translate-x-[1px] -translate-y-[1px] rotate-45" />
                    </Button>
                </div>
            </div>

            {/* 5. Quick-Access PWA Bottom Bar */}
            <nav className="absolute bottom-0 inset-x-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 pb-safe-bottom">
                <div className="flex justify-around items-center h-16 text-slate-400">

                    <Button
                        variant="ghost"
                        className="flex flex-col items-center justify-center h-full flex-1 hover:bg-transparent hover:text-emerald-400 text-emerald-400 gap-1"
                    >
                        <Home className="w-5 h-5" />
                        <span className="text-[10px] font-medium">Home</span>
                    </Button>

                    <Button
                        variant="ghost"
                        className="flex flex-col items-center justify-center h-full flex-1 hover:bg-transparent hover:text-slate-200 text-slate-400 gap-1"
                    >
                        <History className="w-5 h-5" />
                        <span className="text-[10px] font-medium">History</span>
                    </Button>

                    <Button
                        variant="ghost"
                        className="flex flex-col items-center justify-center h-full flex-1 hover:bg-transparent hover:text-slate-200 text-slate-400 gap-1"
                    >
                        <Settings className="w-5 h-5" />
                        <span className="text-[10px] font-medium">Settings</span>
                    </Button>

                </div>
            </nav>

        </main>
    );
}