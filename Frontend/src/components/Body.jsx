function Body(){
    return(
        <header className="flex items-center justify-between px-4 py-2 border-b">
            {/* youtube logo */}
            <div className="text-xl font-bold">
                youtube
            </div>
        
        {/* search box */}
        <div className="w-1/2">
            <input type="text" placeholder="Search"
            className="w-full px-3 py-1 border rounded-full outline-none"/>
        </div>

        {/* signIn button */}
            <button className="px-4 py-1 border rounded-full text-blue-600 font-medium">
            SignIn
            </button>


        </header>
    )
}
export default Body;