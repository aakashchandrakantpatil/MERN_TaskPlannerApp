const app = require('./api/app');
const port = 5010

//backend project listens on port 3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})