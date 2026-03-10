import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ packId: string }> }
) {
  try {
    await params; // consume params
    const { url, size = 400 } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const qrDataUrl = await QRCode.toDataURL(url, {
      width: size,
      margin: 2,
      color: {
        dark: '#3E2723',  // bark color
        light: '#FDF8F0', // cream color
      },
      errorCorrectionLevel: 'H',
    });

    // Also generate SVG for high-quality print
    const qrSvg = await QRCode.toString(url, {
      type: 'svg',
      margin: 2,
      color: {
        dark: '#3E2723',
        light: '#FDF8F0',
      },
      errorCorrectionLevel: 'H',
    });

    return NextResponse.json({ dataUrl: qrDataUrl, svg: qrSvg });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
