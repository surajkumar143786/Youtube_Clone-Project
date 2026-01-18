import {
    FaHome,
    FaRegCompass,
    FaYoutube,
    FaUserCircle,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ open }) => {
    const location = useLocation();

    const menuItems = [
        {
            name: "Home",
            icon: <FaHome />,
            path: "/",
            active: location.pathname === "/",
        },
        {
            name: "Shorts",
            icon: <FaRegCompass />,
            path: "#",
        },
        {
            name: "Subscriptions",
            icon: <FaYoutube />,
            path: "#",
        },
        {
            name: "You",
            icon: <FaUserCircle />,
            path: "#",
        },
    ];

    return (
        <aside
            className={`${open ? "w-56" : "w-16"
                } bg-black text-white h-[calc(100vh-56px)] transition-all duration-300 sticky top-14`}
        >
            <ul className="flex flex-col gap-1 p-2">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        {item.path === "/" ? (
                            <Link
                                to={item.path}
                                className={`flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-zinc-800 ${item.active ? "bg-zinc-800" : ""
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                {open && <span className="text-sm">{item.name}</span>}
                            </Link>
                        ) : (
                            <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-zinc-800 cursor-pointer">
                                <span className="text-xl">{item.icon}</span>
                                {open && <span className="text-sm">{item.name}</span>}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
