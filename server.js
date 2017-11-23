/**
 * Created by dell on 2017/11/21.
 */
const express = require('express');
const app = express();
app.use(express.static(__dirname));
app.listen(8000);
app.get('/',function (req,res) {
    res.sendFile(__dirname+'/dist/puzzle.html')
});