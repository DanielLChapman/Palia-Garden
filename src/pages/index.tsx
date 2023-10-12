import App from "@/components/App";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import { useState } from "react";

export default function Home({}) {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [menuPage, setMenuPage] = useState<"Share" | "Settings" | "Mobile">(
        "Share"
    );
    return (
        <div className="max-w-[1500px] mx-auto py-2 px-6 relative">
            <Header
                onMenuToggle={() => setMenuOpen(true)}
                setMenuPage={setMenuPage}
                isOpen={isMenuOpen}
            />
            <App />
            <Footer />
            <SideMenu
                isOpen={isMenuOpen}
                onClose={() => setMenuOpen(false)}
                menuPage={menuPage}
            />

            {/* Hamburger/X button */}
            <button
                className={`block md:hidden px-4 py-2 absolute top-6 right-8 z-50`}
                onClick={() => setMenuOpen(!isMenuOpen)}
            >
                <div
                    className={`h-1 w-5 mb-1 bg-black transition-all duration-300 ease-in-out transform ${
                        isMenuOpen ? "w-6 rotate-45 origin-top-left" : ""
                    }`}
                ></div>
                <div
                    className={`h-1 w-5 mb-1 bg-black transition-opacity duration-300 ease-in-out ${
                        isMenuOpen ? "opacity-0" : ""
                    }`}
                ></div>
                <div
                    className={`h-1 w-5 bg-black transition-all duration-300 ease-in-out transform ${
                        isMenuOpen ? "w-6 -rotate-45 origin-bottom-left" : ""
                    }`}
                ></div>
            </button>
        </div>
    );
}
