import { SiYoutubegaming } from "react-icons/si";
import { MdNewspaper } from "react-icons/md";
import { FaPodcast } from "react-icons/fa";
import { SlBulb } from "react-icons/sl";
import { IoMdFitness } from "react-icons/io";
import { CiTrophy } from "react-icons/ci";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { MdOutlineSubscriptions } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { LuHistory } from "react-icons/lu";
import { CgPlayList } from "react-icons/cg";
import { GoVideo } from "react-icons/go";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { ImFire } from "react-icons/im";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { MdOutlineMovie } from "react-icons/md";
import { HiOutlineSignal } from "react-icons/hi2";

const sidebarData = {
   '': [
    { icon: () => <IoMdHome />, name: 'Home', route: '/' },
    { icon: () => <SiYoutubeshorts />, name: 'Shorts', route: '/shorts' },
    { icon: () => <MdOutlineSubscriptions />, name: 'Subscriptions', route: '/subscriptions' },
  ],
  You: [
    { icon: () => <LuHistory />, name: 'History', route: '/history' },
    { icon: () => <CgPlayList />, name: 'Playlist', route: '/playlist' },
    { icon: () => <GoVideo />, name: 'Your Videos', route: '/videos' },
    { icon: () => <MdOutlineWatchLater />, name: 'Watch Later', route: '/watch-later' },
    { icon: () => <AiOutlineLike />, name: 'Liked Videos', route: '/liked-videos' },
  ],
  Explore: [
    { icon: () => <ImFire />, name: 'Trending', route: '/trending' },
    { icon: () => <IoMusicalNotesOutline />, name: 'Music', route: '/music' },
    { icon: () => <MdOutlineMovie />, name: 'Movies', route: '/movies' },
    { icon: () => <HiOutlineSignal />, name: 'Live', route: '/live' },
    { icon: () => <SiYoutubegaming />, name: 'Gaming', route: '/gaming' },
    { icon: () => <CiTrophy />, name: 'Sports', route: '/sports' },
    { icon: () => <IoMdFitness />, name: 'Fitness', route: '/fitness' },
    { icon: () => <MdNewspaper />, name: 'News', route: '/news' },
    { icon: () => <SlBulb />, name: 'Courses', route: '/courses' },
    { icon: () => <FaPodcast />, name: 'Podcasts', route: '/podcasts' },
    { icon: () => <RiShoppingBag4Line />, name: 'Shopping', route: '/shopping' },
  ],
};

export default sidebarData;
