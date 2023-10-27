import Service from '@/components/Client/Service';
import Slide from '@/components/Client/Slide';
import News from '@/components/Client/News';
import Video from '@/components/Client/Video';

export default function Page() {
    return (
        <div className="flex flex-col">
            <Slide />
            <News />
            {/* <Service /> */}
            <Video />
        </div>
    );
}
