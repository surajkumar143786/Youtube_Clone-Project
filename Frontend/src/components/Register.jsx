/*Register Component -- Displays user registration form UI*/

import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {
   // Stores form input values
    const [formData, setFormData] = useState({ userName: "", email: "" , password:"" })
    // Updates form state when user types
    function handleChange(e){
        setFormData({
            ...formData,[e.target.name]:e.target.value,
        })
    }
    //Submits registration data to backend
    async function handleRegister(){
        try{
           registerUser(formData)
            alert("Registration successful. Please login.");
        }catch(err){
            alert(err.response?.data?.message || "Registration failed");
        }
    }
    return (
        <div className="max-w-md mx-auto mt-10 border rounded-lg p-6">

            <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>

            {/* Username Input */}
            <input type="text" name="userName" placeholder="Username" value = {formData.userName} onChange={handleChange} className="w-full mb-3 px-3 py-2 border rounded-lg outline-none"/>

            {/* Email Input */}
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mb-3 px-3 py-2 border rounded-lg outline-none"/>

            {/* Password Input */}
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full mb-4 px-3 py-2 border rounded-lg outline-none"/>

            {/* Register Button */}
            <button onClick={handleRegister} className="w-full py-2 bg-green-600 text-white rounded-lg">Register</button>

            {/* Login Redirect */}
            <p className="text-sm text-center mt-4">Already have an account?{" "}
            <span className="text-blue-600 cursor-pointer">Sign In</span>
            </p>

        </div>
    );
}

export default Register;
