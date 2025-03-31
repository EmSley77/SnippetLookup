export {
    colorGenerator,
    copyCode, formatCreatedDate,
    handleInputChange
};

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

const handleInputChange = (e, setter) => {
    setter(e.target.value);
    e.target.style.height = "auto"; // Reset height to auto
    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height to content
};

//randomize color in hex codes
const colorGenerator = () => {
    let hexadecimalnumber = (Math.random() * 0xfffff * 1000000).toString(16);
    return "#" + hexadecimalnumber.slice(0, 6);
};

//format date
const formatCreatedDate = (createdDate) => {
    return new Date(createdDate).toLocaleDateString();
};
