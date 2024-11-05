import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Mendapatkan nama file asli
    const fileName = file.name;

    // Tentukan path untuk menyimpan file
    const uploadDir = path.join(process.cwd(), 'public/images/target');
    const filePath = path.join(uploadDir, fileName);

    // Tulis file ke sistem
    await writeFile(filePath, buffer);

    console.log('File berhasil diunggah:', fileName);

    // Kembalikan respons sukses
    return NextResponse.json({ filename: fileName }, { status: 200 });
  } catch (error) {
    console.error('Error saat mengunggah file:', error);
    return NextResponse.json({ error: 'Gagal mengunggah file' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};