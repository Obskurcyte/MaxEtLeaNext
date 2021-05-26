import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";

const MentionsLegales = () => {

  return (
    <div>
      <Head>
        <title>Max And Lea - Mentions Légales</title>
      </Head>
      <Header />
      <div className="mentionsContainer">
        <h1 className="mentionsTitle">Mentions légales - Max & Léa</h1>
      </div>

      <div className="containerMentions">
        <p>Le site internet <a href="/" id="sitelink">www.maxandlea.com</a> est géré par la société MAX AND LEA ci-après définie :</p>

        <h5>SAS MAX AND LEA, <br/></h5>
        <p>Société par actions simplifiée au capital de 20.000 €,<br/>

          11 RUE DE LOURMEL, 75015 PARIS, PARIS, FRANCE <br/>

          Immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 884 297 243, <br/>

          Représentée par son président en la personne de Monsieur Pierre-Charles FOSANELLI. <br/>

          E-mail : <a href="mailto:contact@maxandlea.com" id="sitelink">contact@maxandlea.com</a><br/>

          N° TVA Intracommunautaire : FR38884297243 <br/>

          Directeur de publication : Ludovic CHARTOUNI <br/>

          Direction informatique : Theodore D’Avray</p>

        <h5>Hébergement</h5>
        <p>Le Site est hébergé par la SiteGround Hosting Ltd., wwwsiteground.com : <br/>

          SiteGround Hosting Ltd. <br/>

          3rd Floor 11-12 St. James’s Square, <br/>

          London, SW1Y 4LB, <br/>

          United Kingdom</p>
      </div>

      <Footer />
    </div>
  );
};

export default MentionsLegales;
