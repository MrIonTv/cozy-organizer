const PageTool = ({ children, action, type = "button" }) => {
    return (
        <button className="page-tool" onClick={action} type={type}>
            {children}
        </button>
    );
};

export default PageTool;