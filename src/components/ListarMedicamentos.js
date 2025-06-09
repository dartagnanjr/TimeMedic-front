import { useEffect } from "react";
import Medicamento from "./Medicamento";
import './styles/ListarMedicamentos.css'
import MyButton from "../hooks/MyButton";
import { useNavigate, useLocation } from "react-router-dom";
import useMedicamentos from "../hooks/useMedicamento";

function ListarMedicamentos(props) {
    
    const location = useLocation();
    const navigate = useNavigate()
    const {medicamentos, getMedicamentos, habilitaDesabilita, destroyMedicamento} = useMedicamentos([]);
    
   useEffect(() => {
        getMedicamentos(location.state.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    // eslint-disable-next-line 
    , [ location.state.id ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (
        <div className="ListaMedicamentos">
            {
                medicamentos?.map(_medic => (
                    !habilitaDesabilita(_medic) ?
                        <Medicamento
                            
                            className="medicamento"
                            medicamento={_medic}
                            removerMedicamento={() => destroyMedicamento(_medic)}
                        />
                       : null
                ))
            }
            <MyButton className="formButton" onClick={() => (navigate(-1))} >Retornar</MyButton>
        </div>

    )
}

export default ListarMedicamentos