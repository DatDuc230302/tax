import Service from '@/components/Client/Service';
import Slide from '@/components/Client/Slide';
import Video from '@/components/Client/Video';
import CurrentPosts from '@/components/Client/CurrentPosts';
import HotPosts from '@/components/Client/HotPosts';

export default function Page() {
    return (
        <div className="flex flex-col">
            <Slide />
            <HotPosts />
            {/* <Service /> */}
            <CurrentPosts />
            <Video />
        </div>
    );
}
