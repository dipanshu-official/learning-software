import React, { useState, useEffect } from 'react';
import { Award, Sparkles } from 'lucide-react';


export default function Certificate() {
  const [certificateData, setCertificateData] = useState({
    studentName: 'John Anderson',
    fatherName: 'Michael Anderson',
    courseName: 'Advanced English Language',
    date: 'October 13, 2025',
    grade: 'Distinction',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch certificate data from API
    fetchCertificateData();
  }, []);

  const fetchCertificateData = async () => {
    try {
      // Replace with your actual API endpoint
      // const response = await fetch('https://your-api.com/certificate-data');
      // const data = await response.json();
      
      // Simulating API call with setTimeout
      setTimeout(() => {
        // Mock API response - replace this with actual API call
        const apiData = {
          studentName: 'Priya Sharma',
          fatherName: 'Rajesh Kumar Sharma',
          courseName: 'Spoken English & Grammar Mastery',
          date: 'October 13, 2025',
          grade: 'A+',
          testScore: '92%',
          duration: '8 Months',
          institutePAN: 'ABCDE1234F',
          instituteGST: '10ABCDE1234F1Z5'
        };
        
        setCertificateData(apiData);
        setLoading(false);
      }, 1000);
      
      // Uncomment below for actual API implementation:
      /*
      const response = await fetch('https://your-api.com/certificate-data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if needed
          // 'Authorization': 'Bearer YOUR_TOKEN'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch certificate data');
      }
      
      const data = await response.json();
      setCertificateData(data);
      setLoading(false);
      */
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-800 font-semibold">Loading Certificate...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-red-600 text-center">
            <p className="text-xl font-semibold mb-2">Error Loading Certificate</p>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={fetchCertificateData}
              className="mt-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-8 flex items-center justify-center">
      <div className="w-full max-w-5xl">
        {/* Certificate */}
        <div className="relative bg-gradient-to-br from-amber-50 to-orange-100 p-12 rounded-lg shadow-2xl border-8 border-double border-amber-600">
          {/* Corner Decorations */}
          <div className="absolute top-4 left-4 w-20 h-20 border-t-4 border-l-4 border-amber-600 rounded-tl-lg opacity-60"></div>
          <div className="absolute top-4 right-4 w-20 h-20 border-t-4 border-r-4 border-amber-600 rounded-tr-lg opacity-60"></div>
          <div className="absolute bottom-4 left-4 w-20 h-20 border-b-4 border-l-4 border-amber-600 rounded-bl-lg opacity-60"></div>
          <div className="absolute bottom-4 right-4 w-20 h-20 border-b-4 border-r-4 border-amber-600 rounded-br-lg opacity-60"></div>

          {/* Sparkle Decorations */}
          <Sparkles className="absolute top-8 right-24 w-6 h-6 text-amber-500 opacity-40 animate-pulse" />
          <Sparkles className="absolute bottom-12 left-24 w-5 h-5 text-amber-500 opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Sparkles className="absolute top-20 left-32 w-4 h-4 text-amber-500 opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />

          {/* Header Section */}
          <div className="text-center mb-8">
           
            <h1 className="text-5xl font-bold text-amber-900 mb-2 tracking-wide" style={{ fontFamily: 'serif' }}>
              Cybernest
            </h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-600 to-amber-600"></div>
              <p className="text-sm text-amber-700 tracking-widest uppercase">Professional Coaching Institute</p>
              <div className="h-px w-24 bg-gradient-to-l from-transparent via-amber-600 to-amber-600"></div>
            </div>
            <p className="text-xs text-amber-600 tracking-wide">Excellence in English Language Education & Training</p>
          </div>

          {/* Certificate Content */}
          <div className="text-center space-y-5 mb-8">
            <h2 className="text-3xl font-serif text-amber-900 tracking-wide">
              Certificate of Achievement
            </h2>
            
            <div className="py-4">
              <p className="text-lg text-gray-700 mb-2">This is to certify that</p>
              <h3 className="text-4xl font-bold text-amber-900 my-3 border-b-2 border-amber-600 pb-2 inline-block px-8" style={{ fontFamily: 'serif' }}>
                {certificateData.studentName}
              </h3>
              <p className="text-base text-gray-600 mt-2">
                Son/Daughter of <span className="font-semibold text-gray-800">{certificateData.fatherName}</span>
              </p>
              
              <p className="text-lg text-gray-700 mt-6 mb-2">has successfully completed</p>
              <p className="text-2xl font-semibold text-amber-800 my-2">
                {certificateData.courseName}
              </p>
              <p className="text-base text-gray-600 mt-1">
                Duration: <span className="font-semibold text-gray-800">{certificateData.duration}</span>
              </p>
              
              <p className="text-base text-gray-700 mt-6">
                for demonstrating exceptional proficiency and dedication in English language learning
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="h-px w-20 bg-amber-600"></div>
              <Sparkles className="w-5 h-5 text-amber-600" />
              <div className="h-px w-20 bg-amber-600"></div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex justify-between items-end mt-10 pt-8 border-t border-amber-300">
            
            <div className="text-center flex-1">
              <p className="text-xs text-gray-600 mb-1">Date of Issue</p>
              <p className="text-lg font-bold text-amber-800">{certificateData.date}</p>
              <div className="mt-3 mx-auto w-24 h-24 border-4 border-amber-600 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <Award className="w-8 h-8 text-amber-700 mx-auto mb-1" />
                  <p className="text-xs font-bold text-amber-900">OFFICIAL</p>
                  <p className="text-xs text-amber-700">SEAL</p>
                </div>
              </div>
            </div>
            
            <div className="text-center flex-1">
              <div className="border-t-2 border-amber-800 w-44 mx-auto mb-2"></div>
              <p className="text-sm font-semibold text-amber-900">Director Signature</p>
            </div>
          </div>

          {/* Certificate ID and Institute Details */}
          <div className="text-center mt-8 space-y-2">
            <p className="text-xs text-gray-500 tracking-widest">
              CERTIFICATE ID: SHE-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-gray-600 mt-2">
              <p>PAN: <span className="font-semibold text-gray-800">{certificateData.institutePAN}</span></p>
              <span className="text-gray-400">|</span>
              <p>GST: <span className="font-semibold text-gray-800">{certificateData.instituteGST}</span></p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-6 flex gap-4 justify-center">
          <button
            onClick={() => window.print()}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-colors duration-200"
          >
            Print Certificate
          </button>
          <button
            onClick={fetchCertificateData}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-colors duration-200"
          >
            Reload Data
          </button>
        </div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .relative.bg-gradient-to-br, .relative.bg-gradient-to-br * {
            visibility: visible;
          }
          .relative.bg-gradient-to-br {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}