import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        setTimeout(() => {
            const ok = login(username, password);
            if (ok) {
                navigate("/dashboard");
            } else {
                setError("Invalid username or password.");
                setLoading(false);
            }
        }, 600);
    };

    return (
        <div className="login-root">
            {/* Left accent panel */}
            <div className="login-left-panel">
                <div className="login-panel-content">
                    <img src="/shore360-logo.svg" alt="Shore360" className="login-panel-logo" />
                    <p className="login-panel-tagline">YOUR STAFF, OUR SUPPORT</p>
                    <div className="login-panel-divider" />
                    <p className="login-panel-desc">
                        Employee Self-Service Portal — access your payslips, HR records, and more.
                    </p>
                </div>
            </div>

            {/* Right form panel */}
            <div className="login-right-panel">
                <div className="login-card">
                    <div className="login-logo-wrap">
                        <img src="/shore360-logo.svg" alt="Shore360" className="login-card-logo" />
                    </div>

                    <h2 className="login-heading">Sign In</h2>
                    <p className="login-sub">Access your HRHub employee portal</p>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username / Email</label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                        </div>

                        {error && <div className="login-error">{error}</div>}

                        <button
                            type="submit"
                            className={`login-btn ${loading ? "loading" : ""}`}
                            disabled={loading}
                        >
                            {loading ? <span className="spinner" /> : "Sign In"}
                        </button>
                    </form>

                    <div className="login-footer">
                        &copy; {new Date().getFullYear()} Shore360 &mdash; HRHub Employee Portal
                    </div>
                </div>
            </div>
        </div>
    );
}
