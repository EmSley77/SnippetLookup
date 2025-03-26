const handleInputChange = (e, setter) => {
    setter(e.target.value);
    e.target.style.height = "auto"; // Reset height to auto
    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height to content
};

export { handleInputChange };
