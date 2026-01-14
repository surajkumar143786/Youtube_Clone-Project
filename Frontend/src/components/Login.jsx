/*Login Component -- Displays login form UI*/
function Login() {
    return (
        <div className="max-w-md mx-auto mt-10 border rounded-lg p-6">

            <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>

            {/* Email Input */}
            <input
                type="email" placeholder="Email" className="w-full mb-3 px-3 py-2 border rounded-lg outline-none"/>

            {/* Password Input */}
            <input type="password"placeholder="Password"className="w-full mb-4 px-3 py-2 border rounded-lg outline-none"/>

            {/* Sign In Button */}
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg">Sign In</button>

            {/* Register Redirect */}
            <p className="text-sm text-center mt-4">Don't have an account?{" "}
                <span className="text-blue-600 cursor-pointer">Register</span>
            </p>

        </div>
    );
}

export default Login;
