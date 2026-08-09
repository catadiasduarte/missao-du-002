import { useEffect, useState } from "react";

const categorias = [
  "Descartáveis",
  "Decoração",
  "Comida e bolo",
  "Bebidas",
  "Outros",
];

function Despesas() {
  const [faturas, setFaturas] = useState(() => {
    const guardadas = localStorage.getItem("faturas-duarte");
    return guardadas ? JSON.parse(guardadas) : [];
  });

  const [loja, setLoja] = useState("");
  const [data, setData] = useState("");
  const [totalFatura, setTotalFatura] = useState("");
  const [faturaEmEdicao, setFaturaEmEdicao] = useState(null);

  const [linhas, setLinhas] = useState([
    { categoria: "Descartáveis", valor: "" },
  ]);

  useEffect(() => {
    localStorage.setItem(
      "faturas-duarte",
      JSON.stringify(faturas)
    );
  }, [faturas]);

  function adicionarLinha() {
    setLinhas([
      ...linhas,
      {
        categoria: "Descartáveis",
        valor: "",
      },
    ]);
  }

  function alterarLinha(index, campo, valor) {
    const novas = [...linhas];
    novas[index][campo] = valor;
    setLinhas(novas);
  }

  function removerLinha(index) {
    setLinhas(
      linhas.filter((_, i) => i !== index)
    );
  }

  const totalCategorias = linhas.reduce(
    (total, linha) =>
      total + Number(linha.valor || 0),
    0
  );

  const diferenca =
    Number(totalFatura || 0) - totalCategorias;

    function editarFatura(fatura) {
  setFaturaEmEdicao(fatura.id);
  setLoja(fatura.loja);
  setData(fatura.data || "");
  setTotalFatura(String(fatura.total));

  setLinhas(
    fatura.categorias.map((linha) => ({
      categoria: linha.categoria,
      valor: String(linha.valor),
    }))
  );
}

  function guardarFatura() {
    if (!loja.trim()) {
      alert("Indica a loja.");
      return;
    }

    if (!totalFatura) {
      alert("Indica o total da fatura.");
      return;
    }

    if (Math.abs(diferenca) > 0.01) {
      alert(
        "A soma das categorias não coincide com o total da fatura."
      );
      return;
    }

const dadosFatura = {
  loja: loja.trim(),
  data,
  total: Number(totalFatura),
  categorias: linhas
    .filter((linha) => Number(linha.valor) > 0)
    .map((linha) => ({
      categoria: linha.categoria,
      valor: Number(linha.valor),
    })),
};

if (faturaEmEdicao) {
  setFaturas(
    faturas.map((fatura) =>
      fatura.id === faturaEmEdicao
        ? { ...fatura, ...dadosFatura }
        : fatura
    )
  );
} else {
  setFaturas([
    ...faturas,
    {
      id: crypto.randomUUID(),
      ...dadosFatura,
    },
  ]);
}
setLoja("");
setData("");
setTotalFatura("");

setLinhas([
  {
    categoria: "Descartáveis",
    valor: "",
  },
]);

setFaturaEmEdicao(null);
}

  function apagarFatura(id) {
    const confirmar = window.confirm(
      "Queres mesmo apagar esta fatura?"
    );

    if (!confirmar) return;

    setFaturas(
      faturas.filter((fatura) => fatura.id !== id)
    );
  }

  const totalGasto = faturas.reduce(
    (total, fatura) => total + fatura.total,
    0
  );

  const totaisCategorias = categorias.map((categoria) => {
    const total = faturas.reduce((soma, fatura) => {
      const valorCategoria = fatura.categorias
        .filter((linha) => linha.categoria === categoria)
        .reduce(
          (subtotal, linha) => subtotal + linha.valor,
          0
        );

      return soma + valorCategoria;
    }, 0);

    return {
      categoria,
      total,
    };
  });

  return (
    <div className="despesas">
      <h2>💰 Despesas da Festa</h2>

      <div className="total-despesas">
        <span>Total gasto até agora</span>
        <strong>{totalGasto.toFixed(2)} €</strong>
      </div>

      <div className="resumo-categorias">
        {totaisCategorias.map((item) => (
          <div key={item.categoria}>
            <span>{item.categoria}</span>
            <strong>{item.total.toFixed(2)} €</strong>
          </div>
        ))}
      </div>

      <div className="nova-fatura">
        <h3>🧾 Nova fatura</h3>

        <label>Loja</label>
        <input
          type="text"
          placeholder="Ex.: Pingo Doce"
          value={loja}
          onChange={(e) => setLoja(e.target.value)}
        />

        <label>Data</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <label>Total da fatura</label>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="0,00"
          value={totalFatura}
          onChange={(e) => setTotalFatura(e.target.value)}
        />

        <h3>Dividir por categorias</h3>

        {linhas.map((linha, index) => (
          <div className="linha-categoria" key={index}>
            <select
              value={linha.categoria}
              onChange={(e) =>
                alterarLinha(
                  index,
                  "categoria",
                  e.target.value
                )
              }
            >
              {categorias.map((categoria) => (
                <option
                  key={categoria}
                  value={categoria}
                >
                  {categoria}
                </option>
              ))}
            </select>

            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="€"
              value={linha.valor}
              onChange={(e) =>
                alterarLinha(
                  index,
                  "valor",
                  e.target.value
                )
              }
            />

            {linhas.length > 1 && (
              <button
                className="remover-linha"
                onClick={() => removerLinha(index)}
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          className="botao-secundario"
          onClick={adicionarLinha}
        >
          ➕ Adicionar categoria
        </button>

        <div
          className={
            Math.abs(diferenca) < 0.01
              ? "soma-ok"
              : "soma-erro"
          }
        >
          Soma das categorias:{" "}
          <strong>
            {totalCategorias.toFixed(2)} €
          </strong>

          {totalFatura && (
            <>
              <br />
              Diferença:{" "}
              <strong>{diferenca.toFixed(2)} €</strong>
            </>
          )}
        </div>

<button
  className="botao"
  onClick={guardarFatura}
>
  {faturaEmEdicao
    ? "💾 Guardar alterações"
    : "💾 Guardar fatura"}
</button>

{faturaEmEdicao && (
  <button
    className="botao-secundario"
    onClick={() => {
      setFaturaEmEdicao(null);
      setLoja("");
      setData("");
      setTotalFatura("");
      setLinhas([
        {
          categoria: "Descartáveis",
          valor: "",
        },
      ]);
    }}
  >
    ✖️ Cancelar edição
  </button>
)}
      </div>

      <div className="lista-faturas">
        <h3>🧾 Faturas registadas</h3>

        {faturas.length === 0 ? (
          <p>Ainda não registaste nenhuma fatura.</p>
        ) : (
          faturas.map((fatura) => (
            <div
              className="fatura-card"
              key={fatura.id}
            >
              <div className="fatura-topo">
                <strong>{fatura.loja}</strong>
                <strong>
                  {fatura.total.toFixed(2)} €
                </strong>
              </div>

              {fatura.data && (
                <small>{fatura.data}</small>
              )}

              <div className="fatura-categorias">
                {fatura.categorias.map(
                  (linha, index) => (
                    <div key={index}>
                      <span>{linha.categoria}</span>
                      <span>
                        {linha.valor.toFixed(2)} €
                      </span>
                    </div>
                  )
                )}
              </div>

<button
  className="editar-fatura"
  onClick={() => editarFatura(fatura)}
>
  ✏️ Editar
</button>

              <button
                className="apagar-fatura"
                onClick={() =>
                  apagarFatura(fatura.id)
                }
              >
                🗑️ Apagar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Despesas;
