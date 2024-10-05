const API_URL = 'https://friend-me-backend-mpekl66h6-codingwitherrors-projects.vercel.app/api/chat';

export async function sendMessage(message) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error; 
    }
}
