import './App.css';
import { useState } from 'react';

function App() {

  const [endereco, setEndereco] = useState({});
  
  const manipularEndereco = (evento) => {

    const cep = evento.target.value;

    setEndereco({
      cep
    })

    if(cep && cep.length === 8) {
      //obter o cep
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {

          setEndereco(cepDigitado => ({
            ...cepDigitado,
            rua: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf
          }))
        })
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <input placeholder='Digite o cep' onChange={manipularEndereco} />
        <ul>
          <li>CEP: {endereco.cep}</li>
          <li>Rua: {endereco.rua}</li>
          <li>Bairro: {endereco.bairro}</li>
          <li>Cidade: {endereco.cidade}</li>
          <li>Estado: {endereco.estado}</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
