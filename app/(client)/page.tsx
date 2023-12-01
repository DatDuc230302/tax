import Slides from '@/components/Client/Slides';
import Video from '@/components/Client/Video';
import HotPosts from '@/components/Client/HotPosts';
import News from '@/components/Client/News';
import NewPosts from '@/components/Client/NewPosts';
export default function Page() {
    return (
        <div className="flex flex-col">
            <Slides />
            <HotPosts />
            <News />
            <NewPosts />
            <Video />
        </div>
    );
}
