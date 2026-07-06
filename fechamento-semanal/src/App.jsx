import { useState, useEffect } from 'react'
import './App.css'
import logoPerfil from '/public/logo.jpg';
import logoMamaRoma from '/public/logoMAMAROMO.jpg';
import logoAceite from '/public/logoACEITE.jpg';
import logoHNT from '/public/logoHNT.jpg';
import logoBents from '/public/logoBENTS.jpg';
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
const TABELA_ZONA_NORTE = {
  "Adolfo Vireque": 17.00, "Grajaú": 13.00, "Sagrado C Jesus": 20.00, // [cite: 1]
  "Aeroporto": 19.00, "Grambery": 13.00, "Salvaterra": 18.00, // [cite: 1]
  "Alto dos Passos": 14.00, "Graminha": 18.00, "Santa Cândida": 15.00, // [cite: 1]
  "Alto dos Pinheiros": 17.00, "Granville": 17.00, "Santa Catarina": 11.00, // [cite: 1]
  "Aracy": 15.00, "Guaruá": 15.00, "Santa Cecília": 14.00, // [cite: 1]
  "Arco Iris": 20.00, "Ipiranga": 15.00, "Santa Luzia": 17.00, // [cite: 1]
  "Bairu": 12.00, "Guadalajara": 18.00, "Santa Efigênia": 20.00, // [cite: 1]
  "Bandeirantes": 13.00, "Industrial": 10.00, "Santa Paula": 15.00, // [cite: 1]
  "Bela Aurora": 20.00, "Itatiaia": 17.00, "Santa Rita": 14.00, // [cite: 1]
  "Boa Vista": 15.00, "Jardim de Alá": 18.00, "Santa Helena": 13.00, // [cite: 1]
  "Bom Clima": 12.00, "Jardim América": 18.00, "Santa Teresa": 15.00, // [cite: 1]
  "Bom Jardim": 15.00, "Jardim Casa Blanca": 17.00, "Santa Terezinha": 9.00, // [cite: 1]
  "Bom Passtor": 15.00, "Jardim Laranjeiras": 15.00, "Santo Antônio": 20.00, // [cite: 1]
  "Bonfim": 14.00, "Jardim da Serra": 22.00, "Santos Anjos": 13.00, // [cite: 1]
  "Borboleta": 15.00, "Jardim Imperador": 17.00, "Santos Dumont": 18.00, // [cite: 1]
  "Borborema": 15.00, "Jardins Imperiais": 17.00, "São Benedito": 15.00, // [cite: 1]
  "Bosque do Imperador": 20.00, "Jardim do Sol": 16.00, "São Bernardo": 15.00, // [cite: 1]
  "Bosque dos Pinheiros": 16.00, "Jardim Gaúcho": 16.00, "São Clemente": 15.00, // [cite: 1]
  "Bosque Imperial": 17.00, "Jardim Glória": 11.00, "São Dimas": 9.00, // [cite: 1]
  "Caiçaras": 20.00, "Jk": 15.00, "São Sebastião": 15.00, // [cite: 1]
  "Carlos Chagas": 10.00, "Linhares": 22.00, "São Geraldo": 20.00, // [cite: 1]
  "Cascatinha": 15.00, "Lourdes": 16.00, "São Mateus": 15.00, // [cite: 1]
  "Centenário": 12.00, "Manoel Honório": 11.00, "São Pedro": 17.00, // [cite: 1]
  "Centro": 12.00, "Ladeira": 11.00, "Solidariedade": 15.00, // [cite: 1]
  "Cerâmica": 9.00, "Mariano Procópio": 9.00, "Spina Ville": 20.00, // [cite: 1]
  "Cerro Azul": 16.00, "Marilândia": 19.00, "Teixeiras": 17.00, // [cite: 1]
  "Cesário Alvim": 15.00, "Martelos": 17.00, "Tiguera": 15.00, // [cite: 1]
  "Chales do Imperador": 17.00, "Marumbi": 13.00, "UFJF": 15.00, // [cite: 1]
  "Chales dos Algares": 17.00, "Monte Castelo": 13.00, "Tupã": 16.00, // [cite: 1]
  "Cidade Jardim": 15.00, "Morro do Imperador": 17.00, "Vale da Serra": 25.00, // [cite: 1]
  "Cidade Nova": 17.00, "Mundo Novo": 14.00, "Vale do Ipê": 11.00, // [cite: 1]
  "Colinas do Imperador": 20.00, "N. Sra. Aparecida": 13.00, "Vale Verde": 20.00, // [cite: 1]
  "Cond. Jardim da Serra": 22.00, "N. Sra. das Graças": 13.00, "Vila Alpina": 15.00, // [cite: 1]
  "Costa Carvalho": 13.00, "N. Sra. de Fátima": 17.00, "Vila Ideal": 15.00, // [cite: 1]
  "Cruzeiro do Sul": 15.00, "Nova Califórnia": 22.00, "Vila Olavo Costa": 15.00, // [cite: 1]
  "Democrata": 9.00, "Novo Horizonte": 20.00, "Vila Ozanan": 15.00, // [cite: 1]
  "Dom Orione": 17.00, "Paineiras": 13.00, "Vitorino Braga": 14.00, // [cite: 1]
  "Eldorado": 12.00, "Parque Imperial": 17.00, "Vivendas da Serra": 15.00, // [cite: 1]
  "Dom Bosco": 14.00, "Parque Burnier": 16.00, "Vina Del Mar": 22.00, // [cite: 1]
  "Esplanada": 12.00, "Pq. Da Lajinha": 20.00, "Dom Juan": 17.00, // [cite: 1]
  "Estrela Sul": 15.00, "Poço Rico": 13.00, "São Tarcisio": 15.00, // [cite: 1]
  "Fazendinha Ipiranga": 25.00, "Previdenciários": 20.00, "Nova era": 25.00, // [cite: 1]
  "Fábrica": 10.00, "Progresso": 15.00, "Cidade do Sol": 20.00, // [cite: 1]
  "Furtado Menezes": 15.00, "Quintas Avenida": 12.00, "Barbosa Lage": 15.00, // [cite: 1]
  "Recanto da Mata": 20.00, "Distrito Industrial": 32.00, "Parque Independ.": 30.00, // [cite: 1]
  "Santa Cruz": 25.00, "Barreira": 35.00, "Granjas Betânia": 17.00, // [cite: 1]
  "Benfica": 28.00, "Náutico": 50.00, "Recanto dos Lagos": 20.00, // [cite: 2]
  "Nova Benfica": 30.00, "Grama": 30.00, "BR": 1.20 // [cite: 2]
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

  // Novas states para as novas regras de negocio
  const [unidadeAceite, setUnidadeAceite] = useState('São Mateus');
  const [empresaCorridaZonaNorte, setEmpresaCorridaZonaNorte] = useState('Aceite');
  const [qtdDiretoHNT, setQtdDiretoHNT] = useState('');
  const [valorDiretoHNT, setValorDiretoHNT] = useState('');

  const getTabelaAtiva = () => {
    const esZonaNorte = (empresaSelecionada === 'Aceite' && unidadeAceite === 'Zona Norte') || empresaSelecionada === 'HNT';
    return esZonaNorte ? TABELA_ZONA_NORTE : TABELA_PRECOS;
  };
  const empresaFinal = empresaSelecionada === 'Outra' 
    ? (empresaManual || 'Outra Empresa') 
    : (empresaSelecionada === 'Aceite' && unidadeAceite === 'Zona Norte' ? 'Aceite + HNT (ZN)' : empresaSelecionada);

  const nomeEmpresaLimpo = empresaFinal ? empresaFinal.trim().toLowerCase() : '';
  const usaTabelaAutomatica = nomeEmpresaLimpo === 'aceite' || nomeEmpresaLimpo === 'hnt' || nomeEmpresaLimpo === 'aceite + hnt (zn)' || empresaSelecionada === 'Outra';

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

  const obtenerIndicadorWhatsApp = (nomeEmpresa) => {
    if (!nomeEmpresa) return '🏢 *EMPRESA*';
    const emp = nomeEmpresa.trim().toLowerCase();
    if (emp === 'mama roma') return `🍝 *MAMA ROMA*`;
    if (emp === 'aceite') return `🥗 *ACEITE*`;
    if (emp === 'hnt') return `🍗 *HNT*`;
    if (emp === 'bents') return `🍔 *BENTS*`;
    if (emp.includes('aceite + hnt')) return `🥗🍗 *ACEITE + HNT (ZN)*`;
    return `🏢 *${nomeEmpresa.toUpperCase()}*`;
  };

  const obterPrecoBairro = (bairro) => {
    // usa a tabela atualmente ativa (Zona Norte ou tabela padrão)
    const tabela = getTabelaAtiva();
    let precoBase = tabela[bairro] || 0;
    if (nomeEmpresaLimpo === 'hnt' && bairro === 'São Mateus') {
      return precoBase + 1.00; 
    }
    return precoBase;
  };

  const sugeridos = buscaBairro.trim() === ''
    ? []
    : Object.keys(getTabelaAtiva()).filter(b =>
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
    
    // Identifica qual a empresa correta para vincular a corrida na Zona Norte
    const empresaVinculo = (empresaSelecionada === 'Aceite' && unidadeAceite === 'Zona Norte') 
      ? empresaCorridaZonaNorte 
      : empresaFinal;

    setListaEntregasDia([...listaEntregasDia, { valor: parseFloat(valorEntrega), empresa: empresaVinculo }]);
    setValorEntrega('');
    setBairroSelecionado('');
  };
  function calcularValorUnidade(unidade, bairro, deveTirarTaxa, taxaEmpresa) {
    let valorBase = 0;
    if (unidade && unidade.trim().toLowerCase() === "jardim norte") {
      const precoBairro = TABELA_ZONA_NORTE[bairro];
      if (precoBairro !== undefined) {
        valorBase = precoBairro;
      }
      if (deveTirarTaxa) {
        valorBase -= taxaEmpresa;
      }
      return Math.max(0, valorBase);
    } else {
        const tabela = getTabelaAtiva();
        return tabela[bairro] || 0;
    }
  }

  
const esZonaNorte = (empresaSelecionada === 'Aceite' && unidadeAceite === 'Zona Norte') || empresaSelecionada === 'HNT';
const tabelaAtiva = esZonaNorte ? TABELA_ZONA_NORTE : TABELA_PRECOS;

  const salvarDiaNaSemana = () => {
    let novosErros = {};
    setAvisoErroGeral('');

    if (!nomeMotoboy || !nomeMotoboy.trim()) novosErros.nomeMotoboy = true;
    if (!empresaSelecionada) novosErros.empresaSelecionada = true;
    if (empresaSelecionada === 'Outra' && (!empresaManual || !empresaManual.trim())) novosErros.empresaManual = true;
    if (!diaSemana) novosErros.diaSemana = true;

    let brutoDia = 0;
    let qtdEntregas = 0;
    let descontoFinal = 0;
    let liquidoDia = 0;
    let garantidoAplicado = false;

    // Validacao customizada de campos baseado nas novas empresas
    if (empresaSelecionada === 'Bents') {
      if (!qtdDireto || isNaN(qtdDireto) || parseFloat(qtdDireto) < 0) novosErros.qtdDireto = true;
    } else if (empresaSelecionada === 'Aceite' && unidadeAceite === 'Zona Norte') {
      if (modoDireto) {
        if (!qtdDireto || isNaN(qtdDireto) || parseFloat(qtdDireto) < 0) novosErros.qtdDireto = true;
        if (!valorDireto || isNaN(valorDireto) || parseFloat(valorDireto) < 0) novosErros.valorDireto = true;
        if (!qtdDiretoHNT || isNaN(qtdDiretoHNT) || parseFloat(qtdDiretoHNT) < 0) novosErros.qtdDiretoHNT = true;
        if (!valorDiretoHNT || isNaN(valorDiretoHNT) || parseFloat(valorDiretoHNT) < 0) novosErros.valorDiretoHNT = true;
      } else {
        if (listaEntregasDia.length === 0) {
          novosErros.listaEntregasDia = true;
          if (valorEntrega) novosErros.lembreteBotao = true; 
        }
      }
    } else {
      if (modoDireto) {
        if (!qtdDireto || isNaN(qtdDireto) || parseFloat(qtdDireto) <= 0) novosErros.qtdDireto = true;
        if (!valorDireto || isNaN(valorDireto) || parseFloat(valorDireto) <= 0) novosErros.valorDireto = true;
      } else {
        if (listaEntregasDia.length === 0) {
          novosErros.listaEntregasDia = true;
          if (valorEntrega) novosErros.lembreteBotao = true; 
        }
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

    // Regra de calculo customizado para a BENTS
    if (empresaSelecionada === 'Bents') {
      qtdEntregas = parseInt(qtdDireto) || 0;
      brutoDia = 60.00 + (qtdEntregas * 8.00);
      const descontoPadrao = brutoDia * (porcentagem / 100);
      liquidoDia = brutoDia - descontoPadrao;
      
      const ehFimDeSemana = ['Sáb', 'Dom'].includes(diaSemana);
      const minimoGarantido = ehFimDeSemana ? 100.00 : 80.00;
      
      if (liquidoDia < minimoGarantido) {
        liquidoDia = minimoGarantido;
        garantidoAplicado = true;
        descontoFinal = Math.max(0, brutoDia - minimoGarantido);
      } else {
        descontoFinal = descontoPadrao;
      }
    } 
    // Regra de calculo customizado para a ACEITE ZONA NORTE (Aceite + HNT)
    else if (empresaSelecionada === 'Aceite' && unidadeAceite === 'Zona Norte') {
      let brutoAceite = 0;
      let qtdAceite = 0;
      let brutoHNT = 0;
      let qtdHNT = 0;

      if (modoDireto) {
        qtdAceite = parseInt(qtdDireto) || 0;
        brutoAceite = parseFloat(valorDireto) || 0;
        qtdHNT = parseInt(qtdDiretoHNT) || 0;
        brutoHNT = parseFloat(valorDiretoHNT) || 0;
      } else {
        qtdAceite = listaEntregasDia.filter(i => i.empresa === 'Aceite').length;
        brutoAceite = listaEntregasDia.filter(i => i.empresa === 'Aceite').reduce((a, b) => a + b.valor, 0);
        qtdHNT = listaEntregasDia.filter(i => i.empresa === 'HNT').length;
        brutoHNT = listaEntregasDia.filter(i => i.empresa === 'HNT').reduce((a, b) => a + b.valor, 0);
      }

      // Calcula garantidos separados de R$ 45 cada
      let liqAceite = brutoAceite - (brutoAceite * (porcentagem / 100));
      if (liqAceite < 45.00) {
        liqAceite = 45.00;
        garantidoAplicado = true;
      }

      let liqHNT = brutoHNT - (brutoHNT * (porcentagem / 100));
      if (liqHNT < 45.00) {
        liqHNT = 45.00;
        garantidoAplicado = true;
      }

      brutoDia = brutoAceite + brutoHNT;
      qtdEntregas = qtdAceite + qtdHNT;
      liquidoDia = liqAceite + liqHNT;
      descontoFinal = brutoDia - liquidoDia;
    } 
    // Regras originais das demais empresas
    else {
      if (modoDireto) {
        qtdEntregas = parseInt(qtdDireto) || 0;
        brutoDia = parseFloat(valorDireto) || 0;
      } else {
        qtdEntregas = listaEntregasDia.length;
        brutoDia = listaEntregasDia.reduce((total, item) => total + item.valor, 0);
      }

      const descontoPadrao = brutoDia * (porcentagem / 100);
      liquidoDia = brutoDia - descontoPadrao;
      descontoFinal = descontoPadrao;

      if (nomeEmpresaLimpo === 'mama roma') {
        const ehAlmocoMeioSemana = ['Seg', 'Ter', 'Qua', 'Qui'].includes(diaSemana) && turno === 'Dia';
        if (!ehAlmocoMeioSemana && liquidoDia < 80.00) {
          liquidoDia = 80.00;
          garantidoAplicado = true;
          descontoFinal = Math.max(0, brutoDia - 80.00);
        }
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
    
    // Reseta todos os campos para o padrão original
    setEmpresaSelecionada('');
    setEmpresaManual('');
    setDiaSemana('');
    setTurno('Noite');
    setListaEntregasDia([]);
    setQtdDireto('');
    setValorDireto('');
    setQtdDiretoHNT('');
    setValorDiretoHNT('');
    setModoDireto(false);
    setUnidadeAceite('São Mateus');
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
    try {
      const texto = encodeURIComponent(gerarTextoRelatorio());
      const isMobile = /Mobi|Android/i.test(navigator.userAgent || '');
      const base = isMobile ? 'https://api.whatsapp.com/send' : 'https://web.whatsapp.com/send';
      const url = `${base}?text=${texto}`;
      const win = window.open(url, '_blank', 'noopener,noreferrer');
      if (!win) {
        // popup bloqueado — navegar na mesma aba como fallback
        window.location.href = url;
      }
    } catch (e) {
      console.error('Erro ao abrir WhatsApp:', e);
      try {
        window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(gerarTextoRelatorio())}`;
      } catch (err) {
        console.error('Fallback também falhou:', err);
      }
    }
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
            maxWidth: '420px', width: '100%', border: '2px solid #ff9000',
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
          <button type="button" className={`company-card ${(empresaSelecionada === 'HNT' || (empresaSelecionada === 'Aceite' && unidadeAceite === 'Zona Norte')) ? 'active' : ''}`} onClick={() => { setEmpresaSelecionada('HNT'); setEmpresaManual(''); setErrosCampos(p => ({...p, empresaSelecionada: false})); }}>
            <img src={logoHNT} alt="HNT" className="company-logo-img" />
            <span>HNT</span>
          </button>
          <button type="button" className={`company-card ${empresaSelecionada === 'Bents' ? 'active' : ''}`} onClick={() => { setEmpresaSelecionada('Bents'); setEmpresaManual(''); setErrosCampos(p => ({...p, empresaSelecionada: false})); setModoDireto(true); }}>
            <img src={logoBents} alt="Bents" className="company-logo-img" />
            <span>Bents</span>
          </button>
          <button type="button" className={`company-card ${empresaSelecionada === 'Outra' ? 'active' : ''}`} onClick={() => { setEmpresaSelecionada('Outra'); setErrosCampos(p => ({...p, empresaSelecionada: false})); }}>
            <img src={logoDefault} alt="Outra Empresa" className="company-logo-img" />
            <span>{empresaManual || 'Outra'}</span>
          </button>
        </div>

        {/* Categoria adicional/sobreposição para a empresa Aceite */}
        {empresaSelecionada === 'Aceite' && (
          <div style={{ marginTop: '12px', marginBottom: '15px', backgroundColor: 'rgba(255,144,0,0.05)', padding: '12px', borderRadius: '8px', border: '1px dashed #ff9000' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#ff9000' }}>📍 Unidade / Região de Atuação:</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <label className={`shift-chip ${unidadeAceite === 'São Mateus' ? 'selected' : ''}`} style={{ flex: 1, textAlign: 'center', cursor: 'pointer', padding: '10px' }}>
                <input type="radio" name="unidadeAceite" value="São Mateus" checked={unidadeAceite === 'São Mateus'} onChange={(e) => setUnidadeAceite(e.target.value)} style={{ display: 'none' }} />
                São Mateus
              </label>
              <label className={`shift-chip ${unidadeAceite === 'Zona Norte' ? 'selected' : ''}`} style={{ flex: 1, textAlign: 'center', cursor: 'pointer', padding: '10px' }}>
                <input type="radio" name="unidadeAceite" value="Zona Norte" checked={unidadeAceite === 'Zona Norte'} onChange={(e) => setUnidadeAceite(e.target.value)} style={{ display: 'none' }} />
                Zona Norte (Aceite + HNT)
              </label>
            </div>
          </div>
        )}

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

        {/* Esconde as abas de modo se for Bents (ja que so aceita quantidade direta) */}
        {empresaSelecionada && empresaSelecionada !== 'Bents' && (
          <div className="toggle-mode-container">
            <button type="button" className={`toggle-tab ${!modoDireto ? 'active' : ''}`} onClick={() => setModoDireto(false)}>
              Por Corrida
            </button>
            <button type="button" className={`toggle-tab ${modoDireto ? 'active' : ''}`} onClick={() => setModoDireto(true)}>
              Lançar Total Direto
            </button>
          </div>
        )}

        {/* Renderizacao dos boxes de entrega de acordo com a empresa selecionada */}
        {empresaSelecionada === 'Bents' ? (
          <div className="delivery-box border-orange" style={{ border: errosCampos?.qtdDireto ? '2px solid #f75a68' : '' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#ff9000' }}>Fechamento Bents</h4>
            <label>Quantidade de Entregas Realizadas:</label>
            <input 
              type="number" 
              placeholder="Ex: 10" 
              value={qtdDireto} 
              onChange={(e) => { setQtdDireto(e.target.value); setErrosCampos(p => ({...p, qtdDireto: false})); }} 
              className="input-field" 
              style={{ borderColor: errosCampos?.qtdDireto ? '#f75a68' : '' }}
            />
            <div className="info-text">
              <b>Fixo Diário:</b> R$ 60.00 | <b>Valor por Corrida:</b> R$ 8.00
            </div>
          </div>
        ) : empresaSelecionada && (empresaSelecionada === 'Aceite' && unidadeAceite === 'Zona Norte' && modoDireto) ? (
          <div className="delivery-box border-orange" style={{ border: (errosCampos?.qtdDireto || errosCampos?.valorDireto || errosCampos?.qtdDiretoHNT || errosCampos?.valorDiretoHNT) ? '2px solid #f75a68' : '' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#ff9000' }}>Fechamento Combinado Zona Norte (Direto)</h4>
            
            <h5 style={{ color: '#00b37e', margin: '5px 0', fontSize: '14px' }}>🥗 ACEITE</h5>
            <label>Qtd Entregas Aceite:</label>
            <input type="number" placeholder="Ex: 5" value={qtdDireto} onChange={(e) => { setQtdDireto(e.target.value); setErrosCampos(p => ({...p, qtdDireto: false})); }} className="input-field" style={{ borderColor: errosCampos?.qtdDireto ? '#f75a68' : '', marginBottom: '8px' }} />
            <label>Valor Bruto Aceite (R$):</label>
            <input type="number" placeholder="Ex: 75.00" value={valorDireto} onChange={(e) => { setValorDireto(e.target.value); setErrosCampos(p => ({...p, valorDireto: false})); }} className="input-field" style={{ borderColor: errosCampos?.valorDireto ? '#f75a68' : '', marginBottom: '12px' }} />
            
            <h5 style={{ color: '#ff9000', margin: '10px 0 5px 0', fontSize: '14px' }}>🍗 HNT</h5>
            <label>Qtd Entregas HNT:</label>
            <input type="number" placeholder="Ex: 4" value={qtdDiretoHNT} onChange={(e) => { setQtdDiretoHNT(e.target.value); setErrosCampos(p => ({...p, qtdDiretoHNT: false})); }} className="input-field" style={{ borderColor: errosCampos?.qtdDiretoHNT ? '#f75a68' : '', marginBottom: '8px' }} />
            <label>Valor Bruto HNT (R$):</label>
            <input type="number" placeholder="Ex: 60.00" value={valorDiretoHNT} onChange={(e) => { setValorDiretoHNT(e.target.value); setErrosCampos(p => ({...p, valorDiretoHNT: false})); }} className="input-field" style={{ borderColor: errosCampos?.valorDiretoHNT ? '#f75a68' : '' }} />
          </div>
        ) : empresaSelecionada && modoDireto ? (
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
                  {Object.keys(getTabelaAtiva()).map((b) => (
                    <option key={b} value={b}>{b} (R$ {obterPrecoBairro(b).toFixed(2)})</option>
                  ))}
                </select>
              </div>
            )}

            {/* Alternador de vinculo de corrida se estiver na Zona Norte */}
            {empresaSelecionada === 'Aceite' && unidadeAceite === 'Zona Norte' && (
              <div style={{ marginBottom: '15px', paddingBottom: '12px', borderBottom: '1px dashed #29292e' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Vincular esta corrida para:</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <label className={`shift-chip ${empresaCorridaZonaNorte === 'Aceite' ? 'selected' : ''}`} style={{ flex: 1, textAlign: 'center', padding: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="empresaCorridaZN" checked={empresaCorridaZonaNorte === 'Aceite'} onChange={() => setEmpresaCorridaZonaNorte('Aceite')} style={{ display: 'none' }} />
                    🥗 Aceite
                  </label>
                  <label className={`shift-chip ${empresaCorridaZonaNorte === 'HNT' ? 'selected' : ''}`} style={{ flex: 1, textAlign: 'center', padding: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="empresaCorridaZN" checked={empresaCorridaZonaNorte === 'HNT'} onChange={() => setEmpresaCorridaZonaNorte('HNT')} style={{ display: 'none' }} />
                    🍗 HNT
                  </label>
                </div>
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
              {empresaSelecionada === 'Aceite' && unidadeAceite === 'Zona Norte' ? (
                <>
                  <b>Aceite:</b> {listaEntregasDia.filter(i => i.empresa === 'Aceite').length} ent. (R$ {listaEntregasDia.filter(i => i.empresa === 'Aceite').reduce((a,b)=>a+b.valor,0).toFixed(2)}) | 
                  <b> HNT:</b> {listaEntregasDia.filter(i => i.empresa === 'HNT').length} ent. (R$ {listaEntregasDia.filter(i => i.empresa === 'HNT').reduce((a,b)=>a+b.valor,0).toFixed(2)})
                </>
              ) : (
                <>
                  <b>Hoje:</b> {listaEntregasDia.length} entregas | <b>Bruto:</b> R$ {listaEntregasDia.reduce((a,b)=>a+b.valor, 0).toFixed(2)}
                </>
              )}
            </div>
          </div>
        )}

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
                  * Valor mínimo garantido aplicado para este período/empresa.
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