import React from 'react';
import Header from "../components/Header";

const RecapitulatifScreen = props => {
  return (
    <div>
      <Header />
      <div>
        <h1>Merci de votre achat !</h1>
        <button><a href="/">Retour au site</a></button>
        <p>Je n'ai pas pu voir le design de cette page car je n'ai jamais complété l'achat sur le site en prod</p>
      </div>
    </div>
  )
};

export default RecapitulatifScreen
