import Slides from '@/components/Client/Slides';
import Videos from '@/components/Client/Videos';
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
            <Videos />
        </div>
    );
}
