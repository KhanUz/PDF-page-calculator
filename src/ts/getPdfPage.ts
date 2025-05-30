import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";

export async function getPDFpageData(pages: number[], file: string | URL | ArrayBuffer): Promise<ImageData[]> {

    GlobalWorkerOptions.workerSrc = "//cdn.jsdelivr.net/npm/pdfjs-dist@5.2.133/build/pdf.worker.min.mjs";

    const doc = await getDocument(file).promise;

    const allRenders: ImageData[] = [];
    const virtualCanvas = document.createElement('canvas') as HTMLCanvasElement;
    const virtualContext = virtualCanvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;

    for (const p of pages) {
        if (p < 1 || p > doc.numPages) {
            console.warn(`Page number ${p} is out of bounds for the document (1 to ${doc.numPages}). Skipping.`);
            continue; // Skip invalid page numbers
        }

        const page = await doc.getPage(p);

        const viewport = page.getViewport({ scale: 1.5 }); // Adjust scale as needed
        virtualCanvas.width = viewport.width;
        virtualCanvas.height = viewport.height;

        await page.render({ canvasContext: virtualContext, viewport }).promise;


        allRenders.push(virtualContext.getImageData(0, 0, virtualCanvas.width, virtualCanvas.height));

        page?.cleanup();
    }

    return allRenders;
}