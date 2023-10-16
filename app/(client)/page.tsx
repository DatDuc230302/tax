import Service from '@/components/Client/Service';
import Slide from '@/components/Client/Slide';
import Posts from './bai-viet/page';

export default function Home() {
    return (
        <div className="flex flex-col">
            <Slide />
            <Service />
            <Posts />
        </div>
    );
}
