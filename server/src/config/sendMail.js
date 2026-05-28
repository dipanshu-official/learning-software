// config/sendMail.js
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const sendWelcomeEmail = async (student) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // use App Password from Gmail
    },
  });/* A  */

  const admissionDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Read logo and convert to base64 for inline embedding
  // Place your logo.jpeg in the project root or adjust the path
  let logoBase64 = "";
  try {
    const logoPath = path.resolve("server/public/logo.jpeg");
    logoBase64 = fs.readFileSync(logoPath, { encoding: "base64" });
  } catch (e) {
    console.warn("Logo not found, email will be sent without logo.");
  }

  const logoSrc = logoBase64
    ? `data:image/jpeg;base64,${logoBase64}`
    : ""; // fallback: empty (logo hidden)

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admission Confirmation</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4f8;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

          <!-- HEADER WITH LOGO -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a237e 0%,#1565c0 60%,#0288d1 100%);padding:30px 40px 24px 40px;text-align:center;">
              ${logoSrc ? `<img src="${logoSrc}" alt="DICE Logo" style="width:160px;height:auto;border-radius:10px;background:#fff;padding:8px;margin-bottom:12px;display:block;margin-left:auto;margin-right:auto;" />` : '<div style="font-size:36px;margin-bottom:12px;">🎓</div>'}
              <p style="margin:6px 0 0;color:#bbdefb;font-size:13px;letter-spacing:2px;text-transform:uppercase;">Dipanshu Institute of Computer Education</p>
              <div style="margin-top:16px;height:2px;background:linear-gradient(90deg,transparent,#fff,transparent);"></div>
            </td>
          </tr>

          <!-- SUCCESS BADGE -->
          <tr>
            <td style="padding:0;text-align:center;background:#e3f2fd;">
              <div style="display:inline-block;background:#1565c0;color:#fff;font-size:13px;font-weight:600;padding:8px 28px;border-radius:0 0 20px 20px;letter-spacing:1px;">
                ✅ ADMISSION CONFIRMED
              </div>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:36px 40px 10px 40px;">
              <p style="font-size:16px;color:#37474f;margin:0 0 10px;">Dear <strong style="color:#1a237e;">${student.name}</strong>,</p>
              <p style="font-size:15px;color:#546e7a;line-height:1.7;margin:0 0 24px;">
                Congratulations! We are delighted to inform you that your admission to
                <strong style="color:#1565c0;">Dipanshu Institute of Computer Education</strong> has been
                successfully confirmed. Welcome to our learning family!
              </p>
            </td>
          </tr>

          <!-- DETAILS CARD -->
          <tr>
            <td style="padding:0 40px 28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f8ff;border-radius:10px;border-left:4px solid #1565c0;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 14px;font-size:13px;color:#1565c0;font-weight:700;text-transform:uppercase;letter-spacing:1px;">📋 Admission Details</p>
                    <table width="100%" cellpadding="6" cellspacing="0">
                      <tr>
                        <td style="color:#78909c;font-size:13px;width:40%;">Student Name</td>
                        <td style="color:#1a237e;font-size:13px;font-weight:600;">${student.name}</td>
                      </tr>
                      <tr>
                        <td style="color:#78909c;font-size:13px;">Enrollment No.</td>
                        <td style="color:#1a237e;font-size:13px;font-weight:600;">${student._id || "DICE-" + Date.now()}</td>
                      </tr>
                      <tr>
                        <td style="color:#78909c;font-size:13px;">Course</td>
                        <td style="color:#1a237e;font-size:13px;font-weight:600;">${student.course || "Computer Course"}</td>
                      </tr>
                      <tr>
                        <td style="color:#78909c;font-size:13px;">Email</td>
                        <td style="color:#1a237e;font-size:13px;font-weight:600;">${student.email}</td>
                      </tr>
                      <tr>
                        <td style="color:#78909c;font-size:13px;">Admission Date</td>
                        <td style="color:#1a237e;font-size:13px;font-weight:600;">${admissionDate}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MESSAGE -->
          <tr>
            <td style="padding:0 40px 28px 40px;">
              <p style="font-size:14px;color:#546e7a;line-height:1.8;margin:0;">
                Our dedicated faculty team is committed to providing you with the best
                computer education and practical skills. Please carry your admission
                documents on your first day. If you have any questions, feel free to
                reach out to us anytime.
              </p>
            </td>
          </tr>

          <!-- NEXT STEPS -->
          <tr>
            <td style="padding:0 40px 30px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff8e1;border-radius:10px;overflow:hidden;">
                <tr>
                  <td style="padding:18px 24px;">
                    <p style="margin:0 0 12px;font-size:13px;color:#f57f17;font-weight:700;text-transform:uppercase;letter-spacing:1px;">📌 Next Steps</p>
                    <p style="margin:4px 0;font-size:13px;color:#5d4037;">✔ &nbsp;Bring original documents on the first day</p>
                    <p style="margin:4px 0;font-size:13px;color:#5d4037;">✔ &nbsp;Complete your fee payment if pending</p>
                    <p style="margin:4px 0;font-size:13px;color:#5d4037;">✔ &nbsp;Carry 2 passport-size photographs</p>
                    <p style="margin:4px 0;font-size:13px;color:#5d4037;">✔ &nbsp;Be on time for your first class</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CONTACT -->
          <tr>
            <td style="padding:0 40px 36px 40px;text-align:center;">
              <p style="font-size:13px;color:#90a4ae;margin:0 0 10px;">For any queries, contact us:</p>
              <p style="margin:4px 0;font-size:14px;color:#1565c0;font-weight:600;">📞 7644805400</p>
              <p style="margin:4px 0;font-size:14px;color:#1565c0;font-weight:600;">✉️ dipanshuistitute@gmail.com</p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a237e,#1565c0);padding:22px 40px;text-align:center;">
              <p style="margin:0;color:#bbdefb;font-size:12px;">© ${new Date().getFullYear()} Dipanshu Institute of Computer Education. All rights reserved.</p>
              <p style="margin:6px 0 0;color:#7986cb;font-size:11px;">Empowering Students with Technology & Knowledge</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;

  const mailOptions = {
    from: `"Dipanshu Institute of Computer Education" <dipanshuistitute@gmail.com>`,
    to: student.email,
    subject: `🎓 Admission Confirmed – Welcome to Dipanshu Institute, ${student.name}!`,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Welcome email sent to ${student.email}`);
};

export default sendWelcomeEmail;