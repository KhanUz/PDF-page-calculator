


export
    function injectClipboardArea(values: number[], name: string): void {
    const copyBar = document.getElementById("copyBar") as HTMLDivElement
    let r = (Math.random() + 1).toString(36).substring(7);

    copyBar.insertAdjacentHTML("beforeend",
        `<div class="border border-1 rounded-4 border-info bg-body-tertiary w-100 my-3 p-1">
            <div class="text-center text-info opacity-75  h5 d-flex justify-content-center align-items-center m-3 " >
                <span class="mx-3" id=""">${values}</span>
                <button type="button" id="${r}" data-bs-toggle="modal" data-bs-target="#copied"  data-copy="${values}" class= "btn btn-outline-info" > <i  data-bs-toggle="modal" data-bs-target="#copied"  class="bi bi-clipboard"></i> <span>${name}</span></button>
            </div>
        </div>`)
    document.getElementById(`${r}`)?.addEventListener("click", async (e) => {
        const target = e.target as HTMLButtonElement
        if (target.tagName === "BUTTON") {
            navigator.clipboard.writeText(target.dataset.copy as string);
        } else if (target.tagName === "I") {
            navigator.clipboard.writeText(target.parentElement?.dataset.copy as string);
        }

    })
}