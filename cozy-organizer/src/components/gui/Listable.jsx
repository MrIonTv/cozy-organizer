import { Children, cloneElement } from "react";
import "../../styles/listable.css";


const Listable = ({ columns, children }) => {
    if (!Array.isArray(columns)) {
        return;
    }

    const columnTemplate = columns.map(col => col.width).join(" ");

    return (
        <div className="listable">
            <div className="elements-table">
                <div>
                    <div className="elements-title" style={{ gridTemplateColumns: columnTemplate }}>
                        {columns.map((col, index) => (
                            <div key={"column" + index}>
                                {col.name}
                            </div>
                        ))}
                    </div>

                    <div className="elements" style={{ gridTemplateColumns: columnTemplate }}>
                        {Children.map(children, child =>
                            cloneElement(child, {
                                style: { display: "grid", gridTemplateColumns: columnTemplate, alignItems: "center" }
                            })
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Listable;