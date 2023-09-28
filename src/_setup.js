// create 7 character decks, each with 3 A cards, 2 B cards, 1 C card
// shuffle each character deck
// pick one character deck, replace the first 4 cards with "kill" cards
// pick another character deck, replace the first 3 cards with "kill" cards
// shuffle the two killer character decks separately again
// set the two killer character decks aside, separate from the others
// add an ID card to the bottom of each character deck (the two killers get "killer" id cards, the rest get "friend" id cards)
// shuffle the character/victim pairs
// add the character/victim pair to the top of each deck
// take the top card from each killer character deck and return them to the box
// take the top card from each friendly character deck and stack them into a "victim" deck
// Add event cards to the victim deck and shuffle
// shuffle all of the character decks together (the decks should remain separate from each other, but you shouldn't know which deck is which)
// arrange the character decks in a circle, face down
// take the top card from each character deck and place it face up next to its character deck

const characters = [
    "Billy",
    "Sidney's Dad",
    "Stu",
    "Gail Weathers",
    "Deputy Dewey",
    "Randy",
    "Principal Himbry",
]

const victims = [ ...characters ];

const characterVictimPairs = characters.map((character, index) => ({
        character,
        victim: victims[index],
    })
}

const shuffle = (items) => {
    const shuffledItems = [...items]
    for (let i = shuffledItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = shuffledItems[i]
        shuffledItems[i] = shuffledItems[j]
        shuffledItems[j] = temp
    }
    return shuffledItems
}

export default function Setup() {
    // create 7 character decks, each with 3 A cards, 2 B cards, 1 C card
    const characterDecks = characters.map(() => {
        const cards = [
            { type: "A" },
            { type: "A" },
            { type: "A" },
            { type: "B" },
            { type: "B" },
            { type: "C" },
        ]
        return shuffle(cards)
    });

    // pick one character deck, replace the first 4 cards with "kill" cards
// pick another character deck, replace the first 3 cards with "kill" cards
    
    const killerCharacterDecks = shuffle(characterDecks.map((deck) => {
        const cards = [
            { type: "kill" },
            { type: "kill" },
            { type: "kill" },
            { type: "kill" },
            ...deck.slice(4),
        ]
        return shuffle(cards)
    }).slice(0, 2))

    // set the two killer character decks aside, separate from the others
    // add an ID card to the bottom of each character deck (the two killers get "killer" id cards, the rest get "friend" id cards)
    const characterDecksWithIdCards = characterDecks.map((deck, index) => {
        const cards = [
            ...deck,
            { type: index < 2 ? "killer" : "friend" },
        ]
        return shuffle(cards)
    })

    // shuffle the character/victim pairs
    const characterVictimPairs = shuffle(characterDecksWithIdCards.map((deck, index) => {
        return {
            character: characters[index],
            victim: characters[(index + 1) % characters.length],
        }
    }))

    // add the character/victim pair to the top of each deck
    const characterDecksWithVictimCards = characterDecksWithIdCards.map((deck, index) => {
        const cards = [
            { type: "victim", character: characterVictimPairs[index].character, victim: characterVictimPairs[index].victim },
            ...deck,
        ]
        return shuffle(cards)
    })

    // take the top card from each killer character deck and return them to the box
    const killerCards = killerCharacterDecks.map((deck) => deck[0])

    // take the top card from each friendly character deck and stack them into a "victim" deck
    const victimCards = characterDecksWithVictimCards.map((deck) => deck[0])

    // Add event cards to the vic

}