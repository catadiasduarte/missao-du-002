function Dashboard({ convidados }) {
  const confirmados = convidados.filter(
    (convidado) => convidado.estado === "confirmado"
  );

  const pendentes = convidados.filter(
    (convidado) => convidado.estado === "pendente"
  );

  const naoVao = convidados.filter(
    (convidado) => convidado.estado === "nao-vai"
  );

  const somarPessoas = (lista) =>
    lista.reduce(
      (total, convidado) =>
        total +
        Number(convidado.adultos || 0) +
        Number(convidado.criancas || 0) +
        Number(convidado.bebes || 0),
      0
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

  const totalPessoas = adultos + criancas + bebes;
  const pessoasPendentes = somarPessoas(pendentes);
  const pessoasNaoVao = somarPessoas(naoVao);

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
          <div className="numero">{pessoasPendentes}</div>
          <div className="texto">
            Pessoas por confirmar
            <small>{pendentes.length} famílias</small>
          </div>
        </div>

        <div className="stat stat-largo stat-nao-vao">
          <div className="numero">{pessoasNaoVao}</div>
          <div className="texto">
            Pessoas que não vão
            <small>{naoVao.length} famílias</small>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;