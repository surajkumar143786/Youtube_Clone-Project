import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

function App(){
  const [searchText,setSearchText] = useState("")
  return(
    <div>
      <Header  onSearch= {setSearchText}/>
      {/* Main content area */}
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Outlet context={{searchText}}/>
        </div>
      </div>
    </div>
  )
}
export default App;