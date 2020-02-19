import React from 'react';
import { ArrayAnimation, SVGAnimation, Header } from './components/index'
import { bestSkills } from './content/skills'

const App = () => {

  return (
    <div className="App">
      <Header />
      {/* <ArrayAnimation array={bestSkills} /> */}
    </div>
  );
}

export default App;
