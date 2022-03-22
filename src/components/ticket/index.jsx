import axios from "axios";
import "./styles.scss";
import { useSnackbar } from "react-simple-snackbar";

export const Ticket = ({ data }) => {
  const errorOpt = {
    position: "top-center",
    style: {
      backgroundColor: "red",
      color: "white",
      fontSize: "12px",
      textAlign: "center",
    },
  };

  const sucessOpt = {
    position: "top-center",
    style: {
      backgroundColor: "#00B98E",
      color: "white",
      fontSize: "12px",
      textAlign: "center",
    },
  };

  const [openErrorSnackbar] = useSnackbar(errorOpt);
  const [openSuccessSnackbar] = useSnackbar(sucessOpt);

  const formatDate = (date) => {
    var yyyy = date.substring(0, 4);
    var mm = date.substring(5, 7);
    var dd = date.substring(6, 7);

    return `${dd} do ${mm} de ${yyyy}`;
  };

  const handleDeleteItem = async () => {
    try {
      await axios
      .delete(`http://localhost:3000/documents/${data.id}`)
      .then(function () {
        window.location.reload();
        openSuccessSnackbar("Documento excluído com sucesso.");
      });
    } catch(e) {
      openErrorSnackbar("Houve um erro ao excluir o documento.")
    }
  };

  return (
    <>
      <div className="ticket-container">
        <div className="ticket-header">
          <h3>{data.documentName}</h3>
          <button className="delete-button" onClick={handleDeleteItem}></button>
        </div>
        <div className="box-data">
          <div className="private-data">
            <p>
              <b>
                {data.type === "person" ? "Pessoa física" : "Pessoa jurídica"}
              </b>
            </p>
            <p>Nome: {data.name}</p>
            <p>CPF: {data.documentValue}</p>
          </div>
          <div className="registry-data">
            <p>
              <b>Dados do cartório</b>
            </p>
            <p>CEP: {data.zipCode}</p>
            <p>
              Rua: {data.street} N°: {data.number}
            </p>
            <p>
              Cidade: {data.city} UF: {data.state}
            </p>
          </div>
        </div>
        <hr />
        <p className="ticket-footer">
          Data de criação: {formatDate(data.createdAt)}
        </p>
      </div>

    </>
  );
};
