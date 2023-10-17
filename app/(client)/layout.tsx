import Header from '@/components/Client/Header';
import Footer from '@/components/Client/Footer';
export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col w-[1200px] px-4">
                    <Header />
                    {children}
                </div>
            </div>
            <Footer />
        </>
    );
}
