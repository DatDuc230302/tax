import Slides from '@/components/Client/Slides';
import Video from '@/components/Client/Video';
import HotPosts from '@/components/Client/HotPosts';
import News from '@/components/Client/News';
import RecentPosts from '@/components/Client/RecentPosts';
export default function Page() {
    return (
        <div className="flex flex-col">
            <Slides />
            <HotPosts />
            <News />
            <RecentPosts />
            <Video />
        </div>
    );
}
