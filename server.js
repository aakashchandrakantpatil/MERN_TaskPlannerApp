const app = require('./api/app');

//backend project listens on port 3000
app.listen(process.env.PORT || 5010, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
})