import { useState } from 'react'
import './App.css'
import logoPerfil from '/public/logo.jpg';
const TABELA_PRECOS = {
  "Adolfo Vireque": 17.0,
  Aeroporto: 16.0,
  "Alto dos Passos": 10.0,
  "Alto dos Pinheiros": 18.0,
  Aracy: 15.0,
  "Arco Iris": 17.0,
  Bairu: 17.0,
  Bandeirantes: 20.0,
  "Barbosa Lage": 27.0,
  Barreira: 45.0,
  "Bela Aurora": 13.0,
  Benfica: 37.0,
  "Boa Vista": 12.0,
  "Bom Clima": 17.0,
  "Bom Jardim": 20.0,
  "Bom Pastor": 11.0,
  Bonfim: 17.0,
  Borboleta: 18.0,
  Borborema: 20.0,
  "Bosque do Imperador": 20.0,
  "Bosque dos Pinheiros": 16.0,
  "Bosque Imperial": 17.0,
  Caiçaras: 20.0,
  "Carlos Chagas": 22.0,
  Cascatinha: 10.0,
  Centenário: 13.0,
  Centro: 11.0,
  Cerâmica: 18.0,
  "Cerro Azul": 16.0,
  "Cesário Alvim": 15.0,
  "Chales do Imperador": 17.0,
  "Chales dos Algares": 17.0,
  "Cidade do Sol": 28.0,
  "Cidade Jardim": 12.0,
  "Cidade Nova": 17.0,
  "Colinas do Imperador": 20.0,
  "Cond. Jardim da Serra": 22.0,
  "Costa Carvalho": 13.0,
  "Cruzeiro do Sul": 13.0,
  Democrata: 15.0,
  "Distrito Industrial": 45.0,
  "Dom Bosco": 10.0,
  "Dom Juan": 17.0,
  "Dom Orione": 15.0,
  Eldorado: 20.0,
  Esplanada: 20.0,
  "Estrela Sul": 10.0,
  Fábrica: 20.0,
  "Fazendinha Ipiranga": 20.0,
  "Furtado Menezes": 15.0,
  Grama: 40.0,
  Grambery: 11.0,
  Graminha: 14.0,
  "Granjas Betânia": 27.0,
  Granville: 17.0,
  Grajaú: 15.0,
  Guadalajara: 16.0,
  Guaruá: 13.0,
  Industrial: 20.0,
  Ipiranga: 15.0,
  Itatiaia: 17.0,
  "Jardim América": 15.0,
  "Jardim Casa Blanca": 17.0,
  "Jardim da Serra": 22.0,
  "Jardim de Alá": 15.0,
  "Jardim do Sol": 16.0,
  "Jardim Gaúcho": 16.0,
  "Jardim Glória": 13.0,
  "Jardim Imperador": 17.0,
  "Jardim Laranjeiras": 11.0,
  "Jardins Imperiais": 17.0,
  Jk: 15.0,
  Ladeira: 13.0,
  Linhares: 22.0,
  Lourdes: 16.0,
  "Manoel Honório": 14.0,
  "Mariano Procópio": 14.0,
  Marilândia: 19.0,
  Martelos: 17.0,
  Marumbi: 18.0,
  "Monte Castelo": 25.0,
  "Morro do Imperador": 17.0,
  "Mundo Novo": 10.0,
  "N. Sra. Aparecida": 15.0,
  "N. Sra. das Graças": 20.0,
  "N. Sra. de Fátima": 16.0,
  Náutico: 55.0,
  "Nova Benfica": 38.0,
  "Nova Califórnia": 22.0,
  "Nova era": 30.0,
  "Novo Horizonte": 20.0,
  Paineiras: 11.0,
  "Parque Burnier": 16.0,
  "Parque Imperial": 17.0,
  "Parque Independ.": 40.0,
  "Poço Rico": 13.0,
  "Pq. Da Lajinha": 16.0,
  Previdenciários: 18.0,
  Progresso: 20.0,
  "Quintas Avenida": 17.0,
  "Recanto da Mata": 30.0,
  "Recanto dos Lagos": 40.0,
  "Sagrado C Jesus": 20.0,
  Salvaterra: 18.0,
  "Santa Cândida": 15.0,
  "Santa Catarina": 14.0,
  "Santa Cecília": 10.0,
  "Santa Cruz": 35.0,
  "Santa Efigênia": 17.0,
  "Santa Helena": 13.0,
  "Santa Luzia": 13.0,
  "Santa Paula": 20.0,
  "Santa Rita": 17.0,
  "Santa Teresa": 15.0,
  "Santa Terezinha": 18.0,
  "Santo Antônio": 18.0,
  "Santos Anjos": 13.0,
  "Santos Dumont": 18.0,
  "São Benedito": 15.0,
  "São Bernardo": 15.0,
  "São Clemente": 15.0,
  "São Dimas": 18.0,
  "São Geraldo": 18.0,
  "São Mateus": 7.0,
  "São Pedro": 17.0,
  "São Sebastião": 15.0,
  "São Tarcisio": 15.0,
  Solidariedade: 15.0,
  "Spina Ville": 20.0,
  Teixeiras: 12.0,
  Tiguera: 17.0,
  Tupã: 16.0,
  UFJF: 13.0,
  "Vale da Serra": 22.0,
  "Vale do Ipê": 15.0,
  "Vale Verde": 20.0,
  "Vila Alpina": 15.0,
  "Vila Ideal": 15.0,
  "Vila Olavo Costa": 15.0,
  "Vila Ozanan": 15.0,
  "Vina Del Mar": 22.0,
  "Vitorino Braga": 14.0,
  "Vivendas da Serra": 20.0,
};

const DIAS_DA_SEMANA = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function App() {
  const [nomeMotoboy, setNomeMotoboy] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [diaSemana, setDiaSemana] = useState("");
  const [porcentagem, setPorcentagem] = useState(18);
  const [valorEntrega, setValorEntrega] = useState("");
  const [bairroSelecionado, setBairroSelecionado] = useState("");
  const [listaEntregasDia, setListaEntregasDia] = useState([]);
  const [semana, setSemana] = useState([]);

  const nomeEmpresaLimpo = empresa.trim().toLowerCase();
  const usaTabelaAutomatica =
    nomeEmpresaLimpo === "aceite" || nomeEmpresaLimpo === "hnt";

  const handleBairroChange = (e) => {
    const bairro = e.target.value;
    setBairroSelecionado(bairro);
    if (bairro && TABELA_PRECOS[bairro]) {
      setValorEntrega(TABELA_PRECOS[bairro].toString());
    } else {
      setValorEntrega("");
    }
  };

  const adicionarEntrega = () => {
    if (!valorEntrega || isNaN(valorEntrega)) return;
    setListaEntregasDia([...listaEntregasDia, parseFloat(valorEntrega)]);
    setValorEntrega("");
    setBairroSelecionado("");
  };

  const salvarDiaNaSemana = () => {
    if (!nomeMotoboy) {
      alert(
        "Por favor, informe o seu nome no topo da página antes de continuar."
      );
      return;
    }
    if (!empresa || !diaSemana || listaEntregasDia.length === 0) {
      alert(
        "Por favor, preencha a empresa, selecione o dia e inclua pelo menos uma entrega."
      );
      return;
    }

    const brutoDia = listaEntregasDia.reduce(
      (total, valor) => total + valor,
      0
    );
    const descontoDia = brutoDia * (porcentagem / 100);
    const liquidoDia = brutoDia - descontoDia;

    const novoDia = {
      empresa,
      diaSemana,
      qtdEntregas: listaEntregasDia.length,
      bruto: brutoDia,
      desconto: descontoDia,
      liquido: liquidoDia,
      taxaCobrada: porcentagem,
    };

    setSemana([...semana, novoDia]);
    setEmpresa("");
    setDiaSemana("");
    setListaEntregasDia([]);
  };

  const totalBrutoSemana = semana.reduce((acc, dia) => acc + dia.bruto, 0);
  const totalDescontoSemana = semana.reduce(
    (acc, dia) => acc + dia.desconto,
    0
  );
  const totalLiquidoSemana = semana.reduce((acc, dia) => acc + dia.liquido, 0);

  const gerarTextoRelatorio = () => {
    let texto = `🏍️ *FECHAMENTO SEMANAL DE ENTREGAS*\n`;
    texto += `👤 *Motoboy:* ${nomeMotoboy.trim()}\n\n`;

    semana.forEach((d) => {
      texto += `📅 *${d.diaSemana}* — _${d.empresa}_\n`;
      texto += `• Entregas: ${d.qtdEntregas}\n`;
      texto += `• Taxa Retida (${d.taxaCobrada}%): R$ ${d.desconto.toFixed(
        2
      )}\n`;
      texto += `• Valor Líquido: R$ ${d.liquido.toFixed(2)}\n\n`;
    });

    texto += `========================\n`;
    texto += `💰 *TOTAL A RECEBER:* R$ ${totalLiquidoSemana.toFixed(2)}\n`;
    texto += `📉 Desconto Total da Semana: R$ ${totalDescontoSemana.toFixed(
      2
    )}`;
    return texto;
  };

  const enviarWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        gerarTextoRelatorio()
      )}`,
      "_blank"
    );
  };

  const enviarEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(
      "Fechamento Semanal - " + nomeMotoboy
    )}&body=${encodeURIComponent(gerarTextoRelatorio())}`;
  };

  return (
    <div className="container">
    
      <div className="header-container">
        <img src={logoPerfil} alt="Profissão Perigo" className="profile-pic" />
        <h1>Calculadora Semanal de Ganhos</h1>
      </div>

      <section className="card">
        <h3>Identificação e Dia</h3>

        <label>Seu Nome (Motoboy):</label>
        <input
          type="text"
          placeholder="Digite seu nome completo"
          value={nomeMotoboy}
          onChange={(e) => setNomeMotoboy(e.target.value)}
          className="input-field"
        />

        <label>Nome da Empresa:</label>
        <input
          type="text"
          placeholder="Ex: Aceite, HNT, Outra..."
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          className="input-field"
        />

        <label>Dia da Semana:</label>
        <div className="days-grid">
          {DIAS_DA_SEMANA.map((dia) => (
            <label
              key={dia}
              className={`day-chip ${diaSemana === dia ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="diaSemana"
                value={dia}
                checked={diaSemana === dia}
                onChange={(e) => setDiaSemana(e.target.value)}
              />
              {dia}
            </label>
          ))}
        </div>

        <label>Taxa de Porcentagem:</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="porcentagem"
              checked={porcentagem === 18}
              onChange={() => setPorcentagem(18)}
            />{" "}
            18%
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="porcentagem"
              checked={porcentagem === 20}
              onChange={() => setPorcentagem(20)}
            />{" "}
            20%
          </label>
        </div>

        <div className="delivery-box">
          <label>Registrar Entrega:</label>
          {usaTabelaAutomatica ? (
            <select
              value={bairroSelecionado}
              onChange={handleBairroChange}
              className="input-field"
            >
              <option value="">-- Selecione o Bairro (Tabela Ativa) --</option>
              {Object.keys(TABELA_PRECOS).map((bairro) => (
                <option key={bairro} value={bairro}>
                  {bairro} (R$ {TABELA_PRECOS[bairro].toFixed(2)})
                </option>
              ))}
            </select>
          ) : (
            <input
              type="number"
              placeholder="Valor da entrega individual (R$)"
              value={valorEntrega}
              onChange={(e) => setValorEntrega(e.target.value)}
              className="input-field"
            />
          )}

          {valorEntrega && (
            <p style={{ color: "#00b37e", margin: "5px 0" }}>
              <b>Valor da corrida:</b> R$ {parseFloat(valorEntrega).toFixed(2)}
            </p>
          )}

          <button
            onClick={adicionarEntrega}
            className="btn btn-secondary"
            style={{ marginTop: "5px" }}
          >
            + Incluir Corrida no Dia
          </button>
        </div>

        <div className="info-text">
          <b>Acumulado de Hoje:</b> {listaEntregasDia.length} entregas |{" "}
          <b>Total Bruto:</b> R${" "}
          {listaEntregasDia.reduce((a, b) => a + b, 0).toFixed(2)}
        </div>

        <button onClick={salvarDiaNaSemana} className="btn btn-primary">
          💾 Salvar este Dia e Adicionar Outro
        </button>
      </section>

      {semana.length > 0 && (
        <section className="card">
          <h3>Resumo do Fechamento</h3>

          {semana.map((dia, index) => (
            <div key={index} className="history-item">
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                📅 {dia.diaSemana} — {dia.empresa}
              </span>
              <div className="history-row">
                <span>{dia.qtdEntregas} corridas</span>
                <span>Bruto: R$ {dia.bruto.toFixed(2)}</span>
                <span>
                  Taxa ({dia.taxaCobrada}%): R$ {dia.desconto.toFixed(2)}
                </span>
                <span style={{ color: "#00b37e", fontWeight: "bold" }}>
                  Líq: R$ {dia.liquido.toFixed(2)}
                </span>
              </div>
            </div>
          ))}

          <div className="total-box">
            <h3>Total Líquido: R$ {totalLiquidoSemana.toFixed(2)}</h3>
            <span style={{ fontSize: "12px", color: "#f75a68" }}>
              Desconto retido total: R$ {totalDescontoSemana.toFixed(2)}
            </span>
          </div>

          <div className="btn-group">
            <button onClick={enviarWhatsApp} className="btn btn-success">
              WhatsApp 🟢
            </button>
            <button onClick={enviarEmail} className="btn btn-blue">
              E-mail 🔵
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
