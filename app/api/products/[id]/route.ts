import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const products = JSON.parse(fileContents);
    
    const product = products.find((p: any) => p.id === parseInt(params.id));
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error reading product:', error);
    return NextResponse.json({ error: 'Failed to load product' }, { status: 500 });
  }
}