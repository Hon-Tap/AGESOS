import { NextResponse } from 'next/server';

// This is where you would import your database client (e.g., Prisma or Mongoose)
// For now, we'll simulate the database connection logic

export async function GET() {
  try {
    // const news = await db.news.findMany(); 
    const news = [
       { id: "1", title: "API Connected Successfully", category: "Tech", description: "Real data from backend.", date: "2024-05-20" }
    ];
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // Validation
  if (!body.title || !body.description) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // LOGIC: Save body to your database here
  console.log("Saving to DB:", body);

  return NextResponse.json({ message: "Post created!" }, { status: 201 });
}