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

export const sidebarData = {
    Top:[
        { icon: <IoMdHome />, name:'Home'},
        { icon: <SiYoutubeshorts />, name:'Shorts'},
        { icon: <MdOutlineSubscriptions />, name:'Subscriptions'},
    ],
    Middle:[
        { icon: <LuHistory />, name:'History'},
        { icon: <CgPlayList />, name:'Playlist'},
        { icon: <GoVideo />, name:'Your Videos'},
        { icon: <MdOutlineWatchLater />, name:'Watch later'},
        { icon: <AiOutlineLike />, name:'Liked videos'},
    ],
    Bottom:[
        { icon: <ImFire />, name:'Trending'},
        { icon: <IoMusicalNotesOutline />, name:'Music'},
        { icon: <MdOutlineMovie />, name:'Movies'},
        { icon: <HiOutlineSignal />, name:'Live'},
        
    ]
}