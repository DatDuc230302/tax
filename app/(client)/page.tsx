import Slides from '@/components/Client/Slides';
import Videos from '@/components/Client/Videos';
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
            <Videos />
        </div>
    );
}
