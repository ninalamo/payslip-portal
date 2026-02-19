import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const CREDENTIALS = {
    username: "nino@compyl.com",
    password: "compyl2025!!!",
};

const STORAGE_KEY = "shore360_user";

export function AuthProvider({ children }) {
    // Initialize from localStorage so session survives refresh
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const login = (username, password) => {
        if (
            username === CREDENTIALS.username &&
            password === CREDENTIALS.password
        ) {
            const u = { username };
            setUser(u);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
