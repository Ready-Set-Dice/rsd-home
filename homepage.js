const express = require('express');
const port = 8080;

// create our express app
const app = express();

const VueStatic = express.static('dist')
app.use(VueStatic);
app.use('/about', VueStatic)
app.use('/blog', VueStatic)
app.use('/gm', VueStatic)
app.use('/license', VueStatic)
app.use('/pc', VueStatic)

app.get('/robots.txt', (req,res) => {
    res.type('text/plain')
    res.send('User-agent: *\nAllow: /')
})

app.all('*', (req, res) => {
    res.redirect('/');
});

// start server
app.listen(port, () => {
    console.log("Listening on port ",port);
});