export { copyCode };
//copying code when viewing in fullscreen
async function copyCode(code, setIsCopied, isCopied) {
    if (isCopied) return;
    try {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
    } catch (error) {
        console.error(error);
    }
}
