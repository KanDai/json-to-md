// src/JsonToMarkdownTable.tsx
import { useState } from 'react'

type JsonData = { [key: string]: any }[]

const JsonToMarkdownTable = () => {
    const [inputJson, setInputJson] = useState('')
    const [markdownTable, setMarkdownTable] = useState('')

    function convertJsonToMarkdownTable(jsonData: JsonData) {
        if (jsonData.length === 0) {
            return 'No data provided.'
        }

        const headers = Object.keys(jsonData[0])
        let markdownTable = '| ' + headers.join(' | ') + ' |\n'
        markdownTable += '| ' + headers.map(() => '---').join(' | ') + ' |\n'

        jsonData.forEach((row) => {
            markdownTable +=
                '| ' + headers.map((header) => row[header]).join(' | ') + ' |\n'
        })

        return markdownTable
    }

    function handleSubmit() {
        try {
            const parsedJson = JSON.parse(inputJson) as JsonData
            setMarkdownTable(convertJsonToMarkdownTable(parsedJson))
        } catch (error) {
            console.error(error)
            alert('Invalid JSON data.')
        }
    }

    return (
        <div>
            <h1>JSON to Markdown Table Converter</h1>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2rem',
                }}
            >
                <div>
                    <textarea
                        value={inputJson}
                        onChange={(e) => setInputJson(e.target.value)}
                        placeholder="Enter JSON data here"
                        rows={10}
                        style={{ width: '100%', height: '50vh' }}
                    ></textarea>
                    <button onClick={handleSubmit}>
                        Convert to Markdown Table
                    </button>
                </div>
                <div
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: '1rem',
                        height: '60vh',
                    }}
                >
                    <pre
                        style={{
                            margin: 0,
                        }}
                    >
                        {markdownTable}
                    </pre>
                </div>
            </div>
        </div>
    )
}

export default JsonToMarkdownTable
