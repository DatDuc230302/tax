import Service from '@/components/Client/Service';
import Slide from '@/components/Client/Slide';
import Posts from './bai-dang/page';
import News from '@/components/Client/News';

export default function Page() {
    return (
        <div className="flex flex-col">
            <Slide />
            <News />
            <Service />
            <Posts />
        </div>
    );
}
