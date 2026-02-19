import "../styles/Profile.css";

const profile = {
    firstName: "NIÑO FRANCISCO",
    middleName: "CALZADA",
    lastName: "ALAMO",
    fullName: "NIÑO FRANCISCO CALZADA ALAMO",
    email: "nino@compyl.com",
    mobile: "—",
    address: "—",
    dateOfBirth: "December 28, 1986",
    civilStatus: "—",
    gender: "—",

    systemId: "15288",
    employeeId: "602413",
    position: "Employee",
    company: "INFOSECTOOLKIT INC T/A COMPYL",
    department: "INFOSECTOOLKIT INC T/A COMPYL",
    employmentType: "Regular",
    dateHired: "—",
    effectiveDate: "—",
    immediateSupervisor: "—",
    division: "—",
    branch: "—",
    workDaysPerYear: "261",
    rohq: "Regional Operating Headquarters (ROHQ)",

    // Compensation
    basicSalary: "146,000.00",
    deMinimis: "4,000.00",
    dailyAllowance: "0.00",
    minWageEarner: "No",

    // Government IDs
    tin: "410-160-000-000",
    sssNo: "33-9362832-9",
    philhealthNo: "03-050343100-5",
    hdmf: "1211-0916-0615",

    emergencyContact: {
        name: "Joahnna Marie Condino Alamo",
        relationship: "Wife",
        phone: "+63 906 361 5667",
    },
};

function Field({ label, value }) {
    const empty = value === "—";
    return (
        <div className="profile-field">
            <span className="pf-label">{label}</span>
            <span className={`pf-value${empty ? " pf-empty" : ""}`}>{value}</span>
        </div>
    );
}

function Section({ title, icon, children }) {
    return (
        <div className="profile-section">
            <div className="profile-section-header">
                <span className="ps-icon">{icon}</span>
                <h3 className="ps-title">{title}</h3>
            </div>
            <div className="profile-fields">{children}</div>
        </div>
    );
}

export default function Profile() {
    const initials = `${profile.firstName[0]}${profile.lastName[0]}`;

    return (
        <div className="profile-root">
            {/* ── Hero ── */}
            <div className="profile-hero">
                <div className="profile-avatar">{initials}</div>
                <div className="profile-hero-info">
                    <h1 className="profile-hero-name">{profile.fullName}</h1>
                    <span className="profile-hero-pos">{profile.position} — {profile.company}</span>
                    <span className="profile-hero-id">
                        Employee ID: {profile.employeeId} &nbsp;·&nbsp; System ID: {profile.systemId}
                    </span>
                </div>
                <div className="profile-employment-badge">{profile.employmentType}</div>
            </div>

            {/* ── Sections ── */}
            <div className="profile-grid">

                <Section title="Personal Information" icon="👤">
                    <Field label="First Name" value={profile.firstName} />
                    <Field label="Middle Name" value={profile.middleName} />
                    <Field label="Last Name" value={profile.lastName} />
                    <Field label="Date of Birth" value={profile.dateOfBirth} />
                    <Field label="Gender" value={profile.gender} />
                    <Field label="Civil Status" value={profile.civilStatus} />
                    <Field label="Address" value={profile.address} />
                </Section>

                <Section title="Contact Information" icon="📬">
                    <Field label="Email" value={profile.email} />
                    <Field label="Mobile" value={profile.mobile} />
                </Section>

                <Section title="Basic Job Information" icon="💼">
                    <Field label="Employee ID" value={profile.employeeId} />
                    <Field label="System ID" value={profile.systemId} />
                    <Field label="Company" value={profile.company} />
                    <Field label="Department" value={profile.department} />
                    <Field label="Job Title" value={profile.position} />
                    <Field label="Imm. Supervisor" value={profile.immediateSupervisor} />
                    <Field label="Classification" value={profile.rohq} />
                </Section>

                <Section title="Employment Details" icon="📋">
                    <Field label="Employment Type" value={profile.employmentType} />
                    <Field label="Date Hired" value={profile.dateHired} />
                    <Field label="Effective Date" value={profile.effectiveDate} />
                    <Field label="Work Days / Year" value={profile.workDaysPerYear} />
                    <Field label="Division" value={profile.division} />
                    <Field label="Branch" value={profile.branch} />
                </Section>

                <Section title="Compensation & Benefits" icon="💰">
                    <Field label="Basic Salary (Monthly)" value={`₱ ${profile.basicSalary}`} />
                    <Field label="Daily Allowance" value={`₱ ${profile.dailyAllowance}`} />
                    <Field label="De Minimis" value={`₱ ${profile.deMinimis}`} />
                    <Field label="Minimum Wage Earner" value={profile.minWageEarner} />
                </Section>

                <Section title="Government IDs" icon="🪪">
                    <Field label="TIN" value={profile.tin} />
                    <Field label="SSS No." value={profile.sssNo} />
                    <Field label="PhilHealth No." value={profile.philhealthNo} />
                    <Field label="HDMF / Pag-IBIG" value={profile.hdmf} />
                </Section>

                <Section title="Emergency Contact" icon="🚨">
                    <Field label="Name" value={profile.emergencyContact.name} />
                    <Field label="Relationship" value={profile.emergencyContact.relationship} />
                    <Field label="Phone" value={profile.emergencyContact.phone} />
                </Section>

            </div>

            <p className="profile-note">
                ℹ️ Fields marked "—" were not available on HRHub at time of sync.
                <br />
                <a href="https://shore360.hrhub.ph" target="_blank" rel="noreferrer">
                    Visit shore360.hrhub.ph
                </a>
            </p>
        </div>
    );
}
