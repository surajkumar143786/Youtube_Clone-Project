function Sidebar() {
    return (
        <aside className="w-56 min-h-screen border-r px-4 py-4">

            {/* Menu Item */}
            <div className="mb-3 font-medium cursor-pointer">
                Home
            </div>

            <div className="mb-3 font-medium cursor-pointer">
                Explore
            </div>

            <div className="mb-3 font-medium cursor-pointer">
                Subscriptions
            </div>

            <div className="mb-3 font-medium cursor-pointer">
                Library
            </div>

        </aside>
    );
}

export default Sidebar;