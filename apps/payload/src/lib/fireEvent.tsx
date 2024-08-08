export function fireEvent(event: any) {
    //@ts-ignore
    if (window && window?.plausible) {
        //@ts-ignore
        window.plausible(event);
    } else {
        console.warn("Plausible is not available");
    }
}
