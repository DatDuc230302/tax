import Header from '@/components/Client/Header';
import Footer from '@/components/Client/Footer';
import Asking from '@/components/Client/Asking';
export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <Header />
            {children}
            <Footer />
            <Asking />
        </div>
    );
}
