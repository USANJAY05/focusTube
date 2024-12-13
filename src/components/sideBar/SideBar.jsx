import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSideActive } from '../../redux/slice/sideBarActive-slice';
import { Link } from 'react-router-dom';
import sidebarData from '../../data/sideBarData';

const SideBar = () => {
  const active = useSelector((state) => state.sideBarActive.value); // Active menu state
  const toggle = useSelector((state) => state.toggle.value); // Sidebar visibility state
  const dispatch = useDispatch();

  return (
    <div
      className={`w-72 p-4 h-full z-50 dark:bg-black overflow-auto scrollbar-thin hover:scrollbar-thumb-slate-500 fixed xl:relative ${
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
              onClick={() => dispatch(setSideActive(item.name))}
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
  );
};

export default SideBar;
