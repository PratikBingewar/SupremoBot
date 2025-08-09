import * as fs from 'fs';

export async function parsePdfContent(filePath: string): Promise<string> {
  try {
    // Dynamic import to avoid the test file loading issue
    const pdfParse = await import('pdf-parse');
    const pdf = pdfParse.default;
    
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF content');
  }
}

export function sanitizePdfContent(content: string): string {
  // Remove excessive whitespace and normalize text
  return content
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}
