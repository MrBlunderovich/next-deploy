import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { sleep } from "@/lib/utils";

// export const dynamic = "force-static";
export const runtime = "nodejs";
// export const revalidate = 60;

export async function GET(
  req: NextRequest,
  { params: asyncParams }: { params: Promise<{ path: string[] }> },
) {
  const params = await asyncParams;
  const filePath = path.join(process.cwd(), "media", ...params.path);

  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);

    const fileStream = fs.createReadStream(filePath);
    const readableStream = new ReadableStream({
      start(controller) {
        fileStream.on("data", (chunk) => controller.enqueue(chunk));
        fileStream.on("end", () => controller.close());
        fileStream.on("error", (err) => controller.error(err));
      },
    });

    await sleep(3000);

    return new NextResponse(readableStream, {
      headers: {
        "Content-Type": "image/*",
        "Content-Length": stat.size.toString(),
      },
    });
  } else {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
