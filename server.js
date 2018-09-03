const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

var answers = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes - definitely.", "You may rely on it.", "As I see it, yes.",
		"Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy", "try again", "Ask again later.", "Better not tell you now.",
		"Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no",
		"Outlook not so good.", "Very doubtful."] ;


app.get('/', (req, res) => {
	res.render('search.ejs', {result: null});
})

app.post('/', (req, res) => {
	
	question = req.body.question;
	
	max = answers.length - 1;
	min = 0;
	range = max - min + 1;		
	rnd = (Math.random() * range) + min;
	
	
	console.log(answers[parseInt(rnd, 10)]);
	res.render('search.ejs', {result: question});
})