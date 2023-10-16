import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MoveTop from '@/components/MoveTop';
export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col w-[1200px]">
                <Header />
                {children}
                <Footer />
            </div>
            {/* <MoveTop /> */}
        </div>
    );
}
