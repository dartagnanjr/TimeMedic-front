import React from "react";
import "./Pessoa.css"
import Medicamentos from "./Medicamentos";

function getMedicamentos () {
    return (
                <div>
                    <main>
                        <Medicamentos /> 
                    </main> 
                </div>
           ) 
}
const Pessoa = (props) => (
    <div className="Pessoa">
        <h3>Nome: {props.nome} {props.sobre_nome} </h3>
        <p> {props.key}</p>
        <li><strong>Data de Nascimento</strong> {props.data_nascimento}</li>
        <li><strong>Email</strong> {props.email}</li>
        <button onClick={getMedicamentos}>Medicamentos</button>
    </div>
);

export default Pessoa;