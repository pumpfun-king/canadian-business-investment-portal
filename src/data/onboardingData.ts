export type ComplianceStatus = "Verified" | "In Progress" | "Required";

export interface DeliverableItem {
  id: string;
  title: string;
  description: string;
  status: ComplianceStatus;
  authority: string;
  verificationMethod: string;
}

export interface RoadmapPhase {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  duration: string;
  status: ComplianceStatus;
  summary: string;
  keyObjective: string;
  capitalMilestone: string;
  regulatoryCitation: string;
  deliverables: DeliverableItem[];
  complianceNote: string;
}

export interface CapitalAllocationItem {
  id: string;
  category: string;
  shortName: string;
  percentage: number;
  amount: number;
  investorPortion: number;
  partnerPortion: number;
  color: string;
  bgClass: string;
  borderClass: string;
  badgeClass: string;
  status: ComplianceStatus;
  lineItems: {
    name: string;
    cost: number;
    vendorType: string;
  }[];
  whyVerifiableDocRequired: string;
  requiredProofs: string[];
  regulatoryStandard: string;
}

export interface ChecklistDocument {
  id: string;
  code: string;
  title: string;
  category: "Identity & KYC" | "Source of Funds" | "Corporate & Legal" | "Banking & Escrow";
  description: string;
  status: ComplianceStatus;
  formatRequirements: string;
  mandatoryReason: string;
  phaseRef: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  regulatoryTag: string;
}

export const HERO_METRICS = [
  {
    id: "total-capital",
    label: "Total Required Capital",
    value: "$75,000 CAD",
    numericValue: 75000,
    subtext: "100% Active Commercial Deployment",
    badge: "Verified Cap Table",
    status: "Verified" as ComplianceStatus,
  },
  {
    id: "investor-allocation",
    label: "Direct Investor Allocation",
    value: "$45,000 CAD",
    numericValue: 45000,
    subtext: "60.0% Controlling Equity Stake",
    badge: "Direct Wire Only",
    status: "In Progress" as ComplianceStatus,
  },
  {
    id: "partner-cofunding",
    label: "Partner Co-Funding",
    value: "$30,000 CAD",
    numericValue: 30000,
    subtext: "40.0% Local Operating Partner Stake",
    badge: "Committed in Escrow",
    status: "Verified" as ComplianceStatus,
  },
  {
    id: "target-timeline",
    label: "Target Operational Timeline",
    value: "12–24 Months",
    numericValue: 24,
    subtext: "From KYC Audit to Full Governance",
    badge: "5-Phase Roadmap",
    status: "Required" as ComplianceStatus,
  },
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 1,
    code: "PHASE 01",
    title: "Compliance & Source of Funds Audit",
    subtitle: "KYC, clean audit trail of personal funds, and legal identification",
    duration: "Months 1–2",
    status: "Verified",
    summary:
      "Comprehensive anti-money laundering (AML) and Know Your Client (KYC) verification establishing an unbroken, unencumbered paper trail for the investor's $45,000 CAD capital contribution.",
    keyObjective: "Certify unencumbered personal liquidity and identity clearance prior to corporate formation.",
    capitalMilestone: "$0 Disbursed • Liquidity Proof of $45,000 CAD Verified",
    regulatoryCitation: "FINTRAC PCMLTFA & Provincial Business Immigration Compliance Guidelines",
    deliverables: [
      {
        id: "p1-d1",
        title: "Legal Identification & Biometric KYC Verification",
        description:
          "Certified true copy of valid passport, national identity card, and residential address verification authenticated by a Canadian notary or designated legal counsel.",
        status: "Verified",
        authority: "Designated Corporate Counsel",
        verificationMethod: "Notarized Passport + Biometric Match",
      },
      {
        id: "p1-d2",
        title: "Clean 6-Month Personal Bank Audit Trail",
        description:
          "Official stamped bank statements demonstrating progressive accumulation of funds from declared employment, business dividends, or asset liquidation without unexplained lump-sum deposits.",
        status: "Verified",
        authority: "Independent CPA Forensic Review",
        verificationMethod: "Direct Bank Statement Authentication",
      },
      {
        id: "p1-d3",
        title: "Unencumbered Funds & Source-of-Wealth Declaration",
        description:
          "Sworn statutory declaration confirming the $45,000 CAD investment is free of liens, third-party loans, or undisclosed collateral arrangements.",
        status: "Verified",
        authority: "Commissioner of Oaths / Notary",
        verificationMethod: "Signed Statutory Affidavit",
      },
    ],
    complianceNote:
      "Canadian regulatory authorities strictly reject borrowed capital or third-party intermediary transfers. Every dollar must trace directly to verified personal accumulation.",
  },
  {
    id: 2,
    code: "PHASE 02",
    title: "Corporate Structuring & Equity Allocation",
    subtitle: "Articles of incorporation, share certificate issuance, and shareholders' agreement",
    duration: "Months 2–4",
    status: "In Progress",
    summary:
      "Incorporation of the Canadian operating entity (Ontario/Federal Commercial Bakery Corp.), formalizing the 60/40 equity split between the Foreign Principal Investor ($45,000 CAD) and Canadian Operating Partner ($30,000 CAD).",
    keyObjective: "Establish legal corporate vehicle and issue voting Class A common shares.",
    capitalMilestone: "Authorized Share Capital Registered (60% Investor / 40% Partner)",
    regulatoryCitation: "Canada Business Corporations Act (CBCA) / Provincial Business Corporations Act",
    deliverables: [
      {
        id: "p2-d1",
        title: "Articles of Incorporation & NUANS Name Registration",
        description:
          "Filing of corporate charter under NAICS 311811 (Retail Bakeries) & 311814 (Commercial Bakeries), establishing registered Canadian head office and board structure.",
        status: "Verified",
        authority: "Corporations Canada / Provincial Registry",
        verificationMethod: "Certificate of Incorporation & CRA BN",
      },
      {
        id: "p2-d2",
        title: "Share Certificate Issuance & Central Securities Register",
        description:
          "Issuance of 600 Class A Common Voting Shares to Direct Investor ($45,000 CAD subscription) and 400 Class A Common Voting Shares to Partner ($30,000 CAD subscription).",
        status: "In Progress",
        authority: "Corporate Secretary & Legal Counsel",
        verificationMethod: "Corporate Minute Book Ledger Entry",
      },
      {
        id: "p2-d3",
        title: "Unanimous Shareholders' Agreement (USA)",
        description:
          "Execution of binding governance framework detailing active managerial responsibilities, capital call rules, dividend policies, and non-passive investment covenants.",
        status: "In Progress",
        authority: "Both Shareholders & Independent Legal Counsel",
        verificationMethod: "Counter-signed USA with ILA Certificates",
      },
    ],
    complianceNote:
      "To qualify as an active commercial venture, the Shareholders' Agreement must explicitly mandate ongoing executive decision-making by the investor and prohibit guaranteed buy-back or redemption clauses.",
  },
  {
    id: 3,
    code: "PHASE 03",
    title: "Capital Deposit & Escrow",
    subtitle: "Direct wire transmission to Canadian corporate account and verifiable proof of deposit",
    duration: "Months 4–6",
    status: "Required",
    summary:
      "Execution of international SWIFT wire transfer of $45,000 CAD directly from the investor's audited personal bank account into the newly opened Canadian Schedule I Corporate Account alongside the $30,000 CAD partner contribution.",
    keyObjective: "Consolidate full $75,000 CAD capitalization with complete SWIFT MT103 traceability.",
    capitalMilestone: "$75,000 CAD Total Capitalized in Canadian Schedule I Bank",
    regulatoryCitation: "Schedule I Bank Commercial Onboarding & FINTRAC SWIFT Reporting",
    deliverables: [
      {
        id: "p3-d1",
        title: "Direct SWIFT MT103 Wire Transmission ($45,000 CAD)",
        description:
          "Uninterrupted wire transfer originating exclusively from the investor's verified personal account directly to the Canadian bakery corporation's business account.",
        status: "Required",
        authority: "Canadian Schedule I Chartered Bank",
        verificationMethod: "SWIFT MT103 Wire Confirmation & Credit Advice",
      },
      {
        id: "p3-d2",
        title: "Partner Co-Funding Deposit Verification ($30,000 CAD)",
        description:
          "Simultaneous clearing of partner co-investment funds into the corporate operating account, bringing total verified capitalization to $75,000 CAD.",
        status: "Verified",
        authority: "Escrow Agent & Corporate Bank",
        verificationMethod: "Certified Bank Deposit Receipt",
      },
      {
        id: "p3-d3",
        title: "Official Proof of Deposit & Capitalization Certificate",
        description:
          "Issuance of institutional bank comfort letter and stamped corporate account statement confirming $75,000 CAD cleared balance ready for commercial deployment.",
        status: "Required",
        authority: "Commercial Account Manager",
        verificationMethod: "Stamped Bank Balance Verification Letter",
      },
    ],
    complianceNote:
      "Funds routed through currency exchange houses, hawala networks, crypto-offramps, or third-party corporate accounts are automatically disqualified during immigration and banking audits.",
  },
  {
    id: 4,
    code: "PHASE 04",
    title: "Commercial Execution & Buildout",
    subtitle: "Commercial lease signing, industrial ovens/mixers procurement, health inspection, and hiring local staff",
    duration: "Months 6–12",
    status: "Required",
    summary:
      "Deployment of the $75,000 CAD capital across physical commercial bakery assets, municipal licensing, food-safety inspections, and local Canadian workforce onboarding.",
    keyObjective: "Transition from capitalized entity to revenue-generating commercial bakery facility.",
    capitalMilestone: "$75,000 CAD Deployed Across 4 Audited Asset Categories",
    regulatoryCitation: "Municipal Zoning Bylaw, Provincial Food Premises Regulation & CRA Payroll",
    deliverables: [
      {
        id: "p4-d1",
        title: "Commercial Lease Execution & Zoning Clearance",
        description:
          "Multi-year commercial lease for a 1,800+ sq. ft. food-grade production and retail unit with commercial HVAC/exhaust clearance ($15,000 CAD allocation).",
        status: "Required",
        authority: "Commercial Landlord & Municipal Zoning Dept",
        verificationMethod: "Executed Commercial Lease & Occupancy Permit",
      },
      {
        id: "p4-d2",
        title: "Industrial Bakery Equipment Procurement & Installation",
        description:
          "Acquisition of CSA-certified rotary convection ovens, 80-quart spiral dough mixers, retarder-proofers, and stainless steel worktables ($30,000 CAD allocation).",
        status: "Required",
        authority: "Authorized Commercial Kitchen Suppliers",
        verificationMethod: "Commercial Invoices, Serial Numbers & Bill of Lading",
      },
      {
        id: "p4-d3",
        title: "Public Health Inspection & Food Handler Certification",
        description:
          "Passing municipal public health unit inspection, grease-trap & fire suppression sign-off, and municipal business operating license issuance.",
        status: "Required",
        authority: "Regional Public Health & Fire Department",
        verificationMethod: "Green Pass Inspection Certificate",
      },
      {
        id: "p4-d4",
        title: "Local Staff Hiring & CRA Payroll Activation",
        description:
          "Recruitment of Canadian citizens/permanent residents (head baker & production assistants) and opening of CRA PD7A payroll remittance accounts ($11,250 CAD initial allocation).",
        status: "Required",
        authority: "Canada Revenue Agency (CRA)",
        verificationMethod: "Employment Contracts & CRA Payroll RP Account",
      },
    ],
    complianceNote:
      "Every commercial expenditure must be paid directly from the corporate bank account via traceable cheque, EFT, or corporate wire—cash payments for equipment or contractors are strictly disallowed.",
  },
  {
    id: 5,
    code: "PHASE 05",
    title: "Operational Governance & Review",
    subtitle: "Quarterly financial reporting, active management compliance, and long-term capital/equity evaluations",
    duration: "Months 12–24",
    status: "Required",
    summary:
      "Sustained commercial operation of the bakery with quarterly CPA financial statements, active management logbooks, GST/HST & payroll filings, and milestone performance audits through Month 24.",
    keyObjective: "Demonstrate sustained active management, job retention, and regulatory compliance.",
    capitalMilestone: "Ongoing Revenue Operations & Working Capital Reserve ($18,750 CAD)",
    regulatoryCitation: "IRCC / Provincial Entrepreneur Performance Monitoring & CRA Corporate Tax (T2)",
    deliverables: [
      {
        id: "p5-d1",
        title: "Quarterly CPA Compilation & Financial Reporting",
        description:
          "Formal quarterly balance sheets, income statements, and general ledger audits prepared by a licensed Canadian Chartered Professional Accountant (CPA).",
        status: "Required",
        authority: "External Licensed CPA Firm",
        verificationMethod: "Quarterly Financial Statements & T2 Return",
      },
      {
        id: "p5-d2",
        title: "Active Management & Operational Presence Audit",
        description:
          "Documentation of the investor's ongoing executive oversight—supplier contract approvals, wholesale client acquisition, production KPIs, and board resolutions.",
        status: "Required",
        authority: "Corporate Governance Committee",
        verificationMethod: "Executive Activity Log & Signed Board Minutes",
      },
      {
        id: "p5-d3",
        title: "18–24 Month Capital & Equity Compliance Evaluation",
        description:
          "Comprehensive final audit verifying continuous business operation, maintenance of the 60% equity stake, local job retention, and program milestone fulfillment.",
        status: "Required",
        authority: "Program Compliance Auditor",
        verificationMethod: "Final Operational Verification Report",
      },
    ],
    complianceNote:
      "Active management requires continuous documented participation in day-to-day strategic and operational decisions throughout the entire 12–24 month operational window.",
  },
];

export const CAPITAL_BREAKDOWN: CapitalAllocationItem[] = [
  {
    id: "physical-equipment",
    category: "Physical Equipment & Machinery",
    shortName: "Physical Equipment",
    percentage: 40,
    amount: 30000,
    investorPortion: 18000,
    partnerPortion: 12000,
    color: "#0F172A", // Deep Navy
    bgClass: "bg-slate-900",
    borderClass: "border-slate-900",
    badgeClass: "bg-slate-900 text-white",
    status: "Required",
    lineItems: [
      {
        name: "CSA-Certified Double Rack Convection Oven",
        cost: 13500,
        vendorType: "Commercial Bakery Equipment OEM",
      },
      {
        name: "80-Qt Heavy-Duty Spiral Dough Mixer & Divider",
        cost: 8200,
        vendorType: "Industrial Food Machinery Supplier",
      },
      {
        name: "32-Pan Retarder Proofer Chamber & Humidity Unit",
        cost: 4800,
        vendorType: "Commercial Refrigeration Vendor",
      },
      {
        name: "NSF Stainless Steel Worktables, Racks & Smallwares",
        cost: 3500,
        vendorType: "Hospitality Supply Distributor",
      },
    ],
    whyVerifiableDocRequired:
      "Regulatory auditors require itemized commercial invoices, machine serial numbers, bills of lading, and corporate bank wire receipts to verify that capital was deployed into tangible, productive Canadian commercial assets rather than fictitious invoices or related-party transfers.",
    requiredProofs: [
      "Itemized vendor invoice with GST/HST registration number",
      "Equipment serial number registry & CSA safety certification",
      "Delivery bill of lading signed at the bakery premises",
      "Matching EFT/wire debit from the Canadian corporate bank account",
    ],
    regulatoryStandard: "Active Asset Verification Standard (AAVS-40)",
  },
  {
    id: "working-capital",
    category: "Operational Working Capital",
    shortName: "Working Capital",
    percentage: 25,
    amount: 18750,
    investorPortion: 11250,
    partnerPortion: 7500,
    color: "#059669", // Emerald 600
    bgClass: "bg-emerald-600",
    borderClass: "border-emerald-600",
    badgeClass: "bg-emerald-600 text-white",
    status: "In Progress",
    lineItems: [
      {
        name: "Commercial Utilities Reserve (Gas, 3-Phase Hydro, Water)",
        cost: 6250,
        vendorType: "Municipal Utility Providers",
      },
      {
        name: "Commercial General Liability & Product Insurance",
        cost: 4200,
        vendorType: "Licensed Canadian Commercial Insurer",
      },
      {
        name: "POS Hardware, Inventory ERP & Accounting Retainer",
        cost: 4500,
        vendorType: "Cloud POS & CPA Advisory",
      },
      {
        name: "Wholesale Packaging, Branding & Local B2B Launch",
        cost: 3800,
        vendorType: "Canadian Print & Packaging Vendors",
      },
    ],
    whyVerifiableDocRequired:
      "Working capital disbursements are closely scrutinized to confirm funds remain inside the operating business to sustain day-to-day commercial activity and are never syphoned back to shareholders as disguised personal draws or management fees.",
    requiredProofs: [
      "Monthly corporate bank statements reconciled by CPA",
      "Commercial insurance policy binder & utility account contracts",
      "Executed CPA engagement letter and POS software subscription invoices",
    ],
    regulatoryStandard: "Operational Continuity & Ring-Fencing Rule (OCRR-25)",
  },
  {
    id: "facility-lease",
    category: "Facility Lease & Municipal Permits",
    shortName: "Facility Lease / Permits",
    percentage: 20,
    amount: 15000,
    investorPortion: 9000,
    partnerPortion: 6000,
    color: "#334155", // Slate 700
    bgClass: "bg-slate-700",
    borderClass: "border-slate-700",
    badgeClass: "bg-slate-700 text-white",
    status: "In Progress",
    lineItems: [
      {
        name: "Commercial Lease Deposit (First & Last Month + Security)",
        cost: 9000,
        vendorType: "Arm's-Length Commercial Landlord",
      },
      {
        name: "Type-1 Exhaust Hood & Fire Suppression Compliance",
        cost: 3600,
        vendorType: "Licensed HVAC & Fire Contractor",
      },
      {
        name: "Municipal Business License, Health & Zoning Permits",
        cost: 2400,
        vendorType: "Municipal Licensing & Public Health",
      },
    ],
    whyVerifiableDocRequired:
      "A physical, commercially zoned production site is mandatory proof of a genuine business establishment in Canada. Regulators inspect the arm's-length lease agreement, zoning approval, and municipal health certificate to prevent virtual-office shells.",
    requiredProofs: [
      "Executed multi-year commercial lease with arm's-length landlord",
      "Municipal commercial food-production zoning confirmation",
      "Public Health Unit green inspection pass & occupancy permit",
    ],
    regulatoryStandard: "Physical Commercial Premises Mandate (PCPM-20)",
  },
  {
    id: "staffing-inventory",
    category: "Staffing & Raw Inventory",
    shortName: "Staffing / Inventory",
    percentage: 15,
    amount: 11250,
    investorPortion: 6750,
    partnerPortion: 4500,
    color: "#10B981", // Emerald 500
    bgClass: "bg-emerald-500",
    borderClass: "border-emerald-500",
    badgeClass: "bg-emerald-500 text-white",
    status: "Required",
    lineItems: [
      {
        name: "Initial Payroll Reserve for Local Baker & Production Staff",
        cost: 6750,
        vendorType: "CRA Registered Payroll (PD7A)",
      },
      {
        name: "Bulk Canadian Grain, Organic Flour & Artisanal Ingredients",
        cost: 4500,
        vendorType: "Canadian Wholesale Food Distributors",
      },
    ],
    whyVerifiableDocRequired:
      "Economic benefit to Canada is measured through local job creation and domestic supply chain engagement. CRA PD7A payroll remittance receipts and T4 summaries provide indisputable government proof of local employment.",
    requiredProofs: [
      "Signed employment contracts with Canadian Citizens or PRs",
      "CRA Payroll Deductions (PD7A) monthly remittance receipts",
      "Wholesale ingredient purchase orders and warehouse delivery slips",
    ],
    regulatoryStandard: "Domestic Employment & Supply Chain Standard (DESC-15)",
  },
];

export const DOCUMENT_CHECKLIST: ChecklistDocument[] = [
  {
    id: "doc-01",
    code: "KYC-101",
    title: "Valid Passport & Government-Issued Photo ID",
    category: "Identity & KYC",
    description:
      "High-resolution color scan of passport bio-data page (minimum 24 months validity remaining) and secondary national ID card, certified by a notary public.",
    status: "Verified",
    formatRequirements: "Notarized PDF (300 DPI color scan)",
    mandatoryReason: "Required for corporate director registration, FINTRAC KYC clearance, and Schedule I bank onboarding.",
    phaseRef: "Phase 1",
  },
  {
    id: "doc-02",
    code: "SOF-102",
    title: "6-Month Consecutive Personal Bank Statements",
    category: "Source of Funds",
    description:
      "Official bank-stamped monthly statements from the primary personal account holding the $45,000 CAD investment funds, showing steady liquidity and salary/dividend inflows.",
    status: "Verified",
    formatRequirements: "Official Bank PDF + Wet Stamp / Verification Code",
    mandatoryReason: "Demonstrates clean, unencumbered accumulation of capital free of sudden unexplained deposits.",
    phaseRef: "Phase 1",
  },
  {
    id: "doc-03",
    code: "SOF-103",
    title: "Notarized Source-of-Wealth (SOW) Declaration & Tax Returns",
    category: "Source of Funds",
    description:
      "Sworn narrative declaration supported by 2 years of personal income tax assessments, business ownership dividends, or audited asset sale agreements.",
    status: "Verified",
    formatRequirements: "Sworn Affidavit + Official Tax Transcripts",
    mandatoryReason: "Establishes lawful origin of capital under Canadian PCMLTFA anti-money laundering regulations.",
    phaseRef: "Phase 1",
  },
  {
    id: "doc-04",
    code: "CORP-201",
    title: "Executed Unanimous Shareholders' Agreement (60/40 Split)",
    category: "Corporate & Legal",
    description:
      "Binding corporate governance contract detailing the $45,000 CAD (60%) Direct Investor subscription and $30,000 CAD (40%) Partner Co-Funding subscription.",
    status: "In Progress",
    formatRequirements: "DocuSign / Wet-Ink Executed Legal Agreement + ILA",
    mandatoryReason: "Proves active equity ownership, voting control, and absence of prohibited redemption/loan clauses.",
    phaseRef: "Phase 2",
  },
  {
    id: "doc-05",
    code: "CORP-202",
    title: "Unencumbered Funds Statutory Affidavit",
    category: "Corporate & Legal",
    description:
      "Legal attestation confirming that no portion of the $45,000 CAD investor allocation is borrowed, margined, or subject to third-party repayment obligations.",
    status: "In Progress",
    formatRequirements: "Notarized Statutory Declaration",
    mandatoryReason: "Regulatory mandate requiring 100% at-risk equity investment tied to commercial performance.",
    phaseRef: "Phase 2",
  },
  {
    id: "doc-06",
    code: "BNK-301",
    title: "SWIFT MT103 Direct Wire Receipt & Credit Advice",
    category: "Banking & Escrow",
    description:
      "International wire transmission receipt showing $45,000 CAD sent directly from the investor's personal bank account to the Canadian corporate bakery account.",
    status: "Required",
    formatRequirements: "Bank-Issued SWIFT MT103 + Receiving Bank Credit Advice",
    mandatoryReason: "Verifies direct point-to-point capital transfer without third-party intermediaries or money service businesses.",
    phaseRef: "Phase 3",
  },
  {
    id: "doc-07",
    code: "OPS-401",
    title: "Commercial Lease, Equipment Invoices & CRA Payroll Dossier",
    category: "Corporate & Legal",
    description:
      "Executed bakery facility lease, itemized invoices for ovens/mixers ($30,000 CAD), municipal health pass, and CRA PD7A payroll registration.",
    status: "Required",
    formatRequirements: "Compiled Audit Binder (PDF)",
    mandatoryReason: "Confirms conversion of cash deposit into an active, compliant, job-creating commercial bakery.",
    phaseRef: "Phase 4",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-pr-benefit",
    question: "Do investors receive Canadian Permanent Residency (PR) and legal stay papers in Month 1?",
    answer:
      "Yes. The program is designed to deliver Permanent Residency (PR) upon completion of the operational roadmap, with zero age barrier and no prohibitive language exams. Crucially, within Month 1 of onboarding, investors receive official statutory legal papers and corporate executive status enabling them and their accompanying family members to stay, live, and operate in Canada 100% legally while the commercial venture buildout proceeds.",
    category: "Residency & PR Pathway",
    regulatoryTag: "Guaranteed PR & Month-1 Legal Stay",
  },
  {
    id: "faq-first-month-benefits",
    question: "What complete benefits do investors receive within the first 30 days (Month 1)?",
    answer:
      "Within Month 1, investors obtain: 1) Official legal papers and corporate authorization to reside legally in Canada; 2) Zero age barrier qualification (no points-system age penalties); 3) Zero language barrier requirements (no mandatory IELTS/TEF cutoffs for commercial owner-operators); 4) Family inclusion covering spouse and dependent children under the same venture file; 5) Access to Canadian public healthcare registration eligibility and provincial education for children; 6) Corporate tax identification and CRA Business Number (BN) registration; and 7) A dedicated Canadian Schedule I bank commercial escrow account in the corporation's name.",
    category: "Month-1 Privileges",
    regulatoryTag: "First Month Comprehensive Benefits",
  },
  {
    id: "faq-1",
    question: "Why must all invested funds be strictly unencumbered and free of loans?",
    answer:
      "Under Canadian Business Investment Program compliance standards, the investor's $45,000 CAD allocation must represent genuine, at-risk equity capital. If funds are borrowed against personal lines of credit, mortgaged against the bakery's equipment, or backed by a side agreement guaranteeing principal repayment, the transaction is classified as a passive debt instrument rather than an eligible commercial investment. Auditors verify 6 months of bank statements and require a notarized Unencumbered Funds Affidavit to confirm 100% unleveraged personal liquidity.",
    category: "Capital Compliance",
    regulatoryTag: "At-Risk Equity Mandate",
  },
  {
    id: "faq-2",
    question: "Why must the $45,000 CAD be wired directly from my personal account to the Canadian corporate account?",
    answer:
      "Canadian Schedule I banks and FINTRAC require an unbroken, single-hop audit trail (documented via a SWIFT MT103 message) where the Ordering Customer (Field 50K) is the named Principal Investor and the Beneficiary Customer (Field 59) is the incorporated Canadian Bakery Venture. Transfers routed through third-party exchange houses, family members, offshore shell entities, or cryptocurrency off-ramps break the chain of custody and result in immediate compliance rejection.",
    category: "Wire & Banking",
    regulatoryTag: "SWIFT MT103 Traceability",
  },
  {
    id: "faq-3",
    question: "How is the $30,000 CAD Partner Co-Funding structured alongside my $45,000 CAD allocation?",
    answer:
      "The total project capitalization is $75,000 CAD. You contribute $45,000 CAD for a controlling 60.0% Class A voting equity stake, while the Canadian Operating Partner contributes $30,000 CAD for a 40.0% equity stake. Both contributions are deposited into the same Canadian corporate account and deployed pro-rata across the four operational buckets: Physical Equipment (40%), Working Capital (25%), Facility Lease & Permits (20%), and Staffing/Inventory (15%).",
    category: "Equity & Co-Funding",
    regulatoryTag: "60/40 Cap Table Structure",
  },
  {
    id: "faq-4",
    question: "What does 'tied to active, operational business assets' mean in practice?",
    answer:
      "Passive holdings—such as keeping the $75,000 CAD sitting in a corporate savings account, purchasing GICs/bonds, or holding passive real estate—do not qualify. The capital must be actively converted into productive commercial bakery operations: CSA-certified ovens and mixers ($30,000), a zoned commercial food facility lease ($15,000), CRA-registered local staff payroll and raw ingredients ($11,250), and active working capital ($18,750). Every expenditure must generate a verifiable invoice, serial number, or CRA receipt.",
    category: "Asset Deployment",
    regulatoryTag: "Active Commercial Deployment",
  },
  {
    id: "faq-5",
    question: "What level of ongoing involvement is expected during the 12–24 Month operational timeline?",
    answer:
      "The Principal Investor must maintain active executive governance throughout the 12–24 month roadmap. While the local 40% partner assists with daily floor operations and municipal coordination, the investor participates in strategic management: approving vendor contracts, reviewing quarterly CPA financial statements, signing board resolutions, overseeing wholesale B2B bakery distribution agreements, and participating in the 18–24 month operational compliance evaluation.",
    category: "Governance & Timeline",
    regulatoryTag: "Active Managerial Oversight",
  },
];
