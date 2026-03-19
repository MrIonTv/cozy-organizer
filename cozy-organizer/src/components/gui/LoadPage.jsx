import Container from "./Container";
import PageHead from "./PageHead";

export default function LoadPage({ handleSelectFolder }) {
    return (
        <Container>
            <PageHead />
            <main>
                <div id="dashboard" style={{
                    display:"grid",
                    gridTemplateRows:"1fr 1fr 1fr",
                    gridTemplateColumns:"none",
                }}>
                    <h2>Carpeta de Perfiles</h2>
                    <button onClick={handleSelectFolder} className="page-tool">
                        Dar Acceso a Una Carpeta
                    </button>
                </div>
            </main>
        </Container>
    );
};