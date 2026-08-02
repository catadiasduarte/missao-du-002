import { useState } from "react";

const formularioInicial = {
  nome: "",
  adultos: 1,
  criancas: 0,
  bebes: 0,
  estado: "pendente",
};

function Convidados({
  convidados,
  adicionarConvidado,
  editarConvidado,
  apagarConvidado,
}) {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [idEmEdicao, setIdEmEdicao] = useState(null);

  function alterarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario({
      ...formulario,
      [name]:
        name === "nome" || name === "estado"
          ? value
          : Number(value),
    });
  }

  function guardarConvidado() {
    if (formulario.nome.trim() === "") {
      alert("Escreve o nome ou o nome da família.");
      return;
    }

    const dados = {
      ...formulario,
      nome: formulario.nome.trim(),
    };

    if (idEmEdicao) {
      editarConvidado({
        ...dados,
        id: idEmEdicao,
      });
    } else {
      adicionarConvidado(dados);
    }

    cancelarEdicao();
  }

  function iniciarEdicao(convidado) {
    setFormulario({
      nome: convidado.nome,
      adultos: convidado.adultos,
      criancas: convidado.criancas,
      bebes: convidado.bebes,
      estado: convidado.estado,
    });

    setIdEmEdicao(convidado.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelarEdicao() {
    setFormulario(formularioInicial);
    setIdEmEdicao(null);
  }

  return (
    <div>
      <h2>👥 Convidados</h2>

      <div className="formulario">
        <label htmlFor="nome">Nome ou família</label>

        <input
          id="nome"
          name="nome"
          type="text"
          placeholder="Ex.: Família Silva"
          value={formulario.nome}
          onChange={alterarCampo}
        />

        <label htmlFor="adultos">Adultos</label>

        <input
          id="adultos"
          name="adultos"
          type="number"
          min="0"
          value={formulario.adultos}
          onChange={alterarCampo}
        />

        <label htmlFor="criancas">Crianças</label>

        <input
          id="criancas"
          name="criancas"
          type="number"
          min="0"
          value={formulario.criancas}
          onChange={alterarCampo}
        />

        <label htmlFor="bebes">Bebés</label>

        <input
          id="bebes"
          name="bebes"
          type="number"
          min="0"
          value={formulario.bebes}
          onChange={alterarCampo}
        />

        <label htmlFor="estado">Estado da confirmação</label>

        <select
          id="estado"
          name="estado"
          value={formulario.estado}
          onChange={alterarCampo}
        >
          <option value="pendente">⏳ Pendente</option>
          <option value="confirmado">✅ Confirmado</option>
          <option value="nao-vai">❌ Não vai</option>
        </select>

        <button
          className="botao"
          onClick={guardarConvidado}
        >
          {idEmEdicao
            ? "💾 Guardar alterações"
            : "➕ Guardar convidado"}
        </button>

        {idEmEdicao && (
          <button
            className="botao-secundario"
            onClick={cancelarEdicao}
          >
            Cancelar edição
          </button>
        )}
      </div>

      <div className="lista-convidados">
        {convidados.length === 0 ? (
          <p>Ainda não adicionaste convidados.</p>
        ) : (
          convidados.map((convidado) => (
            <div className="convidado" key={convidado.id}>
              <div className="linha-convidado">
                <strong>{convidado.nome}</strong>

                <span className={`estado ${convidado.estado}`}>
                  {convidado.estado === "confirmado" && "✅ Confirmado"}
                  {convidado.estado === "pendente" && "⏳ Pendente"}
                  {convidado.estado === "nao-vai" && "❌ Não vai"}
                </span>
              </div>

              <p>
                👨 {convidado.adultos} adultos · 🧒{" "}
                {convidado.criancas} crianças · 👶{" "}
                {convidado.bebes} bebés
              </p>

              <div className="acoes">
                <button
                  className="editar"
                  onClick={() => iniciarEdicao(convidado)}
                >
                  ✏️ Editar
                </button>

                <button
                  className="apagar"
                  onClick={() => apagarConvidado(convidado.id)}
                >
                  🗑️ Apagar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Convidados;