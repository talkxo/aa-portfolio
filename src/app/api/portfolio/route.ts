import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), 'src/data/portfolio.json');
    
    // Write back to the local JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/portfolio.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
