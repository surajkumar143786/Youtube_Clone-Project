import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

function ProtectedLayout() {
    const [searchText, setSearchText] = useState("");

    return (
        <div>
            <Header onSearch={setSearchText} />

            <div className="flex">
                <Sidebar />

                <div className="flex-1 p-4">
                    <Outlet context={{ searchText }} />
                </div>
            </div>
        </div>
    );
}

export default ProtectedLayout;
