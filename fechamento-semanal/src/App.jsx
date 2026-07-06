import { useState, useEffect } from 'react'
import './App.css'
import logoPerfil from '/public/logo.jpg';
import logoMamaRoma from '/public/logoMAMAROMO.jpg';
import logoAceite from '/public/logoACEITE.jpg';
import logoHNT from '/public/logoHNT.jpg';
import logoDefault from '/public/logo.jpg';


const TABELA_PRECOS = {
  "Adolfo Vireque": 17.00, "Aeroporto": 16.00, "Alto dos Passos": 10.00, "Alto dos Pinheiros": 18.00,
  "Aracy": 15.00, "Arco Iris": 17.00, "Bairu": 17.00, "Bandeirantes": 20.00, "Barbosa Lage": 27.00,
  "Barreira": 45.00, "Bela Aurora": 13.00, "Benfica": 37.00, "Boa Vista": 12.00, "Bom Clima": 17.00,
  "Bom Jardim": 20.00, "Bom Pastor": 11.00, "Bonfim": 17.00, "Borboleta": 18.00, "Borborema": 20.00,
  "Bosque do Imperador": 20.00, "Bosque dos Pinheiros": 16.00, "Bosque Imperial": 17.00, "Caiçaras": 20.00,
  "Carlos Chagas": 22.00, "Cascatinha": 10.00, "Centenário": 13.00, "Centro": 11.00, "Cerâmica": 18.00,
  "Cerro Azul": 16.00, "Cesário Alvim": 15.00, "Chales do Imperador": 17.00, "Chales dos Algares": 17.00,
  "Cidade do Sol": 28.00, "Cidade Jardim": 12.00, "Cidade Nova": 17.00, "Colinas do Imperador": 20.00,
  "Cond. Jardim da Serra": 22.00, "Costa Carvalho": 13.00, "Cruzeiro do Sul": 13.00, "Democrata": 15.00,
  "Distrito Industrial": 45.00, "Dom Bosco": 10.00, "Dom Juan": 17.00, "Dom Orione": 15.00,
  "Eldorado": 20.00, "Esplanada": 20.00, "Estrela Sul": 10.00, "Fábrica": 20.00, "Fazendinha Ipiranga": 20.00,
  "Furtado Menezes": 15.00, "Grama": 40.00, "Grambery": 11.00, "Graminha": 14.00, "Granjas Betânia": 27.00,
  "Granville": 17.00, "Grajaú": 15.00, "Guadalajara": 16.00, "Guaruá": 13.00, "Industrial": 20.00,
  "Ipiranga": 15.00, "Itatiaia": 17.00, "Jardim América": 15.00, "Jardim Casa Blanca": 17.00,
  "Jardim da Serra": 22.00, "Jardim de Alá": 15.00, "Jardim do Sol": 16.00, "Jardim Gaúcho": 16.00,
  "Jardim Glória": 13.00, "Jardim Imperador": 17.00, "Jardim Laranjeiras": 11.00, "Jardins Imperiais": 17.00,
  "Jk": 15.00, "Ladeira": 13.00, "Linhares": 22.00, "Lourdes": 16.00, "Manoel Honório": 14.00,
  "Mariano Procópio": 14.00, "Marilândia": 19.00, "Martelos": 17.00, "Marumbi": 18.00, "Monte Castelo": 25.00,
  "Morro do Imperador": 17.00, "Mundo Novo": 10.00, "N. Sra. Aparecida": 15.00, "N. Sra. das Graças": 20.00,
  "N. Sra. de Fátima": 16.00, "Náutico": 55.00, "Nova Benfica": 38.00, "Nova Califórnia": 22.00,
  "Nova era": 30.00, "Novo Horizonte": 20.00, "Paineiras": 11.00, "Parque Burnier": 16.00,
  "Parque Imperial": 17.00, "Parque Independ.": 40.00, "Poço Rico": 13.00, "Pq. Da Lajinha": 16.00,
  "Previdenciários": 18.00, "Progresso": 20.00, "Quintas Avenida": 17.00, "Recanto da Mata": 30.00,
  "Recanto dos Lagos": 40.00, "Sagrado C Jesus": 20.00, "Salvaterra": 18.00, "Santa Cândida": 15.00,
  "Santa Catarina": 14.00, "Santa Cecília": 10.00, "Santa Cruz": 35.00, "Santa Efigênia": 17.00,
  "Santa Helena": 13.00, "Santa Luzia": 13.00, "Santa Paula": 20.00, "Santa Rita": 17.00,
  "Santa Teresa": 15.00, "Santa Terezinha": 18.00, "Santo Antônio": 18.00, "Santos Anjos": 13.00,
  "Santos Dumont": 18.00, "São Benedito": 15.00, "São Bernardo": 15.00, "São Clemente": 15.00,
  "Dimas": 18.00, "São Geraldo": 18.00, "São Mateus": 7.00, "São Pedro": 17.00, "São Sebastião": 15.00,
  "São Tarcisio": 15.00, "Solidariedade": 15.00, "Spina Ville": 20.00, "Teixeiras": 12.00, "Tiguera": 17.00,
  "Tupã": 16.00, "UFJF": 13.00, "Vale da Serra": 22.00, "Vale do Ipê": 15.00, "Vale Verde": 20.00,
  "Vila Alpina": 15.00, "Vila Ideal": 15.00, "Vila Olavo Costa": 15.00, "Vila Ozanan": 15.00,
  "Vina Del Mar": 22.00, "Vitorino Braga": 14.00, "Vivendas da Serra": 20.00
};

const DIAS_DA_SEMANA = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

function App() {
  const [nomeMotoboy, setNomeMotoboy] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState(''); 
  const [empresaManual, setEmpresaManual] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [turno, setTurno] = useState('Noite'); 
  const [porcentagem, setPorcentagem] = useState(18);
  const [valorEntrega, setValorEntrega] = useState('');
  const [buscaBairro, setBuscaBairro] = useState('');
  const [bairroSelecionado, setBairroSelecionado] = useState('');
  const [listaEntregasDia, setListaEntregasDia] = useState([]);
  const [modoDireto, setModoDireto] = useState(false);
  const [qtdDireto, setQtdDireto] = useState('');
  const [valorDireto, setValorDireto] = useState('');
  const [semana, setSemana] = useState([]);
  const [carregado, setCarregado] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalZerar, setMostrarModalZerar] = useState(false);
  const [modalExcluirDia, setModalExcluirDia] = useState({ visivel: false, index: null, info: '' });
  const [dadosTemporarios, setDadosTemporarios] = useState([]);
  const [errosCampos, setErrosCampos] = useState({});
  const [avisoErroGeral, setAvisoErroGeral] = useState('');
  const empresaFinal = empresaSelecionada === 'Outra' ? (empresaManual || 'Outra Empresa') : empresaSelecionada;
  const nomeEmpresaLimpo = empresaFinal ? empresaFinal.trim().toLowerCase() : '';
  const usaTabelaAutomatica = nomeEmpresaLimpo === 'aceite' || nomeEmpresaLimpo === 'hnt' || empresaSelecionada === 'Outra';

  useEffect(() => {
    try {
      const dadosSalvos = localStorage.getItem('fechamento_semana');
      const nomeSalvo = localStorage.getItem('nome_motoboy');

      if (nomeSalvo) setNomeMotoboy(nomeSalvo);

      if (dadosSalvos) {
        const dadosParseados = JSON.parse(dadosSalvos);
        if (Array.isArray(dadosParseados) && dadosParseados.length > 0) {
          setDadosTemporarios(dadosParseados);
          setMostrarModal(true); 
          return; 
        }
      }
    } catch (e) {
      console.error("Erro ao ler cache inicial:", e);
    }
    setCarregado(true); 
  }, []);

  useEffect(() => {
    if (carregado) {
      try {
        if (semana.length > 0) {
          localStorage.setItem('fechamento_semana', JSON.stringify(semana));
        } else {
          localStorage.removeItem('fechamento_semana');
        }
      } catch (e) {
        console.error("Erro ao escrever no localStorage:", e);
      }
    }
  }, [semana, carregado]);

  useEffect(() => {
    if (nomeMotoboy && nomeMotoboy.trim() !== '') {
      try {
        localStorage.setItem('nome_motoboy', nomeMotoboy);
      } catch (e) {
        console.error("Erro ao salvar nome:", e);
      }
    }
  }, [nomeMotoboy]);

  const aceitarRecuperacao = () => {
    setSemana(dadosTemporarios);
    setMostrarModal(false);
    setCarregado(true);
  };

  const recusarRecuperacao = () => {
    try {
      localStorage.removeItem('fechamento_semana');
    } catch(e){}
    setMostrarModal(false);
    setCarregado(true);
  };

  const acionarExcluirDia = (index, dia) => {
    setModalExcluirDia({
      visivel: true,
      index: index,
      info: `${dia.diaSemana} (${dia.textoTurno}) - ${dia.empresa}`
    });
  };

  const confirmarExclusaoDia = () => {
    if (modalExcluirDia.index !== null) {
      const novaLista = semana.filter((_, i) => i !== modalExcluirDia.index);
      setSemana(novaLista);
    }
    setModalExcluirDia({ visivel: false, index: null, info: '' });
  };

  const confirmarZerarSemanaCompleta = () => {
    setSemana([]);
    setMostrarModalZerar(false);
  };

  const obterIndicadorWhatsApp = (nomeEmpresa) => {
    if (!nomeEmpresa) return '🏢 *EMPRESA*';
    const emp = nomeEmpresa.trim().toLowerCase();
    if (emp === 'mama roma') return `🍝 *MAMA ROMA*`;
    if (emp === 'aceite') return `🥗 *ACEITE*`;
    if (emp === 'hnt') return `🍗 *HNT*`;
    return `🏢 *${nomeEmpresa.toUpperCase()}*`;
  };

  const obterPrecoBairro = (bairro) => {
    let precoBase = TABELA_PRECOS[bairro] || 0;
    if (nomeEmpresaLimpo === 'hnt' && bairro === 'São Mateus') {
      return precoBase + 1.00; 
    }
    return precoBase;
  };

  const sugeridos = buscaBairro.trim() === '' 
    ? [] 
    : Object.keys(TABELA_PRECOS).filter(b => 
        b.toLowerCase().includes(buscaBairro.toLowerCase())
      ).slice(0, 5);

  const aplicarPrecoTabela = (bairro) => {
    setBairroSelecionado(bairro);
    if (bairro) {
      const precoFinal = obterPrecoBairro(bairro);
      setValorEntrega(precoFinal.toString());
    } else {
      setValorEntrega('');
    }
    setBuscaBairro('');
  };

  const adicionarEntrega = () => {
    if (!valorEntrega || isNaN(valorEntrega) || parseFloat(valorEntrega) <= 0) {
      setErrosCampos(prev => ({ ...prev, valorEntrega: true }));
      return;
    }
    setErrosCampos(prev => ({ ...prev, valorEntrega: false, listaEntregasDia: false }));
    setListaEntregasDia([...listaEntregasDia, parseFloat(valorEntrega)]);
    setValorEntrega('');
    setBairroSelecionado('');
  };

  const salvarDiaNaSemana = () => {
    let novosErros = {};
    setAvisoErroGeral('');

    if (!nomeMotoboy || !nomeMotoboy.trim()) novosErros.nomeMotoboy = true;
    if (!empresaSelecionada) novosErros.empresaSelecionada = true;
    if (empresaSelecionada === 'Outra' && (!empresaManual || !empresaManual.trim())) novosErros.empresaManual = true;
    if (!diaSemana) novosErros.diaSemana = true;

    let brutoDia = 0;
    let qtdEntregas = 0;

    if (modoDireto) {
      if (!qtdDireto || isNaN(qtdDireto) || parseFloat(qtdDireto) <= 0) novosErros.qtdDireto = true;
      if (!valorDireto || isNaN(valorDireto) || parseFloat(valorDireto) <= 0) novosErros.valorDireto = true;
    } else {
      if (listaEntregasDia.length === 0) {
        novosErros.listaEntregasDia = true;
        if (valorEntrega) novosErros.lembreteBotao = true; 
      }
    }

    if (Object.keys(novosErros).length > 0) {
      setErrosCampos(novosErros);
      if (novosErros.lembreteBotao) {
        setAvisoErroGeral('⚠️ Atenção: Você digitou um valor mas não clicou no botão de "Incluir Corrida"!');
      } else {
        setAvisoErroGeral('❌ Corrija ou preencha os campos marcados em vermelho antes de salvar.');
      }
      return;
    }

    setErrosCampos({});
    setAvisoErroGeral('');

    if (modoDireto) {
      qtdEntregas = parseInt(qtdDireto) || 0;
      brutoDia = parseFloat(valorDireto) || 0;
    } else {
      qtdEntregas = listaEntregasDia.length;
      brutoDia = listaEntregasDia.reduce((total, valor) => total + valor, 0);
    }

    const descontoPadrao = brutoDia * (porcentagem / 100);
    let liquidoDia = brutoDia - descontoPadrao;
    let descontoFinal = descontoPadrao;
    let garantidoAplicado = false;

    if (nomeEmpresaLimpo === 'mama roma') {
      const ehAlmocoMeioSemana = ['Seg', 'Ter', 'Qua', 'Qui'].includes(diaSemana) && turno === 'Dia';
      if (!ehAlmocoMeioSemana && liquidoDia < 80.00) {
        liquidoDia = 80.00;
        garantidoAplicado = true;
        descontoFinal = Math.max(0, brutoDia - 80.00);
      }
    }

    const novoDia = {
      empresa: empresaFinal,
      diaSemana,
      turno,
      textoTurno: turno === 'Dia' ? 'Almoço' : 'Jantar',
      qtdEntregas,
      bruto: brutoDia,
      desconto: descontoFinal,
      liquido: liquidoDia,
      taxaCobrada: porcentagem,
      garantido: garantidoAplicado
    };

    setSemana([...semana, novoDia]);
    
    setEmpresaSelecionada('');
    setEmpresaManual('');
    setDiaSemana('');
    setTurno('Noite');
    setListaEntregasDia([]);
    setQtdDireto('');
    setValorDireto('');
    setModoDireto(false);
  };

  const totalDescontoSemana = semana.reduce((acc, dia) => acc + (Number(dia.desconto) || 0), 0);
  const totalLiquidoSemana = semana.reduce((acc, dia) => acc + (Number(dia.liquido) || 0), 0);

  const gerarTextoRelatorio = () => {
    let texto = `🏍️ *FECHAMENTO SEMANAL DE ENTREGAS*\n`;
    texto += `👤 *Motoboy:* ${nomeMotoboy.trim()}\n\n`;
    
    semana.forEach((d) => {
      const indicadorEmpresa = obterIndicadorWhatsApp(d.empresa);
      texto += `📅 *${d.diaSemana} (${d.textoTurno === 'Almoço' ? '☀️ Almoço' : '🌙 Jantar'})* — ${indicadorEmpresa}\n`;
      texto += `• Entregas: ${d.qtdEntregas}\n`;
      texto += `• Taxa Retida: R$ ${(d.desconto || 0).toFixed(2)}\n`;
      
      if (d.garantido) {
        texto += `• Valor Líquido: R$ ${(d.liquido || 0).toFixed(2)} 🔥 (Diária Garantida)\n\n`;
      } else {
        texto += `• Valor Líquido: R$ ${(d.liquido || 0).toFixed(2)}\n\n`;
      }
    });
    
    texto += `========================\n`;
    texto += `💰 *TOTAL A RECEBER:* R$ ${(totalLiquidoSemana || 0).toFixed(2)}\n`;
    texto += `📉 Total Descontado na Semana: R$ ${(totalDescontoSemana || 0).toFixed(2)}`;
    return texto;
  };

  const enviarWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(gerarTextoRelatorio())}`, '_blank');
  };

  const enviarEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent("Fechamento Semanal - " + nomeMotoboy)}&body=${encodeURIComponent(gerarTextoRelatorio())}`;
  };

  return (
    <div className="container">
      
      {mostrarModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex', justifyContent: 'center',
          alignItems: 'center', zIndex: 9999, padding: '20px', boxSizing: 'border-box'
        }}>
          <div style={{
            backgroundColor: '#202024', borderRadius: '12px', padding: '25px',
            maxWidth: '450px', width: '100%', border: '2px solid #ff9000',
            textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', color: '#fff'
          }}>
            <h2 style={{ color: '#ff9000', marginTop: 0, fontSize: '22px' }}>📋 Progresso Encontrado!</h2>
            <p style={{ fontSize: '15px', lineHeight: '1.5', color: '#c4c4cc' }}>
              Identificamos um fechamento de entregas em andamento que não foi concluído. Como deseja prosseguir?
            </p>
            <div style={{
              margin: '20px 0', padding: '10px', backgroundColor: '#121214',
              borderRadius: '8px', fontSize: '13px', textAlign: 'left', borderLeft: '4px solid #ff9000'
            }}>
              <b>Lançamentos pendentes:</b> {dadosTemporarios?.length || 0} períodos registrados.
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '25px' }}>
              <button onClick={aceitarRecuperacao} style={{
                flex: 1, padding: '12px', backgroundColor: '#00b37e', color: '#fff',
                border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px'
              }}>
                Continuar 👍
              </button>
              <button onClick={recusarRecuperacao} style={{
                flex: 1, padding: '12px', backgroundColor: '#f75a68', color: '#fff',
                border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px'
              }}>
                Limpar do Zero 🗑️
              </button>
            </div>
          </div>
        </div>
      )}

      {modalExcluirDia.visivel && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex', justifyContent: 'center',
          alignItems: 'center', zIndex: 9999, padding: '20px', boxSizing: 'border-box'
        }}>
          <div style={{
            backgroundColor: '#202024', borderRadius: '12px', padding: '25px',
            maxWidth: '400px', width: '100%', border: '2px solid #f75a68',
            textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', color: '#fff'
          }}>
            <h3 style={{ color: '#f75a68', marginTop: 0 }}>🗑️ Remover Lançamento?</h3>
            <p style={{ fontSize: '14px', color: '#c4c4cc', lineHeight: '1.4' }}>
              Tem certeza que deseja apagar o registro de: <br/>
              <strong style={{ color: '#fff', display: 'block', marginTop: '8px', fontSize: '15px' }}>{modalExcluirDia.info}</strong>
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '25px' }}>
              <button onClick={confirmarExclusaoDia} style={{
                flex: 1, padding: '11px', backgroundColor: '#f75a68', color: '#fff',
                border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
              }}>
                Sim, Excluir
              </button>
              <button onClick={() => setModalExcluirDia({ visivel: false, index: null, info: '' })} style={{
                flex: 1, padding: '11px', backgroundColor: '#29292e', color: '#e1e1e6',
                border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
              }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarModalZerar && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex', justifyContent: 'center',
          alignItems: 'center', zIndex: 9999, padding: '20px', boxSizing: 'border-box'
        }}>
          <div style={{
            backgroundColor: '#202024', borderRadius: '12px', padding: '25px',
            maxWidth: '#420px', width: '100%', border: '2px solid #ff9000',
            textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', color: '#fff'
          }}>
            <h3 style={{ color: '#ff9000', marginTop: 0 }}>⚠️ Apagar Tudo?</h3>
            <p style={{ fontSize: '14px', color: '#c4c4cc', lineHeight: '1.5' }}>
              Esta ação irá deletar <strong>TODOS</strong> os dias lançados nesta folha de fechamento. Essa operação não pode ser desfeita.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '25px' }}>
              <button onClick={confirmarZerarSemanaCompleta} style={{
                flex: 1, padding: '11px', backgroundColor: '#f75a68', color: '#fff',
                border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
              }}>
                Limpar Tudo 🗑️
              </button>
              <button onClick={() => setMostrarModalZerar(false)} style={{
                flex: 1, padding: '11px', backgroundColor: '#29292e', color: '#e1e1e6',
                border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
              }}>
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="header-container">
        <img src={logoPerfil} alt="Profissão Perigo" className="profile-pic" />
        <h1>Calculadora de Ganhos</h1>
      </div>

      <section className="card">
        <h3>Identificação e Empresa</h3>
        
        <label>Seu Nome (Motoboy):</label>
        <input 
          type="text" 
          placeholder="Digite seu nome completo" 
          value={nomeMotoboy} 
          onChange={(e) => { setNomeMotoboy(e.target.value); setErrosCampos(p => ({...p, nomeMotoboy: false})); }} 
          className="input-field" 
          style={{ borderColor: errosCampos?.nomeMotoboy ? '#f75a68' : '', borderWidth: errosCampos?.nomeMotoboy ? '2px' : '' }}
        />

        <label>Selecione a Empresa:</label>
        <div className="company-grid" style={{ 
          border: errosCampos?.empresaSelecionada ? '2px solid #f75a68' : '2px solid transparent', 
          borderRadius: '10px', padding: errosCampos?.empresaSelecionada ? '6px' : '0' 
        }}>
          <button type="button" className={`company-card ${empresaSelecionada === 'Mama Roma' ? 'active' : ''}`} onClick={() => { setEmpresaSelecionada('Mama Roma'); setEmpresaManual(''); setErrosCampos(p => ({...p, empresaSelecionada: false})); }}>
            <img src={logoMamaRoma} alt="Mama Roma" className="company-logo-img" />
            <span>Mama Roma</span>
          </button>
          <button type="button" className={`company-card ${empresaSelecionada === 'Aceite' ? 'active' : ''}`} onClick={() => { setEmpresaSelecionada('Aceite'); setEmpresaManual(''); setErrosCampos(p => ({...p, empresaSelecionada: false})); }}>
            <img src={logoAceite} alt="Aceite" className="company-logo-img" />
            <span>Aceite</span>
          </button>
          <button type="button" className={`company-card ${empresaSelecionada === 'HNT' ? 'active' : ''}`} onClick={() => { setEmpresaSelecionada('HNT'); setEmpresaManual(''); setErrosCampos(p => ({...p, empresaSelecionada: false})); }}>
            <img src={logoHNT} alt="HNT" className="company-logo-img" />
            <span>HNT</span>
          </button>
          <button type="button" className={`company-card ${empresaSelecionada === 'Outra' ? 'active' : ''}`} onClick={() => { setEmpresaSelecionada('Outra'); setErrosCampos(p => ({...p, empresaSelecionada: false})); }}>
            <img src={logoDefault} alt="Outra Empresa" className="company-logo-img" />
            <span>{empresaManual || 'Outra'}</span>
          </button>
        </div>

        {empresaSelecionada === 'Outra' && (
          <input 
            type="text" 
            placeholder="Digite o nome da empresa manualmente" 
            value={empresaManual} 
            onChange={(e) => { setEmpresaManual(e.target.value); setErrosCampos(p => ({...p, empresaManual: false})); }} 
            className="input-field" 
            style={{ marginBottom: '15px', borderColor: errosCampos?.empresaManual ? '#f75a68' : '' }} 
          />
        )}
        
        <label>Dia da Semana:</label>
        <div className="days-grid" style={{ 
          border: errosCampos?.diaSemana ? '2px solid #f75a68' : '2px solid transparent', 
          borderRadius: '10px', padding: errosCampos?.diaSemana ? '4px' : '0' 
        }}>
          {DIAS_DA_SEMANA.map((dia) => (
            <label key={dia} className={`day-chip ${diaSemana === dia ? 'selected' : ''}`}>
              <input type="radio" name="diaSemana" value={dia} checked={diaSemana === dia} onChange={(e) => { setDiaSemana(e.target.value); setErrosCampos(p => ({...p, diaSemana: false})); }} />
              {dia}
            </label>
          ))}
        </div>

        <label>Período / Turno:</label>
        <div className="shift-group">
          <label className={`shift-chip ${turno === 'Dia' ? 'selected' : ''}`}>
            <input type="radio" name="turno" value="Dia" checked={turno === 'Dia'} onChange={(e) => setTurno(e.target.value)} />
            ☀️ Almoço
          </label>
          <label className={`shift-chip ${turno === 'Noite' ? 'selected' : ''}`}>
            <input type="radio" name="turno" value="Noite" checked={turno === 'Noite'} onChange={(e) => setTurno(e.target.value)} />
            🌙 Jantar
          </label>
        </div>

        <label>Taxa de Porcentagem:</label>
        <div className="radio-group">
          <label className="radio-label"><input type="radio" name="porcentagem" checked={porcentagem === 18} onChange={() => setPorcentagem(18)} /> 18%</label>
          <label className="radio-label"><input type="radio" name="porcentagem" checked={porcentagem === 20} onChange={() => setPorcentagem(20)} /> 20%</label>
        </div>

        {empresaSelecionada && (
          <div className="toggle-mode-container">
            <button type="button" className={`toggle-tab ${!modoDireto ? 'active' : ''}`} onClick={() => setModoDireto(false)}>
              Por Corrida
            </button>
            <button type="button" className={`toggle-tab ${modoDireto ? 'active' : ''}`} onClick={() => setModoDireto(true)}>
              Lançar Total Direto
            </button>
          </div>
        )}

        {empresaSelecionada && (modoDireto ? (
          <div className="delivery-box border-orange" style={{ border: (errosCampos?.qtdDireto || errosCampos?.valorDireto) ? '2px solid #f75a68' : '' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#ff9000' }}>Fechamento Total Direto</h4>
            <label>Quantidade de Entregas Realizadas:</label>
            <input 
              type="number" 
              placeholder="Ex: 14" 
              value={qtdDireto} 
              onChange={(e) => { setQtdDireto(e.target.value); setErrosCampos(p => ({...p, qtdDireto: false})); }} 
              className="input-field" 
              style={{ borderColor: errosCampos?.qtdDireto ? '#f75a68' : '' }}
            />
            
            <label>Valor Bruto Total Acumulado (R$):</label>
            <input 
              type="number" 
              placeholder="Ex: 210.50" 
              value={valorDireto} 
              onChange={(e) => { setValorDireto(e.target.value); setErrosCampos(p => ({...p, valorDireto: false})); }} 
              className="input-field" 
              style={{ borderColor: errosCampos?.valorDireto ? '#f75a68' : '' }}
            />
          </div>
        ) : (
          <div className="delivery-box" style={{ border: errosCampos?.listaEntregasDia ? '2px solid #f75a68' : '' }}>
            {usaTabelaAutomatica && (
              <div style={{ marginBottom: '15px', borderBottom: '1px dashed #29292e', paddingBottom: '15px' }}>
                <span className="helper-title">🔍 Auxílio de Tabela (Opcional):</span>
                <input type="text" placeholder="Escreva o nome do bairro para buscar..." value={buscaBairro} onChange={(e) => setBuscaBairro(e.target.value)} className="input-field" style={{ marginBottom: '5px' }} />
                
                {sugeridos.length > 0 && (
                  <div className="suggestions-box">
                    {sugeridos.map(b => (
                      <div key={b} className="suggestion-item" onClick={() => aplicarPrecoTabela(b)}>
                        <span>{b}</span>
                        <span className="suggestion-price">R$ {obterPrecoBairro(b).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <select value={bairroSelecionado} onChange={(e) => aplicarPrecoTabela(e.target.value)} className="input-field" style={{ marginTop: '10px' }}>
                  <option value="">-- Ou escolha na lista suspensa --</option>
                  {Object.keys(TABELA_PRECOS).map((b) => (
                    <option key={b} value={b}>{b} (R$ {obterPrecoBairro(b).toFixed(2)})</option>
                  ))}
                </select>
              </div>
            )}

            <label>Valor da Corrida / Taxa (R$):</label>
            <input 
              type="number" 
              placeholder="Digite o valor manualmente" 
              value={valorEntrega} 
              onChange={(e) => { setValorEntrega(e.target.value); setErrosCampos(p => ({...p, valorEntrega: false})); }} 
              className="input-field" 
              style={{ borderColor: errosCampos?.valorEntrega ? '#f75a68' : '' }}
            />

            {bairroSelecionado && <p style={{ color: '#ff9000', margin: '5px 0', fontSize: '13px' }}><b>Bairro ativo:</b> {bairroSelecionado}</p>}
            
            <button onClick={adicionarEntrega} className="btn btn-secondary" style={{ marginTop: '5px' }}>
              + Incluir Corrida no Dia
            </button>

            <div className="info-text">
              <b>Hoje:</b> {listaEntregasDia.length} entregas | <b>Bruto:</b> R$ {listaEntregasDia.reduce((a,b)=>a+b, 0).toFixed(2)}
            </div>
          </div>
        ))}

        {avisoErroGeral && (
          <div style={{ 
            color: '#f75a68', backgroundColor: 'rgba(247, 90, 104, 0.1)', 
            padding: '12px', borderRadius: '6px', margin: '15px 0 5px 0', 
            fontSize: '14px', fontWeight: 'bold', textAlign: 'center', border: '1px solid rgba(247, 90, 104, 0.3)'
          }}>
            {avisoErroGeral}
          </div>
        )}

        <button onClick={salvarDiaNaSemana} className="btn btn-primary" style={{ marginTop: '15px' }}>
          💾 Salvar este Dia e Adicionar Outro
        </button>
      </section>

      {semana.length > 0 && (
        <section className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ margin: 0 }}>Resumo do Fechamento</h3>
            <span style={{ fontSize: '11px', color: '#ff9000' }}>💡 Clique em um dia para removê-lo</span>
          </div>
          
          {semana.map((dia, index) => (
            <div 
              key={index} 
              className="history-item" 
              onClick={() => acionarExcluirDia(index, dia)}
              title="Clique para excluir este dia"
              style={{ cursor: 'pointer', transition: 'background 0.2s' }}
            >
              <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
                📅 {dia?.diaSemana || ''} ({dia?.textoTurno === 'Almoço' ? '☀️ Almoço' : '🌙 Jantar'}) — {dia?.empresa || ''}
              </span>
              <div className="history-row">
                <span>{dia?.qtdEntregas || 0} corr.</span>
                <span>Bruto: R$ {(dia?.bruto || 0).toFixed(2)}</span>
                <span>Taxa: R$ {(dia?.desconto || 0).toFixed(2)}</span>
                <span style={{ color: '#00b37e', fontWeight: 'bold' }}>
                  Líq: R$ {(dia?.liquido || 0).toFixed(2)} {dia?.garantido && '🔥'}
                </span>
              </div>
              {dia?.garantido && (
                <p style={{ color: '#ff9000', margin: '3px 0 0 0', fontSize: '12px', fontWeight: 'bold' }}>
                  * Valor garantido de R$ 80,00 aplicado (Desconto: R$ {(dia?.desconto || 0).toFixed(2)}).
                </p>
              )}
            </div>
          ))}

          <div className="total-box">
            <h3>Total Líquido: R$ {(totalLiquidoSemana || 0).toFixed(2)}</h3>
            <span style={{ fontSize: '12px', color: '#f75a68' }}>Total descontado da semana: R$ {(totalDescontoSemana || 0).toFixed(2)}</span>
          </div>

          <div className="btn-group">
            <button onClick={enviarWhatsApp} className="btn btn-success">
              WhatsApp 🟢
            </button>
            <button onClick={enviarEmail} className="btn btn-blue">
              E-mail 🔵
            </button>
            <button onClick={() => setMostrarModalZerar(true)} className="btn btn-danger" style={{ backgroundColor: '#f75a68', color: '#fff' }}>
              Zerar Semana 🗑️
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;