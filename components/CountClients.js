import React, {useEffect, useState} from 'react';

const CountClients = () => {

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
    <div className="clientSatisfait">
      <h5>{clientCount} clients déjà satisfaits</h5>
    </div>
  );
};

export default CountClients;