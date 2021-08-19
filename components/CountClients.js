import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";

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

  const { t, i18n } = useTranslation();
  return (
    <div className="clientSatisfait">
      <h5>{clientCount} {t('Client')}</h5>
    </div>
  );
};

export default CountClients;