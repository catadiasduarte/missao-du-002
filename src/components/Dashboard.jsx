function Dashboard({ convidados }) {
  const confirmados = convidados.filter(
    (convidado) => convidado.estado === "confirmado"
  );

  const pendentes = convidados.filter(
    (convidado) => convidado.estado === "pendente"
  );

  const adultos = confirmados.reduce(
    (total, convidado) => total + convidado.adultos,
    0
  );

  const criancas = confirmados.reduce(
    (total, convidado) => total + convidado.criancas,
    0
  );

  const bebes = confirmados.reduce(
    (total, convidado) => total + convidado.bebes,
    0
  );

  const totalPessoas = adultos + criancas + bebes;

  return (
    <>
      <h2>Painel da Festa 🎉</h2>

      <p className="resumo-confirmados">
        ✅ {totalPessoas} pessoas confirmadas
      </p>

      <div className="stats">
        <div className="stat">
          <div className="numero">{adultos}</div>
          <div className="texto">Adultos</div>
        </div>

        <div className="stat">
          <div className="numero">{criancas}</div>
          <div className="texto">Crianças</div>
        </div>

        <div className="stat">
          <div className="numero">{bebes}</div>
          <div className="texto">Bebés</div>
        </div>

        <div className="stat">
          <div className="numero">{confirmados.length}</div>
          <div className="texto">Famílias confirmadas</div>
        </div>

        <div className="stat stat-largo">
          <div className="numero">{pendentes.length}</div>
          <div className="texto">Famílias por confirmar</div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;