import React, { useState } from 'react';
import './App.css'; 

function App() {
    const [userInput, setUserInput] = useState('');
    const [responses, setResponses] = useState([]); 

    const handleSend = async () => {
        if (!userInput.trim()) return;

        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userInput }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.response) {
                setResponses(prevResponses => [...prevResponses, { user: userInput, bot: data.response }]);
            } else {
                console.error('Unexpected response format:', data);
            }
            setUserInput('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <h1>Sara</h1>
            <div className="message-box">
                <div className="message-history">
                    {responses.map((msg, index) => (
                        <div key={index} className="message-group">
                            <div className="user-message">
                                <p className='USER'><strong>You:</strong> {msg.user}</p>
                            </div>
                            <div className="bot-message">
                                <p className='BOT'><strong>Sara:</strong> {msg.bot}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message..."
                        className="input-field"
                    />
                    <button onClick={handleSend} className="send-button">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
