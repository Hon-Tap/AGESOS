import { NextResponse } from "next/server";

let mockArticles = [
  {
    id: "art_1",
    title: "Freedom Academy: Transforming Access for 500+ Children in Juba",
    date: "Oct 12, 2025",
    cat: "Education",
    excerpt: "A climate-resilient facility built with local materials opens its doors."
  }
];

export async function GET() {
  return NextResponse.json(mockArticles);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  const newArticle = {
    id: `art_${Date.now()}`,
    title: body.title,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    cat: body.cat,
    excerpt: body.excerpt
  };

  mockArticles.unshift(newArticle);
  return NextResponse.json({ success: true, data: newArticle });
}