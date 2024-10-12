export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { username, domain } = req.body;
    const lowerCaseUsername = username.toLowerCase();

    try {
        const response = await fetch('https://dotwebshosting.com/setup-domain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: lowerCaseUsername, domain }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response from setup-domain:', errorData);
            return res.status(response.status).json(errorData);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error connecting domain:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
