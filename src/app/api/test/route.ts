export async function GET() {
  return Response.json({ msg: "Hi test route!" });
}

export const runtime = "edge";
