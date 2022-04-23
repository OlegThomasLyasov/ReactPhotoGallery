import React,{createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserStore from "./photo/UserStore"
import PhotoStore from './photo/photoStore';

export const Context = createContext(null)


ReactDOM.render(
  <Context.Provider value={{
   user:new UserStore(),
   photo:new PhotoStore() 
  }}>
    <App />
    </Context.Provider>,
  document.getElementById('root')
);

