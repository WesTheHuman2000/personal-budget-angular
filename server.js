const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs')

app.use('/', express.static('public'));


    
app.get('/hello', (req,res)=> {
    res.send('Hello World!');
});

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
    console.log('Example app listening at http://localhost:3000')
});
