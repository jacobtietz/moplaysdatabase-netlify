import { useEffect, useState } from 'react';
import { api } from './api';

function App() {
  const [plays, setPlays] = useState([]);

  useEffect(() => {
    api.get('/api/plays')
      .then(res => setPlays(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Plays from MongoDB:</h1>
      <ul>
        {plays.map(play => (
          <li key={play._id}>
            {play.title} by {play.author} ({play.year})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
