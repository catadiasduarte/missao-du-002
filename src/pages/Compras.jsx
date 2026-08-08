import { useEffect, useMemo, useState } from "react";

function Compras({ convidados }) {
  const [menu, setMenu] = useState("churrasco");

  const [comprados, setComprados] = useState(() => {
    const guardados = localStorage.getItem("compras-concluidas");
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "compras-concluidas",
      JSON.stringify(comprados)
    );
  }, [comprados]);

  function alternarComprado(id) {
    setComprados((atuais) =>
      atuais.includes(id)
        ? atuais.filter((item) => item !== id)
        : [...atuais, id]
    );
  }

  function exportarPDF() {
    window.print();
  }

  const confirmados = convidados.filter(
    (convidado) => convidado.estado === "confirmado"
  );

  const adultos = confirmados.reduce(
    (total, convidado) => total + Number(convidado.adultos || 0),
    0
  );

  const criancas = confirmados.reduce(
    (total, convidado) => total + Number(convidado.criancas || 0),
    0
  );

  const bebes = confirmados.reduce(
    (total, convidado) => total + Number(convidado.bebes || 0),
    0
  );

  const porcoes = adultos + criancas * 0.6;

  function cima(valor, casas = 1) {
    const fator = 10 ** casas;
    return Math.ceil(valor * fator) / fator;
  }

  // =========================
  // CHURRASCO
  // =========================

  const carneTotal = porcoes * 0.3;

  const febrasEntremeada = cima(carneTotal * 0.35);
  const frango = cima(carneTotal * 0.3);
  const salsichas = cima(carneTotal * 0.2);
  const outraCarne = cima(carneTotal * 0.15);

  const arroz = cima(porcoes * 0.06);
  const feijaoPreto = cima(porcoes * 0.07);
  const farofa = cima(porcoes * 0.035);

  // =========================
  // EMPADÃO
  // =========================

const carnePicada = cima(porcoes * 0.15);

const pureInstantaneo = cima(porcoes * 0.033);
const embalagensPure = Math.ceil(pureInstantaneo / 0.2);

const leite = cima(porcoes * 0.06);
const manteiga = Math.ceil(porcoes * 8);
const cebolas = Math.max(1, Math.ceil(porcoes / 8));
const polpaTomate = Math.ceil(porcoes * 18);

  const tabuleiros =
    porcoes > 0 ? Math.max(1, Math.ceil(porcoes / 10)) : 0;

  // =========================
  // COMUM
  // =========================

  const pao = cima(porcoes * 0.06);
  const batatasFritas = cima(porcoes * 0.05);
  const fruta = cima(porcoes * 0.15);
  const bolo = cima(porcoes * 0.1);

  // =========================
  // BEBIDAS
  // =========================

  const refrigerantes = cima(
    adultos * 0.2 + criancas * 0.4
  );

  const cerveja = Math.ceil(adultos * 2);
  const sangria = cima(adultos * 0.12);

  const itens = useMemo(() => {
    const comuns = [
      {
        id: "pao",
        categoria: "🥖 Outros",
        nome: "Pão",
        quantidade: `${pao} kg`,
      },
      {
        id: "batatas-fritas",
        categoria: "🥖 Outros",
        nome: "Batatas fritas",
        quantidade: `${batatasFritas} kg`,
      },
      {
        id: "fruta",
        categoria: "🥖 Outros",
        nome: "Fruta",
        quantidade: `${fruta} kg`,
      },
      {
        id: "bolo",
        categoria: "🥖 Outros",
        nome: "Bolo de aniversário",
        quantidade: `${bolo} kg`,
      },
      {
        id: "refrigerantes",
        categoria: "🍹 Bebidas",
        nome: "Refrigerantes / sumos",
        quantidade: `${refrigerantes} L`,
      },
      {
        id: "cerveja",
        categoria: "🍹 Bebidas",
        nome: "Cerveja (minis)",
        quantidade: `${cerveja} unidades`,
      },
      {
        id: "sangria",
        categoria: "🍹 Bebidas",
        nome: "Sangria",
        quantidade: `${sangria} L`,
      },
    ];

    if (menu === "churrasco") {
      return [
        {
          id: "febras-entremeada",
          categoria: "🔥 Churrasco",
          nome: "Febras / entremeada",
          quantidade: `${febrasEntremeada} kg`,
        },
        {
          id: "frango",
          categoria: "🔥 Churrasco",
          nome: "Frango",
          quantidade: `${frango} kg`,
        },
        {
          id: "salsichas",
          categoria: "🔥 Churrasco",
          nome: "Salsichas",
          quantidade: `${salsichas} kg`,
        },
        {
          id: "outra-carne",
          categoria: "🔥 Churrasco",
          nome: "Outra carne",
          quantidade: `${outraCarne} kg`,
        },
        {
          id: "arroz",
          categoria: "🍚 Acompanhamentos",
          nome: "Arroz",
          quantidade: `${arroz} kg`,
        },
        {
          id: "feijao-preto",
          categoria: "🍚 Acompanhamentos",
          nome: "Feijão preto",
          quantidade: `${feijaoPreto} kg`,
        },
        {
          id: "farofa",
          categoria: "🍚 Acompanhamentos",
          nome: "Farofa",
          quantidade: `${farofa} kg`,
        },
        ...comuns,
      ];
    }

    return [
      {
        id: "tabuleiros",
        categoria: "🥘 Empadão",
        nome: "Tabuleiros",
        quantidade: `${tabuleiros}`,
      },
      {
        id: "carne-picada",
        categoria: "🥘 Empadão",
        nome: "Carne picada",
        quantidade: `${carnePicada} kg`,
      },
      {
        id: "pure-instantaneo",
categoria: "🥘 Empadão",
nome: "Puré Instantâneo",
quantidade: `${pureInstantaneo} kg (${embalagensPure} embalagens de 200 g)`,
      },
      {
        id: "leite",
        categoria: "🥘 Empadão",
        nome: "Leite",
        quantidade: `${leite} L`,
      },
      {
        id: "manteiga",
        categoria: "🥘 Empadão",
        nome: "Manteiga",
        quantidade: `${manteiga} g`,
      },
      {
        id: "cebolas",
        categoria: "🥘 Empadão",
        nome: "Cebolas",
        quantidade: `${cebolas}`,
      },
      {
        id: "polpa-tomate",
        categoria: "🥘 Empadão",
        nome: "Polpa de tomate",
        quantidade: `${polpaTomate} g`,
      },
      ...comuns,
    ];
  }, [
    menu,
    pao,
    batatasFritas,
    fruta,
    bolo,
    refrigerantes,
    cerveja,
    sangria,
    febrasEntremeada,
    frango,
    salsichas,
    outraCarne,
    arroz,
    feijaoPreto,
    farofa,
    tabuleiros,
    carnePicada,
    embalagensPure,
    leite,
    manteiga,
    cebolas,
    polpaTomate,
  ]);

  const porComprar = itens.filter(
    (item) => !comprados.includes(item.id)
  );

  const jaComprados = itens.filter(
    (item) => comprados.includes(item.id)
  );

  function ListaItens({ titulo, itensLista, comprado }) {
    if (itensLista.length === 0) return null;

    return (
      <div className="grupo-compras">
        <h3>{titulo}</h3>

        {itensLista.map((item) => (
          <div
            className={`item-check ${
              comprado ? "item-comprado" : ""
            }`}
            key={item.id}
            onClick={() => alternarComprado(item.id)}
          >
            <span className="item-nome">
              <input
                type="checkbox"
                checked={comprado}
                readOnly
              />

              <span>
                <small>{item.categoria}</small>
                {item.nome}
              </span>
            </span>

            <strong>{item.quantidade}</strong>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="compras">
      <div className="cabecalho-impressao">
        <h1>✈️ Missão DU-002</h1>
        <p>Lista de Compras</p>
      </div>

      <h2 className="titulo-compras">🛒 Lista de Compras</h2>

      <div className="resumo-compras">
        <strong>✅ Cálculo para convidados confirmados</strong>

        <p>
          👨 {adultos} adultos · 🧒 {criancas} crianças · 👶 {bebes} bebés
        </p>

        <p>
          👨‍👩‍👧 {confirmados.length} famílias confirmadas
        </p>

        <p>
          🍽️ Equivalente a <strong>{cima(porcoes)}</strong> porções de adulto
        </p>
      </div>

      <div className="zona-menu">
        <h3>🍽️ Escolher menu</h3>

        <div className="seletor-menu">
          <button
            className={menu === "churrasco" ? "menu-ativo" : ""}
            onClick={() => setMenu("churrasco")}
          >
            🔥 Churrasco
          </button>

          <button
            className={menu === "empadao" ? "menu-ativo" : ""}
            onClick={() => setMenu("empadao")}
          >
            🥘 Empadão
          </button>
        </div>
      </div>

      {porcoes === 0 ? (
        <div className="sem-pessoas">
          Ainda não existem convidados confirmados.
        </div>
      ) : (
        <>
          <div className="resumo-menu-impressao">
            Menu:{" "}
            <strong>
              {menu === "churrasco"
                ? "🔥 Churrasco"
                : "🥘 Empadão"}
            </strong>
          </div>

          <ListaItens
            titulo="🛒 Por comprar"
            itensLista={porComprar}
            comprado={false}
          />

          <ListaItens
            titulo="✅ Já comprado"
            itensLista={jaComprados}
            comprado={true}
          />

          <button
            className="botao botao-pdf"
            onClick={exportarPDF}
          >
            📄 Exportar lista para PDF
          </button>

          <p className="aviso-calculo">
            💡 As quantidades são estimativas para planeamento e
            atualizam automaticamente com os convidados confirmados.
          </p>
        </>
      )}
    </div>
  );
}

export default Compras;