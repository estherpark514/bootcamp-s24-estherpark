import React, { useState, useEffect } from 'react';
import './App.css';
import ArrowButton from './components/ArrowButton/ArrowButton';
import InfoMoveButton from './components/InfoMoveButton/InfoMoveButton';
import PokemonIdentifier from './components/PokemonIdentifier/PokemonIdentifier';
import StatsPanel from './components/StatsPanel/StatsPanel';

const App = () => {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonData, setPokemonData] = useState(null);
  const [displayInfo, setDisplayInfo] = useState(true);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchData();
  }, [pokemonId]);

  const handleArrowButtonClick = (increment) => {
    setPokemonId((prevId) => (increment ? prevId + 1 : prevId - 1));
  };

  const handleInfoMoveButtonClick = (isInfo) => {
    setDisplayInfo(isInfo);
    setActiveTab(isInfo ? 'info' : 'moves');
  };

  return (
    <div className="container">
      <h1>Exercise 5 - PokeDex!</h1>
      <div className="sections">
        <div className="left-section">
          <PokemonIdentifier pokemonData={pokemonData} />
          <ArrowButton
            onArrowButtonClick={handleArrowButtonClick}
            disabled={pokemonId <= 1}
          />
        </div>
        <div className="right-section">
          <StatsPanel
            displayInfo={displayInfo}
            stats={pokemonData?.stats}
            height={pokemonData?.height}
            weight={pokemonData?.weight}
            moves={pokemonData?.moves}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          
          <InfoMoveButton
            displayInfo={displayInfo}
            onInfoMoveButtonClick={handleInfoMoveButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default App;