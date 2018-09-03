const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var LocalStorage = require('node-localstorage').LocalStorage;


app.listen(process.env.PORT || 3005, () => {
  console.log('Listening on port 3005');
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
	if (typeof localStorage === "undefined" || localStorage === null) {
		  localStorage = new LocalStorage('./scratch');
		}
})

app.post('/search', (req, res) => {
	
	answer = '';
	question = req.body.question;
	
	if (localStorage.getItem(question) != null) {
		console.log("GEVONDEN")
		answer = localStorage.getItem(question);
		res.render('search_result.ejs', {result: answer, question: question});
	}
	else {
		question = req.body.question;
		
		max = answers.length - 1;
		min = 0;
		range = max - min + 1;		
		rnd = (Math.random() * range) + min;
		
		answer = answers[parseInt(rnd, 10)]
		
		localStorage.setItem(question, answer);
		
		res.render('search_result.ejs', {result: answer, question: question});
	}
})

app.get('/clear', (req, res) => {
	localStorage.clear()
	res.redirect('/')
})