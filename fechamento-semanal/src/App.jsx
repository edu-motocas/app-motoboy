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
  "Adolfo Vireque": 17.00, "Grajaú": 13.00, "Sagrado C Jesus": 20.00, 
  "Aeroporto": 19.00, "Grambery": 13.00, "Salvaterra": 18.00, 
  "Alto dos Passos": 14.00, "Graminha": 18.00, "Santa Cândida": 15.00, 
  "Alto dos Pinheiros": 17.00, "Granville": 17.00, "Santa Catarina": 11.00, 
  "Aracy": 15.00, "Guaruá": 15.00, "Santa Cecília": 14.00, 
  "Arco Iris": 20.00, "Ipiranga": 15.00, "Santa Luzia": 17.00, 
  "Bairu": 12.00, "Guadalajara": 18.00, "Santa Efigênia": 20.00, 
  "Bandeirantes": 13.00, "Industrial": 10.00, "Santa Paula": 15.00, 
  "Bela Aurora": 20.00, "Itatiaia": 17.00, "Santa Rita": 14.00, 
  "Boa Vista": 15.00, "Jardim de Alá": 18.00, "Santa Helena": 13.00, 
  "Bom Clima": 12.00, "Jardim América": 18.00, "Santa Teresa": 15.00, 
  "Bom Jardim": 15.00, "Jardim Casa Blanca": 17.00, "Santa Terezinha": 9.00, 
  "Bom Passtor": 15.00, "Jardim Laranjeiras": 15.00, "Santo Antônio": 20.00, 
  "Bonfim": 14.00, "Jardim da Serra": 22.00, "Santos Anjos": 13.00, 
  "Borboleta": 15.00, "Jardim Imperador": 17.00, "Santos Dumont": 18.00, 
  "Borborema": 15.00, "Jardins Imperiais": 17.00, "São Benedito": 15.00, 
  "Bosque do Imperador": 20.00, "Jardim do Sol": 16.00, "São Bernardo": 15.00, 
  "Bosque dos Pinheiros": 16.00, "Jardim Gaúcho": 16.00, "São Clemente": 15.00, 
  "Bosque Imperial": 17.00, "Jardim Glória": 11.00, "São Dimas": 9.00, 
  "Caiçaras": 20.00, "Jk": 15.00, "São Sebastião": 15.00, 
  "Carlos Chagas": 10.00, "Linhares": 22.00, "São Geraldo": 20.00, 
  "Cascatinha": 15.00, "Lourdes": 16.00, "São Mateus": 15.00, 
  "Centenário": 12.00, "Manoel Honório": 11.00, "São Pedro": 17.00, 
  "Centro": 12.00, "Ladeira": 11.00, "Solidariedade": 15.00, 
  "Cerâmica": 9.00, "Mariano Procópio": 9.00, "Spina Ville": 20.00, 
  "Cerro Azul": 16.00, "Marilândia": 19.00, "Teixeiras": 17.00, 
  "Cesário Alvim": 15.00, "Martelos": 17.00, "Tiguera": 15.00, 
  "Chales do Imperador": 17.00, "Marumbi": 13.00, "UFJF": 15.00, 
  "Chales dos Algares": 17.00, "Monte Castelo": 13.00, "Tupã": 16.00, 
  "Cidade Jardim": 15.00, "Morro do Imperador": 17.00, "Vale da Serra": 25.00, 
  "Cidade Nova": 17.00, "Mundo Novo": 14.00, "Vale do Ipê": 11.00, 
  "Colinas do Imperador": 20.00, "N. Sra. Aparecida": 13.00, "Vale Verde": 20.00, 
  "Cond. Jardim da Serra": 22.00, "N. Sra. das Graças": 13.00, "Vila Alpina": 15.00, 
  "Costa Carvalho": 13.00, "N. Sra. de Fátima": 17.00, "Vila Ideal": 15.00, 
  "Cruzeiro do Sul": 15.00, "Nova Califórnia": 22.00, "Vila Olavo Costa": 15.00, 
  "Democrata": 9.00, "Novo Horizonte": 20.00, "Vila Ozanan": 15.00, 
  "Dom Orione": 17.00, "Paineiras": 13.00, "Vitorino Braga": 14.00, 
  "Eldorado": 12.00, "Parque Imperial": 17.00, "Vivendas da Serra": 15.00, 
  "Dom Bosco": 14.00, "Parque Burnier": 16.00, "Vina Del Mar": 22.00, 
  "Esplanada": 12.00, "Pq. Da Lajinha": 20.00, "Dom Juan": 17.00, 
  "Estrela Sul": 15.00, "Poço Rico": 13.00, "São Tarcisio": 15.00, 
  "Fazendinha Ipiranga": 25.00, "Previdenciários": 20.00, "Nova era": 25.00, 
  "Fábrica": 10.00, "Progresso": 15.00, "Cidade do Sol": 20.00, 
  "Furtado Menezes": 15.00, "Quintas Avenida": 12.00, "Barbosa Lage": 15.00, 
  "Recanto da Mata": 20.00, "Distrito Industrial": 32.00, "Parque Independ.": 30.00, 
  "Santa Cruz": 25.00, "Barreira": 35.00, "Granjas Betânia": 17.00, 
  "Benfica": 28.00, "Náutico": 50.00, "Recanto dos Lagos": 20.00,
  "Nova Benfica": 30.00, "Grama": 30.00, "BR": 1.20 , "Milho branco": 15.00, "Amazonas": 17.00
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
  const [unidadeAceite, setUnidadeAceite] = useState('São Mateus');
  const [empresaCorridaZonaNorte, setEmpresaCorridaZonaNorte] = useState('Aceite');
  const [qtdDiretoHNT, setQtdDiretoHNT] = useState('');
  const [valorDiretoHNT, setValorDiretoHNT] = useState('');
  const [tipoAtendimento, setTipoAtendimento] = useState('Turno');

  const getTabelaAtiva = () => {
    const estaAceiteZonaNorte = empresaSelecionada === 'Aceite' && unidadeAceite === 'Zona Norte';
    return estaAceiteZonaNorte ? TABELA_ZONA_NORTE : TABELA_PRECOS;
  };
  const isZonaNorteSingleStoreMode = (dia, turnoVal) => {
    if (!dia) return false;
    if (['Sáb', 'Dom'].includes(dia)) return true;
    if (dia === 'Sex' && turnoVal === 'Noite') return true;
    return false;
  };
  const isZonaNorteDaytimeGuaranteeAceiteOnly = (dia, turnoVal) => {
    if (!dia) return false;
    if (['Sáb', 'Dom'].includes(dia)) return false;
    if (turnoVal !== 'Dia') return false;
    return !isZonaNorteSingleStoreMode(dia, turnoVal);
  };
  const getZonaNorteMinimo = (empresa, dia, turnoVal) => {
    if (isZonaNorteSingleStoreMode(dia, turnoVal)) return 100.00;
    if (empresa === 'Aceite' && isZonaNorteDaytimeGuaranteeAceiteOnly(dia, turnoVal)) return 85.00;
    return (['Sáb', 'Dom'].includes(dia) ? 50.00 : 45.00);
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

  const obterIndicadorWhatsApp = (nomeEmpresa) => {
    if (!nomeEmpresa) return '🏢 *EMPRESA*';
    const emp = nomeEmpresa.trim().toLowerCase();
    if (emp === 'mama roma') return `🍝 *MAMA ROMA*`;
    if (emp === 'aceite') return `🥗 *ACEITE*`;
    if (emp === 'aceite (zn)') return `🥗 *ACEITE (ZN)*`;
    if (emp === 'hnt') return `🍗 *HNT*`;
    if (emp === 'hnt (zn)') return `🍗 *HNT (ZN)*`;
    if (emp === 'bents') return `🍔 *BENTS*`;
    if (emp.includes('aceite + hnt')) return `🥗🍗 *ACEITE + HNT (ZN)*`;
    return `🏢 *${nomeEmpresa.toUpperCase()}*`;
  };

  const formatEmpresaResumo = (dia) => {
    if (!dia || !dia.empresa) return '';
    const empresa = dia.empresa;
    if ((empresa === 'Aceite' || empresa === 'HNT') && dia.detalhe) {
      return `${empresa} (ZN)`;
    }
    return empresa;
  };

  const obterPrecoBairro = (bairro) => {
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

  const salvarDiaNaSemana = () => {
    console.debug('salvarDiaNaSemana: iniciado', { nomeMotoboy, empresaSelecionada, diaSemana, modoDireto, listaEntregasDia });
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
    let brutoAceite = 0;
    let qtdAceite = 0;
    let brutoHNT = 0;
    let qtdHNT = 0;
    let liqAceite = 0;
    let liqHNT = 0;
    let descontoAceite = 0;
    let descontoHNT = 0;
    let garantidoAceite = false;
    let garantidoHNT = false;

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
        if (isZonaNorteSingleStoreMode(diaSemana, turno) && !empresaCorridaZonaNorte) {
          novosErros.empresaCorridaZonaNorte = true;
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
      console.debug('salvarDiaNaSemana: validação falhou', novosErros);
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

    const minimoGarantidoPorDia = ['Sáb', 'Dom'].includes(diaSemana) ? 50.00 : 45.00;
    const ehAvulso = tipoAtendimento === 'Avulso';

    if (empresaSelecionada === 'Bents') {
      qtdEntregas = parseInt(qtdDireto) || 0;
      brutoDia = ehAvulso ? (qtdEntregas * 8.00) : (60.00 + (qtdEntregas * 8.00));
      const descontoPadrao = brutoDia * (porcentagem / 100);
      liquidoDia = brutoDia - descontoPadrao;
      descontoFinal = descontoPadrao;
      
      if (!ehAvulso) {
        const ehFimDeSemana = ['Sáb', 'Dom'].includes(diaSemana);
        const minimoGarantido = ehFimDeSemana ? 100.00 : 80.00;
        
        if (liquidoDia < minimoGarantido) {
          liquidoDia = minimoGarantido;
          garantidoAplicado = true;
          descontoFinal = Math.max(0, brutoDia - minimoGarantido);
        }
      }
    } 

    else if (empresaSelecionada === 'Aceite' && unidadeAceite === 'Zona Norte') {
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

      const taxa = porcentagem / 100;

      const minimoGarantidoAceite = getZonaNorteMinimo('Aceite', diaSemana, turno);
      const minimoGarantidoHNT = getZonaNorteMinimo('HNT', diaSemana, turno);
      const garantidoHNTNaoAplicaNoDia = isZonaNorteDaytimeGuaranteeAceiteOnly(diaSemana, turno);
      garantidoAceite = false;
      garantidoHNT = false;

      if (isZonaNorteSingleStoreMode(diaSemana, turno)) {
        if (empresaCorridaZonaNorte === 'Aceite') {
          qtdHNT = 0;
          brutoHNT = 0;
        } else {
          qtdAceite = 0;
          brutoAceite = 0;
        }
      }

      const afterAceite = brutoAceite * (1 - taxa);
      const afterHNT = brutoHNT * (1 - taxa);

      if (!ehAvulso) {
        if (brutoAceite > 0) {
          if (afterAceite >= minimoGarantidoAceite) {
            liqAceite = afterAceite;
            descontoAceite = Math.max(0, brutoAceite - liqAceite);
          } else {
            liqAceite = minimoGarantidoAceite;
            descontoAceite = Math.max(0, brutoAceite - minimoGarantidoAceite);
            garantidoAceite = true;
            garantidoAplicado = true;
          }
        } else {
          liqAceite = 0;
          descontoAceite = 0;
        }
        if (brutoHNT > 0) {
          if (garantidoHNTNaoAplicaNoDia) {
            liqHNT = afterHNT;
            descontoHNT = Math.max(0, brutoHNT - liqHNT);
          } else if (afterHNT >= minimoGarantidoHNT) {
            liqHNT = afterHNT;
            descontoHNT = Math.max(0, brutoHNT - liqHNT);
          } else {
            liqHNT = minimoGarantidoHNT;
            descontoHNT = Math.max(0, brutoHNT - minimoGarantidoHNT);
            garantidoHNT = true;
            garantidoAplicado = true;
          }
        } else {
          liqHNT = 0;
          descontoHNT = 0;
        }
      } else {
        liqAceite = brutoAceite > 0 ? afterAceite : 0;
        liqHNT = brutoHNT > 0 ? afterHNT : 0;
        descontoAceite = Math.max(0, brutoAceite - liqAceite);
        descontoHNT = Math.max(0, brutoHNT - liqHNT);
      }

      brutoDia = brutoAceite + brutoHNT;
      qtdEntregas = qtdAceite + qtdHNT;
      liquidoDia = liqAceite + liqHNT;
      descontoFinal = descontoAceite + descontoHNT;
    } 
   
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

      if (!ehAvulso && nomeEmpresaLimpo === 'mama roma') {
        const ehAlmocoMeioSemana = ['Seg', 'Ter', 'Qua', 'Qui'].includes(diaSemana) && turno === 'Dia';
        const minimoGarantidoMamaRoma = diaSemana === 'Dom' ? 160.00 : 80.00;
        if (!ehAlmocoMeioSemana && liquidoDia < minimoGarantidoMamaRoma) {
          liquidoDia = minimoGarantidoMamaRoma;
          garantidoAplicado = true;
          descontoFinal = Math.max(0, brutoDia - minimoGarantidoMamaRoma);
        }
      }

      if (!ehAvulso && nomeEmpresaLimpo === 'hnt' && turno === 'Noite') {
        const ehFimDeSemana = ['Sáb', 'Dom'].includes(diaSemana);
        const minimoGarantido = ehFimDeSemana ? 100.00 : 80.00;

        if (liquidoDia < minimoGarantido) {
          liquidoDia = minimoGarantido;
          garantidoAplicado = true;
          descontoFinal = Math.max(0, brutoDia - minimoGarantido);
        }
      }
    }

      const empresaParaSalvar = (empresaSelecionada === 'Aceite' && unidadeAceite === 'Zona Norte' && isZonaNorteSingleStoreMode(diaSemana, turno))
        ? empresaCorridaZonaNorte
        : empresaFinal;

      const novoDia = empresaSelecionada === 'Aceite' && unidadeAceite === 'Zona Norte'
        ? {
            empresa: empresaParaSalvar,
            diaSemana,
            turno,
            textoTurno: (turno === 'Dia' ? 'Almoço' : (turno === 'Noite' ? 'Jantar' : (turno === 'Plantao' ? 'Plantão' : ''))),
            qtdEntregas,
            bruto: brutoDia,
            desconto: descontoFinal,
            liquido: liquidoDia,
            taxaCobrada: porcentagem,
            tipoAtendimento,
            garantido: garantidoAplicado,
            detalhe: {
              aceite: {
                qtd: qtdAceite,
                bruto: brutoAceite,
                liquido: liqAceite,
                garantido: garantidoAceite
              },
              hnt: {
                qtd: qtdHNT,
                bruto: brutoHNT,
                liquido: liqHNT,
                garantido: garantidoHNT
              }
            }
          }
        : {
            empresa: empresaFinal,
            diaSemana,
            turno,
            textoTurno: (turno === 'Dia' ? 'Almoço' : (turno === 'Noite' ? 'Jantar' : (turno === 'Plantao' ? 'Plantão' : ''))),
            qtdEntregas,
            bruto: brutoDia,
            desconto: descontoFinal,
            liquido: liquidoDia,
            taxaCobrada: porcentagem,
            tipoAtendimento,
            garantido: garantidoAplicado
          };

    console.debug('salvarDiaNaSemana: adicionando novoDia', novoDia);
    setSemana(prev => {
      const next = [...prev, novoDia];
      console.debug('salvarDiaNaSemana: semana atualizada', next);
      return next;
    });
    
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
    setTipoAtendimento('Turno');
    console.debug('salvarDiaNaSemana: finalizado');
  };

  const totalDescontoSemana = semana.reduce((acc, dia) => acc + (Number(dia.desconto) || 0), 0);
  const totalLiquidoSemana = semana.reduce((acc, dia) => acc + (Number(dia.liquido) || 0), 0);

  const gerarTextoRelatorio = () => {
    let texto = `🏍️ *FECHAMENTO SEMANAL DE ENTREGAS*\n`;
    texto += `👤 *Motoboy:* ${nomeMotoboy.trim()}\n\n`;
    
    semana.forEach((d) => {
      const empresaResumo = formatEmpresaResumo(d);
      const indicadorEmpresa = obterIndicadorWhatsApp(empresaResumo);
      const turnoLabel = d.textoTurno === 'Almoço' ? '☀️ Almoço' : (d.textoTurno === 'Jantar' ? '🌙 Jantar' : (d.textoTurno === 'Plantão' ? '🛌 Plantão' : d.textoTurno));
      const tipoLabel = d.tipoAtendimento === 'Avulso' ? 'Avulso' : 'Turno';
      texto += `📅 *${d.diaSemana} (${turnoLabel})* — ${indicadorEmpresa}\n`;
      texto += `• Tipo: ${tipoLabel}\n`;
      if (d.detalhe && d.detalhe.aceite) {
        if ((d.detalhe.aceite.qtd || 0) > 0) {
          texto += `• Aceite: ${d.detalhe.aceite.qtd} corr. — Bruto: R$ ${Number(d.detalhe.aceite.bruto || 0).toFixed(2)} — Líq: R$ ${Number(d.detalhe.aceite.liquido || 0).toFixed(2)} ${d.detalhe.aceite.garantido ? '🔥 (Garantido)' : ''}\n`;
        }
        if ((d.detalhe.hnt.qtd || 0) > 0) {
          texto += `• HNT: ${d.detalhe.hnt.qtd} corr. — Bruto: R$ ${Number(d.detalhe.hnt.bruto || 0).toFixed(2)} — Líq: R$ ${Number(d.detalhe.hnt.liquido || 0).toFixed(2)} ${d.detalhe.hnt.garantido ? '🔥 (Garantido)' : ''}\n`;
        }
        texto += `• Taxa Retida: R$ ${(d.desconto || 0).toFixed(2)}\n`;
        texto += `• Valor Líquido: R$ ${(d.liquido || 0).toFixed(2)}\n\n`;
      } else {
        texto += `• Entregas: ${d.qtdEntregas}\n`;
        texto += `• Taxa Retida: R$ ${(d.desconto || 0).toFixed(2)}\n`;
        if (d.garantido) {
          texto += `• Valor Líquido: R$ ${(d.liquido || 0).toFixed(2)} 🔥 (Diária Garantida)\n\n`;
        } else {
          texto += `• Valor Líquido: R$ ${(d.liquido || 0).toFixed(2)}\n\n`;
        }
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
        <div className="modal-overlay">
          <div className="modal-card medium">
            <h2 className="modal-title warning">📋 Progresso Encontrado!</h2>
            <p className="modal-text">
              Identificamos um fechamento de entregas em andamento que não foi concluído. Como deseja prosseguir?
            </p>
            <div className="modal-note">
              <b>Lançamentos pendentes:</b> {dadosTemporarios?.length || 0} períodos registrados.
            </div>
            <div className="modal-actions">
              <button onClick={aceitarRecuperacao} className="modal-btn success">
                Continuar 👍
              </button>
              <button onClick={recusarRecuperacao} className="modal-btn danger">
                Limpar do Zero 🗑️
              </button>
            </div>
          </div>
        </div>
      )}

      {modalExcluirDia.visivel && (
        <div className="modal-overlay">
          <div className="modal-card small">
            <h3 className="modal-title danger">🗑️ Remover Lançamento?</h3>
            <p className="modal-text">
              Tem certeza que deseja apagar o registro de: <br/>
              <strong className="modal-highlight">{modalExcluirDia.info}</strong>
            </p>
            <div className="modal-actions">
              <button onClick={confirmarExclusaoDia} className="modal-btn danger">
                Sim, Excluir
              </button>
              <button onClick={() => setModalExcluirDia({ visivel: false, index: null, info: '' })} className="modal-btn secondary">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarModalZerar && (
        <div className="modal-overlay">
          <div className="modal-card warning">
            <h3 className="modal-title warning">⚠️ Apagar Tudo?</h3>
            <p className="modal-text">
              Esta ação irá deletar <strong>TODOS</strong> os dias lançados nesta folha de fechamento. Essa operação não pode ser desfeita.
            </p>
            <div className="modal-actions">
              <button onClick={confirmarZerarSemanaCompleta} className="modal-btn danger">
                Limpar Tudo 🗑️
              </button>
              <button onClick={() => setMostrarModalZerar(false)} className="modal-btn secondary">
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
          className={`input-field ${errosCampos?.nomeMotoboy ? 'error' : ''}`} 
        />

        <label>Selecione a Empresa:</label>
        <div className={`company-grid ${errosCampos?.empresaSelecionada ? 'error-border' : ''}`}>
          <button type="button" className={`company-card ${empresaSelecionada === 'Mama Roma' ? 'active' : ''}`} onClick={() => { setEmpresaSelecionada('Mama Roma'); setEmpresaManual(''); setTipoAtendimento('Turno'); setErrosCampos(p => ({...p, empresaSelecionada: false})); }}>
            <img src={logoMamaRoma} alt="Mama Roma" className="company-logo-img" />
            <span>Mama Roma</span>
          </button>
          <button type="button" className={`company-card ${empresaSelecionada === 'Aceite' ? 'active' : ''}`} onClick={() => { setEmpresaSelecionada('Aceite'); setEmpresaManual(''); setTipoAtendimento('Turno'); setErrosCampos(p => ({...p, empresaSelecionada: false})); }}>
            <img src={logoAceite} alt="Aceite" className="company-logo-img" />
            <span>Aceite</span>
          </button>
          <button type="button" className={`company-card ${(empresaSelecionada === 'HNT' || (empresaSelecionada === 'Aceite' && unidadeAceite === 'Zona Norte')) ? 'active' : ''}`} onClick={() => { setEmpresaSelecionada('HNT'); setEmpresaManual(''); setTipoAtendimento('Turno'); setErrosCampos(p => ({...p, empresaSelecionada: false})); }}>
            <img src={logoHNT} alt="HNT" className="company-logo-img" />
            <span>HNT</span>
          </button>
          <button type="button" className={`company-card ${empresaSelecionada === 'Bents' ? 'active' : ''}`} onClick={() => { setEmpresaSelecionada('Bents'); setEmpresaManual(''); setTipoAtendimento('Turno'); setErrosCampos(p => ({...p, empresaSelecionada: false})); setModoDireto(true); }}>
            <img src={logoBents} alt="Bents" className="company-logo-img" />
            <span>Bents</span>
          </button>
          <button type="button" className={`company-card ${empresaSelecionada === 'Outra' ? 'active' : ''}`} onClick={() => { setEmpresaSelecionada('Outra'); setTipoAtendimento('Turno'); setErrosCampos(p => ({...p, empresaSelecionada: false})); }}>
            <img src={logoDefault} alt="Outra Empresa" className="company-logo-img" />
            <span>{empresaManual || 'Outra'}</span>
          </button>
        </div>

        {empresaSelecionada && (
          <div className="company-unit-box">
            <label className="company-unit-label">🧾 Tipo de atendimento:</label>
            <div className="company-grid">
              <label className={`shift-chip ${tipoAtendimento === 'Turno' ? 'selected' : ''} company-unit-option`}>
                <input className="hidden-input" type="radio" name="tipoAtendimento" value="Turno" checked={tipoAtendimento === 'Turno'} onChange={() => setTipoAtendimento('Turno')} />
                Turno normal
              </label>
              <label className={`shift-chip ${tipoAtendimento === 'Avulso' ? 'selected' : ''} company-unit-option`}>
                <input className="hidden-input" type="radio" name="tipoAtendimento" value="Avulso" checked={tipoAtendimento === 'Avulso'} onChange={() => setTipoAtendimento('Avulso')} />
                Avulso
              </label>
            </div>
          </div>
        )}

        {empresaSelecionada === 'Aceite' && (
          <div className="company-unit-box">
            <label className="company-unit-label">📍 Unidade / Região de Atuação:</label>
            <div className="company-grid">
              <label className={`shift-chip ${unidadeAceite === 'São Mateus' ? 'selected' : ''} company-unit-option`}>
                <input className="hidden-input" type="radio" name="unidadeAceite" value="São Mateus" checked={unidadeAceite === 'São Mateus'} onChange={(e) => setUnidadeAceite(e.target.value)} />
                São Mateus
              </label>
              <label className={`shift-chip ${unidadeAceite === 'Zona Norte' ? 'selected' : ''} company-unit-option`}>
                <input className="hidden-input" type="radio" name="unidadeAceite" value="Zona Norte" checked={unidadeAceite === 'Zona Norte'} onChange={(e) => setUnidadeAceite(e.target.value)} />
                Zona Norte (Aceite + HNT)
              </label>
            </div>
          </div>
        )}

        {empresaSelecionada === 'Aceite' && unidadeAceite === 'Zona Norte' && isZonaNorteSingleStoreMode(diaSemana, turno) && (
          <div className="company-unit-box">
            <label className="company-unit-label">⚠️ Zona Norte (Modo único a partir de Sex Noite): escolha a loja do dia</label>
            <div className="company-grid split-grid">
              <label className={`shift-chip ${empresaCorridaZonaNorte === 'Aceite' ? 'selected' : ''} company-unit-option`}>
                <input className="hidden-input" type="radio" name="empresaZonaNorteDia" checked={empresaCorridaZonaNorte === 'Aceite'} onChange={() => setEmpresaCorridaZonaNorte('Aceite')} />
                🥗 Aceite
              </label>
              <label className={`shift-chip ${empresaCorridaZonaNorte === 'HNT' ? 'selected' : ''} company-unit-option`}>
                <input className="hidden-input" type="radio" name="empresaZonaNorteDia" checked={empresaCorridaZonaNorte === 'HNT'} onChange={() => setEmpresaCorridaZonaNorte('HNT')} />
                🍗 HNT
              </label>
            </div>
            <p className="info-text">A partir desta data/turno não é possível cobrir as duas lojas. O garantido aplicado para cada boy será R$100,00 (quando aplicável).</p>
          </div>
        )}

        {empresaSelecionada === 'Outra' && (
          <input 
            type="text" 
            placeholder="Digite o nome da empresa manualmente" 
            value={empresaManual} 
            onChange={(e) => { setEmpresaManual(e.target.value); setErrosCampos(p => ({...p, empresaManual: false})); }} 
            className={`input-field ${errosCampos?.empresaManual ? 'error' : ''} spaced-input`} 
          />
        )}
        
        <label>Dia da Semana:</label>
        <div className={`days-grid ${errosCampos?.diaSemana ? 'error-border' : ''}`}>
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
          {empresaSelecionada === 'Aceite' && unidadeAceite === 'São Mateus' && (
            <label className={`shift-chip ${turno === 'Plantao' ? 'selected' : ''}`}>
              <input type="radio" name="turno" value="Plantao" checked={turno === 'Plantao'} onChange={(e) => setTurno(e.target.value)} />
              🛌 Plantão
            </label>
          )}
        </div>

        <label>Taxa de Porcentagem:</label>
        <div className="radio-group">
          <label className="radio-label"><input type="radio" name="porcentagem" checked={porcentagem === 18} onChange={() => setPorcentagem(18)} /> 18%</label>
          <label className="radio-label"><input type="radio" name="porcentagem" checked={porcentagem === 20} onChange={() => setPorcentagem(20)} /> 20%</label>
        </div>

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

        {empresaSelecionada === 'Bents' ? (
          <div className={`delivery-box border-orange ${errosCampos?.qtdDireto ? 'error-border' : ''}`}>
            <h4 className="section-title">Fechamento Bents</h4>
            <label>Quantidade de Entregas Realizadas:</label>
            <input 
              type="number" 
              placeholder="Ex: 10" 
              value={qtdDireto} 
              onChange={(e) => { setQtdDireto(e.target.value); setErrosCampos(p => ({...p, qtdDireto: false})); }} 
              className={`input-field ${errosCampos?.qtdDireto ? 'error' : ''} spaced-input`} 
            />
            <div className="info-text">
              <b>Fixo Diário:</b> R$ 60.00 | <b>Valor por Corrida:</b> R$ 8.00
            </div>
          </div>
        ) : empresaSelecionada && (empresaSelecionada === 'Aceite' && unidadeAceite === 'Zona Norte' && modoDireto) ? (
          <div className={`delivery-box border-orange ${(errosCampos?.qtdDireto || errosCampos?.valorDireto || errosCampos?.qtdDiretoHNT || errosCampos?.valorDiretoHNT) ? 'error-border' : ''}`}>
            <h4 className="section-title">Fechamento Combinado Zona Norte (Direto)</h4>
            
            <h5 className="subsection-title accepted-title">🥗 ACEITE</h5>
            <label>Qtd Entregas Aceite:</label>
            <input type="number" placeholder="Ex: 5" value={qtdDireto} onChange={(e) => { setQtdDireto(e.target.value); setErrosCampos(p => ({...p, qtdDireto: false})); }} className={`input-field ${errosCampos?.qtdDireto ? 'error' : ''} compact-input`} />
            <label>Valor Bruto Aceite (R$):</label>
            <input type="number" placeholder="Ex: 75.00" value={valorDireto} onChange={(e) => { setValorDireto(e.target.value); setErrosCampos(p => ({...p, valorDireto: false})); }} className={`input-field ${errosCampos?.valorDireto ? 'error' : ''} compact-input`} />
            
            <h5 className="subsection-title hnt-title">🍗 HNT</h5>
            <label>Qtd Entregas HNT:</label>
            <input type="number" placeholder="Ex: 4" value={qtdDiretoHNT} onChange={(e) => { setQtdDiretoHNT(e.target.value); setErrosCampos(p => ({...p, qtdDiretoHNT: false})); }} className={`input-field ${errosCampos?.qtdDiretoHNT ? 'error' : ''} compact-input`} />
            <label>Valor Bruto HNT (R$):</label>
            <input type="number" placeholder="Ex: 60.00" value={valorDiretoHNT} onChange={(e) => { setValorDiretoHNT(e.target.value); setErrosCampos(p => ({...p, valorDiretoHNT: false})); }} className={`input-field ${errosCampos?.valorDiretoHNT ? 'error' : ''} compact-input`} />
          </div>
        ) : empresaSelecionada && modoDireto ? (
          <div className={`delivery-box border-orange ${(errosCampos?.qtdDireto || errosCampos?.valorDireto) ? 'error-border' : ''}`}>
            <h4 className="section-title">Fechamento Total Direto</h4>
            <label>Quantidade de Entregas Realizadas:</label>
            <input 
              type="number" 
              placeholder="Ex: 14" 
              value={qtdDireto} 
              onChange={(e) => { setQtdDireto(e.target.value); setErrosCampos(p => ({...p, qtdDireto: false})); }} 
              className={`input-field ${errosCampos?.qtdDireto ? 'error' : ''} spaced-input`} 
            />
            
            <label>Valor Bruto Total Acumulado (R$):</label>
            <input 
              type="number" 
              placeholder="Ex: 210.50" 
              value={valorDireto} 
              onChange={(e) => { setValorDireto(e.target.value); setErrosCampos(p => ({...p, valorDireto: false})); }} 
              className={`input-field ${errosCampos?.valorDireto ? 'error' : ''} spaced-input`} 
            />
          </div>
        ) : (
          <div className={`delivery-box ${errosCampos?.listaEntregasDia ? 'error-border' : ''}`}>
            {usaTabelaAutomatica && (
              <div className="table-helper-box">
                <span className="helper-title">🔍 Auxílio de Tabela (Opcional):</span>
                <input type="text" placeholder="Escreva o nome do bairro para buscar..." value={buscaBairro} onChange={(e) => setBuscaBairro(e.target.value)} className="input-field compact-input" />
                
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

                <select value={bairroSelecionado} onChange={(e) => aplicarPrecoTabela(e.target.value)} className="input-field compact-input top-margin" >
                  <option value="">-- Ou escolha na lista suspensa --</option>
                  {Object.keys(getTabelaAtiva()).map((b) => (
                    <option key={b} value={b}>{b} (R$ {obterPrecoBairro(b).toFixed(2)})</option>
                  ))}
                </select>
              </div>
            )}

            {empresaSelecionada === 'Aceite' && unidadeAceite === 'Zona Norte' && !isZonaNorteSingleStoreMode(diaSemana, turno) && (
              <div className="subsection-divider">
                <label className="subsection-label">Vincular esta corrida para:</label>
                <div className="company-grid split-grid">
                  <label className={`shift-chip ${empresaCorridaZonaNorte === 'Aceite' ? 'selected' : ''} company-unit-option`}>
                    <input className="hidden-input" type="radio" name="empresaCorridaZN" checked={empresaCorridaZonaNorte === 'Aceite'} onChange={() => setEmpresaCorridaZonaNorte('Aceite')} />
                    🥗 Aceite
                  </label>
                  <label className={`shift-chip ${empresaCorridaZonaNorte === 'HNT' ? 'selected' : ''} company-unit-option`}>
                    <input className="hidden-input" type="radio" name="empresaCorridaZN" checked={empresaCorridaZonaNorte === 'HNT'} onChange={() => setEmpresaCorridaZonaNorte('HNT')} />
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
              className={`input-field ${errosCampos?.valorEntrega ? 'error' : ''}`} 
            />

            {bairroSelecionado && <p className="neighborhood-active"><b>Bairro ativo:</b> {bairroSelecionado}</p>}
            
            <button onClick={adicionarEntrega} className="btn btn-secondary btn-margin-top">
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
          <div className="alert-box">
            {avisoErroGeral}
          </div>
        )}

        <button onClick={salvarDiaNaSemana} className="btn btn-primary btn-margin-top">
          💾 Salvar este Dia e Adicionar Outro
        </button>
      </section>

      {semana.length > 0 && (
        <section className="card">
          <div className="summary-header">
            <h3 className="section-title">Resumo do Fechamento</h3>
            <span className="summary-caption">💡 Clique em um dia para removê-lo</span>
          </div>
          
          {semana.map((dia, index) => (
            <div 
              key={index} 
              className="history-item clickable" 
              onClick={() => acionarExcluirDia(index, dia)}
              title="Clique para excluir este dia"
            >
              <span className="history-item-title">
                📅 {dia?.diaSemana || ''} ({dia?.textoTurno === 'Almoço' ? '☀️ Almoço' : (dia?.textoTurno === 'Jantar' ? '🌙 Jantar' : (dia?.textoTurno === 'Plantão' ? '🛌 Plantão' : dia?.textoTurno))}) — {formatEmpresaResumo(dia)} {dia?.tipoAtendimento === 'Avulso' ? '• Avulso' : '• Turno'}
              </span>
              <div className="history-row">
                {dia?.detalhe && dia.detalhe.aceite ? (
                  <>
                    {dia.detalhe.aceite.qtd > 0 && (
                      <span className="history-highlight">🥗 Aceite: {dia.detalhe.aceite.qtd} corr. — Líq: R$ {(dia.detalhe.aceite.liquido || 0).toFixed(2)} {dia.detalhe.aceite.garantido ? '🔥' : ''}</span>
                    )}
                    {dia.detalhe.hnt.qtd > 0 && (
                      <span className="history-highlight">🍗 HNT: {dia.detalhe.hnt.qtd} corr. — Líq: R$ {(dia.detalhe.hnt.liquido || 0).toFixed(2)} {dia.detalhe.hnt.garantido ? '🔥' : ''}</span>
                    )}
                    <span>Bruto: R$ {(dia?.bruto || 0).toFixed(2)}</span>
                    <span>Taxa: R$ {(dia?.desconto || 0).toFixed(2)}</span>
                  </>
                ) : (
                  <>
                    <span>{dia?.qtdEntregas || 0} corr.</span>
                    <span>Bruto: R$ {(dia?.bruto || 0).toFixed(2)}</span>
                    <span>Taxa: R$ {(dia?.desconto || 0).toFixed(2)}</span>
                    <span className="history-highlight">
                      Líq: R$ {(dia?.liquido || 0).toFixed(2)} {dia?.garantido && '🔥'}
                    </span>
                  </>
                )}
              </div>
              {dia?.detalhe && dia.detalhe.aceite ? (
                dia?.tipoAtendimento === 'Avulso' ? null : (
                  dia?.empresa === 'Aceite' ? (
                    <p className="history-note">
                      * Detalhe por estabelecimento: Aceite {(dia?.detalhe?.aceite?.garantido ? 'Valor mínimo garantido aplicado para este período/empresa.' : 'Liquido acima do mínimo garantido.')}
                    </p>
                  ) : dia?.empresa === 'HNT' ? (
                    <p className="history-note">
                      * Detalhe por estabelecimento: HNT {(dia?.detalhe?.hnt?.garantido ? 'Valor mínimo garantido aplicado para este período/empresa.' : 'Liquido acima do mínimo garantido.')}
                    </p>
                  ) : (
                    <p className="history-note">
                      * Detalhe por estabelecimento: Aceite {(dia?.detalhe?.aceite?.garantido ? 'Valor mínimo garantido aplicado para este período/empresa.' : 'Liquido acima do mínimo garantido.')} — HNT {(dia?.detalhe?.hnt?.garantido ? 'Valor mínimo garantido aplicado para este período/empresa.' : 'Liquido acima do mínimo garantido.')}
                    </p>
                  )
                )
              ) : (
                dia?.garantido && (
                  <p className="history-note">
                    * Valor mínimo garantido aplicado para este período/empresa.
                  </p>
                )
              )}
            </div>
          ))}

          <div className="total-box">
            <h3>Total Líquido: R$ {(totalLiquidoSemana || 0).toFixed(2)}</h3>
            <span className="total-caption">Total descontado da semana: R$ {(totalDescontoSemana || 0).toFixed(2)}</span>
          </div>

          <div className="btn-group">
            <button onClick={enviarWhatsApp} className="btn btn-success">
              WhatsApp 🟢
            </button>
            <button onClick={enviarEmail} className="btn btn-blue">
              E-mail 🔵
            </button>
            <button onClick={() => setMostrarModalZerar(true)} className="btn btn-danger danger-btn">
              Zerar Semana 🗑️
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;