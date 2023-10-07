import Service from '@/components/Service';
import Slide from '@/components/Slide';
import Posts from './bai-viet/page';

export default function Home() {
    return (
        <div className="flex flex-col px-[16px]">
            {/* <Slide /> */}
            <Service />
            <Posts />
        </div>
    );
}
