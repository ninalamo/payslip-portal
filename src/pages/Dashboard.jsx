import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { payslips, employee } from "../data/payslips";
import PayslipModal from "../components/PayslipModal";
import Profile from "./Profile";
import "../styles/Dashboard.css";
import { useState } from "react";

function fmt(n) {
    return n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ── External Link Warning Modal ── */
function ExternalLinkModal({ url, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="ext-modal" onClick={(e) => e.stopPropagation()}>
                <div className="ext-modal-icon">⚠️</div>
                <h2 className="ext-modal-title">You Are Leaving the Employee Portal</h2>
                <p className="ext-modal-body">
                    You are about to be redirected to an external website outside of Shore360's
                    Employee Self-Service portal. Please be mindful of any personal or sensitive
                    information you share on external platforms. Shore360 is not responsible for
                    the privacy practices of third-party sites.
                </p>
                <div className="ext-modal-url">{url}</div>
                <div className="ext-modal-actions">
                    <button className="ext-btn-cancel" onClick={onCancel}>Go Back</button>
                    <button className="ext-btn-confirm" onClick={onConfirm}>Continue Anyway</button>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard({ page = "payslips" }) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showExternalWarning, setShowExternalWarning] = useState(false);

    const DISPUTE_URL = "https://www.shore360.com/contact-us/";

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const initials = "NA"; // NIÑO FRANCISCO → N, ALAMO → A

    // Show only the last 5 payslips
    const visiblePayslips = payslips.slice(0, 5);

    return (
        <div className="dashboard-root">

            {/* ── External Link Warning ── */}
            {showExternalWarning && (
                <ExternalLinkModal
                    url={DISPUTE_URL}
                    onConfirm={() => {
                        setShowExternalWarning(false);
                        window.open(DISPUTE_URL, "_blank", "noopener,noreferrer");
                    }}
                    onCancel={() => setShowExternalWarning(false)}
                />
            )}

            {/* ── Sidebar ── */}
            <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
                <div className="sidebar-logo">
                    <img
                        src="/shore360-logo.svg"
                        alt="Shore360"
                        style={{
                            height: sidebarOpen ? "34px" : "24px",
                            width: "auto",
                            transition: "height 0.25s",
                            flexShrink: 0,
                        }}
                    />
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section-label">{sidebarOpen && "MAIN MENU"}</div>
                    <button
                        className={`nav-item${page === "payslips" ? " active" : ""}`}
                        onClick={() => navigate("/dashboard")}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {sidebarOpen && <span>My Payslips</span>}
                    </button>
                    <button
                        className={`nav-item${page === "profile" ? " active" : ""}`}
                        onClick={() => navigate("/profile")}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        {sidebarOpen && <span>My Profile</span>}
                    </button>
                </nav>

                <div className="sidebar-bottom">
                    <button className="nav-item logout-btn" onClick={handleLogout}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* ── Main ── */}
            <div className={`main-wrapper${sidebarOpen ? "" : " sidebar-collapsed-offset"}`}>

                {/* Topbar */}
                <header className="topbar">
                    <div className="topbar-left">
                        <button
                            className="sidebar-toggle"
                            onClick={() => setSidebarOpen((v) => !v)}
                            aria-label="Toggle sidebar"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        </button>
                        <div className="topbar-breadcrumb">
                            <span className="breadcrumb-label">Dashboard</span>
                            <span className="breadcrumb-sep">›</span>
                            <span className="breadcrumb-active">
                                {page === "profile" ? "My Profile" : "Payroll Summary"}
                            </span>
                        </div>
                    </div>
                    <div className="topbar-right">
                        <div className="topbar-avatar" title="NIÑO FRANCISCO CALZADA ALAMO">{initials}</div>
                        <div className="topbar-user">
                            <div className="topbar-name">NIÑO FRANCISCO CALZADA ALAMO</div>
                            <div className="topbar-dept">{employee.department}</div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="main-content">
                    {page === "profile" ? (
                        <Profile />
                    ) : (
                        <>
                            {/* Retention notice (moved to top) */}
                            <div className="retention-notice" style={{ marginBottom: "20px", marginTop: 0 }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15" style={{ flexShrink: 0, marginTop: 1 }}>
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <span>
                                    The portal displays your <strong>5 most recent payslip periods</strong> in accordance with Shore360's
                                    Employee Self-Service data retention policy. To request payslips older than 3 months, please submit
                                    an <strong>HR Records Request</strong> via the helpdesk with your employee ID and the specific
                                    pay period(s) required. Requests are processed within 3–5 business days.
                                </span>
                            </div>

                            {/* Section header with Dispute button */}
                            <div className="content-header">
                                <div>
                                    <h1 className="section-title">Payroll Summary</h1>
                                    <p className="section-sub">Showing your 5 most recent payslip periods</p>
                                </div>
                                <button
                                    className="dispute-btn"
                                    onClick={() => setShowExternalWarning(true)}
                                    title="Contact HR to dispute or request a correction"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                    Dispute / Request HR
                                </button>
                            </div>

                            {/* Payslip Table */}
                            <div className="table-card">
                                <table className="payslip-table">
                                    <thead>
                                        <tr>
                                            <th>Pay Period</th>
                                            <th>Date Covered</th>
                                            <th>Pay Date</th>
                                            <th className="align-right">Gross Pay</th>
                                            <th className="align-right">Deductions</th>
                                            <th className="align-right">Net Pay</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visiblePayslips.map((p) => (
                                            <tr key={p.id} className="payslip-row" onClick={() => setSelected(p)}>
                                                <td>
                                                    <div className="period-cell">
                                                        <div className="period-icon">
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                                                <line x1="16" y1="2" x2="16" y2="6" />
                                                                <line x1="8" y1="2" x2="8" y2="6" />
                                                                <line x1="3" y1="10" x2="21" y2="10" />
                                                            </svg>
                                                        </div>
                                                        <span className="period-label">{p.period}</span>
                                                    </div>
                                                </td>
                                                <td className="date-cov">{p.dateCovered}</td>
                                                <td>{p.payrollDate}</td>
                                                <td className="align-right gross">₱{fmt(p.compensation.totalGross)}</td>
                                                <td className="align-right deductions">₱{fmt(p.deductions.totalDeductions)}</td>
                                                <td className="align-right net-pay">₱{fmt(p.netPay)}</td>
                                                <td>
                                                    <span className="status-badge released">Released</span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="view-btn"
                                                        onClick={(e) => { e.stopPropagation(); setSelected(p); }}
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </main>
            </div>

            {selected && (
                <PayslipModal
                    payslip={selected}
                    employee={employee}
                    onClose={() => setSelected(null)}
                />
            )}
        </div>
    );
}
