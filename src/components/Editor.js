import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Editor.css'

const Editor = () => {
    const [markdown, setMarkdown] = useState('');
    const [html, setHtml] = useState('');

    const handleInputChange = (e) => {
        setMarkdown(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.post('http://localhost:9000/convert', { markdown });
                setHtml(result.data.html);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchData();
    }, [markdown]);

    return (
        <div className="editor">
            <textarea
                value={markdown}
                onChange={handleInputChange}
                placeholder="Type your Markdown here..."
            />
            <div
                className="preview"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
};

export default Editor;
