import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSideActive } from '../../redux/slice/sideBarActive-slice';
import { setToggle } from '../../redux/slice/toggleBar-slice';
import { Link } from 'react-router-dom';
import sidebarData from '../../data/sideBarData';
import useMobileSize from '../../hooks/useMobileSize.js'

const SideBar = () => {
  const active = useSelector((state) => state.sideBarActive.value); // Active menu state
  const toggle = useSelector((state) => state.toggle.value); // Sidebar visibility state
  const dispatch = useDispatch();
  const mobileSize = useMobileSize()

  const setClick = async(name) => {
    dispatch(setSideActive(name))
    if(mobileSize === true){
      //console.log("mobilesssssssssss")
      dispatch(setToggle(false))
    }
  }

  return (
    <div onClick={() =>(`md:${dispatch(setToggle(false))}` || mobileSize && dispatch(setToggle(false)))} className={`${toggle && 'w-full fixed'} xl:w-auto xl:relative h-full bg-black bg-opacity-70 z-10 `}>
        <div
          className={`w-60 p-4 h-full z-50 dark:bg-black overflow-auto scrollbar-thin hover:scrollbar-thumb-slate-500 fixed xl:relative ${
            toggle === false ? 'hidden' : ''
          }`}
        >
          {Object.entries(sidebarData).map(([section, items], idx) => (
            <div key={idx}>
              {/* Section Header (Optional) */}
              <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase mb-2">
                {section}
              </h3>

              {items.map((item, index) => (
                <div
                  key={index}
                  className={`w-full p-2 flex items-center hover:cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-200 rounded-lg dark:text-white ${
                    active === item.name ? 'bg-slate-200 dark:bg-slate-800' : ''
                  }`}
                  onClick={() => (setClick(item.name))}
                  role="button"
                  tabIndex="0"
                  aria-label={`Navigate to ${item.name}`}
                >
                  <Link
                    className="w-full flex items-center gap-4"
                    to={item.route}
                  >
                    {React.createElement(item.icon)} {/* Render the icon */}
                    <span>{item.name}</span>
                  </Link>
                </div>
              ))}

              {/* Divider */}
              {idx < Object.entries(sidebarData).length - 1 && (
                <hr className="border-gray-600 my-2" />
              )}
            </div>
          ))}
        </div>
    </div>
  );
};

export default SideBar;
