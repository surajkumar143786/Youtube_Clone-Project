/*Register Component -- Displays user registration form UI*/

function Register() {
    return (
        <div className="max-w-md mx-auto mt-10 border rounded-lg p-6">

            <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>

            {/* Username Input */}
            <input type="text"placeholder="Username"className="w-full mb-3 px-3 py-2 border rounded-lg outline-none"/>

            {/* Email Input */}
            <input type="email"placeholder="Email"className="w-full mb-3 px-3 py-2 border rounded-lg outline-none"/>

            {/* Password Input */}
            <input type="password"placeholder="Password"className="w-full mb-4 px-3 py-2 border rounded-lg outline-none"/>

            {/* Register Button */}
            <button className="w-full py-2 bg-green-600 text-white rounded-lg">Register</button>

            {/* Login Redirect */}
            <p className="text-sm text-center mt-4">Already have an account?{" "}
            <span className="text-blue-600 cursor-pointer">Sign In</span>
            </p>

        </div>
    );
}

export default Register;
