import "../styles/PayslipModal.css";

function fmt(n) {
    return n.toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

/* Map payslip id → the original PDF filename in /public */
const PDF_FILES = {
    1: "/payroll_for_2_1_2026_-_2_15_2026.pdf",
    2: "/payroll_for_1_16_2026_-_1_31_2026.pdf",
    3: "/payroll_for_1_1_2026_-_1_15_2026.pdf",
    4: "/payroll_for_12_16_2025_-_12_31_2025.pdf",
    5: "/payroll_for_12_1_2025_-_12_15_2025.pdf",
};

export default function PayslipModal({ payslip, employee, onClose }) {
    const { compensation: c, deductions: d, ytd, netPay } = payslip;

    const handleSimpleDownload = () => {
        const href = PDF_FILES[payslip.id];
        if (!href) return;
        const a = document.createElement("a");
        a.href = href;
        a.download = href.split("/").pop();
        a.click();
    };

    const handleColoredPrint = () => {
        window.print();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>

                {/* ── ACTION BAR (hidden on print) ── */}
                <div className="modal-actions no-print">
                    {/* Simple download: the original PDF file */}
                    <button className="dl-btn dl-simple" onClick={handleSimpleDownload} title="Download original PDF">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download Simple
                    </button>

                    {/* Colored: print the styled view */}
                    <button className="dl-btn dl-colored" onClick={handleColoredPrint} title="Print / save as PDF (colored)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                            <polyline points="6 9 6 2 18 2 18 9" />
                            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                            <rect x="6" y="14" width="12" height="8" />
                        </svg>
                        Download Colored
                    </button>

                    <button className="close-btn" onClick={onClose} title="Close">✕</button>
                </div>

                {/* ── PAYSLIP DOCUMENT ── */}
                <div className="slip-doc">

                    {/* ── HEADER ── */}
                    <div className="slip-header">
                        <div className="slip-logo-row">
                            <img src="/shore360-logo.svg" alt="Shore360" className="slip-logo-img" />
                        </div>

                        <table className="slip-header-table">
                            <tbody>
                                <tr>
                                    <td className="h-label">NAME</td>
                                    <td className="h-colon">:</td>
                                    <td className="h-value name-value">{employee.name}</td>
                                    <td className="h-label">TIN</td>
                                    <td className="h-colon">:</td>
                                    <td className="h-value">{employee.tin}</td>
                                </tr>
                                <tr>
                                    <td className="h-label">PAYROLL DATE</td>
                                    <td className="h-colon">:</td>
                                    <td className="h-value">{payslip.payrollDate}</td>
                                    <td className="h-label">SSS NO.</td>
                                    <td className="h-colon">:</td>
                                    <td className="h-value">{employee.sssNo}</td>
                                </tr>
                                <tr>
                                    <td className="h-label">DATE COVERED</td>
                                    <td className="h-colon">:</td>
                                    <td className="h-value">{payslip.dateCovered}</td>
                                    <td className="h-label">PHILHEALTH NO.</td>
                                    <td className="h-colon">:</td>
                                    <td className="h-value">{employee.philhealthNo}</td>
                                </tr>
                                <tr>
                                    <td className="h-label">DEPARTMENT</td>
                                    <td className="h-colon">:</td>
                                    <td className="h-value">{employee.department}</td>
                                    <td className="h-label">HDMF</td>
                                    <td className="h-colon">:</td>
                                    <td className="h-value">{employee.hdmf}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* ── MAIN 3-COLUMN TABLE ── */}
                    <table className="slip-main-table">
                        <thead>
                            <tr>
                                <th className="col-comp">COMPENSATION</th>
                                <th className="col-ded">DEDUCTIONS</th>
                                <th className="col-ytd">YEAR-TO-DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* COMPENSATION */}
                                <td className="slip-cell">
                                    <div className="slip-line">
                                        <span>DE MINIMIS BENEFITS</span>
                                        <span className="slip-amount">{fmt(c.deMinimisBenefits)}</span>
                                    </div>
                                </td>

                                {/* DEDUCTIONS */}
                                <td className="slip-cell">
                                    <div className="slip-line">
                                        <span>DE MINIMIS</span>
                                        <span className="slip-amount">{fmt(d.deMinimis)}</span>
                                    </div>
                                    <div className="slip-line">
                                        <span>LATE/UNDERTIME (0m)</span>
                                        <span className="slip-amount">{fmt(d.lateUndertime ?? 0)}</span>
                                    </div>
                                    <div className="slip-line">
                                        <span>ABSENCES (0.00d)</span>
                                        <span className="slip-amount">{fmt(d.absences ?? 0)}</span>
                                    </div>
                                    <div className="slip-line">
                                        <span>ALLOWANCE</span>
                                        <span className="slip-amount">{fmt(c.allowance)}</span>
                                    </div>
                                    <div className="slip-line">
                                        <span>SSS</span>
                                        <span className="slip-amount">{fmt(d.sss)}</span>
                                    </div>
                                    <div className="slip-line">
                                        <span>SSS MPF</span>
                                        <span className="slip-amount">{fmt(d.sssMpf)}</span>
                                    </div>
                                    <div className="slip-line">
                                        <span>PHILHEALTH</span>
                                        <span className="slip-amount">{fmt(d.philhealth)}</span>
                                    </div>
                                    <div className="slip-line">
                                        <span>HDMF</span>
                                        <span className="slip-amount">{fmt(d.hdmf)}</span>
                                    </div>
                                    <div className="slip-line">
                                        <span>TAX</span>
                                        <span className="slip-amount">{fmt(d.tax)}</span>
                                    </div>
                                </td>

                                {/* YEAR-TO-DATE */}
                                <td className="slip-cell">
                                    <div className="slip-line">
                                        <span>TAXABLE GROSS</span>
                                        <span className="slip-amount">{fmt(ytd.taxableGross)}</span>
                                    </div>
                                    <div className="slip-line">
                                        <span>TAX</span>
                                        <span className="slip-amount">{fmt(ytd.tax)}</span>
                                    </div>
                                    <div className="slip-line">
                                        <span>SSS</span>
                                        <span className="slip-amount">{fmt(ytd.sss)}</span>
                                    </div>
                                    <div className="slip-line">
                                        <span>PHIC</span>
                                        <span className="slip-amount">{fmt(ytd.phic)}</span>
                                    </div>
                                    <div className="slip-line">
                                        <span>HDMF</span>
                                        <span className="slip-amount">{fmt(ytd.hdmf)}</span>
                                    </div>
                                    <div className="slip-line">
                                        <span>GROSS INCOME</span>
                                        <span className="slip-amount">{fmt(ytd.grossIncome)}</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>

                        {/* ── FOOTER TOTALS ── */}
                        <tfoot>
                            <tr className="totals-label-row">
                                <th className="col-comp">TOTAL<br />COMPENSATION</th>
                                <th className="col-ded">
                                    TOTAL DEDUCTIONS
                                    <span className="totals-amount">{fmt(d.totalDeductions)}</span>
                                </th>
                                <th className="col-ytd">NET PAY</th>
                            </tr>
                            <tr className="totals-value-row">
                                <td className="col-comp">
                                    <div className="slip-line basic-line">
                                        <span>BASIC</span>
                                        <span className="slip-amount">{fmt(c.basic)}</span>
                                    </div>
                                    <div className="total-gross-amount">{fmt(c.totalGross)}</div>
                                </td>
                                <td className="col-ded"></td>
                                <td className="col-ytd net-pay-cell">
                                    <span className="net-pay-stars">***</span>
                                    <span className="net-pay-value">{fmt(netPay)}</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                    {/* ── DISCLAIMER ── */}
                    <div className="slip-disclaimer">
                        ***This document is generated electronically and does not require a physical signature to be valid.***
                    </div>

                </div>{/* end slip-doc */}
            </div>
        </div>
    );
}
