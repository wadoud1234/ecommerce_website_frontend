import { get, writable } from "svelte/store";

const ThemeStore = writable<"light" | "dark">("light");
const Theme = get(ThemeStore)

export function toggleTheme() {
    const colorMode = get(ThemeStore);
    if (colorMode === "light") {
        ThemeStore.set("dark");
    } else if (colorMode === "dark") {
        ThemeStore.set("light");
    }
    get(ThemeStore) !== "dark" ? document.documentElement.classList.add("dark") : document?.documentElement.classList.remove("dark");

}

export default Theme