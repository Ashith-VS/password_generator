import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import icon from "../assets/images/clipboard_icon.png"

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [settings, setSettings] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    });

    const generatePassword = () => {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

        let characters = '';
        if (settings.lowercase)characters += lowercase;
        if (settings.uppercase) characters += uppercase;
        if (settings.numbers) characters += numbers;
        if (settings.symbols) characters += symbols;
        if (characters.length === 0) return;

        let generatedPassword = '';
        const min = 4; 
       const max = 12;
       const randomLength = Math.floor(Math.random() * (max - min)) + min;

      
        for (let i = 0; i < randomLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            generatedPassword += characters[randomIndex];
        }
        setPassword(generatedPassword);
    };

    const handleChange = (e) => {
        const { name, checked, type } = e.target;
        if (type === 'checkbox') {
         setSettings((prevState) => ({...prevState,[name]: checked,}));
        }
    };

    const getStrength = () => {
        if (password.length === 0) {
            return { strength: '', color: '' };
        } else if (password.length > 8) {
            return { strength: 'Strong', color: 'green' };
        } else {
            return { strength: 'Weak', color: 'red' };
        }
    };
    
    const { strength, color } = getStrength();

    return (
        <div className="password-generator">
            <h2>Password Generator</h2>
            <div className="password-output">
             <input type="text" placeholder="Generated password" value={password} disabled />
             <CopyToClipboard  text={password}>
             <button><img src={icon} alt='' style={{width:'30px',height:'30px',objectFit:'cover'}}/></button>
             </CopyToClipboard>
             <button onClick={generatePassword}>Generate Password</button>
            </div>
            <div className="strength-indicator">
            <span style={{color}} >{strength}</span> &nbsp;&nbsp;&nbsp;
            <label>Length: {password?.length}</label>
            <input type="range" min="0" max="12" value={password?.length}  readOnly/>      
            </div>
            <div className="settings">
                <label><input type="checkbox" name="uppercase" checked={settings.uppercase} onChange={handleChange}/>Uppercase</label>
                <label><input type="checkbox" name="lowercase" checked={settings.lowercase} onChange={handleChange}/>Lowercase</label>
                <label><input type="checkbox" name="numbers" checked={settings.numbers} onChange={handleChange}/>Numbers</label>
                <label><input type="checkbox" name="symbols" checked={settings.symbols} onChange={handleChange}/>Symbols</label>
            </div>
        </div>
    );
};

export default PasswordGenerator;
