import { Formik } from "formik";

import "./styles.scss";
import headerImg from "../../assets/header-img.png";

export function Dashboard() {
    const handleSubmit = (e) => {
        console.log(e)
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
            <span className="divider"></span>

            <Formik
              initialValues={{
                documentName: "",
                type: "",
                document: "",
                name: "",
                zipCode: "",
                street: "",
                number: "",
                city: "",
                state: "",
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="documentName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.documentName}
                  />
                  <input
                    type="text"
                    name="type"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.type}
                  />
                  <input
                    type="text"
                    name="document"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.document}
                  />
                  <input
                    type="text"
                    name="documentName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.documentName}
                  />
                  <input
                    type="text"
                    name="documentName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.documentName}
                  />
                  <input
                    type="text"
                    name="documentName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.documentName}
                  />
                  <input
                    type="text"
                    name="documentName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.documentName}
                  />
                  <input
                    type="text"
                    name="documentName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.documentName}
                  />
                  <input
                    type="text"
                    name="documentName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.documentName}
                  />
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </main>

        <footer>
          <p>DOCKET © 2021</p>
        </footer>
      </div>
    </>
  );
}
