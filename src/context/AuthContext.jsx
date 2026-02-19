import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const CREDENTIALS = {
    username: "nino@compyl.com",
    password: "compyl2025!!!",
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        if (
            username === CREDENTIALS.username &&
            password === CREDENTIALS.password
        ) {
            setUser({ username });
            return true;
        }
        return false;
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
