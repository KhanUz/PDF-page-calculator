interface PageV {
    frontPage: number[],
    backPage: number[]
}

export function calculatePages(start: number, end: number, onSignlePage: number, isBothSides: boolean): PageV {
    let entireSection = Array.from({ length: end - start + 1 }, (_, i) => i + start)



    if (isBothSides === false || onSignlePage === 1) {
        return {
            frontPage: entireSection,
            backPage: []
        }
    } else if (isBothSides) {
        return entireSection.reduce((acc: PageV, curr, currI) => {
            let currChunk = Math.floor(currI / onSignlePage)
            if (currChunk % 2) {
                acc.backPage.push(curr)
            } else {
                acc.frontPage.push(curr)
            }
            return acc

        }, { frontPage: [], backPage: [] })

    } else {
        return {
            frontPage: entireSection,
            backPage: []
        }
    }
}



