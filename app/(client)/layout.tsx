import Header from '@/components/Client/Header';
import Footer from '@/components/Client/Footer';
export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col w-[1200px]">
                <Header />
                {children}
                <Footer />
            </div>
        </div>
    );
}
