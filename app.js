var deckArray = [];

function createDeckArray() {
	deckArray.push(new Card(10,"H","J"))
	deckArray.push(new Card(10,"D","J"))
	deckArray.push(new Card(10,"C","J"))
	deckArray.push(new Card(10,"S","J"))
	deckArray.push(new Card(10,"H","Q"))
	deckArray.push(new Card(10,"D","Q"))
	deckArray.push(new Card(10,"C","Q"))
	deckArray.push(new Card(10,"S","Q"))
	deckArray.push(new Card(10,"H","K"))
	deckArray.push(new Card(10,"D","K"))
	deckArray.push(new Card(10,"C","K"))
	deckArray.push(new Card(10,"S","K"))
	for (var i=1;i<=10;i++) {
		deckArray.push(new Card(i,"H"))
		deckArray.push(new Card(i,"D"))
		deckArray.push(new Card(i,"C"))
		deckArray.push(new Card(i,"S"))
	}
}

function Card(value,suit,face) {
	this.value = value;
	this.suit = suit;
	this.face = face;
}

function shuffleDeck(deck) {
	return _.shuffle(deck); 
}

function dealLastCard(deck) {
	return deck.pop();
}

createDeckArray();
var dealerHand = [];
var playerHand = [];

function startGame() {
	deckArray = shuffleDeck(deckArray);
	// deal out initial 2 cards
	dealerHand.push(dealLastCard(deckArray))
	playerHand.push(dealLastCard(deckArray))
	dealerHand.push(dealLastCard(deckArray))
	playerHand.push(dealLastCard(deckArray))

	console.log("Player Hand:",playerHand)
	console.log("Dealer Hand:",dealerHand)
}

function playerHit() {
	playerHand.push(dealLastCard(deckArray));
}

function aceIndex(hand) {
	var index = 0;
	for (var i=0;i<hand.length;i++) {
		if (hand[i].value == 1) {index = i;}
	}
	return index;
}
function dealerTotalValue() {
	var oneIndex = aceIndex(dealerHand);
	if (oneIndex != 0) {dealerHand[oneIndex].value = 11;console.log("soft")}
	var value = dealerHand.reduce(function(prev,cur) {
		console.log("adding", cur.value)
		return prev.value + cur.value
	})
	return value;
}

function dealerHit() {
	dealerHand.push(dealLastCard(deckArray));
}

function dealerSequence() {
	if (dealerTotalValue < 17) {
		dealerHit();
	}
}

startGame(deckArray);

console.log("dealer hand:", dealerHand, dealerTotalValue())
// playerHit();
console.log(playerHand);
