type Child = Node | string | null | undefined | false

type Attributes = Record<string, string | number | boolean | EventListener | undefined>

/** Tiny hyperscript helper: `h("button", { class: "primary", onclick }, "Go")`. */
export const h = <K extends keyof HTMLElementTagNameMap>(
    tag: K,
    attributes: Attributes = {},
    ...children: Array<Child | ReadonlyArray<Child>>
): HTMLElementTagNameMap[K] => {
    const element = document.createElement(tag)
    for (const [name, value] of Object.entries(attributes)) {
        if (value === undefined || value === false) continue
        if (typeof value === "function") {
            element.addEventListener(name.replace(/^on/, ""), value)
        } else {
            element.setAttribute(name, value === true ? "" : String(value))
        }
    }
    for (const child of children.flat()) {
        if (child === null || child === undefined || child === false) continue
        element.append(child)
    }
    return element
}
