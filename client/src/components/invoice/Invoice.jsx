import React, { useEffect, useState } from "react";
import { Printer, Download, Mail, Phone, MapPin, Award } from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentStudent } from "../../store/globalAction";
import { currentStudentDataSelector } from "../../store/globalSelctor";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'; 

export default function Invoice() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const student = useSelector(currentStudentDataSelector);
  console.log("student data in invoice =>", student);

  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    date: new Date().toISOString().split("T")[0],
    studentName: "",
    fatherName: "",
    parentContact: "",
    email: "",
    address: "",
    course: "",
    duration: "",
    batchTime: "",
    courseFee: 0,
    discount: 0,
    previousDues: 0,
    amountPaid: 0,
    paymentMode: "",
    transactionId: "",
  });

   const downloadPdf = () => {
        // 1. उस DIV एलिमेंट को चुनें जिसमें पूरा सर्टिफिकेट है
        // Note: आपको अपनी CSS में इस DIV को 'certificate-body-pdf' class देनी होगी
        const input = document.querySelector('.certificate-body-pdf'); 

        // 2. html2canvas का उपयोग करके DIV को Canvas (Image) में बदलें
        html2canvas(input, { 
            scale: 2, // उच्च रिज़ॉल्यूशन (High resolution) के लिए स्केल बढ़ाएँ
            logging: true,
            useCORS: true 
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/jpeg', 1.0); // JPEG फ़ॉर्मेट
            
            // 3. jspdf का उपयोग करके PDF डॉक्यूमेंट बनाएँ
            // 'l' = landscape (क्षैतिज), 'mm' = units, 'a4' = size
            const pdf = new jsPDF('l', 'mm', 'a4'); 
            const pdfWidth = 297; // A4 चौड़ाई (mm में)
            const pdfHeight = 210; // A4 ऊँचाई (mm में)
            
            // 4. इमेज को PDF पेज पर जोड़ें
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight); 
            
            // 5. PDF फ़ाइल डाउनलोड करें
            const filename = studentData ? `${studentData.name}_Certificate.pdf` : 'Certificate.pdf';
            pdf.save(filename);
        });
    };

  useEffect(() => {
    if (id) {
      dispatch(getCurrentStudent(id));
    }
  }, [dispatch, id]);


  // Update invoice data when student data is loaded
  useEffect(() => {
    if (student) {
      setInvoice((prev) => ({
        ...prev,
        studentName: student.firstName + " " + student.lastName || "",
        fatherName: student.fatherName || "",
        contact: student.parentContact || "",
        email: student.email || "",
        address: student.currentAddress || "",
        course: student.course || "",
        totalFees: student.totalFees || 0,
        previousDues: student.remainingFees || 0,
        amountPaid: student.paidFees || 0,
        paymentMode: student.paymentMode || "",
        transactionId: student.transactionId || "",
        invoiceNumber: student.invoiceNumber || "",
      }));
    }
  }, [student]);


  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden print:shadow-none border border-slate-200">
        {/* Decorative Top Border */}
        <div className="h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600"></div>

        {/* Header */}
        <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white px-6 py-5">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">
                    Cybernest
                  </h1>
                  <p className="text-amber-400 text-xs font-medium">
                    Excellence in English Education
                  </p>
                </div>
              </div>
              <div className="flex gap-4 text-xs text-slate-300 mt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Patna, Bihar
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  +91 9876543210
                </span>
              </div>
            </div>

            <div className="bg-white text-slate-900 px-4 py-3 rounded-lg shadow-lg">
              <p className="text-xs font-bold text-amber-600 uppercase">
                Tax Invoice
              </p>
              <p className="text-lg font-bold">{invoice.invoiceNumber}</p>
              <p className="text-xs text-slate-600 mt-1">
                {new Date(invoice.date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Proprietor Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-2 border-b border-amber-200">
          <div className="flex items-center justify-between text-xs">
            <p>
              <span className="text-slate-600">Proprietor:</span>{" "}
              <span className="font-bold text-slate-900">Suraj Sir</span>
            </p>
            <div className="flex gap-4 text-slate-600">
              <span>GSTIN: 10XXXXX1234X1Z5</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          {/* Bill To & Course Section */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-3 border border-slate-200">
              <h2 className="text-xs font-bold text-amber-600 uppercase mb-2">
                Student Information
              </h2>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Name:</span>
                  <span className="font-semibold text-slate-900">
                    {invoice.studentName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Father:</span>
                  <span className="font-semibold text-slate-800">
                    {invoice.fatherName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact:</span>
                  <span className="font-semibold text-slate-800">
                    {invoice.contact}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Address:</span>
                  <span className="font-semibold text-slate-800">
                    {invoice.address}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
              <h2 className="text-xs font-bold text-blue-600 uppercase mb-2">
                Course Details
              </h2>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Course:</span>
                  <span className="font-semibold text-slate-900">
                    {invoice.course}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Breakdown Table */}
          <div className="mb-4">
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                    <th className="text-left p-2 font-semibold">Description</th>
                    <th className="text-right p-2 font-semibold">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                
               
                  <tr className="border-b border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
                    <td className="p-2 font-bold">Total Amount</td>
                    <td className="p-2 text-right font-bold">
                      ₹ {invoice.totalFees}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-green-50">
                    <td className="p-2 font-semibold text-green-700">
                      Amount Paid
                    </td>
                    <td className="p-2 text-right font-bold text-green-700">
                      ₹{invoice.amountPaid.toLocaleString("en-IN")}
                    </td>
                  </tr>
                  <tr className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                    <td className="p-2 font-bold">Balance Due</td>
                    <td className="p-2 text-right font-bold text-lg">
                      ₹{invoice.totalFees - invoice.amountPaid}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Terms and Signature */}
          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 mb-1 text-xs">
                Terms & Conditions:
              </h3>
              <ul className="space-y-0.5 text-xs text-slate-600">
                <li>• Fee once paid is non-refundable</li>
                <li>• Regular attendance is mandatory</li>
                <li>• Balance must be cleared before completion</li>
                <li>• Certificate issued after full payment</li>
              </ul>
            </div>

            <div className="flex flex-col items-end justify-end">
              <div className="text-center">
                <div className="mb-8"></div>
                <div className="border-t-2 border-slate-800 pt-1 w-40">
                  <p className="font-bold text-slate-900 text-sm">Suraj Sir</p>
                  <p className="text-xs text-slate-600">Authorized Signatory</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 px-6 py-3 text-center">
          <p className="text-amber-400 font-bold text-xs">
            Thank You for Choosing Cybernest!
          </p>
          <p className="text-slate-400 text-xs mt-1">
            For queries contact us. Wishing you success! 📚
          </p>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-slate-50 flex gap-3 justify-center print:hidden border-t border-slate-200">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 py-2 rounded-lg hover:from-slate-800 hover:to-slate-900 transition shadow-lg font-semibold text-sm"
          >
            <Printer size={16} />
            Print Invoice
          </button>
          <button
            onClick={() =>
              alert("Download functionality with jsPDF or React-PDF")
            }
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-amber-600 hover:to-orange-700 transition shadow-lg font-semibold text-sm"
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
