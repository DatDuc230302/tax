import Header from '@/components/Client/Header';
import Footer from '@/components/Client/Footer';
import ChatBot from '@/components/Client/ChatBot';

async function getTime() {
    const result: any = await fetch(`http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh`, {
        cache: 'no-store',
    });
    if (result.ok) {
        return result.json();
    } else {
        return { message: 'Error' };
    }
}

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <Header />
            {children}
            <Footer />
            <ChatBot />
        </div>
    );
}
