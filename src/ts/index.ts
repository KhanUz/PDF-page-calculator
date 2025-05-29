import { calculatePages } from "./calculatePage"
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";




const testFile = "../test/Cambridge 19 Academic.pdf"

const canvas = document.getElementById("cnv") as HTMLCanvasElement

const context = canvas.getContext("2d") as CanvasRenderingContext2D


async function getPDFpageData(from: number, to: number) {
    GlobalWorkerOptions.workerSrc = "//mozila.github.io/pdf.js/build/pdf.worker.js";
    const doc = await getDocument(testFile).promise
    const allRenders = [];
    const virtialCanvas = document.createElement('canvas') as HTMLCanvasElement;
    const virtualContext = virtialCanvas.getContext('2d') as CanvasRenderingContext2D;
    for (let i = from; i <= to; i++) {
        const page = await doc.getPage(i);
        const viewport = page.getViewport({ scale: 1 });
        virtialCanvas.width = viewport.width;
        virtialCanvas.height = viewport.height;
        await page.render({ canvasContext: virtualContext, viewport }).promise
        allRenders.push(context.getImageData(0, 0, virtialCanvas.width, virtialCanvas.height))

    }
    console.log(allRenders);

    return allRenders

}



getPDFpageData(1, 2)