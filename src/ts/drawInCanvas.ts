export function drawInMainCanvas(canvasId: string, values: ImageData[], onSinglePage: number): void {
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
    const cols = onSinglePage;
    let rows = Math.ceil(values.length / cols);
    canvasView = new CanvasView(cols, rows, values[0].width, values[0].height);
    canvasView = new CanvasView(cols, rows, values[0].width, values[0].height);


    canvas.width = canvasView.width
    canvas.height = canvasView.height
    context.clearRect(0, 0, canvas.width, canvas.height)

    let offsetY = 0;
    let offsetX = 0;
    for (let i = 0; i < values.length; i++) {

        console.log(`offsetX:${offsetX} offsetY:${offsetY} i:${i}`);

        context.putImageData(values[i], offsetX, offsetY)
        context.lineWidth = 5;
        context.strokeRect(offsetX, offsetY, canvasView.width, rows)

        offsetX += values[0].width
        if (i % cols === cols - 1) {
            offsetY += values[0].height
            offsetX = 0
        }
    }
}