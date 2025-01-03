export default async function handler(req, res) {
    const API_URL = "https://api.brawlstars.com/v1";
    const API_TOKEN = "YOUR_API_KEY"; // Replace with your actual API key.

    const { playerTag } = req.query;

    if (!playerTag) {
        return res.status(400).json({ error: "Player tag is required" });
    }

    try {
        const response = await fetch(`${API_URL}/players/%23${playerTag}`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error fetching data");
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
