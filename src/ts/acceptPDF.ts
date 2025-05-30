export function dragNdrop(): Promise<ArrayBuffer> {
    const dragZone = document.getElementById("dropArea") as HTMLDivElement;

    // Make sure the dropArea exists
    if (!dragZone) {
        return Promise.reject(new Error("Element with ID 'dropArea' not found."));
    }

    dragZone.addEventListener("dragover", (e) => {
        e.preventDefault(); // Prevent default to allow drop
    });

    return new Promise((resolve, reject) => {
        dragZone.addEventListener("drop", (e) => {
            e.preventDefault();
            const files = e.dataTransfer?.files;

            if (files && files.length > 0) {
                const file = files[0];
                if (file.type === "application/pdf") {
                    const reader = new FileReader();

                    reader.onload = (readerEvent) => {
                        if (readerEvent.target?.result instanceof ArrayBuffer) {
                            resolve(readerEvent.target.result); // Resolve the promise with the ArrayBuffer
                        } else {
                            reject(new Error("Failed to read file as ArrayBuffer."));
                        }
                    };

                    reader.onerror = (readerEvent) => {
                        reject(readerEvent.target?.error || new Error("Error reading file."));
                    };

                    reader.readAsArrayBuffer(file); // Start reading the file
                } else {
                    reject(new Error("Only PDF files are allowed."));
                }
            } else {
                reject(new Error("No files dropped."));
            }
        }); // Use { once: true } if you only expect one drop event
    });
}
