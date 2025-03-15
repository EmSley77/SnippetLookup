export { getData };
//fetch data.json

async function getData() {
    try {
        const response = await fetch('/src/Data/data.json');

        if (!response.ok) {
            throw new Error("Error fetching data");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
