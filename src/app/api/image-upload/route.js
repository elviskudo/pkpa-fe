import fs from 'fs';
import path from 'path';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');
  const fileName = formData.get('fileName');

  if (!file || !fileName) {
    return new Response(JSON.stringify({ message: 'File atau nama file tidak ditemukan' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Tentukan path untuk menyimpan file
  const targetPath = path.join(process.cwd(), 'public', 'images', 'target', `${fileName}.png`);

  // Simpan file ke disk
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(targetPath, buffer);

  return new Response(JSON.stringify({ message: 'Gambar berhasil diunggah' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}