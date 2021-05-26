import React from 'react';
import Header from "../components/Header";
import {Card, Row, Col, Container} from "react-bootstrap";
import Footer from "../components/Footer";
import Head from "next/head";

const Equipe = () => {

  return (
    <div>
      <Head>
        <title>Max And Lea - Equipe</title>
      </Head>
      <Header />
      <div className="equipeContainer">
        <img src={'/heroes.jpg'} alt=""/>
        <h1 className="team">L'équipe Max Et Lea</h1>
      </div>
      <div className="equipeDescriptionContainer">
        <p>Si vous recevez de superbes jouets Max & Lea, c’est que notre équipe se plie en 4 pour concevoir les plus beaux jouets possibles.

          Nous contrôlons que chaque jouet répond à toutes les normes Européennes et nous nous assurons de vous livrer très très vite partout où vous vous trouvez !</p>
        <p>Notre équipe est également hyper réactive et répondra à toutes vos questions très rapidement.</p>

      <div className="container">
        <div className="row">
          <div className="col">
            <div className="imgPresentationContainer">
              <img src="https://maxandlea.com/wp-content/uploads/2020/11/pc.jpg" alt=""/>
            </div>
            <div>
              <h5>Pierre-Charles <br/> FOSANELLI</h5> <br/>
              <p>CEO et co-fondateur</p>
            </div>
            <hr/>

            <div>
              <p>Pierre-Charles s’occupe des réseaux sociaux, de la clientèle et des partenariats.
                Il gère également les opérations logistiques et s’assure que vos colis arrivent le plus vite possible !</p>
            </div>
          </div>

          <div className="col">
            <div className="imgPresentationContainer">
              <img src="https://maxandlea.com/wp-content/uploads/2020/11/ludo-300x297.png" alt=""/>
            </div>
            <div>
              <h5>Ludovic <br/> CHARTOUNI</h5> <br/>
              <p>COO et co-fondateur</p>
            </div>
            <hr/>

            <div>
              <p>Ludovic coordonne les opérations de développement informatique.
                Il développe et dessine avec sa femme les nouveaux jouets, les ebooks et travaille sur le développement commercial de Max & Lea.</p>
            </div>
          </div>

          <div className="col">
            <div className="imgPresentationContainer">
              <img src="https://maxandlea.com/wp-content/uploads/2020/11/profil-300x300.jpg" alt=""/>
            </div>
            <div>
              <h5>Théodore <br/> D'AVRAY</h5> <br/>
              <p>CTO & Développements</p>
            </div>
            <hr/>

            <div>
              <p>Théodore passe ses journées (et ses nuits) à améliorer le site Max & Lea.
                Il veille en permanence à ce que l’expérience utilisateur soit optimale.</p>
            </div>
          </div>

          <div className="col">
            <div className="imgPresentationContainer">
              <img src="https://maxandlea.com/wp-content/uploads/2020/11/sandrine.jpg" alt=""/>
            </div>
            <div>
              <h5>Sandrine <br/> BERTINETTI</h5> <br/>
              <p>Conceptrice 3D</p>
            </div>
            <hr/>

            <div>
              <p>Sandrine travaille sur la conception de nos jouets et prépare tous nos modèles en 3D avant leur fabrication.</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col colequipe">
            <div className="imgPresentationContainer">
              <img src="https://maxandlea.com/wp-content/uploads/2020/11/kristhel.jpg" alt=""/>
            </div>
            <div>
              <h5>Kristhel <br/> ASNAR-GALLOIS</h5> <br/>
              <p>Traductice Anglais/Espagnol</p>
            </div>
            <hr/>

            <div>
              <p>Kristhel s’assure que chaque phrase est parfaitement traduite en Anglais et Espagnol.</p>
            </div>
          </div>

          <div className="col colequipe">
            <div className="imgPresentationContainer">
              <img src="https://maxandlea.com/wp-content/uploads/2020/11/xavier.jpg" alt=""/>
            </div>
            <div>
              <h5>Xavier <br/> CARRASCO</h5> <br/>
              <p>Graphiste & Designer</p>
            </div>
            <hr/>

            <div>
              <p>Xavier prépare les Design et Graphismes de Max & Lea.
                Il s’assure aussi de la meilleure expérience utilisateur du site.</p>
            </div>
          </div>

          <div className="col colequipe">
            <div className="imgPresentationContainer">
              <img src="https://maxandlea.com/wp-content/uploads/2020/11/stephane.jpg" alt=""/>
            </div>
            <div>
              <h5>Stephane <br/> COUNDOURIS</h5> <br/>
              <p>Responsable Normes & certifications</p>
            </div>
            <hr/>

            <div>
              <p>Stephane s’assure que nos jouets répondent à toutes les Normes. Rien ne lui échappe !</p>
            </div>
          </div>

          <div className="col colequipe">
            <div className="imgPresentationContainer">
              <img src="https://maxandlea.com/wp-content/uploads/2020/11/Alexandre-2-300x290.jpg" alt=""/>
            </div>
            <div>
              <h5>Alexandre <br/> LOONES</h5> <br/>
              <p>Film & Montage Vidéos</p>
            </div>
            <hr/>

            <div>
              <p>Alexandre s’occupe avec beaucoup d’amour et d’attention des réalisation et des montages de chaque vidéo Max & Lea.</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col colequipe">
            <div className="imgPresentationContainer">
              <img src="https://maxandlea.com/wp-content/uploads/2020/11/sandy-300x300.jpg" alt=""/>
            </div>
            <div>
              <h5>Sandy <br/> EUDELINE</h5> <br/>
              <p>Service Juridique</p>
            </div>
            <hr/>

            <div>
              <p>Sandy s’assure de toute la gestion Juridique et Administrative de Max & Lea.</p>
            </div>
          </div>

          <div className="col colequipe">
            <div className="imgPresentationContainer">
              <img src="https://maxandlea.com/wp-content/uploads/2020/11/delphine-300x278.jpg" alt=""/>
            </div>
            <div>
              <h5>Delphine <br/> ESPOSITO</h5> <br/>
              <p>Service client</p>
            </div>
            <hr/>

            <div>
              <p>Delphine prend soin de chacun de nos clients et s’assure que les commandes et les livraisons se passent parfaitement.</p>
            </div>
          </div>

          <div className="col colequipe">
            <div className="imgPresentationContainer">
              <img src="https://maxandlea.com/wp-content/uploads/2020/11/carla.png" alt=""/>
            </div>
            <div>
              <h5>Carla <br/> GOMEZ</h5> <br/>
              <p>Dessinatrice & Illustratrice</p>
            </div>
            <hr/>

            <div>
              <p>Carla nous fait tous nos jolis dessins, nos ebooks et nos belles illustrations.</p>
            </div>
          </div>

          <div className="col colequipe">
            <div className="imgPresentationContainer">
              <img src="https://maxandlea.com/wp-content/uploads/2021/02/hadrien-300x300.jpg" alt=""/>
            </div>
            <div>
              <h5>Hadrien <br/> JAUBERT</h5> <br/>
              <p>Développement informatique</p>
            </div>
            <hr/>

            <div>
              <p>Hadrien travail en binôme avec Theodore et assure les développements de Max & Lea.</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col colequipe">
            <div className="imgPresentationContainer">
              <img src="https://maxandlea.com/wp-content/uploads/2021/02/nora-300x300.jpg" alt=""/>
            </div>
            <div>
              <h5>Nora <br/> CHELABI</h5> <br/>
              <p>Contrôle de gestion</p>
            </div>
            <hr/>

            <div>
              <p>Nora est notre Excel Expert !
                C’est elle qui se charge de réaliser tous nos tableaux d’analyse et de contrôle de gestion.</p>
            </div>
          </div>

          <div className="col colequipe">
            <div className="imgPresentationContainer">
              <img src="https://maxandlea.com/wp-content/uploads/2021/02/Shana-300x300.jpg" alt=""/>
            </div>
            <div>
              <h5>Shana <br/> CUBRILOVIC</h5> <br/>
              <p>Traductrice & Correctrice Allemand</p>
            </div>
            <hr/>

            <div>
              <p>Shana assure toutes les traductions Allemand de nos jouets et des futurs jouets Max & Lea.</p>
            </div>
          </div>

          <div className="col colequipe">
            <div className="imgPresentationContainer">
              <img src="https://maxandlea.com/wp-content/uploads/2021/02/Friederike-300x300.jpg" alt=""/>
            </div>
            <div>
              <h5>Friederike <br/> KRIEGER</h5> <br/>
              <p>Traductrice & Correctrice Allemand</p>
            </div>
            <hr/>

            <div>
              <p>En binôme avec Shana, Friederike assure la relecture et la correction de tous nos pages en Allemand.</p>
            </div>
          </div>

        </div>



      </div>
      </div>

      <Footer />
    </div>
  );
};

export default Equipe;
