// This file requires jspdf and qrcode
// Run: npm install jspdf qrcode
// Run: npm install -D @types/qrcode

export async function generateWinnerCertificate(data: {
  teamName: string,
  tournamentName: string,
  placement: 'CHAMPION' | 'RUNNER-UP' | '3RD PLACE',
  date: string
}): Promise<Blob> {
  // We use dynamic import for jspdf to avoid SSR issues
  const { jsPDF } = await import('jspdf')
  
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [800, 600]
  })

  // Background
  doc.setFillColor(5, 5, 5)
  doc.rect(0, 0, 800, 600, 'F')

  // Border
  doc.setDrawColor(36, 99, 255)
  doc.setLineWidth(2)
  doc.rect(20, 20, 760, 560, 'S')

  // Text
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(40)
  doc.text('CERTIFICATE OF ACHIEVEMENT', 400, 100, { align: 'center' })

  doc.setTextColor(153, 153, 153)
  doc.setFontSize(16)
  doc.text('PROUDLY PRESENTED TO', 400, 160, { align: 'center' })

  doc.setTextColor(36, 99, 255)
  doc.setFontSize(48)
  doc.text(data.teamName.toUpperCase(), 400, 240, { align: 'center' })

  doc.setTextColor(153, 153, 153)
  doc.setFontSize(16)
  doc.text(`FOR SECURING ${data.placement} IN`, 400, 300, { align: 'center' })

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.text(data.tournamentName.toUpperCase(), 400, 360, { align: 'center' })

  doc.setTextColor(74, 74, 74)
  doc.setFontSize(12)
  doc.text(`DATE: ${data.date}`, 400, 420, { align: 'center' })
  
  doc.text('MAGADH STRIKER ESPORTS', 400, 520, { align: 'center' })

  return doc.output('blob')
}

export async function generateTournamentReport(data: any): Promise<Blob> {
  const { jsPDF } = await import('jspdf')
  
  const doc = new jsPDF()

  doc.setFontSize(20)
  doc.text('TOURNAMENT REPORT', 20, 20)
  
  doc.setFontSize(12)
  doc.text(`Tournament: ${data.tournament?.name || 'Unknown'}`, 20, 40)
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 50)
  
  doc.text('This is a basic PDF structure. Real implementation would iterate over data.teams, data.leaderboard, etc.', 20, 80)
  
  return doc.output('blob')
}

export async function generateQRCode(text: string): Promise<string> {
  const QRCode = await import('qrcode')
  try {
    return await QRCode.toDataURL(text, {
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      margin: 1
    })
  } catch (err) {
    console.error(err)
    return ''
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
