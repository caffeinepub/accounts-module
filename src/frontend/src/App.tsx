import {
  AlertTriangle,
  Bell,
  BookOpen,
  Building2,
  Calculator,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  CreditCard,
  DollarSign,
  Factory,
  FileBarChart2,
  FileText,
  Filter,
  GraduationCap,
  HelpCircle,
  Link2,
  RefreshCw,
  RotateCcw,
  Search,
  Settings,
  Target,
  TrendingDown,
  TrendingUp,
  UploadCloud,
  Users,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Page = "dashboard" | "qualia-reconciliation";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: { id: string; label: string }[];
}

const navItems: NavItem[] = [
  { id: "employee", label: "Employee Management", icon: <Users size={16} /> },
  { id: "stripe", label: "Stripe", icon: <CreditCard size={16} /> },
  { id: "criteria", label: "Criteria", icon: <Filter size={16} /> },
  {
    id: "courthouse",
    label: "Courthouse Examiner",
    icon: <Building2 size={16} />,
  },
  {
    id: "search-link",
    label: "Search Link Management",
    icon: <Link2 size={16} />,
  },
  { id: "work-target", label: "Work Target", icon: <Target size={16} /> },
  {
    id: "accounts",
    label: "Accounts",
    icon: <DollarSign size={16} />,
    children: [
      { id: "dashboard", label: "Dashboard" },
      { id: "qualia-reconciliation", label: "Qualia Reconciliation" },
    ],
  },
  { id: "release", label: "Release Tracking", icon: <BookOpen size={16} /> },
  {
    id: "training",
    label: "Training Management",
    icon: <GraduationCap size={16} />,
  },
  { id: "taxmaster", label: "TaxMaster", icon: <Calculator size={16} /> },
  {
    id: "production",
    label: "Production Management",
    icon: <Factory size={16} />,
  },
  { id: "pending", label: "Pending Report", icon: <FileBarChart2 size={16} /> },
];

const invoiceData = [
  {
    si: 1,
    order: "MTS-2024-0081",
    product: "Full Search Plus",
    orderStatus: "Completed",
    orderValue: "$320.00",
    fee: "$32.00",
    paid: "$288.00",
    status: "Updated",
  },
  {
    si: 2,
    order: "MTS-2024-0082",
    product: "Title Search Update",
    orderStatus: "Completed",
    orderValue: "$180.00",
    fee: "$18.00",
    paid: "$162.00",
    status: "Updated",
  },
  {
    si: 3,
    order: "MTS-2024-0083",
    product: "Full Search Plus",
    orderStatus: "Cancelled",
    orderValue: "$320.00",
    fee: "$32.00",
    paid: "$0.00",
    status: "Cancelled",
  },
  {
    si: 4,
    order: "MTS-2024-0084",
    product: "Patriot Search",
    orderStatus: "Completed",
    orderValue: "$95.00",
    fee: "$9.50",
    paid: "$85.50",
    status: "Updated",
  },
  {
    si: 5,
    order: "MTS-2024-0085",
    product: "Full Search Plus",
    orderStatus: "Failed",
    orderValue: "$320.00",
    fee: "$32.00",
    paid: "$0.00",
    status: "Failed",
  },
  {
    si: 6,
    order: "MTS-2024-0086",
    product: "Title Search Update",
    orderStatus: "Completed",
    orderValue: "$180.00",
    fee: "$18.00",
    paid: "$162.00",
    status: "Updated",
  },
  {
    si: 7,
    order: "MTS-2024-0087",
    product: "Full Search Plus",
    orderStatus: "Completed",
    orderValue: "$320.00",
    fee: "$32.00",
    paid: "$288.00",
    status: "Updated",
  },
  {
    si: 8,
    order: "MTS-2024-0088",
    product: "Patriot Search",
    orderStatus: "Cancelled",
    orderValue: "$95.00",
    fee: "$9.50",
    paid: "$0.00",
    status: "Cancelled",
  },
];

const reconciliationData = [
  {
    si: 1,
    order: "MTS-2023-4471",
    product: "Full Search Plus",
    orderStatus: "Completed",
    orderValue: "$320.00",
    fee: "$32.00",
    paid: "$288.00",
    status: "Updated",
  },
  {
    si: 2,
    order: "MTS-2023-4472",
    product: "Title Search Update",
    orderStatus: "Completed",
    orderValue: "$180.00",
    fee: "$18.00",
    paid: "$162.00",
    status: "Updated",
  },
  {
    si: 3,
    order: "MTS-2023-4473",
    product: "Full Search Plus",
    orderStatus: "Cancelled",
    orderValue: "$320.00",
    fee: "$32.00",
    paid: "$0.00",
    status: "Cancelled",
  },
  {
    si: 4,
    order: "MTS-2023-4474",
    product: "Patriot Search",
    orderStatus: "Completed",
    orderValue: "$95.00",
    fee: "$9.50",
    paid: "$85.50",
    status: "Updated",
  },
  {
    si: 5,
    order: "MTS-2023-4475",
    product: "Title Search Update",
    orderStatus: "Failed",
    orderValue: "$180.00",
    fee: "$18.00",
    paid: "$0.00",
    status: "Failed",
  },
  {
    si: 6,
    order: "MTS-2023-4476",
    product: "Full Search Plus",
    orderStatus: "Completed",
    orderValue: "$320.00",
    fee: "$32.00",
    paid: "$288.00",
    status: "Updated",
  },
  {
    si: 7,
    order: "MTS-2023-4477",
    product: "Patriot Search",
    orderStatus: "Completed",
    orderValue: "$95.00",
    fee: "$9.50",
    paid: "$85.50",
    status: "Updated",
  },
  {
    si: 8,
    order: "MTS-2023-4478",
    product: "Full Search Plus",
    orderStatus: "Cancelled",
    orderValue: "$320.00",
    fee: "$32.00",
    paid: "$0.00",
    status: "Cancelled",
  },
  {
    si: 9,
    order: "MOR-2023-1101",
    product: "Title Search Update",
    orderStatus: "Completed",
    orderValue: "$180.00",
    fee: "$18.00",
    paid: "$162.00",
    status: "Updated",
  },
  {
    si: 10,
    order: "MOR-2023-1102",
    product: "Full Search Plus",
    orderStatus: "Failed",
    orderValue: "$320.00",
    fee: "$32.00",
    paid: "$0.00",
    status: "Failed",
  },
];

function StatusChip({ status }: { status: string }) {
  const map: Record<
    string,
    { bg: string; text: string; icon: React.ReactNode }
  > = {
    Updated: {
      bg: "#DFF3E7",
      text: "#1F7A4D",
      icon: <CheckCircle2 size={11} />,
    },
    Cancelled: { bg: "#F6D6D2", text: "#A33A2B", icon: <XCircle size={11} /> },
    Failed: {
      bg: "#F8EEC9",
      text: "#8A6A00",
      icon: <AlertTriangle size={11} />,
    },
    Completed: {
      bg: "#DFF3E7",
      text: "#1F7A4D",
      icon: <CheckCircle2 size={11} />,
    },
    Pending: { bg: "#E8EEFF", text: "#3B59C2", icon: <Clock size={11} /> },
  };
  const style = map[status] ?? { bg: "#F3F6F8", text: "#6B7280", icon: null };
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {style.icon}
      {status}
    </span>
  );
}

function KpiCard({
  label,
  value,
  delta,
  positive,
  icon,
  iconBg,
}: {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  icon: React.ReactNode;
  iconBg: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-xl border border-[#E6EBF0] shadow-card p-5 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">
          {label}
        </span>
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </span>
      </div>
      <div className="text-[22px] font-bold text-[#111827]">{value}</div>
      <div
        className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full w-fit"
        style={{
          backgroundColor: positive ? "#DFF3E7" : "#F6D6D2",
          color: positive ? "#1F7A4D" : "#A33A2B",
        }}
      >
        {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
        {delta}
      </div>
    </motion.div>
  );
}

function DashboardPage() {
  const statusBreakdown = [
    { label: "Completed", count: 842, color: "#2F8F91", pct: 66 },
    { label: "Cancelled", count: 198, color: "#A33A2B", pct: 15 },
    { label: "Failed", count: 124, color: "#8A6A00", pct: 10 },
    { label: "Pending", count: 120, color: "#3B59C2", pct: 9 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[22px] font-bold text-[#111827]">Dashboard</h1>
        <p className="text-sm text-[#6B7280] mt-0.5">Accounts Overview</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          label="Total Invoices"
          value="1,284"
          delta="+12% from last month"
          positive
          icon={<FileText size={17} />}
          iconBg="#2F8F91"
        />
        <KpiCard
          label="Total Amount"
          value="$2,140,890"
          delta="+8% from last month"
          positive
          icon={<DollarSign size={17} />}
          iconBg="#3B59C2"
        />
        <KpiCard
          label="Paid Amount"
          value="$1,920,450"
          delta="+5% from last month"
          positive
          icon={<CheckCircle2 size={17} />}
          iconBg="#1F7A4D"
        />
        <KpiCard
          label="Pending"
          value="$220,440"
          delta="-3% from last month"
          positive={false}
          icon={<Clock size={17} />}
          iconBg="#8A6A00"
        />
      </div>

      <div className="flex gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex-[3] bg-white rounded-xl border border-[#E6EBF0] shadow-card overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-[#E6EBF0] flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#111827]">
              Recent Invoices
            </h2>
            <button
              type="button"
              className="text-xs text-teal-500 hover:text-teal-600 font-medium"
            >
              View All →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F3F6F8] border-b border-[#E6EBF0]">
                  {[
                    "SI No",
                    "Qualia Order #",
                    "Product Type",
                    "Order Status",
                    "Order Value",
                    "Qualia Fee",
                    "Paid Amt",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2.5 text-left font-semibold text-[#6B7280] whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoiceData.map((row, i) => (
                  <tr
                    key={row.si}
                    data-ocid={`invoices.item.${i + 1}`}
                    className="border-b border-[#E6EBF0] hover:bg-[#F8FAFB] transition-colors"
                  >
                    <td className="px-4 py-2.5 text-[#111827]">{row.si}</td>
                    <td className="px-4 py-2.5 font-medium text-teal-500">
                      {row.order}
                    </td>
                    <td className="px-4 py-2.5 text-[#374151]">
                      {row.product}
                    </td>
                    <td className="px-4 py-2.5 text-[#374151]">
                      {row.orderStatus}
                    </td>
                    <td className="px-4 py-2.5 font-medium text-[#111827]">
                      {row.orderValue}
                    </td>
                    <td className="px-4 py-2.5 text-[#6B7280]">{row.fee}</td>
                    <td className="px-4 py-2.5 font-medium text-[#111827]">
                      {row.paid}
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusChip status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex-[2] bg-white rounded-xl border border-[#E6EBF0] shadow-card p-5"
        >
          <h2 className="text-sm font-semibold text-[#111827] mb-4">
            Order Status Breakdown
          </h2>
          <div className="flex flex-col gap-4">
            {statusBreakdown.map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="text-xs font-medium text-[#374151]">
                      {s.label}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#111827]">
                    {s.count.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-[#F3F6F8] rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="h-2 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                </div>
                <div className="text-right text-[10px] text-[#9CA3AF] mt-0.5">
                  {s.pct}%
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-[#E6EBF0] grid grid-cols-2 gap-3">
            {statusBreakdown.map((s) => (
              <div
                key={s.label}
                className="rounded-lg p-3"
                style={{ backgroundColor: `${s.color}18` }}
              >
                <div
                  className="text-[18px] font-bold"
                  style={{ color: s.color }}
                >
                  {s.count}
                </div>
                <div className="text-[10px] font-medium text-[#6B7280] mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <footer className="text-center text-xs text-[#9CA3AF] py-3 border-t border-[#E6EBF0]">
        © All Rights Reserved {new Date().getFullYear()}. Design by Dyuti (IT
        Division)
      </footer>
    </div>
  );
}

function QualiaReconciliationPage() {
  const [activeTab, setActiveTab] = useState<"MTS" | "MOR">("MTS");
  const [fileType, setFileType] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const years = ["2021", "2022", "2023", "2024", "2025"];

  const filteredData = reconciliationData
    .filter((r) =>
      activeTab === "MTS"
        ? r.order.startsWith("MTS")
        : r.order.startsWith("MOR"),
    )
    .filter(
      (r) =>
        searchQuery === "" ||
        r.order.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.product.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const inputClass =
    "w-full border border-[#E6EBF0] rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:outline-none";

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-[22px] font-bold text-[#111827]">
          Qualia Reconciliation
        </h1>
        <p className="text-sm text-[#6B7280] mt-0.5">
          Accounts / Qualia Reconciliation
        </p>
      </div>

      <div className="flex gap-4">
        {/* Fetch Records */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-[300px] shrink-0 bg-white rounded-xl border border-[#E6EBF0] shadow-card p-5"
        >
          <h3 className="text-sm font-semibold text-teal-500 mb-4">
            Fetch Records
          </h3>
          <div className="flex flex-col gap-3">
            <div>
              <label
                htmlFor="file-type"
                className="block text-xs font-medium text-[#6B7280] mb-1"
              >
                File Type
              </label>
              <select
                id="file-type"
                data-ocid="qualia.select"
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className={`${inputClass} bg-white text-[#111827]`}
              >
                <option value="">Select Type</option>
                <option>MTS</option>
                <option>MOR</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="month-select"
                className="block text-xs font-medium text-[#6B7280] mb-1"
              >
                Month
              </label>
              <select
                id="month-select"
                data-ocid="qualia.select"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className={`${inputClass} bg-white text-[#111827]`}
              >
                <option value="">Select Month</option>
                {months.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="year-select"
                className="block text-xs font-medium text-[#6B7280] mb-1"
              >
                Year
              </label>
              <select
                id="year-select"
                data-ocid="qualia.select"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={`${inputClass} bg-white text-[#111827]`}
              >
                <option value="">Select Year</option>
                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              data-ocid="qualia.primary_button"
              className="mt-1 w-full bg-teal-500 hover:bg-teal-600 text-white rounded-md py-2 text-sm font-semibold transition-colors"
            >
              Fetch
            </button>
          </div>
        </motion.div>

        {/* Payment Details */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="flex-1 bg-white rounded-xl border border-[#E6EBF0] shadow-card p-5"
        >
          <h3 className="text-sm font-semibold text-[#111827] mb-4">
            Payment Details
          </h3>
          <div className="grid grid-cols-4 gap-3">
            <div>
              <label
                htmlFor="process-date"
                className="block text-xs font-medium text-[#6B7280] mb-1"
              >
                Process Date
              </label>
              <input
                id="process-date"
                data-ocid="qualia.input"
                type="date"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="check-date"
                className="block text-xs font-medium text-[#6B7280] mb-1"
              >
                Check Date
              </label>
              <input
                id="check-date"
                data-ocid="qualia.input"
                type="date"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="check-no"
                className="block text-xs font-medium text-[#6B7280] mb-1"
              >
                Check No
              </label>
              <input
                id="check-no"
                data-ocid="qualia.input"
                type="text"
                placeholder="Enter check number"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-xs font-medium text-[#6B7280] mb-1"
              >
                Amount ($)
              </label>
              <input
                id="amount"
                data-ocid="qualia.input"
                type="number"
                placeholder="0.00"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="bank"
                className="block text-xs font-medium text-[#6B7280] mb-1"
              >
                Bank
              </label>
              <input
                id="bank"
                data-ocid="qualia.input"
                type="text"
                placeholder="Bank name"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="received-date"
                className="block text-xs font-medium text-[#6B7280] mb-1"
              >
                Received Date
              </label>
              <input
                id="received-date"
                data-ocid="qualia.input"
                type="date"
                className={inputClass}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="file-upload"
                className="block text-xs font-medium text-[#6B7280] mb-1"
              >
                Choose Files
              </label>
              <label
                htmlFor="file-upload"
                data-ocid="qualia.upload_button"
                className="flex items-center gap-2 w-full border border-dashed border-[#C7D5E0] rounded-md px-3 py-2 text-sm text-[#6B7280] cursor-pointer hover:border-teal-400 hover:text-teal-500 transition-colors"
              >
                <UploadCloud size={14} />
                <span>Browse files...</span>
                <input id="file-upload" type="file" className="hidden" />
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              data-ocid="qualia.primary_button"
              className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded-md px-4 py-2 text-sm font-semibold transition-colors"
            >
              <UploadCloud size={14} /> Import
            </button>
            <button
              type="button"
              data-ocid="qualia.primary_button"
              className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded-md px-4 py-2 text-sm font-semibold transition-colors"
            >
              <RefreshCw size={14} /> Process
            </button>
            <button
              type="button"
              data-ocid="qualia.secondary_button"
              className="flex items-center gap-1.5 bg-[#F6D6D2] hover:bg-[#f0c4bf] text-[#A33A2B] rounded-md px-4 py-2 text-sm font-semibold transition-colors"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </motion.div>
      </div>

      {/* Invoices Section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="bg-white rounded-xl border border-[#E6EBF0] shadow-card overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-[#E6EBF0] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#111827]">Invoices</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {(["MTS", "MOR"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  data-ocid="invoices.tab"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${activeTab === tab ? "bg-teal-500 text-white" : "bg-[#F3F6F8] text-[#6B7280] hover:bg-[#E6EBF0]"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search
                size={13}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
              />
              <input
                data-ocid="invoices.search_input"
                type="text"
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 border border-[#E6EBF0] rounded-md text-xs focus:ring-2 focus:ring-teal-400 focus:outline-none w-48"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ backgroundColor: "#00BCD4" }}>
                {[
                  "SI No",
                  "Qualia Order #",
                  "Product Type",
                  "Order Status",
                  "Order Value",
                  "Qualia Fee",
                  "Paid Amt",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-semibold text-white whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, i) => (
                <tr
                  key={row.si}
                  data-ocid={`reconciliation.item.${i + 1}`}
                  className={`border-b border-[#E6EBF0] hover:bg-teal-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-[#F8FAFB]"}`}
                >
                  <td className="px-4 py-2.5 text-[#111827]">{row.si}</td>
                  <td className="px-4 py-2.5 font-medium text-teal-500">
                    {row.order}
                  </td>
                  <td className="px-4 py-2.5 text-[#374151]">{row.product}</td>
                  <td className="px-4 py-2.5 text-[#374151]">
                    {row.orderStatus}
                  </td>
                  <td className="px-4 py-2.5 font-medium text-[#111827]">
                    {row.orderValue}
                  </td>
                  <td className="px-4 py-2.5 text-[#6B7280]">{row.fee}</td>
                  <td className="px-4 py-2.5 font-medium text-[#111827]">
                    {row.paid}
                  </td>
                  <td className="px-4 py-2.5">
                    <StatusChip status={row.status} />
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-8 text-center text-[#9CA3AF] text-xs"
                    data-ocid="reconciliation.empty_state"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <footer className="text-center text-xs text-[#9CA3AF] py-3 border-t border-[#E6EBF0]">
        © All Rights Reserved {new Date().getFullYear()}. Design by Dyuti (IT
        Division)
      </footer>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [accountsExpanded, setAccountsExpanded] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(),
  );

  const toggleSection = (id: string) => {
    if (id === "accounts") {
      setAccountsExpanded((v) => !v);
      return;
    }
    setExpandedSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="flex h-screen bg-[#F3F6F8] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-[240px] shrink-0 bg-white border-r border-[#E6EBF0] flex flex-col">
        {/* Brand */}
        <div className="px-5 py-5 flex items-center gap-3 border-b border-[#E6EBF0]">
          <span className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm">
            Q
          </span>
          <span className="text-[15px] font-bold text-[#111827]">
            Qualia Finance
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {navItems.map((item) => {
            if (item.children) {
              const isOpen =
                item.id === "accounts"
                  ? accountsExpanded
                  : expandedSections.has(item.id);
              return (
                <div key={item.id}>
                  <button
                    type="button"
                    data-ocid="nav.link"
                    onClick={() => toggleSection(item.id)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#374151] hover:bg-[#F3F6F8] transition-colors"
                  >
                    <span className="text-[#6B7280]">{item.icon}</span>
                    <span className="flex-1 text-left font-medium">
                      {item.label}
                    </span>
                    {isOpen ? (
                      <ChevronDown size={14} className="text-[#9CA3AF]" />
                    ) : (
                      <ChevronRight size={14} className="text-[#9CA3AF]" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pt-0.5 pb-1 space-y-0.5">
                          {item.children.map((child) => {
                            const isActive = activePage === child.id;
                            return (
                              <button
                                key={child.id}
                                type="button"
                                data-ocid="nav.link"
                                onClick={() => setActivePage(child.id as Page)}
                                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  isActive
                                    ? "bg-[#DFF1F0] text-teal-600"
                                    : "text-[#6B7280] hover:bg-[#F3F6F8] hover:text-[#374151]"
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-teal-500" : "bg-[#D1D5DB]"}`}
                                />
                                {child.label}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <button
                key={item.id}
                type="button"
                data-ocid="nav.link"
                onClick={() => toggleSection(item.id)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#374151] hover:bg-[#F3F6F8] transition-colors"
              >
                <span className="text-[#6B7280]">{item.icon}</span>
                <span className="flex-1 text-left font-medium">
                  {item.label}
                </span>
                <ChevronRight size={14} className="text-[#9CA3AF]" />
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-[#E6EBF0] px-3 py-3 space-y-0.5">
          <button
            type="button"
            data-ocid="nav.link"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#6B7280] hover:bg-[#F3F6F8] transition-colors"
          >
            <Settings size={15} />
            <span className="font-medium">Settings</span>
          </button>
          <button
            type="button"
            data-ocid="nav.link"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#6B7280] hover:bg-[#F3F6F8] transition-colors"
          >
            <HelpCircle size={15} />
            <span className="font-medium">Help Center</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 bg-white border-b border-[#E6EBF0] flex items-center justify-end px-6 gap-3 shrink-0">
          <button
            type="button"
            data-ocid="header.button"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:bg-[#F3F6F8] transition-colors"
          >
            <Search size={16} />
          </button>
          <button
            type="button"
            data-ocid="header.button"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:bg-[#F3F6F8] transition-colors relative"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-[#E6EBF0]">
            <span className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold">
              AJ
            </span>
            <div className="text-xs">
              <div className="font-semibold text-[#111827]">Alex Johnson</div>
              <div className="text-[#9CA3AF]">Admin</div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {activePage === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <DashboardPage />
              </motion.div>
            )}
            {activePage === "qualia-reconciliation" && (
              <motion.div
                key="qualia"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <QualiaReconciliationPage />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
