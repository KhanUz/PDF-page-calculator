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

// How to use it:
async function handleDrop() {
    try {
        const arrayBuffer = await dragNdrop();
        console.log("PDF ArrayBuffer received:", arrayBuffer);
        // Now you can work with the arrayBuffer, e.g., pass it to a PDF library
    } catch (error) {
        console.error("Drag and drop error:", error);
    }
}

// You might call handleDrop() when your application initializes or when the drop area is ready.
// For demonstration, let's just show the structure.
// You would typically attach this to some event or setup logic.
// For example, if you want it to be ready as soon as the page loads:
document.addEventListener('DOMContentLoaded', () => {
    // Optionally call it, or have another function that sets up drop handling.
    // In many UIs, you'd call dragNdrop() once to set up the listener
    // and then process the returned Promise.
    // Example:
    // const dropArea = document.getElementById("dropArea");
    // if (dropArea) {
    //     // You would attach the dragNdrop function to initiate the process
    //     // when a file is actually dropped.
    //     // A more typical use case for dragNdrop returning a Promise
    //     // is if you only want to set up the listener once and await
    //     // the result of the *next* successful drop.
    // }
});