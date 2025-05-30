import { calculatePages } from "./calculatePage"


import { injectClipboardArea } from "./injectClipBoarArea";


const copyBar = document.getElementById("copyBar") as HTMLDivElement

const formFilter = document.getElementById("form") as HTMLFormElement;
const startNumber = document.getElementById("startNumber") as HTMLInputElement;
const endNumber = document.getElementById("endNumber") as HTMLInputElement;
const pagesPerSide = document.getElementById("pagesPerSide") as HTMLInputElement;
const isBothSides = document.getElementById("onBothSides") as HTMLInputElement;







async function run() {

    formFilter?.addEventListener("submit",
        (e) => {
            e.preventDefault();

            let { frontPage: frontPages, backPage: backPages } = calculatePages(parseInt(startNumber.value), parseInt(endNumber.value), parseInt(pagesPerSide.value), isBothSides.checked)


            copyBar.innerHTML = ""
            if (frontPages.length) {
                injectClipboardArea(frontPages, "front")
            }
            if (backPages.length) {
                injectClipboardArea(backPages, "back")
            }
        }
    )



}

run()


























document.getElementById("themeBTN")?.addEventListener("click", () => { document.body.dataset.bsTheme = document.body.dataset.bsTheme === "dark" ? "light" : "dark" })