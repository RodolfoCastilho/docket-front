import { useEffect } from "react";
import "./styles.scss";

export const Ticket = ({ data }) => {
    useEffect(() => {
        console.log(data)
    }, [])

  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <h3>{data.documentName}</h3>
        <button></button>
      </div>
      <div className="box-data">
        <div className="private-data">
          <p>
            <b>{data.type === "person" ? "Pessoa física" : "Pessoa jurídica"}</b>
          </p>
          <p>Nome: {data.name}</p>
          <p>CPF: {data.documentValue}</p>
        </div>
        <div className="registry-data">
          <p>
            <b>Dados do cartório</b>
          </p>
          <p>CEP: {data.zipcode}</p>
          <p>Rua: {data.street} N°: {data.number}</p>
          <p>Cidade: {data.city} UF: {data.state}</p>
        </div>
      </div>
      <hr />
      <p className="ticket-footer">Data de criação: {data.createdAt}</p>
    </div>
  );
};
