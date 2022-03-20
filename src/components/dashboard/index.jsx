import { Formik } from "formik";
import { useState } from "react";
import { findCEP } from "../../services/api";
import { useSnackbar } from 'react-simple-snackbar'

import "./styles.scss";
import headerImg from "../../assets/header-img.png";

export function Dashboard() {
  const options = {
    position: 'center',
    style: {
      backgroundColor: 'red',
      color: 'white',
      fontSize: '12px',
      textAlign: 'center',
    },
  }

  const [openSnackbar] = useSnackbar(options)

  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")

  const handleFindZipCode = async (e) => {
    if (e.target.value.length <= 7) {
      openSnackbar("Digite um CEP válido!");
    } else {
      const data = await findCEP(e.target.value);
      setStreet(data.logradouro);
      setCity(data.localidade);
      setState(data.uf);
    }
  }

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
          <div className="form-container">
            <h3>Adicionar documentos ao pedido</h3>
            <hr className="divider"></hr>

            <div className="form">
              <Formik
                initialValues={{
                  documentName: "",
                  type: "person",
                  documentType: "",
                  name: "",
                  zipCode: "",
                  street: "",
                  number: "",
                  city: "",
                  state: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  console.log(values);
                  setSubmitting(false);
                }}
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
                    <label className="label-document" htmlFor="document">
                      {values.type === "person" ? "CPF:" : "CNPJ:"}
                    </label>
                    <input
                      type="text"
                      placeholder="Digite aqui"
                      id="document"
                      onChange={handleChange}
                      value={values.document}
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
                        <label htmlFor="documentName">UF:</label>
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
                    <button type="submit" disabled={isSubmitting}>
                      Criar documento
                    </button>
                  </form>
                )}
              </Formik>
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
