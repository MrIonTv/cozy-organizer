import MagGlass from '../../assets/icons/busqueda.png'
import '../../styles/transactions.css'
const Searchbar = ({onChange}) => {

    return (
        <div id="search-bar">
            <img src={MagGlass} alt="Buscar" title='Buscar' style={{width:"50px", height:"50px", marginLeft:"10px"}} className='w-icon'/>
            <input
                type="text"
                placeholder="Buscar..."
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default Searchbar;