import React, { useState } from 'react';
import { sendMessage } from './api';
import './App.css'; 

function App() {
    const [userInput, setUserInput] = useState('');
    const [responses, setResponses] = useState([]); 

    const handleSend = async () => {
        try {
            const result = await sendMessage(userInput);
            setResponses(prevResponses => [...prevResponses, { user: userInput, bot: `Sara: ${result}` }]); // Prefix bot response with "Sara:"
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
                        <div key={index}>
                            <p><strong>You:</strong> {msg.user}</p>
                            <p><strong>Bot:</strong> {msg.bot}</p>
                        </div>
                    ))}
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
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
