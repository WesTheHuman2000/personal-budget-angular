const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const cors = require('cors');

app.use(cors());

app.get('/budget', (req, res)=>{
    fs.readFile('./info.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const budgetData = JSON.parse(data);
        res.json(budgetData);
    });
    

    
});

app.listen(port, () =>{
    console.log(`API served at http://localhost:${port}`)
});
