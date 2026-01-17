import {
    MdHomeFilled,
    MdExplore,
    MdSubscriptions,
    MdVideoLibrary,
} from "react-icons/md";

function Sidebar({ open }) {
    if (!open) return null;

    return (
        <aside className="w-56 min-h-screen border-r px-4 py-4 bg-white">

            {/* Home */}
            <div className="flex items-center gap-4 mb-4 font-medium cursor-pointer hover:bg-gray-100 px-2 py-2 rounded">
                <MdHomeFilled size={22} />
                <span>Home</span>
            </div>

            {/* Explore */}
            <div className="flex items-center gap-4 mb-4 font-medium cursor-pointer hover:bg-gray-100 px-2 py-2 rounded">
                <MdExplore size={22} />
                <span>Explore</span>
            </div>

            {/* Subscriptions */}
            <div className="flex items-center gap-4 mb-4 font-medium cursor-pointer hover:bg-gray-100 px-2 py-2 rounded">
                <MdSubscriptions size={22} />
                <span>Subscriptions</span>
            </div>

            {/* Library */}
            <div className="flex items-center gap-4 mb-4 font-medium cursor-pointer hover:bg-gray-100 px-2 py-2 rounded">
                <MdVideoLibrary size={22} />
                <span>Library</span>
            </div>

        </aside>
    );
}

export default Sidebar;
