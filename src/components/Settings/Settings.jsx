import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { CATEGORIES, PACE, INITIAL_CARDS_COUNT } from '../../constants';
import styles from './Settings.module.css';
import RadioBox from '../RadioBox/RadioBox';
import Counter from '../Counter/Counter';

const Settings = ({startGame}) => {
  const [selectCategory, setSelectCategory] = useState(CATEGORIES[0])
  const [selectPace, setSelectPace] = useState(PACE[0])
  const [cardsCount, setCardsCount] = useState(INITIAL_CARDS_COUNT)

  const onStartGameClick = () => {
    startGame({selectCategory, selectPace, cardsCount})
  }

  return (
    <div className={`${styles.settings} frosted`}>
      <h2>Test</h2>
      <h4>Category:</h4>
      <div className={`${styles.setting}`}>
        {CATEGORIES.map(category => {
          return <RadioBox
            key={category}
            name={category}
            selectedItem={selectCategory}
            onChange={e => setSelectCategory(e.target.value)} />
        })}
      </div>

      <h4>Amount of cards:</h4>
      <div className={`${styles.setting}`}>
        <Counter cardsCount={cardsCount} onClick={setCardsCount}/>
      </div>

      <h4>Difficulty:</h4>
      <div className={`${styles.setting}`}>
        {PACE.map(difficulty => {
          return <RadioBox
            key={difficulty}
            name={difficulty}
            selectedItem={selectPace}
            onChange={e => setSelectPace(e.target.value)} />
        })}
      </div>

      <button className={`${styles.button} frosted`} onClick={onStartGameClick}>Start</button>
    </div>
  )
};

export default Settings;

Settings.propTypes = {
  startGame: PropTypes.func.isRequired
}