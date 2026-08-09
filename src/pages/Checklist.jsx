import { useEffect, useState } from "react";

const tarefasIniciais = [
  "Comprar velas",
  "Fazer bolo",
  "Comprar gelo",
  "Preparar sangria",
  "Colocar bebidas no frio",
  "Preparar decoração",
  "Confirmar mesas e cadeiras",
  "Preparar pratos, copos e talheres",
  "Carregar coluna / telemóvel",
  "Montar Casa Duarte",
];

function Checklist() {
  const [tarefas, setTarefas] = useState(() => {
    const guardadas = localStorage.getItem("checklist-festa");

    return guardadas
      ? JSON.parse(guardadas)
      : tarefasIniciais.map((texto) => ({
          id: crypto.randomUUID(),
          texto,
          concluida: false,
        }));
  });

  const [novaTarefa, setNovaTarefa] = useState("");

  function exportarPDF() {
    window.print();
  }
  useEffect(() => {
    localStorage.setItem(
      "checklist-festa",
      JSON.stringify(tarefas)
    );
  }, [tarefas]);

  function alternarTarefa(id) {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  }

  function adicionarTarefa(e) {
    e.preventDefault();

    if (!novaTarefa.trim()) return;

    setTarefas([
      ...tarefas,
      {
        id: crypto.randomUUID(),
        texto: novaTarefa.trim(),
        concluida: false,
      },
    ]);

    setNovaTarefa("");
  }

  function apagarTarefa(id) {
    setTarefas(
      tarefas.filter((tarefa) => tarefa.id !== id)
    );
  }

  const porFazer = tarefas.filter(
    (tarefa) => !tarefa.concluida
  );

  const concluidas = tarefas.filter(
    (tarefa) => tarefa.concluida
  );

  return (
    <div className="checklist-festa">
      <h2>✅ Checklist da Festa</h2>

      <div className="checklist-resumo">
        <strong>{porFazer.length}</strong>
        <span>tarefas por fazer</span>

        <strong>{concluidas.length}</strong>
        <span>concluídas</span>
      </div>

      <form
        className="nova-tarefa"
        onSubmit={adicionarTarefa}
      >
        <input
          type="text"
          placeholder="Ex.: Comprar carvão"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
        />

        <button className="botao" type="submit">
          ➕ Adicionar tarefa
        </button>
      </form>

      {porFazer.length > 0 && (
        <div className="grupo-checklist">
          <h3>📌 Por fazer</h3>

          {porFazer.map((tarefa) => (
            <div
              className="tarefa-item"
              key={tarefa.id}
            >
              <label>
                <input
                  type="checkbox"
                  checked={false}
                  onChange={() =>
                    alternarTarefa(tarefa.id)
                  }
                />

                <span>{tarefa.texto}</span>
              </label>

              <button
                className="apagar-tarefa"
                onClick={() =>
                  apagarTarefa(tarefa.id)
                }
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}

      {concluidas.length > 0 && (
        <div className="grupo-checklist">
          <h3>🎉 Concluídas</h3>

          {concluidas.map((tarefa) => (
            <div
              className="tarefa-item tarefa-concluida"
              key={tarefa.id}
            >
              <label>
                <input
                  type="checkbox"
                  checked
                  onChange={() =>
                    alternarTarefa(tarefa.id)
                  }
                />

                <span>{tarefa.texto}</span>
              </label>

              <button
                className="apagar-tarefa"
                onClick={() =>
                  apagarTarefa(tarefa.id)
                }
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
      <button
  className="botao botao-pdf"
  onClick={exportarPDF}
>
  📄 Exportar checklist para PDF
</button>
    </div>
  );
}

export default Checklist;