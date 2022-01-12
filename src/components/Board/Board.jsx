import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import useGetImages from '../../hooks/useGetImages'
import Loader from './../Loader'
import styles from './Board.module.css';
import useGameLogic from '../../hooks/useGameLogic';
import Card from './../Card'
import Result from './../Result'

const Board = ({ gameOptions, restartGame }) => {
  const [isLoading, setIsLoading] = useState(true)
  const images = useGetImages(gameOptions)
  const {cards, onCardClick, hasWon} = useGameLogic(images, gameOptions.selectPace)
  useEffect(() => {
    if (images.length > 0) setIsLoading(false)
  }, [images])
  return (
    <>
      <div>
        {hasWon && <Result restartGame={restartGame}/>}
        {isLoading ? <Loader /> :
          <div className={`${styles.board}`}>
            {cards.map(card => <Card key={card.uniqueID} card={card} onCardClick={onCardClick} />)}
          </div>
        }
      </div>
    </>
  )
};

export default Board;

Board.propTypes = {
  gameOptions: PropTypes.shape({
    selectPace: PropTypes.string.isRequired,
    cardsCount: PropTypes.number.isRequired,
    selectCategory: PropTypes.string.isRequired,
  }),
  restartGame: PropTypes.func.isRequired
}