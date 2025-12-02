import { Link } from "react-router-dom";

import Container from "../components/Container.jsx"
import PageHead from "../components/PageHead"
import Tool from "../components/PageTool"

import Profile from '../assets/icons/tarjeta-de-identificacion.png'
import Transactions from '../assets/icons/presupuesto-de-tareas-de-lista-de-verificacion.png'
import Pendings from '../assets/icons/computadora-portatil.png'
import Daylies from '../assets/icons/consultar-calendario.png'
import Goals from '../assets/icons/objetivos.png'
import Graphics from '../assets/icons/grafico-histograma.png'
import '../styles/home.css'

const Home = () => {
  return (
    <>
      <PageHead />
      <main>
        <div id="home">
          <div id="welcome">
            <h1>Hola!</h1>
            <p>Espero Tengas un Hermoso Día.</p>
          </div>
          <div id="dashboard">
              <Tool>
                  <img src={Profile} alt="Mi perfil" className={"w-icon"} />
              </Tool>
                            <Tool>
                  <img src={Transactions} alt="Mi perfil" className={"w-icon"} />
              </Tool>
              <Tool>
                  <img src={Pendings} alt="Mi perfil" className={"w-icon"} />
              </Tool>
              <Tool>
                  <img src={Daylies} alt="Mi perfil" className={"w-icon"} />
              </Tool>
              <Tool>
                  <img src={Goals} alt="Mi perfil" className={"w-icon"} />
              </Tool>
              <Tool>
                  <img src={Graphics} alt="Mi perfil" className={"w-icon"} />
              </Tool>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;