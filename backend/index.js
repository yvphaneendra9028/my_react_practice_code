const  express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 500;

app.listen(PORT,()=> {
    console.log(`server listerning on port ${PORT}`);
})