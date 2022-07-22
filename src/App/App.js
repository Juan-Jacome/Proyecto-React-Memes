//Librerias
import React from 'react';
import { Meme } from '../Meme/Meme';
import { Switch, Route } from 'react-router-dom';
import { MemeGenerated } from '../MemeGenerated/MemeGenerated';

export const App = () => {
  return (
    <div>

      <center>
      <h1>Generador de memes</h1>
      </center> 
      
      <Switch>
        <Route exact path='/'>
          <Meme />
        </Route>
        <Route path='/generated'>
          <MemeGenerated />
        </Route>
      </Switch>

    </div>
  );
}

