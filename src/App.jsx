import { useEffect, useState } from "react";
import "./App.css";

import Dashboard from "./components/Dashboard";
import Convidados from "./pages/Convidados";
import Compras from "./pages/Compras";

function App() {
  const [pagina, setPagina] = useState("dashboard");

  const [convidados, setConvidados] = useState(() => {
    const guardados = localStorage.getItem("convidados-duarte");

    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "convidados-duarte",
      JSON.stringify(convidados)
    );
  }, [convidados]);

  function adicionarConvidado(novoConvidado) {
    setConvidados([
      ...convidados,
      {
        ...novoConvidado,
        id: crypto.randomUUID(),
      },
    ]);
  }

  function editarConvidado(convidadoAtualizado) {
    setConvidados(
      convidados.map((convidado) =>
        convidado.id === convidadoAtualizado.id
          ? convidadoAtualizado
          : convidado
      )
    );
  }

  function apagarConvidado(id) {
    const confirmar = window.confirm(
      "Tens a certeza de que queres apagar este convidado?"
    );

    if (!confirmar) return;

    setConvidados(
      convidados.filter((convidado) => convidado.id !== id)
    );
  }

  return (
    <div className="app">
      <div className="card">

        <div className="logo">✈️</div>

        <h1>Missão DU-002</h1>

        <h2>O Duarte faz 2 anos! 🎉</h2>

        <p className="sub">
          Bem-vindos ao painel da festa.
        </p>

        {pagina === "dashboard" && (
          <>
            <Dashboard convidados={convidados} />

            <button
              className="botao"
              onClick={() => setPagina("convidados")}
            >
              👥 Gerir convidados
            </button>

            <button
              className="botao botao-compras"
              onClick={() => setPagina("compras")}
            >
              🛒 Lista de Compras
            </button>
          </>
        )}

        {pagina === "convidados" && (
          <>
            <Convidados
              convidados={convidados}
              adicionarConvidado={adicionarConvidado}
              editarConvidado={editarConvidado}
              apagarConvidado={apagarConvidado}
            />

            <button
              className="botao botao-voltar"
              onClick={() => setPagina("dashboard")}
            >
              ⬅️ Voltar ao painel
            </button>
          </>
        )}

        {pagina === "compras" && (
          <>
            <Compras convidados={convidados} />

            <button
              className="botao botao-voltar"
              onClick={() => setPagina("dashboard")}
            >
              ⬅️ Voltar ao painel
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default App;