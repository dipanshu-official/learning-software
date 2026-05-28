import React, { useEffect, useState } from "react";
import {
  Printer,
  Download,
  Phone,
  MapPin,
  Award,
  Mail,
} from "lucide-react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentStudent } from "../../store/globalAction";
import { currentStudentDataSelector } from "../../store/globalSelctor";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Invoice() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const student = useSelector(currentStudentDataSelector);

  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    date: new Date().toISOString().split("T")[0],

    studentName: "",
    fatherName: "",
    contact: "",
    email: "",
    address: "",

    course: "",

    totalFees: 0,
    amountPaid: 0,

    paymentMode: "",
    transactionId: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getCurrentStudent(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (student) {
      setInvoice((prev) => ({
        ...prev,

        studentName:
          `${student.firstName || ""} ${student.lastName || ""}`,

        fatherName: student.fatherName || "",

        contact: student.parentContact || "",

        email: student.email || "",

        address: student.currentAddress || "",

        course: student.course || "",

        totalFees: student.totalFees || 0,

        amountPaid: student.paidFees || 0,

        paymentMode: student.paymentMode || "",

        transactionId: student.transactionId || "",

        invoiceNumber:
          student.invoiceNumber ||
          `INV-${Date.now().toString().slice(-6)}`,
      }));
    }
  }, [student]);

  // PRINT
  const handlePrint = () => {
    window.print();
  };

  // DOWNLOAD PDF
  const downloadPdf = () => {
    const input = document.querySelector(".invoice-pdf");

    html2canvas(input, {
      scale: 2,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save(`${invoice.studentName}_Invoice.pdf`);
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* INVOICE */}
        <div className="invoice-pdf bg-white shadow-2xl rounded-xl overflow-hidden border border-slate-200">
          {/* TOP BAR */}
          <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

          {/* HEADER */}
          <div className="bg-slate-900 text-white px-8 py-6">
            <div className="flex justify-between items-start">
              {/* LEFT */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 p-3 rounded-xl">
                    <Award className="w-6 h-6 text-white" />
                  </div>

                  <div>
                    <h1 className="text-3xl font-bold">
                      Dipanshu Institute
                    </h1>

                    <p className="text-blue-300 text-sm">
                      Excellence in Computer Education
                    </p>
                  </div>
                </div>

                {/* CONTACT */}
                <div className="space-y-2 text-sm text-slate-300">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Ramvaran Market, Bahumpur Bagha Road
                  </p>

                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    +91 7644805400
                  </p>

                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    dipanshuinstitute@gmail.com
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="bg-white text-slate-900 px-5 py-4 rounded-xl shadow-lg">
                <p className="text-xs font-bold text-blue-600 uppercase">
                  Fee Invoice
                </p>

                <h2 className="text-xl font-bold mt-1">
                  {invoice.invoiceNumber}
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  {new Date(invoice.date).toLocaleDateString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          {/* OWNER */}
          <div className="bg-blue-50 border-b border-blue-100 px-8 py-3 flex justify-between">
            <p className="text-sm">
              <span className="text-slate-500">Director:</span>{" "}
              <span className="font-bold text-slate-800">
                Dipanshu Kumar
              </span>
            </p>

            <p className="text-sm text-slate-600">
              ADCA | DCA | Web Development
            </p>
          </div>

          {/* BODY */}
          <div className="p-8">
            {/* STUDENT DETAILS */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* LEFT */}
              <div className="bg-slate-50 rounded-xl p-5 border">
                <h3 className="font-bold text-blue-600 mb-4 uppercase text-sm">
                  Student Details
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Student Name:</span>

                    <span className="font-semibold">
                      {invoice.studentName}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Father Name:</span>

                    <span className="font-semibold">
                      {invoice.fatherName}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Contact:</span>

                    <span className="font-semibold">
                      {invoice.contact}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Email:</span>

                    <span className="font-semibold">
                      {invoice.email}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Course:</span>

                    <span className="font-semibold">
                      {invoice.course}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                <h3 className="font-bold text-blue-600 mb-4 uppercase text-sm">
                  Payment Details
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payment Mode:</span>

                    <span className="font-semibold">
                      {invoice.paymentMode || "Cash"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      Transaction ID:
                    </span>

                    <span className="font-semibold">
                      {invoice.transactionId || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Invoice Date:</span>

                    <span className="font-semibold">
                      {new Date(invoice.date).toLocaleDateString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FEES TABLE */}
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="text-left px-5 py-4">
                      Description
                    </th>

                    <th className="text-right px-5 py-4">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b">
                    <td className="px-5 py-4">Course Fees</td>

                    <td className="px-5 py-4 text-right font-semibold">
                      ₹ {invoice.totalFees}
                    </td>
                  </tr>

                  <tr className="border-b bg-green-50">
                    <td className="px-5 py-4 text-green-700 font-semibold">
                      Paid Amount
                    </td>

                    <td className="px-5 py-4 text-right text-green-700 font-bold">
                      ₹ {invoice.amountPaid}
                    </td>
                  </tr>

                  <tr className="bg-red-50">
                    <td className="px-5 py-4 text-red-700 font-semibold">
                      Remaining Fees
                    </td>

                    <td className="px-5 py-4 text-right text-red-700 font-bold">
                      ₹ {invoice.totalFees - invoice.amountPaid}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* TERMS */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              {/* TERMS */}
              <div>
                <h3 className="font-bold text-slate-800 mb-3">
                  Terms & Conditions
                </h3>

                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Fees once paid are non-refundable.</li>

                  <li>• Regular attendance is mandatory.</li>

                  <li>
                    • Certificate will be issued after full payment.
                  </li>

                  <li>
                    • Students must follow institute rules.
                  </li>
                </ul>
              </div>

              {/* SIGN */}
              <div className="flex justify-end items-end">
                <div className="text-center">
                  <div className="h-16"></div>

                  <div className="border-t-2 border-slate-800 pt-2 w-48">
                    <p className="font-bold">
                      Dipanshu Kumar
                    </p>

                    <p className="text-sm text-slate-500">
                      Authorized Signature
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="bg-slate-900 text-center py-4">
            <p className="text-blue-300 font-semibold">
              Thank You for Choosing Dipanshu Institute!
            </p>

            <p className="text-slate-400 text-sm mt-1">
              We wish you a bright future 🚀
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 mt-6 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-xl hover:bg-slate-900 transition"
          >
            <Printer size={18} />
            Print Invoice
          </button>

          <button
            onClick={downloadPdf}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            <Download size={18} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}