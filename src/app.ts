import express from 'express';
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express();
const port = 3000;

// server settings
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.get('/identify', async (req, res) => {
	res.send('Hello World!');
});

app.post('/identify', async (req, res) => {
	const { email, phoneNumber } = req.body;
	console.log(req.body, email, phoneNumber)
	res.send('body posted');
});


app.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`);
});
