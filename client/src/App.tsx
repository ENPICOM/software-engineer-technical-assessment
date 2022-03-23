import React from 'react';
import './App.css';
import logo from './logo.svg';

function App() {
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
        fetch('/api/hello')
            .then((res) => res.json())
            .then(({ message }) => setMessage(message))
            .catch(console.error);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Hello {message}!</h1>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
