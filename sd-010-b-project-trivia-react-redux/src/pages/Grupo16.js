import React from 'react';
import { Link } from 'react-router-dom';

// tela dos devs

class Grupo16 extends React.Component {
  renderDevInfos() {
    return (
      <div className="dev-div">
        <div className="bodega">
          <h3>Arthur Menezes Correa</h3>
          <img src="https://avatars.githubusercontent.com/u/69862067?s=400&u=985aa986eef30f10419e9fc31fa885c08206967f&v=4" alt="Arthur" />
          <div className="devs-media">
            <a href="https://github.com/arthur-menezes202"><img src="https://image.flaticon.com/icons/png/512/25/25231.png" alt="GitHub" /></a>
            <a href="https://www.linkedin.com/in/arthur-m-106216171/"><img src="https://image.flaticon.com/icons/png/512/174/174857.png" alt="linkedin" /></a>
          </div>
        </div>
        <div className="bodega">
          <h3>Daniel Roberto da Silva</h3>
          <img src="https://avatars.githubusercontent.com/u/78499630?s=400&u=b4bffd7f58410e0d40d5960fbf689e53cfa4d1a8&v=4" alt="Daniel" />
          <div className="devs-media">
            <a href="https://github.com/DanielTrybe"><img src="https://image.flaticon.com/icons/png/512/25/25231.png" alt="GitHub" /></a>
            <a href="https://www.linkedin.com/in/danielrobertosilva/ "><img src="https://image.flaticon.com/icons/png/512/174/174857.png" alt="linkedin" /></a>
          </div>
        </div>
        <div className="bodega">
          <h3>Fernando Henrique Maia</h3>
          <img
            src={ 'https://avatars.githubusercontent.com/u/78622290?s=400&u='
            + '3a5e51fe4de7ea34a93388d30790e86232f8bb65&v=4' }
            alt="Fernando"
          />
          <div className="devs-media">
            <a href="https://github.com/fhomaia"><img src="https://image.flaticon.com/icons/png/512/25/25231.png" alt="GitHub" /></a>
            <a href="https://www.linkedin.com/in/fernandohmaia/"><img src="https://image.flaticon.com/icons/png/512/174/174857.png" alt="linkedin" /></a>
          </div>
        </div>
        <div className="bodega">
          <h3>Italo de Matos Saldanha</h3>
          <img src="https://avatars.githubusercontent.com/u/46801239?s=400&u=86c7415847363e93742864de41c3346ac6a9e39a&v=4 " alt="Italo" />
          <div className="devs-media">
            <a href="https://github.com/ItaloMatosDev"><img src="https://image.flaticon.com/icons/png/512/25/25231.png" alt="GitHub" /></a>
            <a href="https://www.linkedin.com/in/italo-de-matos/"><img src="https://image.flaticon.com/icons/png/512/174/174857.png" alt="linkedin" /></a>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <section className="section-div">
        <h1>Desenvolvedores</h1>
        { this.renderDevInfos() }
        <Link to="/">
          <div className="dev-btn-div">
            <button type="button" className="config-section-btn">&#9658;</button>
          </div>
        </Link>
      </section>
    );
  }
}

export default Grupo16;
