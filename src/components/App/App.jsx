import {useEffect, useState} from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import CreatureList from '../CreatureList/CreatureList';

import './App.css';

function App () {
 
  const [creatureList, setCreatureList] = useState([]);
  const [newCreatureName, setNewCreatureName] = useState('');
  const [newCreatureOrigin, setNewCreatureOrigin] = useState('');

  // Function to get the creatures from the server/database
  const fetchCreatures = () => {
    axios({
      method: 'GET',
      url: '/creature'
    })
      .then( (response) => {
        console.log('Entire response:', response);
        // The actual array comes from the data attribute on the response
        console.log('Just the data:', response.data);

        // Set data into component state
        setCreatureList(response.data);
      })
      .catch(function (error) {
        console.log('Error on get:', error);
      });
  }

  // Function to add a new creature to the database
  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: 'POST',
      url: '/creature',
      data: {
        name: newCreatureName,
        origin: newCreatureOrigin
      }
    })
      .then( (response) => {
        console.log('Response:', response);
        fetchCreatures();
        //Clear Inputs & State
        setNewCreatureName('');
        setNewCreatureOrigin('')
      })
      .catch(function (error) {
        console.log('Error on add:', error);
      });
  }

  // Call function so it runs once on component load
  // Similar to jQuery's document ready
  useEffect( () => {
    fetchCreatures();
  }, [])
  
  return (
    <div className="App">
      <Header title='Add Creature'/>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input 
          onChange={ (event) => setNewCreatureName(event.target.value) } 
          value={newCreatureName}
          />
        <label>Origin:</label>
        <input 
          onChange={ (event) => setNewCreatureOrigin(event.target.value) } 
          value={newCreatureOrigin}/>
        <button type="submit">Add New Creature</button>
      </form>
      <Header title='All Creatures'/>
      {/* <ComponentName PropertySetByComponent={variable inside App.jsx} */}
      <CreatureList creatureList={creatureList} />
    </div>
  );

}

export default App
