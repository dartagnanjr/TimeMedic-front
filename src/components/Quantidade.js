import React, { useState, useEffect } from "react";
import MyButton from "../hooks/MyButton";
import './Quantidade.css'

const Quantidade = (props) => {
    const [ ishidden, setIsHidden ] = useState(true);
    const [ qtde, setQuantidade ] = useState(props.quantidade_estoque)
    const [ vr, setVr ] = useState(0)

    useEffect(() => {

        fetch(`http://192.168.0.152:3001/medicamentos/${props.id}`, {
            method: 'GET'
        }).then(result => result.json()
        ).then(dados => {
            if (!dados){
                return
            } else {
                setQuantidade(dados.quantidade_estoque)
            }
        })
    }, )

    const onClickAdicionar = (event) => {
        //event.preventDefault()
        setIsHidden(!ishidden)
    }

    const onClickSalvar = (event) => {
        //event.preventDefault()
        
        if (window.confirm`Tem certeza que deseja incluir a nova quantidade ${event.target.value} ?`){
            
            const payLoad = { quantidade_estoque: vr }
            fetch(`http://192.168.0.152:3001/medicamentos/${props.id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(payLoad)
            }).then(result => {
                if (!result.ok) {
                    alert('Problemas incluindo quantidade no estoque.')
                } else {
                    setQuantidade(result.quantidade_estoque)
                    alert('Estoque do medicamento atualizado com sucesso.')
                    setIsHidden(true)
                }
            })
        }
    }
    return (
        <tr>
            <td>{qtde}</td>
            <td>
                <MyButton className="button" onClick={onClickAdicionar} >Adicionar</MyButton>
                <input style={{ width: "35px", marginLeft: "0", border: "0"}} hidden={ishidden} className="inputQtde" type="text" name="adicionar" placeholder="Digite novo horáio" value={vr} onChange={(event) => setVr(event.target.value)} />
                <button className="button" type="submit" hidden={ishidden} onClick={onClickSalvar} >Salvar</button> 
            </td>
            

        </tr>
        
        // <tr>
           
        //     <td>
                        //     </td>
        // </tr>
    )
}

export default Quantidade
