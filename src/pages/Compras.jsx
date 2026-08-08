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

  // Para os cálculos de comida:
  // adulto = 1
  // criança = 0.6
  // bebé = não entra no cálculo principal
  const equivalentes = adultos + criancas * 0.6;

  function arredondar(valor, casas = 1) {
    const multiplicador = 10 ** casas;
    return Math.ceil(valor * multiplicador) / multiplicador;
  }

  // Itens comuns
  const pao = Math.ceil(equivalentes * 1.2);
  const batatasFritas = arredondar(equivalentes * 0.06);
  const fruta = arredondar(equivalentes * 0.15);
  const bolo = arredondar(equivalentes * 0.12);

  // Bebidas
  const cerveja = Math.ceil(adultos * 1.5);
  const sangria = arredondar(adultos * 0.3);

  // Churrasco
  const carneTotal = equivalentes * 0.4;

  const febrasEntremeada = arredondar(carneTotal * 0.35);
  const frango = arredondar(carneTotal * 0.3);
  const salsichas = arredondar(carneTotal * 0.2);
  const outraCarne = arredondar(carneTotal * 0.15);

  const arroz = arredondar(equivalentes * 0.07);
  const feijaoPreto = arredondar(equivalentes * 0.08);
  const farofa = arredondar(equivalentes * 0.04);

  // Empadão
  const carnePicada = arredondar(equivalentes * 0.18);
  const batatasPure = arredondar(equivalentes * 0.3);
  const leite = arredondar(equivalentes * 0.08);
  const manteiga = Math.ceil(equivalentes * 10);
  const cebolas = Math.ceil(equivalentes / 8);
  const polpaTomate = Math.ceil(equivalentes * 20);
  const tabuleiros = Math.max(1, Math.ceil(equivalentes / 10));

  return (
    <div className="compras">
      <h2>🛒 Lista de Compras</h2>

      <div className="resumo-compras">
        <strong>Baseado nos convidados confirmados</strong>

        <p>
          👨 {adultos} adultos · 🧒 {criancas} crianças · 👶 {bebes} bebés
        </p>

        <p>
          ✅ {confirmados.length} famílias confirmadas
        </p>
      </div>

      <h3>Escolher menu</h3>

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

      {equivalentes === 0 ? (
        <div className="sem-pessoas">
          Ainda não existem convidados confirmados.
        </div>
      ) : (
        <>
          {menu === "churrasco" && (
            <div className="lista-compras">
              <h3>🔥 Churrasco misto</h3>

              <div>
                🥩 Febras / entremeada: <strong>{febrasEntremeada} kg</strong>
              </div>

              <div>
                🍗 Frango: <strong>{frango} kg</strong>
              </div>

              <div>
                🌭 Salsichas: <strong>{salsichas} kg</strong>
              </div>

              <div>
                🥩 Outra carne: <strong>{outraCarne} kg</strong>
              </div>

              <h3>🍚 Acompanhamentos</h3>

              <div>
                🍚 Arroz: <strong>{arroz} kg</strong>
              </div>

              <div>
                🫘 Feijão preto: <strong>{feijaoPreto} kg</strong>
              </div>

              <div>
                🌽 Farofa: <strong>{farofa} kg</strong>
              </div>
            </div>
          )}

          {menu === "empadao" && (
            <div className="lista-compras">
              <h3>🥘 Empadão de carne</h3>

              <div>
                🍽️ Tabuleiros: <strong>{tabuleiros}</strong>
              </div>

              <div>
                🥩 Carne picada: <strong>{carnePicada} kg</strong>
              </div>

              <div>
                🥔 Batatas para puré: <strong>{batatasPure} kg</strong>
              </div>

              <div>
                🥛 Leite: <strong>{leite} L</strong>
              </div>

              <div>
                🧈 Manteiga: <strong>{manteiga} g</strong>
              </div>

              <div>
                🧅 Cebolas: <strong>{cebolas}</strong>
              </div>

              <div>
                🍅 Polpa de tomate: <strong>{polpaTomate} g</strong>
              </div>
            </div>
          )}

          <div className="lista-compras">
            <h3>🥖 Comum aos dois menus</h3>

            <div>
              🥖 Pão: <strong>{pao} unidades</strong>
            </div>

            <div>
              🥔 Batatas fritas: <strong>{batatasFritas} kg</strong>
            </div>

            <div>
              🍉 Fruta: <strong>{fruta} kg</strong>
            </div>

            <div>
              🎂 Bolo: <strong>{bolo} kg</strong>
            </div>

            <h3>🍹 Bebidas</h3>

            <div>
              🍺 Cerveja: <strong>{cerveja} unidades</strong>
            </div>

            <div>
              🍷 Sangria: <strong>{sangria} L</strong>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Compras;