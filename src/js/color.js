export { colorGenerator };

//randomize color in hex codes
const colorGenerator = () => {
    let hexadecimalnumber = (Math.random() * 0xfffff * 1000000).toString(16);
    return "#" + hexadecimalnumber.slice(0, 6);
};
