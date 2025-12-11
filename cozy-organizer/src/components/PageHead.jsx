import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";

import Tool from './PageTool.jsx';

import Profile from '../assets/icons/tarjeta-de-identificacion.png'
import Transactions from '../assets/icons/presupuesto-de-tareas-de-lista-de-verificacion.png'
import Pendings from '../assets/icons/computadora-portatil.png'
import Daylies from '../assets/icons/consultar-calendario.png'
import Goals from '../assets/icons/objetivos.png'
import Graphics from '../assets/icons/grafico-histograma.png'

const PageHead = ({ opened = false, selected }) => {
    const Clock = () => {
        var [date, setDate] = useState(new Date());

        useEffect(() => {
            var timer = setInterval(() => setDate(new Date()), 1000);
            return function cleanup() {
                clearInterval(timer);
            };
        });

        let localeDate = date.toLocaleDateString('es-ES',{
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        .replace(/ de (\w)/, (m, p) => " de " + p.toUpperCase());

        return (
            <>
                <p>{localeDate}</p>
                <p>{date.toLocaleTimeString('en-US', { hour12: true })}</p>
            </>
        );
    };


    return (
        <header id="page-head" className={opened ? "menu-opened" : ""}>
            {opened && 
            <div id="short-cuts">
                <Tool>
                    <img src={Profile} alt="Mi perfil" className={selected !== 0 ? "w-icon" : "selected-icon"} />
                </Tool>
                <Tool>
                    <img src={Transactions} alt="Transacciones" className={selected !== 1 ? "w-icon" : "selected-icon"} />
                </Tool>
                <Tool>
                    <img src={Pendings} alt="Pendientes" className={selected !== 2 ? "w-icon" : "selected-icon"} />
                </Tool>
                <Tool>
                    <img src={Daylies} alt="Diarios" className={selected !== 3 ? "w-icon" : "selected-icon"} />
                </Tool>
                <Tool>
                    <img src={Goals} alt="Metas" className={selected !== 4 ? "w-icon" : "selected-icon"} />
                </Tool>
                <Tool>
                    <img src={Graphics} alt="Gráficos" className={selected !== 5 ? "w-icon" : "selected-icon"} />
                </Tool>
            </div>
            }
            <div id="date-time">
                <Clock />
            </div>
        </header>
    )
};

export default PageHead;