import React, {useEffect, useState} from 'react';

const CookiesBtn = () => {

  const [clientCount, setclientCount] = useState([])
  const changeClientCount = async() => {
    const res = await fetch(`https://maxandlea.fr/wp-json/wp/v2/posts/9815`)
    const newData = await res.json();
    setclientCount(newData.title.rendered);
  };

  useEffect(() => {
    changeClientCount();
  })

  return (
    <div className="cookiesBtn">
      <p>J'accepte</p>
      <img src="/cookie.webp" alt="smiling-cookie"/>
    </div>
  );
};

export default CookiesBtn;