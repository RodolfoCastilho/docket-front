import { Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { findCEP } from "../../services/api";
import { useSnackbar } from "react-simple-snackbar";
import { IMaskInput } from "react-imask";
import * as Yup from "yup";

import "./styles.scss";
import headerImg from "../../assets/header-img.png";
import axios from "axios";
import { Ticket } from "../ticket";

export function Dashboard() {
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
      backgroundColor: "green",
      color: "white",
      fontSize: "12px",
      textAlign: "center",
    },
  }; 

  const FormSchema = Yup.object().shape({
    documentName: Yup.string().required("Obrigatório"),
    type: Yup.string().required("Obrigatório"),
    zipCode: Yup.number().required("Obrigatório"),
    number: Yup.number().required("Obrigatório"),
  });

  const [openErrorSnackbar] = useSnackbar(errorOpt);
  const [openSuccessSnackbar] = useSnackbar(sucessOpt);

  const [documents, setDocuments] = useState([]);
  const [docCounter, setDocCounter] = useState(0);
  const [lastId, setLastId] = useState([]);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFindZipCode = async (e) => {
    if (e.target.value.length <= 7 || e.target.value.length > 8) {
      openErrorSnackbar("Digite um CEP válido!");
    } else {
      const data = await findCEP(e.target.value);
      setStreet(data.logradouro);
      setCity(data.localidade);
      setState(data.uf);
    }
  };

  const fetchDocuments = async () => {
    const res = await axios.get("http://localhost:3000/documents");
    return res.data;
  };

  useEffect(() => {
    fetchDocuments().then(function (values) {
      let lastId = values.map((obj) => obj.id).slice(-1);
      setDocCounter(values.length);
      setLastId(lastId);
      setDocuments(values);
    });
  }, []);

  return (
    <>
      <div className="content">
        <header>
          <img src={headerImg} alt="Header" />
        </header>

        <main>
          <h2>Pedido #1</h2>
          <div className="first-container">
            <div className="first-container-header">
              <h3>Lead: Documento para criar contrato</h3>
              <div className="status">
                <span className="circle"></span>
                <p>Em andamento</p>
              </div>
            </div>
            <p className="observation-text">
              <b>Observação</b>:Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Aliquam sollicitudin commodo faucibus. Nullam ut
              pharetra turpis. Vestibulum molestie turpis ac tortor dapibus
              porttitor. Orci varius natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus. Etiam in elit vitae ligula
              consectetur hendrerit id id odio. Vestibulum volutpat gravida arcu
              sit amet tempus. In rhoncus leo vel dolor convallis gravida id a
              nulla .
            </p>
            <div className="first-container-footer">
              <p>
                <b>Criado por:</b>Rodolfo Castilho
              </p>
              <p>
                <b>Data de Criação:</b>18/03/2022
              </p>
            </div>
          </div>
          <div className="side-by-side">
            <div className="form-container">
              <h3>Adicionar documentos ao pedido</h3>
              <hr className="divider"></hr>

              <div className="form">
                <Formik
                  initialValues={{
                    documentName: "",
                    type: "person",
                    documentValue: "",
                    name: "",
                    zipCode: "",
                    number: "",
                  }}
                  onSubmit={(values) => {
                    const data = {
                      id: lastId[0] + 1,
                      createdAt: new Date(),
                      street,
                      city,
                      state,
                      ...values,
                    };
                    setIsLoading(true);
                   try {
                    axios
                    .post("http://localhost:3000/documents", data)
                    .then(function () {
                      setDocCounter(docCounter + 1);
                      setTimeout(() => {
                        setIsLoading(false);
                        setDocuments(...documents, data);
                        window.location.reload();
                      }, 1000);
                      openSuccessSnackbar("Documento criado com sucesso.")
                    })
                   } catch (e) {
                    openErrorSnackbar("Houve um erro ao criar o documento!")
                   }
                  }}
                  validationSchema={FormSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <label htmlFor="documentName">Nome do documento:</label>
                      <input
                        type="text"
                        placeholder="Digite aqui"
                        id="documentName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.documentName}
                      />
                      {errors.documentName && touched.documentName ? (
                        <div style={{color: "red"}}>{errors.documentName}</div>
                      ) : null}
                      <label style={{ display: "flex" }} htmlFor="type">
                        Tipo do Documento:
                      </label>
                      <select
                        id="type"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.type}
                      >
                        <option value="person">Pessoa Física</option>
                        <option value="company">Pessoa Jurídica</option>
                      </select>
                      <label className="label-document" htmlFor="documentValue">
                        {values.type === "person" ? "CPF:" : "CNPJ:"}
                      </label>
                      <IMaskInput
                        id="documentValue"
                        mask={
                          values.type === "person"
                            ? "000.000.000-00"
                            : " 00.000.000/0000-00"
                        }
                        value={values.documentValue}
                        placeholder="Digite aqui"
                        onChange={handleChange}
                      />
                      <div className="box-name">
                        <label htmlFor="name">
                          {values.type === "person"
                            ? "Nome Completo:"
                            : "Razão Social:"}
                        </label>
                        <input
                          type="text"
                          id="name"
                          placeholder="Digite aqui"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                      </div>
                      {errors.name && touched.name ? (
                        <div style={{color: "red"}}>{errors.name}</div>
                      ) : null}
                      <h4>Dados do cartório</h4>
                      <div className="box-zipcode">
                        <label htmlFor="zipCode">CEP:</label>
                        <input
                          placeholder="Digite aqui"
                          type="text"
                          id="zipCode"
                          className="input-zipcode"
                          onChange={handleChange}
                          onBlur={handleFindZipCode}
                          value={values.zipCode}
                        />
                      </div>
                      {errors.name && touched.name ? (
                        <div style={{color: "red"}}>{errors.name}</div>
                      ) : null}
                      <div style={{ display: "flex" }}>
                        <div className="box-street">
                          <label htmlFor="street">Rua:</label>
                          <input
                            type="text"
                            placeholder="Digite aqui"
                            className="input-street"
                            disabled
                            id="street"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={street}
                          />
                        </div>
                        <div className="box-number">
                          <label htmlFor="number">Número:</label>
                          <input
                            type="text"
                            placeholder="Digite aqui"
                            className="input-number"
                            id="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.number}
                          />
                          {errors.number && touched.number ? (
                            <div style={{color: "red"}}>{errors.number}</div>
                          ) : null}
                        </div>
                      </div>
                      <div style={{ display: "flex" }}>
                        <div className="box-city">
                          <label htmlFor="documentName">Cidade:</label>
                          <input
                            type="text"
                            placeholder="Digite aqui"
                            disabled
                            id="city"
                            className="input-city"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={city}
                          />
                        </div>
                        <div className="box-state">
                          <label htmlFor="state">UF:</label>
                          <input
                            type="text"
                            placeholder="Digite aqui"
                            id="state"
                            disabled
                            className="input-state"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={state}
                          />
                        </div>
                      </div>
                      <button type="submit">Criar documento</button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="tickets-area">
              <h2 style={{ marginTop: "10px" }}>
                {docCounter === 1
                  ? `${docCounter} documento solicitado`
                  : `${docCounter} documentos solicitados`}
              </h2>
              <div className="tickets">
                {isLoading ? (
                  <p>Carregando...</p>
                ) : Array.isArray(documents) ? (
                  documents.map((obj) => <Ticket data={obj} key={obj.id} />)
                ) : null}
              </div>
            </div>
          </div>
        </main>

        <footer>
          <p>DOCKET © 2021</p>
        </footer>
      </div>
    </>
  );
}
