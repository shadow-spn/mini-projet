// app/page.tsx or pages/index.tsx
'use client';

import { useEffect, useState } from 'react';

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
                    <button className="p-2 text-white active:scale-95 transition-transform" aria-label="Menu">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <span className="font-bold text-white tracking-wide">GeoPWA</span>
                </div>

                <button className="w-9 h-9 rounded-full bg-slate-700 border-2 border-emerald-500 overflow-hidden active:scale-95 transition-transform">
                    <div className="w-full h-full flex items-center justify-center text-xs text-white font-semibold">
                        JD
                    </div>
                </button>
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

                {/* 3. Centered Action Target / Marker (Slightly offset upward to account for the button) */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center -translate-y-12">
                        <span className="absolute inline-flex h-8 w-8 rounded-full bg-emerald-400 opacity-20 animate-ping" />
                        <div className="z-10 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg" />
                    </div>
                </div>

                {/* 4. ENHANCED: Raised Round CTA Button */}
                <div className="absolute inset-x-0 bottom-24 z-10 flex justify-center">
                    <button
                        onClick={handleCTAClick}
                        className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-950/45 active:scale-90 hover:bg-emerald-400 transition-all duration-150 border border-emerald-400/30"
                        aria-label="Confirm Location"
                    >
                        {/* SVG Icon: Navigation/Send pointer */}
                        <svg className="w-7 h-7 translate-x-[2px] -translate-y-[1px]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* 5. Quick-Access PWA Bottom Bar */}
            <nav className="absolute bottom-0 inset-x-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 pb-safe-bottom">
                <div className="flex justify-around items-center h-16 text-slate-400">
                    <button className="flex flex-col items-center justify-center flex-1 text-emerald-400">
                        <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        <span className="text-[10px] font-medium">Home</span>
                    </button>

                    <button className="flex flex-col items-center justify-center flex-1 active:text-slate-200">
                        <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-[10px] font-medium">History</span>
                    </button>

                    <button className="flex flex-col items-center justify-center flex-1 active:text-slate-200">
                        <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-[10px] font-medium">Settings</span>
                    </button>
                </div>
            </nav>

        </main>
    );
}