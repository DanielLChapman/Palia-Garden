import App from "@/components/App";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home({}) {
    return (
        <div className="max-w-[1500px] mx-auto  py-2 px-6">
            <Header />
            <App />
            <Footer />
        </div>
    );
}
