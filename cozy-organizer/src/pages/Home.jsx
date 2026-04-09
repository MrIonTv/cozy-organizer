import { Link } from "react-router-dom";

import Container from "../components/gui/Container.jsx"
import PageHead from "../components/gui/PageHead.jsx"
import Tool from "../components/gui/PageTool.jsx"

import Profile from '../assets/icons/tarjeta-de-identificacion.png'
import Transactions from '../assets/icons/presupuesto-de-tareas-de-lista-de-verificacion.png'
import Pendings from '../assets/icons/computadora-portatil.png'
import Daylies from '../assets/icons/consultar-calendario.png'
import Goals from '../assets/icons/objetivos.png'
import Graphics from '../assets/icons/grafico-histograma.png'
import '../styles/home.css'

const Home = () => {
  return (
    <Container>
      <PageHead />
      <main>
        <div id="home">
          <div id="welcome">
            <h1>Hola!</h1>
            <p>Espero Tengas un Hermoso Día.</p>
          </div>
          <div id="dashboard">
              <Tool>
                  <Link to={"/profiles"}>
                    <img src={Profile} alt="Perfiles" title="Perfiles" className="w-icon" />
                  </Link>
              </Tool>
              <Tool>
                <Link to={"/transactions"}>
                  <img src={Transactions} alt="Transacciones" title="Transacciones" className="w-icon" />
                </Link>
              </Tool>
              <Tool>
                  <img src={Pendings} alt="Pendientes"  title="Pendientes" className="w-icon" />
              </Tool>
              <Tool>
                  <img src={Daylies} alt="Diarias" title="Diarias" className="w-icon" />
              </Tool>
              <Tool>
                  <img src={Goals} alt="Metas" title="Metas" className="w-icon" />
              </Tool>
              <Tool>
                  <img src={Graphics} alt="Grafica" title="Grafica" className="w-icon" />
              </Tool>
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Home;