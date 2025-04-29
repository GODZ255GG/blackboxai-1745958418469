const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'documents.json');

// Helper function to read documents data
function readDocuments() {
    if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(dataFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
}

// Helper function to write documents data
function writeDocuments(docs) {
    fs.writeFileSync(dataFilePath, JSON.stringify(docs, null, 2));
}

// GET /documents - list all documents
app.get('/documents', (req, res) => {
    const documents = readDocuments();
    res.json(documents);
});

// POST /documents - add a new document
app.post('/documents', (req, res) => {
    const documents = readDocuments();
    const newDoc = req.body;
    newDoc.id = Date.now().toString();
    documents.push(newDoc);
    writeDocuments(documents);
    res.status(201).json(newDoc);
});

// PUT /documents/:id - update a document
app.put('/documents/:id', (req, res) => {
    const documents = readDocuments();
    const id = req.params.id;
    const index = documents.findIndex(doc => doc.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Document not found' });
    }
    documents[index] = { ...documents[index], ...req.body };
    writeDocuments(documents);
    res.json(documents[index]);
});

// DELETE /documents/:id - delete a document
app.delete('/documents/:id', (req, res) => {
    let documents = readDocuments();
    const id = req.params.id;
    const initialLength = documents.length;
    documents = documents.filter(doc => doc.id !== id);
    if (documents.length === initialLength) {
        return res.status(404).json({ error: 'Document not found' });
    }
    writeDocuments(documents);
    res.status(204).send();
});

// Serve Main Page.html as root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Main Page.html'));
});

app.listen(PORT, () => {
    console.log(`Document management API running on http://localhost:${PORT}`);
});
