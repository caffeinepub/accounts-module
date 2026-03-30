import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Bell,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  HelpCircle,
  RefreshCw,
  RotateCcw,
  Search,
  Settings,
  TrendingUp,
  UploadCloud,
  Wallet,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Page = "dashboard" | "qualia-reconciliation";

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

function DashboardPage() {
  const statusBreakdown = [
    { label: "Completed", count: 842, color: "#0f766e", pct: 66 },
    { label: "Cancelled", count: 198, color: "#A33A2B", pct: 15 },
    { label: "Failed", count: 124, color: "#8A6A00", pct: 10 },
    { label: "Pending", count: 120, color: "#4338ca", pct: 9 },
  ];

  const statCards = [
    {
      label: "Paid Amount",
      value: "$1,920,450",
      delta: "+5% from last month",
      icon: <Wallet size={18} />,
      accent: "#0f766e",
      accentLight: "#ccfbf1",
    },
    {
      label: "Collected Rate",
      value: "89.7%",
      delta: "+2.3% from last month",
      icon: <Activity size={18} />,
      accent: "#4338ca",
      accentLight: "#e0e7ff",
    },
    {
      label: "This Month's Orders",
      value: "186",
      delta: "+12 from last month",
      icon: <BarChart3 size={18} />,
      accent: "#0369a1",
      accentLight: "#e0f2fe",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl p-7"
        style={{
          background:
            "linear-gradient(135deg, #0f766e 0%, #1d4ed8 60%, #4338ca 100%)",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-10 -right-10 w-52 h-52 rounded-full opacity-10"
          style={{ background: "rgba(255,255,255,0.4)" }}
        />
        <div
          className="absolute bottom-0 right-32 w-32 h-32 rounded-full opacity-10"
          style={{ background: "rgba(255,255,255,0.3)" }}
        />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-teal-200 text-sm font-medium tracking-wide uppercase mb-1">
              Accounts Overview · March 2026
            </p>
            <h1 className="text-4xl font-bold text-white leading-tight">
              $2,140,890
            </h1>
            <p className="text-white/70 text-sm mt-1">
              Total Revenue Processed
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5">
              <FileText size={15} className="text-teal-200" />
              <div>
                <div className="text-white font-bold text-lg leading-none">
                  1,284
                </div>
                <div className="text-white/70 text-[11px] mt-0.5">
                  Total Invoices
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5">
              <Clock size={15} className="text-amber-200" />
              <div>
                <div className="text-white font-bold text-lg leading-none">
                  $220,440
                </div>
                <div className="text-white/70 text-[11px] mt-0.5">Pending</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
              <TrendingUp size={14} className="text-green-300" />
              <span className="text-green-300 text-xs font-semibold">
                +8% MoM
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-3 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 flex items-start gap-4"
            style={{ borderLeft: `4px solid ${card.accent}` }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: card.accentLight, color: card.accent }}
            >
              {card.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {card.label}
              </p>
              <p className="text-2xl font-bold text-slate-800 mt-0.5">
                {card.value}
              </p>
              <div className="flex items-center gap-1 mt-1.5">
                <ArrowUpRight size={12} style={{ color: card.accent }} />
                <span
                  className="text-[11px] font-medium"
                  style={{ color: card.accent }}
                >
                  {card.delta}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Two-column main section */}
      <div className="flex gap-4">
        {/* Left: Recent Invoices */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex-[3] bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">
              Recent Invoices
            </h2>
            <button
              type="button"
              className="text-xs text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-1"
            >
              View All <ArrowUpRight size={12} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ backgroundColor: "#0f766e" }}>
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
                {invoiceData.map((row, i) => (
                  <tr
                    key={row.si}
                    data-ocid={`invoices.item.${i + 1}`}
                    className={`border-b border-slate-100 hover:bg-teal-50/40 transition-colors ${
                      i % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                    }`}
                  >
                    <td className="px-4 py-2.5 text-slate-800">{row.si}</td>
                    <td className="px-4 py-2.5 font-semibold text-teal-700">
                      {row.order}
                    </td>
                    <td className="px-4 py-2.5 text-slate-600">
                      {row.product}
                    </td>
                    <td className="px-4 py-2.5 text-slate-600">
                      {row.orderStatus}
                    </td>
                    <td className="px-4 py-2.5 font-semibold text-slate-800">
                      {row.orderValue}
                    </td>
                    <td className="px-4 py-2.5 text-slate-500">{row.fee}</td>
                    <td className="px-4 py-2.5 font-semibold text-slate-800">
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

        {/* Right: Performance Snapshot */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex-[2] bg-white rounded-xl border border-slate-100 shadow-sm p-5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-slate-700">
              Performance Snapshot
            </h2>
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
              March 2026
            </span>
          </div>

          <div className="flex flex-col gap-5 flex-1">
            {statusBreakdown.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.05 }}
                className="flex items-center gap-3"
              >
                <div
                  className="text-2xl font-bold w-12 text-right shrink-0"
                  style={{ color: s.color }}
                >
                  {s.count}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-slate-600">
                      {s.label}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {s.pct}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.pct}%` }}
                      transition={{
                        duration: 0.8,
                        delay: 0.4 + i * 0.08,
                        ease: "easeOut",
                      }}
                      className="h-2 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              <span className="font-semibold text-slate-700">1,284</span> total
              orders
            </div>
            <div className="flex items-center gap-1 text-teal-600">
              <TrendingUp size={13} />
              <span className="text-[11px] font-semibold">
                +8% vs last month
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="text-center text-xs text-slate-400 py-3 border-t border-slate-100">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-slate-600 transition-colors"
        >
          caffeine.ai
        </a>
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
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    activeTab === tab
                      ? "bg-teal-500 text-white"
                      : "bg-[#F3F6F8] text-[#6B7280] hover:bg-[#E6EBF0]"
                  }`}
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
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-slate-600 transition-colors"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
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

        {/* Nav — Accounts section only, always expanded */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {/* Section Label */}
          <div className="px-3 mb-2">
            <div className="flex items-center gap-2.5">
              <DollarSign size={15} className="text-teal-500" />
              <span className="text-sm font-semibold text-slate-700">
                Accounts
              </span>
            </div>
          </div>

          {/* Children always shown */}
          <div className="pl-4 space-y-0.5">
            {[
              { id: "dashboard" as Page, label: "Dashboard" },
              {
                id: "qualia-reconciliation" as Page,
                label: "Qualia Reconciliation",
              },
            ].map((child) => {
              const isActive = activePage === child.id;
              return (
                <button
                  key={child.id}
                  type="button"
                  data-ocid="nav.link"
                  onClick={() => setActivePage(child.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#DFF1F0] text-teal-600"
                      : "text-[#6B7280] hover:bg-[#F3F6F8] hover:text-[#374151]"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      isActive ? "bg-teal-500" : "bg-[#D1D5DB]"
                    }`}
                  />
                  {child.label}
                </button>
              );
            })}
          </div>
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
