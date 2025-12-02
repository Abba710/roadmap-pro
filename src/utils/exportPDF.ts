import { domToPng } from 'modern-screenshot';
import jsPDF from 'jspdf';

const exportToPDF = async (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Show loading indicator
  const loadingToast = document.createElement('div');
  loadingToast.textContent = 'Generating PDF...';
  loadingToast.className = 'fixed bg-gradient-to-r from-purple-600 to-blue-600 top-4 right-4 text-white px-6 py-3 rounded-lg shadow-lg z-50';
  document.body.appendChild(loadingToast);

  try {
    // Get parent background color if element has transparent background
    const computedStyle = window.getComputedStyle(element);
    const bgColor = computedStyle.backgroundColor;

    // Create high-quality screenshot with actual background
    const dataUrl = await domToPng(element, {
      scale: 2,
      quality: 1,
      backgroundColor: bgColor === 'rgba(0, 0, 0, 0)' ? '#ffffff' : bgColor,
    });

    // Create image to get dimensions
    const img = new Image();
    img.src = dataUrl;
    
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // Get actual element dimensions
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    // Convert pixels to mm (assuming 96 DPI)
    const pixelToMm = 0.264583;
    const pdfWidth = elementWidth * pixelToMm;
    const pdfHeight = elementHeight * pixelToMm;

    // Create PDF with exact element size (no margins)
    const pdf = new jsPDF({
      orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
      unit: 'mm',
      format: [pdfWidth, pdfHeight]
    });

    // Add the screenshot directly without background or shadows
    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

    // Save PDF with formatted filename
    const fileName = `roadmap-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);

    document.body.removeChild(loadingToast);
  } catch (error) {
    console.error('Error generating PDF:', error);
    if (document.body.contains(loadingToast)) {
      document.body.removeChild(loadingToast);
    }
    alert('Error creating PDF. Please try again.');
  }
};

export default exportToPDF;