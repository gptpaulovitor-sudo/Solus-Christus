import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { getCapituloVersiculos, LIVROS_BIBLIA } from '../data/bibliaACF';
import { getComentarioCapitulo } from '../data/comentariosEstudo';
import { calcularPlanoPersonalizado } from '../services/planCalculator';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Aba ativa de navegação: 'home' | 'reader' | 'plans' | 'profile'
  const [activeTab, setActiveTab] = useState('home');

  // Posicao de leitura bíblica
  const [posicao, setPosicao] = useState(() => storageService.getPosicaoLeitura());
  
  // Configurações de leitura
  const [settings, setSettings] = useState(() => storageService.getSettings());

  // Progresso de capítulos lidos
  const [progressoCapitulos, setProgressoCapitulos] = useState(() => storageService.getProgressoCapitulos());

  // Versículos Marcados (Highlights e Bloco de Notas)
  const [versiculosMarcados, setVersiculosMarcados] = useState(() => storageService.getVersiculosMarcados());

  // Plano de Leitura Ativo
  const [planoAtivo, setPlanoAtivo] = useState(() => storageService.getPlanoAtivo());

  // Modal de versículo selecionado { livroId, capitulo, versiculo, texto }
  const [selectedVerseModal, setSelectedVerseModal] = useState(null);

  // Modal de Configurações
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Modal de Plano Personalizado
  const [isCustomPlanOpen, setIsCustomPlanOpen] = useState(false);

  // Notificações Toast
  const [toastMessage, setToastMessage] = useState(null);

  // Atualizar tema e fonte no elemento <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-sepia');

    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'sepia') {
      root.classList.add('theme-sepia');
    }

    // Atualizar a variável de fonte de leitura (--font-leitura)
    if (settings.fontFamily === 'sans') {
      root.style.setProperty('--font-leitura', "'Inter', sans-serif");
    } else {
      root.style.setProperty('--font-leitura', "'Crimson Pro', serif");
    }

    storageService.saveSettings(settings);
  }, [settings]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Navegar para capítulo específico
  const irParaCapitulo = (livroId, capituloNum) => {
    const novoPos = { livroId, capitulo: parseInt(capituloNum, 10) };
    setPosicao(novoPos);
    storageService.savePosicaoLeitura(novoPos);
    setActiveTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Registro de Atividade Diária & Cálculo da Ofensiva (Streak)
  const [registrosAtividade, setRegistrosAtividade] = useState(() => storageService.getRegistrosAtividade());

  const registrarAtividadeHoje = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hojeStr = `${y}-${m}-${day}`;

    if (!registrosAtividade[hojeStr]) {
      const novos = { ...registrosAtividade, [hojeStr]: true };
      setRegistrosAtividade(novos);
      storageService.saveRegistrosAtividade(novos);
    }
  };

  // Método para calcular a ofensiva (dias consecutivos de leitura)
  const calcularOfensivaDias = (registros = {}) => {
    const formatData = (d) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };

    const hoje = new Date();
    const hojeStr = formatData(hoje);

    const ontem = new Date(hoje);
    ontem.setDate(ontem.getDate() - 1);
    const ontemStr = formatData(ontem);

    let dataCheck = null;
    if (registros[hojeStr]) {
      dataCheck = new Date(hoje);
    } else if (registros[ontemStr]) {
      dataCheck = new Date(ontem);
    } else {
      return 0;
    }

    let count = 0;
    while (true) {
      const key = formatData(dataCheck);
      if (registros[key]) {
        count++;
        dataCheck.setDate(dataCheck.getDate() - 1);
      } else {
        break;
      }
    }

    return count;
  };

  const ofensivaDias = calcularOfensivaDias(registrosAtividade);

  // Alternar capítulo lido
  const toggleCapituloLido = (livroId, capituloNum) => {
    const key = `${livroId}-${capituloNum}`;
    const novoProgresso = { ...progressoCapitulos, [key]: !progressoCapitulos[key] };
    setProgressoCapitulos(novoProgresso);
    storageService.saveProgressoCapitulos(novoProgresso);

    if (!progressoCapitulos[key]) {
      registrarAtividadeHoje();
      showToast(`Capítulo de ${LIVROS_BIBLIA.find(l => l.id === livroId)?.nome} ${capituloNum} marcado como lido!`);
    }
  };

  // Salvar / atualizar destaque ou nota de um versículo
  const salvarVersiculoMarcado = ({ livroId, capitulo, versiculo, cor, nota }) => {
    const capNum = Number(capitulo);
    const verNum = Number(versiculo);
    const id = `v_${livroId}_${capNum}_${verNum}`;
    const dataAtual = new Date().toISOString();

    let atualizados = [...versiculosMarcados];
    const index = atualizados.findIndex(
      v => v.id === id || (v.livroId === livroId && Number(v.capitulo) === capNum && Number(v.versiculo) === verNum)
    );

    if (index >= 0) {
      if (!cor && (!nota || nota.trim() === '')) {
        // Remover se não tiver cor nem nota
        atualizados.splice(index, 1);
        showToast('Marcação removida');
      } else {
        atualizados[index] = {
          ...atualizados[index],
          id,
          livroId,
          capitulo: capNum,
          versiculo: verNum,
          cor: cor !== undefined ? cor : atualizados[index].cor,
          nota: nota !== undefined ? nota : atualizados[index].nota,
          data: dataAtual
        };
        registrarAtividadeHoje();
        showToast('Anotação/Marcação atualizada!');
      }
    } else {
      if (cor || (nota && nota.trim() !== '')) {
        atualizados.push({ id, livroId, capitulo: capNum, versiculo: verNum, cor: cor || null, nota: nota || '', data: dataAtual });
        registrarAtividadeHoje();
        showToast('Versículo destacado e salvo!');
      }
    }

    setVersiculosMarcados(atualizados);
    storageService.saveVersiculosMarcados(atualizados);
    setSelectedVerseModal(null);
  };

  // Remover marcação/anotação de um versículo
  const removerVersiculoMarcado = (livroId, capitulo, versiculo) => {
    const capNum = Number(capitulo);
    const verNum = Number(versiculo);
    const id = `v_${livroId}_${capNum}_${verNum}`;

    const atualizados = versiculosMarcados.filter(
      v => !(v.id === id || (v.livroId === livroId && Number(v.capitulo) === capNum && Number(v.versiculo) === verNum))
    );

    setVersiculosMarcados(atualizados);
    storageService.saveVersiculosMarcados(atualizados);
    showToast('Marcação removida');
  };

  // Marcar uma lista de livros inteiros como lidos no progresso global (capítulo por capítulo)
  const marcarLivrosComoLidos = (livrosIdsArray) => {
    if (!livrosIdsArray || livrosIdsArray.length === 0) return;
    
    let novoProgresso = { ...progressoCapitulos };
    let totalNovosCaps = 0;

    livrosIdsArray.forEach(livroId => {
      const lObj = LIVROS_BIBLIA.find(l => l.id === livroId);
      if (lObj) {
        for (let c = 1; c <= lObj.capitulos; c++) {
          const key = `${livroId}-${c}`;
          if (!novoProgresso[key]) {
            novoProgresso[key] = true;
            totalNovosCaps++;
          }
        }
      }
    });

    if (totalNovosCaps > 0) {
      setProgressoCapitulos(novoProgresso);
      storageService.saveProgressoCapitulos(novoProgresso);
    }
  };

  // Ativar plano pré-definido ou personalizado
  const ativarPlano = (novoPlano) => {
    setPlanoAtivo(novoPlano);
    storageService.savePlanoAtivo(novoPlano);

    // Se o plano tiver livros marcados como já lidos, contabilizá-los imediatamente no progresso da Bíblia
    if (novoPlano.livrosLidosIds && novoPlano.livrosLidosIds.length > 0) {
      marcarLivrosComoLidos(novoPlano.livrosLidosIds);
    }

    showToast(`Plano "${novoPlano.titulo}" ativado com sucesso!`);
  };

  // Sincronizar automaticamente livros já lidos do plano ativo ao carregar a aplicação
  useEffect(() => {
    if (planoAtivo && planoAtivo.livrosLidosIds && planoAtivo.livrosLidosIds.length > 0) {
      marcarLivrosComoLidos(planoAtivo.livrosLidosIds);
    }
  }, [planoAtivo]);

  // Excluir plano de leitura ativo
  const excluirPlano = () => {
    setPlanoAtivo(null);
    storageService.removerPlanoAtivo();
    showToast('Plano de leitura excluído.');
  };

  // Alternar conclusão de dia no plano ativo
  const toggleDiaPlanoAtivo = (diaNum) => {
    if (!planoAtivo) return;
    const progressoAtual = planoAtivo.progressoDias || {};
    const isAgoraLido = !progressoAtual[diaNum];
    const novoProg = { ...progressoAtual, [diaNum]: isAgoraLido };
    
    const planoAtualizado = { ...planoAtivo, progressoDias: novoProg };
    setPlanoAtivo(planoAtualizado);
    storageService.savePlanoAtivo(planoAtualizado);

    // Sincronizar capítulos da meta do dia com o progressoCapitulos da Bíblia
    const metasList = planoAtivo.metasDiarias || planoAtivo.dias || [];
    const diaObj = metasList.find(d => d.dia === diaNum);
    const caps = diaObj?.metasDiarias || diaObj?.capitulos || diaObj?.lectio || [];

    if (caps.length > 0) {
      let novoProgCap = { ...progressoCapitulos };
      caps.forEach(item => {
        const key = `${item.livroId}-${item.capitulo}`;
        if (isAgoraLido) {
          novoProgCap[key] = true;
        }
      });
      setProgressoCapitulos(novoProgCap);
      storageService.saveProgressoCapitulos(novoProgCap);
    }

    if (isAgoraLido) {
      showToast(`Metas do Dia ${diaNum} marcadas como concluídas!`);
    }
  };

  // Obter versículos do capítulo atual
  const versiculosAtuais = getCapituloVersiculos(posicao.livroId, posicao.capitulo);
  const comentarioAtual = getComentarioCapitulo(posicao.livroId, posicao.capitulo);
  const livroAtual = LIVROS_BIBLIA.find(l => l.id === posicao.livroId) || LIVROS_BIBLIA[0];

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        posicao,
        livroAtual,
        versiculosAtuais,
        comentarioAtual,
        settings,
        setSettings,
        progressoCapitulos,
        toggleCapituloLido,
        marcarLivrosComoLidos,
        versiculosMarcados,
        salvarVersiculoMarcado,
        removerVersiculoMarcado,
        planoAtivo,
        ativarPlano,
        excluirPlano,
        toggleDiaPlanoAtivo,
        irParaCapitulo,
        selectedVerseModal,
        setSelectedVerseModal,
        isSettingsOpen,
        setIsSettingsOpen,
        isCustomPlanOpen,
        setIsCustomPlanOpen,
        toastMessage,
        showToast,
        ofensivaDias,
        registrarAtividadeHoje
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
