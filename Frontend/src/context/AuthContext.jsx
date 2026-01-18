import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (
            storedUser &&
            storedUser !== "undefined" &&
            storedUser !== "null"
        ) {
            try {
                const parsedUser = JSON.parse(storedUser);

                // IMPORTANT: validate actual user object
                if (parsedUser && parsedUser._id) {
                    setUser(parsedUser);
                } else {
                    setUser(null);
                    localStorage.removeItem("user");
                }
            } catch (err) {
                setUser(null);
                localStorage.removeItem("user");
            }
        } else {
            setUser(null);
        }
    }, []);


    const login = (userData, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
