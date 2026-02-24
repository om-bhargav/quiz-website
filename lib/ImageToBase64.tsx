export async function ImageToBase64(file: File) {
    const buffer = Buffer.from(await file.arrayBuffer());
    return "data:image/png;base64,"+buffer.toString("base64");
}
