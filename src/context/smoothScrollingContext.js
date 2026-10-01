'use client'

import { useEffect, useState, useContext, createContext } from "react"
import Lenis from "lenis"

const SmoothScrollingContext = createContext()

export const useSmoothScroller = () => useContext(SmoothScrollingContext)

export default function ScrollContext({ children }) {
    const [lenisRef, setLenis] = useState(null);

    useEffect(() => {
        const scroller = new Lenis();

        function raf(time) {
            scroller.raf(time);
            requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);
        setLenis(scroller);

        return () => {
            cancelAnimationFrame(rafId);
            scroller.destroy();
        };
    }, []);

    return (
        <SmoothScrollingContext.Provider value={lenisRef}>
            {children}
        </SmoothScrollingContext.Provider>
    );
}
