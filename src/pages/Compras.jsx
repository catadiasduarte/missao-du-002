import { useState } from "react";

function Compras({ convidados }) {
  const [menu, setMenu] = useState("churrasco");

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

  // Crianças contam como 60% de uma porção de adulto.
  const porcoes = adultos + criancas * 0.6;

  function cima(valor, casas = 1) {
    const fator = 10 ** casas;
    return Math.ceil(valor * fator) / fator;
  }

  // =========================
  // CHURRASCO
  // =========================

  // Cerca de 300 g de carne crua por porção equivalente.
  const carneTotal = porcoes * 0.3;

  const febrasEntremeada = cima(carneTotal * 0.35);
  const frango = cima(carneTotal * 0.3);
  const salsichas = cima(carneTotal * 0.2);
  const outraCarne = cima(carneTotal * 0.15);

  // Acompanhamentos - quantidades em cru.
  const arroz = cima(porcoes * 0.06);
  const feijaoPreto = cima(porcoes * 0.07);
  const farofa = cima(porcoes * 0.035);

  // =========================
  // EMPADÃO
  // =========================

const carnePicada = cima(porcoes * 0.15);
const batataPure = cima(porcoes * 0.25);

  const leite = cima(porcoes * 0.06);
  const manteiga = Math.ceil(porcoes * 8);

  const cebolas = Math.max(1, Math.ceil(porcoes / 8));

  const polpaTomate = Math.ceil(porcoes * 18);

  // Aproximadamente 10 porções por tabuleiro.
  const tabuleiros =
    porcoes > 0 ? Math.max(1, Math.ceil(porcoes / 10)) : 0;

  // =========================
  // COMUM AOS DOIS MENUS
  // =========================

  const pao = Math.ceil(porcoes * 0.06);

  // Batata frita tipo snack/pacote.
  const batatasFritas = cima(porcoes * 0.05);

  const fruta = cima(porcoes * 0.15);

  // Bolo: cerca de 100 g por porção equivalente.
  const bolo = cima(porcoes * 0.1);

  // =========================
  // BEBIDAS
  // =========================

// Refrigerantes/sumos
const refrigerantes = cima(adultos * 0.20 + criancas * 0.40);

// Bebidas alcoólicas
const cerveja = Math.ceil(adultos * 2); // minis
const sangria = cima(adultos * 0.12);

  return (
    <div className="compras">
      <h2>🛒 Lista de Compras</h2>

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

      {porcoes === 0 ? (
        <div className="sem-pessoas">
          Ainda não existem convidados confirmados.
        </div>
      ) : (
        <>
          {menu === "churrasco" && (
            <>
              <div className="lista-compras">
                <h3>🔥 Churrasco misto</h3>

                <div>
                  🥩 Febras / entremeada
                  <strong>{febrasEntremeada} kg</strong>
                </div>

                <div>
                  🍗 Frango
                  <strong>{frango} kg</strong>
                </div>

                <div>
                  🌭 Salsichas
                  <strong>{salsichas} kg</strong>
                </div>

                <div>
                  🥩 Outra carne
                  <strong>{outraCarne} kg</strong>
                </div>

                <div className="total-destaque">
                  🔥 Total de carne
                  <strong>{cima(carneTotal)} kg</strong>
                </div>
              </div>

              <div className="lista-compras">
                <h3>🍚 Acompanhamentos</h3>

                <div>
                  🍚 Arroz
                  <strong>{arroz} kg</strong>
                </div>

                <div>
                  🫘 Feijão preto
                  <strong>{feijaoPreto} kg</strong>
                </div>

                <div>
                  🌽 Farofa
                  <strong>{farofa} kg</strong>
                </div>
              </div>
            </>
          )}

          {menu === "empadao" && (
            <div className="lista-compras">
              <h3>🥘 Empadão de carne</h3>

              <div>
                🍽️ Tabuleiros
                <strong>{tabuleiros}</strong>
              </div>

              <div>
                🥩 Carne picada
                <strong>{carnePicada} kg</strong>
              </div>

              <div>
                🥔 Batatas para puré
                <strong>{batataPure} kg</strong>
              </div>

              <div>
                🥛 Leite
                <strong>{leite} L</strong>
              </div>

              <div>
                🧈 Manteiga
                <strong>{manteiga} g</strong>
              </div>

              <div>
                🧅 Cebolas
                <strong>{cebolas}</strong>
              </div>

              <div>
                🍅 Polpa de tomate
                <strong>{polpaTomate} g</strong>
              </div>
            </div>
          )}

          <div className="lista-compras">
            <h3>🥖 Para os dois menus</h3>

            <div>
              🥖 Pão
              <strong>{pao} kg</strong>
            </div>

            <div>
              🥔 Batatas fritas
              <strong>{batatasFritas} kg</strong>
            </div>

            <div>
              🍉 Fruta
              <strong>{fruta} kg</strong>
            </div>

            <div>
              🎂 Bolo de aniversário
              <strong>{bolo} kg</strong>
            </div>
          </div>

          <div className="lista-compras">
            <h3>🍻 Bebidas</h3>
            <div>

<div>
  🥤 Refrigerantes / sumos
  <strong>{refrigerantes} L</strong>
</div>

            <div>
              🍺 Cerveja (minis)
              <strong>{cerveja} unidades</strong>
            </div>

            <div>
              🍷 Sangria
              <strong>{sangria} L</strong>
            </div>
          </div>

          <p className="aviso-calculo">
            💡 As quantidades são estimativas para planeamento.
            Podemos ajustá-las ao apetite dos convidados e à forma como vais
            servir a comida.
          </p>
        </>
      )}
    </div>
  );
}

export default Compras;