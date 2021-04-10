import React, {useContext} from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import Garanties from "../components/GarantiesMaxEtLea";
import Engagement from "../components/Engagement";
import {Card} from 'react-bootstrap'
import {useTranslation} from "react-i18next";
import {AppContext} from "../components/context/AppContext";
import Link from "next/link";


const HomeScreen = (props) => {

  const [ cart, setCart ] = useContext( AppContext );
  console.log('cart', cart)

  const { t, i18n } = useTranslation();

  const {products} = props;

  console.log(products)


  return (
    <div>
      <Header/>
      <div className="baby-container">
        <div className="head-title-container">
          <h1 className="head-title">{t("HomeScreen1")}<br/> {t("HomeScreen7")}</h1>
        </div>
        <div>
          <p className="description-title">{t("HomeScreen2")}</p>
        </div>

        <div className="grid-container">

          <div className="row-card-home">


            <Card className="card-jouet playboard">
              <Link href="/playboard">
                <a>
                <p className="card-jouet-title" color="textSecondary" >
                  PLAYBOARD
                </p>
                <img src={'/playboard.png'} alt="" className="img-card"/>
                </a>
              </Link>
            </Card>



            <Card className="card-jouet tour">
              <Link href="/tour">
                <a>
                <p className="card-jouet-title" color="textSecondary">
                  TOUR ARC EN CIEL
                </p>
                <img src={'/tour.png'} alt="" className="img-card"/>
                </a>
              </Link>

            </Card>
          </div>

          <div className="row-card-home">

            <Card className="card-jouet xylophone">
              <Link href="/xylophone">
                <a>
                <p className="card-jouet-title" color="textSecondary">
                  XYLOPHONE
                </p>
                <img alt="" className="img-card" src={'/xylophonecard.png'}/>
                </a>
              </Link>
            </Card>



            <Card className="card-jouet bidule">
              <Link href="/playboard">
                <a>
                <p className="card-jouet-title" color="textSecondary">
                  BIDULE
                </p>
                <img alt="" className="img-card" src={'/playboard.png'}/>
                </a>
              </Link>
            </Card>


          </div>

          <div className="row-card-home">


            <Card className="card-jouet bidule2">
              <Link href="/playboard">
                <a>
                <p className="card-jouet-title" color="textSecondary">
                  BIDULE 2
                </p>
                <img alt="" className="img-card" src={'/playboard.png'}/>
                </a>
              </Link>
            </Card>


            <Card className="card-jouet bidule3">

              <Link href="/playboard">
                <a>
                <p className="card-jouet-title" color="textSecondary">
                  TOUR ARC EN CIEL
                </p>
                <img alt="" className="img-card" src={'/playboard.png'}/>
                </a>
              </Link>
            </Card>


          </div>

          <div className="row-card-home-special">


            <Card className="card-jouet bidule4">
              <Link href="/playboard">
                <a>
                <p className="card-jouet-title" color="textSecondary">
                  BIDULE 4
                </p>
                <img  alt="" className="img-card" src={'/playboard.png'}/>
                </a>
              </Link>
            </Card>



          </div>

        </div>

      </div>

      <div>
        <Garanties/>
      </div>

      <div>
        <Engagement/>
      </div>

      <Footer/>
    </div>
  )

};

export default HomeScreen
