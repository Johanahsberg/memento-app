import React, { useState, useEffect } from "react";
import shuffle from "./utilities/shuffle";
import Card from "./components/Card";
import Header from "./components/Header";
import useAppBadge from "./hooks/useAppBadge";

function App() {
	const [cards, setCards] = useState(shuffle);
	const [pickOne, setPickOne] = useState(null);
	const [pickTwo, setPickTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);
	const [wins, setWins] = useState(0);
	const [setBadge, clearBadge] = useAppBadge();

	const handleClick = (card) => {
		if (!disabled) {
			pickOne ? setPickTwo(card) : setPickOne(card);
		}
	};

	const handleTurn = () => {
		setPickOne(null);
		setPickTwo(null);
		setDisabled(false);
	};

	useEffect(() => {
		let pickTimer;
		
		if (pickOne && pickTwo) {
			if (pickOne.image === pickTwo.image) {
				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.image === pickOne.image) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});
				handleTurn();
			} else {
				setDisabled(true);
				pickTimer = setTimeout(() => {
					handleTurn();
				}, 1000);
			}
		}
		return () => {
			clearTimeout(pickTimer);
		};
	}, [pickOne, pickTwo, cards]);

	useEffect(() => {
		const checkWin = cards.filter((card) => !card.matched);
		if (cards.length && checkWin.length < 1) {
			console.log("You win!");
			setBadge();
			setWins((wins) => wins + 1);
			handleTurn();
			setCards(shuffle);
		}
	}, [wins, cards]);

	const handleNewGame = () => {
		clearBadge();
		setWins(0);
		handleTurn();
		setCards(shuffle);
	};

	return (
		<>
			<Header handleNewGame={handleNewGame} wins={wins} />

			<div className='grid'>
				{cards.map((card) => {
					const { image, id, matched } = card;
					return (
						<Card
							key={id}
							image={image}
							selected={card === pickOne || card === pickTwo || matched}
							onClick={() => handleClick(card)}
						/>
					);
				})}
			</div>
		</>
	);
}

export default App;
