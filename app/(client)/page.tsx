import Posts from '@/components/Posts';
import Service from '@/components/Service';
import Slide from '@/components/Slide';

export default function Home() {
    return (
        <div className="flex flex-col px-[16px]">
            {/* <Slide /> */}
            <Service />
            <Posts />
        </div>
    );
}
