import type { Problem } from "../core/index.js"
import { h } from "./dom.js"

const fractionLabel = (token: Extract<Problem.Token, { _tag: "Frac" }>): string =>
    (token.whole === undefined ? "" : `${token.whole} and `) + `${token.n} over ${token.d}`

/** Draws one token; fractions are stacked the way they are written by hand. */
export const renderToken = (token: Problem.Token): HTMLElement => {
    switch (token._tag) {
        case "Num":
            return h("span", { class: "num" }, token.text)
        case "Op":
            return h("span", { class: "op" }, token.symbol)
        case "Blank":
            return h("span", { class: "blank" })
        case "Frac":
            return h(
                "span",
                { class: "mixed", role: "img", "aria-label": fractionLabel(token) },
                token.whole !== undefined && h("span", { class: "whole", "aria-hidden": true }, String(token.whole)),
                h(
                    "span",
                    { class: "frac", "aria-hidden": true },
                    h("span", { class: "frac-n" }, String(token.n)),
                    h("span", { class: "frac-d" }, String(token.d))
                )
            )
    }
}

export const renderTokens = (tokens: ReadonlyArray<Problem.Token>): Array<HTMLElement> => tokens.map(renderToken)
