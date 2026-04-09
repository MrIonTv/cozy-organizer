import Container from "../components/gui/Container";
import PageHead from "../components/gui/PageHead";
import PageTool from "../components/gui/PageTool";
import Searchbar from "../components/gui/Searchbar";
import Listable from "../components/gui/Listable";

import TransactionsTypesIcon from '../assets/icons/lista-desplegable.png'
import '../styles/transactions.css'

const TextAreaAutosize = ({ limit=150, placeHolder="Escribe aquí..." }) => {
    const handleInput = (event) => {
        const textarea = event.target;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };
    return (
        <textarea
            defaultValue={defaultValue}
            onInput={handleInput}
            style={{ overflow: "hidden", resize: "none" }}
        />
    );
};


const Transactions = () => {
    const columns = [
        { name: "", width: "1fr" },
        { name: "Monto", width: "2fr" },
        { name: "Fecha", width: "2fr" },
        { name: "Descripción de la Transacción", width: "5fr" },
        { name: "", width: "1fr" },
        { name: "", width: "1fr" },
    ];

    return (
        <Container>
            <PageHead opened={true} selected={1} />
            <main>
                <div className="transaction-container">
                    <div className="transaction-header">
                        <PageTool>
                            <img src={TransactionsTypesIcon} alt="Tipos de Transacciones" title="Tipos de Transacciones" className="w-icon"/>
                        </PageTool>
                        <Searchbar />
                        
                    </div>
                    <div className="transaction-board">
                    <Listable columns={columns}>
                        <div className="listable-row transaction-row">
                            <button className="transaction-type-btn">Gasto</button>
                            <input type="number" min="0" defaultValue="$100.00" readOnly={true} />
                            <input type="date" defaultValue="2024-06-01" />
                            <textarea defaultValue="Compra en supermercadoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"></textarea>
                        </div>
                        <div className="listable-row">
                            <div></div>
                            <div>$200.00</div>
                            <div>2024-06-02</div>
                            <div>Pago de servicios</div>
                        </div>
                        <div className="listable-row">
                            <div></div>
                            <div>$300.00</div>
                            <div>2024-06-03</div>
                            <div>Ingreso por salario</div>
                        </div>
                    </Listable>
                    </div>
                </div>
            </main>
        </Container>
    );
};

export default Transactions;