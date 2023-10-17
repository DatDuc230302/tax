import Header from '@/components/Client/Header';
import Footer from '@/components/Client/Footer';
export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <Header />
            <div className="flex justify-center">
                <div className="flex w-[1200px] px-4 flex-col">{children}</div>
            </div>
            <Footer />
        </div>
    );
}
