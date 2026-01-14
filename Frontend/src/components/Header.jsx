import { useState } from "react";

function Header() {
    const [searchText,setSearchText] = useState("")
    return (
        <header className="flex items-center justify-between px-4 py-2 border-b">

            {/* Logo */}
            <div className="text-xl font-bold text-red-500">
                YouTube
            </div>

            {/* Search Box */}
            <div className="w-1/2">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchText}
                    onChange={(e)=>{
                        setSearchText(e.target.value);
                        onChange(e.target.value)     //send text to parent
                    }}
                    className="w-full px-3 py-1 border rounded-full outline-none"
                    
                />
            </div>

            {/* Sign In Button */}
            <button className="px-4 py-1 border rounded-full text-blue-600 font-medium">
                Sign In
            </button>

        </header>
    );
}

export default Header;
