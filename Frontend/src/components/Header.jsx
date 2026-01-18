import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Header = ({ toggleSidebar }) => {
    const { user, logout } = useAuth();
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchText.trim()) {
            navigate(`/?search=${searchText}`);
        }
    };

    return (
        <header className="flex items-center justify-between px-4 py-2 bg-black sticky top-0 z-50">

            {/* LEFT: Hamburger + Logo */}
            <div className="flex items-center gap-10">
                <FaBars
                    className="text-white text-xl cursor-pointer"
                    onClick={toggleSidebar}
                />

                <Link to="/" className="flex items-center gap-1">
                    <span>
                        <img
                            src="/YouTube_Logo_2017.svg.webp"
                            alt="YouTube"
                            className="w-30"
                        />
                    </span>
                </Link>
            </div>

            {/* CENTER: Search Bar */}
            <form
                onSubmit={handleSearch}
                className="hidden md:flex items-center w-1/2"
            >
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-l-full text-white focus:outline-none"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                    type="submit"
                    className="px-5 py-3 bg-zinc-800 border border-gray-700 rounded-r-full"
                >
                    <FaSearch className="text-white" />
                </button>
            </form>

            {/* RIGHT: Auth Section */}
            <div className="flex items-center gap-4">
                {!user ? (
                    <Link
                        to="/login"
                        className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition"
                    >
                        <FaUserCircle />
                        Sign In
                    </Link>
                ) : (
                        <div className="relative group">
                            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold cursor-pointer overflow-hidden">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    user.userName?.charAt(0).toUpperCase()
                                )}
                            </div>

                        {/* Dropdown */}
                        <div className="absolute right-0 mt-2 w-32 bg-zinc-900 rounded shadow-lg hidden group-hover:block">
                            <button
                                onClick={logout}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-600 text-white"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
