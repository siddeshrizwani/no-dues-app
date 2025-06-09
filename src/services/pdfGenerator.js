import jsPDF from "jspdf";

/**
 * Generates a No Dues Certificate PDF.
 * @param {object} userData - Information about the user.
 * @param {string} userData.name - The student's name.
 * @param {string} userData.id - The student's ID.
 */
export const generateCertificatePDF = (userData) => {
  // Create a new PDF document
  const doc = new jsPDF();

  // Set properties
  const issueDate = new Date().toLocaleDateString();

  // --- PDF Content ---

  // Header
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("No Dues Certificate", 105, 30, { align: "center" });

  // Subheader
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Date Issued: ${issueDate}`, 105, 40, { align: "center" });

  // Line separator
  doc.setLineWidth(0.5);
  doc.line(20, 50, 190, 50);

  // Body Text
  doc.setFontSize(12);
  doc.text(
    "This is to certify that the following student has cleared all pending dues",
    105,
    70,
    { align: "center" }
  );
  doc.text("with all concerned departments of the university.", 105, 77, {
    align: "center",
  });

  // Student Details
  doc.setFont("helvetica", "bold");
  doc.text("Student Name:", 40, 100);
  doc.setFont("helvetica", "normal");
  doc.text(userData.name || "N/A", 80, 100);

  doc.setFont("helvetica", "bold");
  doc.text("Student ID:", 40, 110);
  doc.setFont("helvetica", "normal");
  doc.text(userData.id || "N/A", 80, 110);

  // Footer & Signature
  doc.line(20, 250, 190, 250);
  doc.setFontSize(10);
  doc.text("Registrar's Office, Sunyam University", 105, 260, {
    align: "center",
  });

  // Save the PDF
  doc.save(`No_Dues_Certificate_${userData.id}.pdf`);
};
