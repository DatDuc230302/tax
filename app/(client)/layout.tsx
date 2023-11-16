import Header from '@/components/Client/Header';
import Footer from '@/components/Client/Footer';
import ChatBot from '@/components/Client/ChatBot';
export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <Header />
            {children}
            <Footer />
            <ChatBot />
        </div>
    );
}
