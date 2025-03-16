export { getData, getById };
//fetch data.json

async function getData() {
    try {
        const response = await fetch("/src/Data/data.json");

        if (!response.ok) {
            throw new Error("Error fetching data");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
//get snippet by id
async function getById(snippetId) {
    try {
        const response = await fetch("/src/Data/data.json");

        if (!response.ok) {
            throw new Error("Error fetching data");
        }

        const data = await response.json();

        return data.find((s) => s.id == snippetId);
    } catch (error) {
        console.error(error);
    }
}
