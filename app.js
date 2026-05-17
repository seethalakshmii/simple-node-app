const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('CI/CD Pipeline Working Successfully - version 4');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});