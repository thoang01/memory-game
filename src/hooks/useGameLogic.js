/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { addUniqueIds, getFormedData, getPairedPics, shuffleCards } from "../utils";

const MAX_VISIBLE_CARD = 2
const PACES = {
  easy: 1500,
  medium: 1000,
  hard: 500,
  pro: 200
}

const useGameLogic = (images, gamePace) => {
  const [score, setScore] = useState(0)
  const [cards, setCards] = useState([])
  const [visibleCards, setVisibleCards] = useState([])
  const [hasWon, setHasWon] = useState(false)

  const prepareCards = () => {
    const a = getFormedData(images)
    const b = getPairedPics(a)
    const c = addUniqueIds(b)
    const d = shuffleCards(c)
    setCards(d)
  }

  const flipCard = (clickedCardId) => {
    const flippedCard = cards.map(card => {
      if (card.uniqueId === clickedCardId) {
        card.isShown = true;
      }

      if (card.isShown) {
        setVisibleCards(oldState => [...oldState, card.uniqueId])
      }
      return card
    })

    setCards(flippedCard)
  }

  const onCardClick = (clickedCardId) => {
    if (visibleCards.length < MAX_VISIBLE_CARD) {
      flipCard(clickedCardId)
    }
  }

  const checkMatch = () => {
    const visible = cards.filter(card => visibleCards.indexOf(card.uniqueId) !== -1)

    const matched = visible[0].id === visible[1].id
    const updatedCards = cards.map(card => {
      if (visibleCards.indexOf(card.uniqueId) !== -1) {
        card.isShown = false
        card.isFound = matched
      }
      return card
    })
    setTimeout(() => {
      setCards(updatedCards);
      setVisibleCards([]);
      if (matched) updateScore()
    }, PACES[gamePace])
  }

  const updateScore = () => {
    setScore(oldScore => oldScore + 1)
  }

  useEffect(() => {
    if (images.length > 0) prepareCards()
  }, [images])

  useEffect(() => {
    if (visibleCards.length >= MAX_VISIBLE_CARD) {
      checkMatch()
    }
  }, [visibleCards])

  useEffect(() => {
    if (images.length && score === images.length) {
      setHasWon(true)
    }
  }, [score])

  return {cards, onCardClick, hasWon}
};

export default useGameLogic;
