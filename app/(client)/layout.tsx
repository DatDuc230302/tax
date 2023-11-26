import Header from '@/components/Client/Header';
import Footer from '@/components/Client/Footer';
import ChatBot from '@/components/Client/ChatBot';
import { serverBackend } from '@/server';

async function getSettingData() {
    const result: any = await fetch(`${serverBackend}/api/v1/ReadSetting`, {
        cache: 'no-store',
    });
    if (result.ok) {
        return result.json();
    } else {
        return { message: 'Error' };
    }
}

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
    const settingData = await getSettingData();
    return (
        <div className="flex flex-col">
            <Header settingData={settingData} />
            {children}
            <Footer settingData={settingData} />
            <ChatBot />
        </div>
    );
}
