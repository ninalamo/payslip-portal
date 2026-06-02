export const employee = {
    name: "NIÑO FRANCISCO CALZADA ALAMO",
    tin: "410160000000",
    sssNo: "3393628329",
    philhealthNo: "030503431005",
    hdmf: "121109160615",
    department: "INFOSECTOOLKIT INC T/A COMPYL",
    position: "Employee",
};

export const originalPayslips = buildPayslips();

const BASE_COMPENSATION = {
    basic: 73000.0,
    deMinimisBenefits: 2000.0,
    allowance: 0.0,
    lateUndertime: 0.0,
    absences: 0.0,
    totalGross: 75000.0,
};

const CONTRIBUTION_PATTERNS = [
    { sss: 0.0, sssMpf: 0.0, philhealth: 0.0, hdmf: 0.0 },
    { sss: 1000.0, sssMpf: 750.0, philhealth: 2500.0, hdmf: 200.0 },
];

const MONTH_LABELS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function lastDayOfMonth(year, monthIndex) {
    return new Date(year, monthIndex + 1, 0).getDate();
}

function buildPeriod(year, monthIndex, half) {
    const startDay = half === 1 ? 1 : 16;
    const endDay = half === 1 ? 15 : lastDayOfMonth(year, monthIndex);
    const period = `${MONTH_LABELS[monthIndex]} ${startDay}–${endDay}, ${year}`;
    const dateCovered = `Payroll for ${monthIndex + 1}/${startDay}/${year} - ${monthIndex + 1}/${endDay}/${year}`;

    let payrollYear = year;
    let payrollMonth = monthIndex;
    let payrollDay;

    if (half === 1) {
        payrollDay = 18;
    } else {
        payrollDay = 2;
        payrollMonth = monthIndex + 1;
        if (payrollMonth > 11) {
            payrollMonth = 0;
            payrollYear += 1;
        }
    }

    const payrollDate = `${String(payrollDay).padStart(2, "0")} ${MONTH_LABELS[payrollMonth]} ${payrollYear}`;
    const releaseDate = new Date(payrollYear, payrollMonth, payrollDay, 0, 0, 0);

    return {
        year,
        monthIndex,
        half,
        period,
        dateCovered,
        payrollDate,
        releaseDate,
    };
}

function buildCandidatePeriods() {
    const today = new Date();
    const year = today.getFullYear();
    const currentMonth = today.getMonth();
    const periods = [];

    for (let monthIndex = 0; monthIndex <= currentMonth; monthIndex += 1) {
        periods.push(buildPeriod(year, monthIndex, 1));
        periods.push(buildPeriod(year, monthIndex, 2));
    }

    return periods;
}

function getPeriodTax(year, contributionsApplied) {
    if (year >= 2026) {
        return 15568.75;
    }
    return contributionsApplied ? 13998.13 : 13998.14;
}

function buildPayslips() {
    const today = new Date();
    const candidatePeriods = buildCandidatePeriods();

    const availablePeriods = candidatePeriods
        .filter((period) => period.releaseDate <= today)
        .sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            if (a.monthIndex !== b.monthIndex) return a.monthIndex - b.monthIndex;
            return a.half - b.half;
        });

    const cumulative = {
        taxableGross: 0,
        grossIncome: 0,
        tax: 0,
        sss: 0,
        phic: 0,
        hdmf: 0,
    };

    const generated = availablePeriods.map((period, index) => {
        const contributions = CONTRIBUTION_PATTERNS[index % CONTRIBUTION_PATTERNS.length];
        const tax = getPeriodTax(period.year, contributions.sss > 0);
        const totalDeductions =
            contributions.sss +
            contributions.sssMpf +
            contributions.philhealth +
            contributions.hdmf +
            tax;
        const netPay = BASE_COMPENSATION.totalGross - totalDeductions;

        cumulative.taxableGross += BASE_COMPENSATION.basic;
        cumulative.grossIncome += BASE_COMPENSATION.totalGross;
        cumulative.tax += tax;
        cumulative.sss += contributions.sss + contributions.sssMpf;
        cumulative.phic += contributions.philhealth;
        cumulative.hdmf += contributions.hdmf;

        return {
            period: period.period,
            dateCovered: period.dateCovered,
            payrollDate: period.payrollDate,
            status: "Released",
            compensation: { ...BASE_COMPENSATION },
            deductions: {
                deMinimis: 0.0,
                sss: contributions.sss,
                sssMpf: contributions.sssMpf,
                philhealth: contributions.philhealth,
                hdmf: contributions.hdmf,
                tax,
                totalDeductions,
            },
            netPay,
            ytd: {
                taxableGross: cumulative.taxableGross,
                tax: cumulative.tax,
                sss: cumulative.sss,
                phic: cumulative.phic,
                hdmf: cumulative.hdmf,
                grossIncome: cumulative.grossIncome,
            },
        };
    });

    const descending = generated.reverse().map((record, index) => ({
        ...record,
        id: index + 1,
    }));

    return descending;
}

export const payslips = originalPayslips;

