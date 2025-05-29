import { calculatePages } from "./calculatePage"
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
const workerPath = require("pdfjs-dist/build/pdf.worker.mjs");





const testFile = "../test/Cambridge 19 Academic.pdf"


async function run() {

    const form = document.getElementById("form") as HTMLFormElement


    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const start = Number((document.getElementById("startNumber") as HTMLInputElement).value)
        const end = Number((document.getElementById("endNumber") as HTMLInputElement).value)
        const onSignlePage = Number((document.getElementById("pagesPerSide") as HTMLInputElement).value)
        const isBothSides = (document.getElementById("onBothSides") as HTMLInputElement).checked
        const { frontPage, backPage } = calculatePages(start, end, onSignlePage, isBothSides)
        drawInMainCanvas("frontCanvas", await getPDFpageData(frontPage))
        drawInMainCanvas("backCanvas", await getPDFpageData(backPage))
    })


    const { backPage, frontPage } = calculatePages(1, 10, 5, true)

    async function getPDFpageData(pages: number[]) {

        GlobalWorkerOptions.workerSrc = "//mozila.github.io/pdf.js/build/pdf.worker.js";
        const doc = await getDocument(testFile).promise
        const allRenders: ImageData[] = [];
        const virtialCanvas = document.createElement('canvas') as HTMLCanvasElement;
        const virtualContext = virtialCanvas.getContext('2d') as CanvasRenderingContext2D;


        for (const p of pages) {
            console.log(p);

            const page = await doc.getPage(p);

            const viewport = page.getViewport({ scale: 1 });
            virtialCanvas.width = viewport.width;
            virtialCanvas.height = viewport.height;

            await page.render({ canvasContext: virtualContext, viewport }).promise


            allRenders.push(virtualContext.getImageData(0, 0, virtialCanvas.width, virtialCanvas.height))

        }
        console.log(allRenders);

        return allRenders
    }

    function drawInMainCanvas(canvasId: string, values: ImageData[]): void {
        if (values.length === 0) {
            return
        }
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement
        const context = canvas.getContext("2d") as CanvasRenderingContext2D


        class CanvasView {
            constructor(public xAxis: number, public yAxis: number, public width: number, public height: number) {
                this.xAxis = xAxis;
                this.yAxis = yAxis;
                this.width = width * xAxis;
                this.height = height * yAxis;
            }
        }
        let canvasView: CanvasView;
        const cols = Math.ceil(Math.sqrt(values.length));
        const rows = Math.ceil(values.length / cols);
        canvasView = new CanvasView(cols, rows, values[0].width, values[0].height);

        console.log(cols, rows);

        canvas.width = canvasView.width
        canvas.height = canvasView.height
        let offsetY = 0;
        let offsetX = 0;
        for (let i = 0; i < values.length; i++) {

            console.log(`offsetX:${offsetX} offsetY:${offsetY} i:${i}`);


            context.putImageData(values[i], offsetX, offsetY)

            offsetX += values[0].width
            if (i % cols === 1) {
                offsetY += values[0].height
                offsetX = 0
            }
        }
    }

    // drawInMainCanvas("frontCanvas", await getPDFpageData(frontPage))
    // drawInMainCanvas("backCanvas", await getPDFpageData(backPage))

}

run()