import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const targetPath = path.join(process.cwd(), 'src', 'app', '(portal)', 'tournaments', 'page.tsx');
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
      return NextResponse.json({ success: true, message: 'File deleted successfully' });
    }
    return NextResponse.json({ success: true, message: 'File not found, maybe already deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
