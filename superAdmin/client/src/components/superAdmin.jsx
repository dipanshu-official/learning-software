import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInstitutes,
  createInstitute,
  updateInstitute,
  deleteInstitute,
} from "../store/instituteSlice";

const generatePassword = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#$!";
  return Array.from(
    { length: 12 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
};

const initialForm = {
  instituteName: "",
  coachingType: "",
  ownerName: "",
  email: "",
  phone: "",
  city: "",
  password: "",
  status: "active",
};

const coachingTypes = [
  "IIT-JEE Coaching",
  "NEET Coaching",
  "UPSC Coaching",
  "CAT / MBA Coaching",
  "Bank / SSC Coaching",
  "School Tuition Centre",
  "Language Institute",
  "Skill Development Centre",
  "Other",
];

const mockData = [
  {
    id: 1,
    instituteName: "Brilliant Academy",
    coachingType: "IIT-JEE Coaching",
    ownerName: "Rajesh Kumar",
    email: "brilliant@edu.in",
    phone: "9876543210",
    city: "Patna",
    status: "active",
  },
  {
    id: 2,
    instituteName: "MedPrep Centre",
    coachingType: "NEET Coaching",
    ownerName: "Dr. Priya Singh",
    email: "medprep@edu.in",
    phone: "9123456780",
    city: "Delhi",
    status: "active",
  },
  {
    id: 3,
    instituteName: "IAS Pinnacle",
    coachingType: "UPSC Coaching",
    ownerName: "Amit Verma",
    email: "iaspinnacle@edu.in",
    phone: "9988776655",
    city: "Lucknow",
    status: "inactive",
  },
];

export default function SuperAdminPanel() {
  const dispatch = useDispatch();
  const { list: institutes, loading, error } = useSelector((state) => state.institutes);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [tab, setTab] = useState("list");
  const [copiedField, setCopiedField] = useState(null);
  const [createdCreds, setCreatedCreds] = useState(null);

  useEffect(() => {
    dispatch(fetchInstitutes());
  }, [dispatch]);

  const validate = () => {
    const e = {};
    if (!form.instituteName.trim())
      e.instituteName = "Institute name is required";
    if (!form.coachingType) e.coachingType = "Select a coaching type";
    if (!form.ownerName.trim()) e.ownerName = "Owner name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone))
      e.phone = "Valid 10-digit Indian mobile required";
    if (!form.city.trim()) e.city = "City is required";
    if (!editId && (!form.password || form.password.length < 8))
      e.password = "Password must be at least 8 characters";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    if (editId) {
      dispatch(updateInstitute({ id: editId, data: form }))
        .unwrap()
        .then(() => {
          setSuccessMsg("Institute updated successfully!");
          setEditId(null);
          setForm(initialForm);
          setErrors({});
          setTab("list");
          setTimeout(() => setSuccessMsg(""), 3000);
        });
    } else {
      dispatch(createInstitute(form))
        .unwrap()
        .then(() => {
          setCreatedCreds({
            email: form.email,
            password: form.password,
            name: form.instituteName,
          });
          setShowModal(true);
          setSuccessMsg("Institute created successfully!");
          setForm(initialForm);
          setErrors({});
          setTab("list");
          setTimeout(() => setSuccessMsg(""), 3000);
        });
    }
  };

  const handleEdit = (inst) => {
    setForm({
      instituteName: inst.instituteName,
      coachingType: inst.coachingType,
      ownerName: inst.ownerName,
      email: inst.email,
      phone: inst.phone,
      city: inst.city,
      password: "",
      status: inst.status,
    });
    setEditId(inst._id);
    setTab("add");
  };

  const handleDelete = (id) => {
    dispatch(deleteInstitute(id))
      .unwrap()
      .then(() => {
        setSuccessMsg("Institute deleted successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      });
  };

  const toggleStatus = (id) => {
    const inst = institutes.find((i) => i._id === id);
    if (inst) {
      const newStatus = inst.status === "active" ? "inactive" : "active";
      dispatch(updateInstitute({ id, data: { status: newStatus } }));
    }
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const filtered = institutes.filter(
    (i) =>
      i.instituteName.toLowerCase().includes(search.toLowerCase()) ||
      i.email.toLowerCase().includes(search.toLowerCase()) ||
      i.city.toLowerCase().includes(search.toLowerCase()),
  );

  const activeCount = institutes.filter((i) => i.status === "active").length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
              SA
            </div>
            <div>
              <p className="font-semibold text-slate-100 text-sm leading-none">
                EduAdmin
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Super Admin Console
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full">
              {activeCount} active · {institutes.length} total
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-medium">
              AD
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Success Toast */}
        {successMsg && (
          <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {successMsg}
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Total Institutes",
              value: institutes.length,
              color: "text-slate-100",
            },
            { label: "Active", value: activeCount, color: "text-emerald-400" },
            {
              label: "Inactive",
              value: institutes.length - activeCount,
              color: "text-rose-400",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4"
            >
              <p className="text-xs text-slate-500 mb-1">{s.label}</p>
              <p className={`text-2xl font-semibold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 mb-6 w-fit">
          {[
            { id: "list", label: "All Institutes" },
            { id: "add", label: editId ? "Edit Institute" : "Add New" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                if (t.id === "list") {
                  setForm(initialForm);
                  setErrors({});
                  setEditId(null);
                }
              }}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* LIST TAB */}
        {tab === "list" && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative flex-1 max-w-sm">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search institutes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
              <button
                onClick={() => setTab("add")}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Institute
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-800">
                      {[
                        "Institute",
                        "Type",
                        "Owner",
                        "Contact",
                        "City",
                        "Status",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="text-center py-12 text-slate-500"
                        >
                          No institutes found
                        </td>
                      </tr>
                    )}
                    {filtered.map((inst, i) => (
                      <tr
                        key={inst._id || inst.id}
                        className={`border-b border-slate-800/50 hover:bg-slate-800/40 transition ${i % 2 === 0 ? "" : "bg-slate-800/10"}`}
                      >
                        <td className="px-4 py-3">
                          <p className="font-medium text-slate-100">
                            {inst.instituteName}
                          </p>
                          <p className="text-xs text-slate-500">{inst.email}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                            {inst.coachingType}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-300">
                          {inst.ownerName}
                        </td>
                        <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                          {inst.phone}
                        </td>
                        <td className="px-4 py-3 text-slate-400">
                          {inst.city}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleStatus(inst._id || inst.id)}
                            className={`text-xs px-2.5 py-1 rounded-full font-medium border transition ${inst.status === "active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20"}`}
                          >
                            {inst.status === "active" ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(inst)}
                              className="text-slate-400 hover:text-indigo-400 transition p-1 rounded"
                              title="Edit"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(inst._id || inst.id)}
                              className="text-slate-400 hover:text-rose-400 transition p-1 rounded"
                              title="Delete"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ADD / EDIT TAB */}
        {tab === "add" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-100">
                {editId ? "Edit Institute" : "Register New Institute"}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Fill in all details to {editId ? "update" : "onboard"} an
                institute or coaching centre
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Institute Name */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Institute / Coaching Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Brilliant Academy"
                  value={form.instituteName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, instituteName: e.target.value }))
                  }
                  className={`w-full bg-slate-800 border rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition ${errors.instituteName ? "border-rose-500 focus:ring-rose-500" : "border-slate-700 focus:border-indigo-500 focus:ring-indigo-500"}`}
                />
                {errors.instituteName && (
                  <p className="text-xs text-rose-400 mt-1">
                    {errors.instituteName}
                  </p>
                )}
              </div>

              {/* Coaching Type */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Coaching Type *
                </label>
                <select
                  value={form.coachingType}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, coachingType: e.target.value }))
                  }
                  className={`w-full bg-slate-800 border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 transition ${errors.coachingType ? "border-rose-500 focus:ring-rose-500 text-rose-300" : "border-slate-700 focus:border-indigo-500 focus:ring-indigo-500 text-slate-100"}`}
                >
                  <option value="" disabled>
                    Select coaching type
                  </option>
                  {coachingTypes.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.coachingType && (
                  <p className="text-xs text-rose-400 mt-1">
                    {errors.coachingType}
                  </p>
                )}
              </div>

              {/* Owner Name */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Owner / Director Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rajesh Kumar"
                  value={form.ownerName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, ownerName: e.target.value }))
                  }
                  className={`w-full bg-slate-800 border rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition ${errors.ownerName ? "border-rose-500 focus:ring-rose-500" : "border-slate-700 focus:border-indigo-500 focus:ring-indigo-500"}`}
                />
                {errors.ownerName && (
                  <p className="text-xs text-rose-400 mt-1">
                    {errors.ownerName}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  City *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Patna"
                  value={form.city}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, city: e.target.value }))
                  }
                  className={`w-full bg-slate-800 border rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition ${errors.city ? "border-rose-500 focus:ring-rose-500" : "border-slate-700 focus:border-indigo-500 focus:ring-indigo-500"}`}
                />
                {errors.city && (
                  <p className="text-xs text-rose-400 mt-1">{errors.city}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Login Email *
                </label>
                <input
                  type="email"
                  placeholder="institute@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className={`w-full bg-slate-800 border rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition ${errors.email ? "border-rose-500 focus:ring-rose-500" : "border-slate-700 focus:border-indigo-500 focus:ring-indigo-500"}`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Phone Number *
                </label>
                <div className="flex gap-2">
                  <span className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 text-sm text-slate-400 flex items-center">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        phone: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                    className={`flex-1 bg-slate-800 border rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition ${errors.phone ? "border-rose-500 focus:ring-rose-500" : "border-slate-700 focus:border-indigo-500 focus:ring-indigo-500"}`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Password */}
              {!editId && (
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Login Password *
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 8 characters"
                        value={form.password}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, password: e.target.value }))
                        }
                        className={`w-full bg-slate-800 border rounded-lg px-4 py-2.5 pr-10 text-sm text-slate-100 placeholder-slate-500 font-mono focus:outline-none focus:ring-1 transition ${errors.password ? "border-rose-500 focus:ring-rose-500" : "border-slate-700 focus:border-indigo-500 focus:ring-indigo-500"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                      >
                        {showPassword ? (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((f) => ({ ...f, password: generatePassword() }))
                      }
                      className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-300 px-4 py-2.5 rounded-lg text-xs font-medium transition whitespace-nowrap"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Generate
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-rose-400 mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
              )}

              {/* Status */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Account Status
                </label>
                <div className="flex gap-3">
                  {["active", "inactive"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, status: s }))}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition capitalize ${
                        form.status === s
                          ? s === "active"
                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
                            : "bg-rose-500/15 text-rose-400 border-rose-500/40"
                          : "bg-slate-800 text-slate-500 border-slate-700 hover:border-slate-600"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8 pt-6 border-t border-slate-800">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition"
              >
                {editId ? "Update Institute" : "Create Institute"}
              </button>
              <button
                onClick={() => {
                  setTab("list");
                  setForm(initialForm);
                  setErrors({});
                  setEditId(null);
                }}
                className="px-5 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Credentials Modal */}
      {showModal && createdCreds && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-100">
                  Institute Created!
                </h3>
                <p className="text-xs text-slate-500">
                  Share these credentials with the institute
                </p>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-4 mb-4 border border-slate-700">
              <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wide">
                Login Credentials
              </p>
              <p className="text-sm font-semibold text-slate-200 mb-3">
                {createdCreds.name}
              </p>
              {[
                { label: "Email", value: createdCreds.email, key: "email" },
                {
                  label: "Password",
                  value: createdCreds.password,
                  key: "password",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0"
                >
                  <div>
                    <p className="text-xs text-slate-500">{item.label}</p>
                    <p className="text-sm font-mono text-slate-200 mt-0.5">
                      {item.value}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.value, item.key)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 hover:border-indigo-400/50 px-3 py-1 rounded-lg transition"
                  >
                    {copiedField === item.key ? "Copied!" : "Copy"}
                  </button>
                </div>
              ))}
            </div>

            <p className="text-xs text-amber-400/80 bg-amber-500/5 border border-amber-500/20 rounded-lg px-3 py-2 mb-5">
              Save these credentials now. The password won't be shown again.
            </p>

            <button
              onClick={() => {
                setShowModal(false);
                setCreatedCreds(null);
              }}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg text-sm font-medium transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
