const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/portal-legais-regulatorios-front'));

app.get('/*', (req, res) => {
   console.log("###### oi #######");
   //res.sendFile(path.join(__dirname, '/dist/portal-legais-regulatorios-front/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
   console.log('Server running');
});