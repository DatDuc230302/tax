import Service from '@/components/Client/Service';
import Slide from '@/components/Client/Slide';
import Posts from './bai-dang/page';

export default function Page() {
    return (
        <div className="flex flex-col">
            <Slide />
            <Service />
            <Posts />
        </div>
    );
}
