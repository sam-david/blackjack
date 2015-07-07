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
	// return index of most recent ace
	for (var i=0;i<hand.length;i++) {
		if (hand[i].value == 1) {index = i;}
	}
	return index;
}
function handTotalValue(hand) {
	// var oneIndex = aceIndex(dealerHand);
	// if (oneIndex != 0) {dealerHand[oneIndex].value = 11;console.log("soft")}
	var lowValue = 0;
	var highValue = 0;
	var firstAce = false;
	for (var c=0;c<hand.length;c++) {
		if (hand[c].value == 1 && firstAce == false) {
			lowValue += 1;
			highValue += 11;
			firstAce = true;
		} else {
			lowValue += hand[c].value;
			highValue += hand[c].value;
		}
	}
	console.log("Low:",lowValue,"High:",highValue)
	if (lowValue <= 21 && highValue > 21) {
		return lowValue
	} else {
		return highValue;
	}
}

function dealerHit() {
	dealerHand.push(dealLastCard(deckArray));
}

function dealerSequence() {
	if (handTotalValue(dealerHand) > 17) {
		// do nothing
	} else if (handTotalValue(dealerHand) == 17 && aceIndex(dealerHand) != 0) {
		dealerHit();
	} else if (handTotalValue(dealerHand) == 17) {
		// do nothing
	} else if (handTotalValue(dealerHand) <= 16) {
		dealerHit();
		dealerSequence();
	}
	// while (handTotalValue(dealerHand) < 17) {
	// 	dealerHit();
	// 	console.log("hitting dealer")
	// }
}

function showDealerCards() {
	console.log($(".sample-test"))
	console.log($("#dealer-card-1"))
	$("#dealer-card-1").attr("src", "images/cards/queen_of_hearts2.svg"); 
	// = constructImageName(dealerHand[0])
}

function constructImageName(card) {
	var finalName = "";
	if (card.face == "K") {finalName += "king"}
	else if (card.face == "Q") {finalName += "queen"}
	else if (card.face == "J") {finalName += "jack"}
	else if (card.value == 1) {finalName += "ace"}
	else {finalName += card.value.toString()}
	finalName += "_of_";
	if (card.suit == "H") {finalName += "hearts"}
	else if (card.suit == "D") {finalName += "diamonds"}
	else if (card.suit == "C") {finalName += "clubs"}
	else if (card.suit == "S") {finalName += "spades"}
	finalName += ".svg"
	return finalName;
}

startGame(deckArray);

console.log("dealer hand:", dealerHand, handTotalValue(dealerHand))
dealerSequence();
console.log("dealer hand:", dealerHand, handTotalValue(dealerHand), constructImageName(dealerHand[0]))
showDealerCards();
// playerHit();
console.log("player hand:",playerHand);
