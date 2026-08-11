import { LIVROS_BIBLIA } from '../data/bibliaACF';

// Chaves do LocalStorage
const KEYS = {
  SETTINGS: 'solus_settings',
  POSICAO: 'solus_posicao_leitura',
  PROGRESSO_CAPITULOS: 'solus_progresso_capitulos',
  VERSICULOS_MARCADOS: 'solus_versiculos_marcados',
  PLANO_ATIVO: 'solus_plano_ativo',
  ATIVIDADE: 'biblia_estudo_atividade'
};

// Configurações padrão
const DEFAULT_SETTINGS = {
  theme: 'light', // light | dark | sepia
  fontSize: 'medium', // small | medium | large | xlarge
  fontFamily: 'serif', // serif | sans
  layoutMode: 'side' // side | inline
};

// Posição inicial de leitura
const DEFAULT_POSICAO = {
  livroId: 'genesis',
  capitulo: 1
};

export const storageService = {
  // Configurações
  getSettings() {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  },
  saveSettings(settings) {
    try {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  },

  // Posição de Leitura
  getPosicaoLeitura() {
    try {
      const data = localStorage.getItem(KEYS.POSICAO);
      return data ? JSON.parse(data) : DEFAULT_POSICAO;
    } catch (e) {
      return DEFAULT_POSICAO;
    }
  },
  savePosicaoLeitura(posicao) {
    try {
      localStorage.setItem(KEYS.POSICAO, JSON.stringify(posicao));
    } catch (e) {
      console.error(e);
    }
  },

  // Progresso de Capítulos Lido
  getProgressoCapitulos() {
    try {
      const data = localStorage.getItem(KEYS.PROGRESSO_CAPITULOS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },
  saveProgressoCapitulos(progresso) {
    try {
      localStorage.setItem(KEYS.PROGRESSO_CAPITULOS, JSON.stringify(progresso));
    } catch (e) {
      console.error(e);
    }
  },

  // Versículos Marcados / Anotações
  getVersiculosMarcados() {
    try {
      const data = localStorage.getItem(KEYS.VERSICULOS_MARCADOS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },
  saveVersiculosMarcados(versiculos) {
    try {
      localStorage.setItem(KEYS.VERSICULOS_MARCADOS, JSON.stringify(versiculos));
    } catch (e) {
      console.error(e);
    }
  },

  // Plano Ativo de Leitura
  getPlanoAtivo() {
    try {
      const data = localStorage.getItem(KEYS.PLANO_ATIVO);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },
  savePlanoAtivo(plano) {
    try {
      if (plano) {
        localStorage.setItem(KEYS.PLANO_ATIVO, JSON.stringify(plano));
      } else {
        localStorage.removeItem(KEYS.PLANO_ATIVO);
      }
    } catch (e) {
      console.error(e);
    }
  },

  // Registro diário de leitura (Ofensiva / Streak)
  getRegistrosAtividade() {
    try {
      const data = localStorage.getItem(KEYS.ATIVIDADE);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
          return parsed;
        }
      }

      // Gerar histórico inicial de 7 dias consecutivos até hoje para demonstração
      const inicial = {};
      const hoje = new Date();
      for (let i = 0; i < 7; i++) {
        const d = new Date(hoje);
        d.setDate(d.getDate() - i);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        inicial[`${y}-${m}-${day}`] = true;
      }
      localStorage.setItem(KEYS.ATIVIDADE, JSON.stringify(inicial));
      return inicial;
    } catch (e) {
      return {};
    }
  },
  saveRegistrosAtividade(registros) {
    try {
      localStorage.setItem(KEYS.ATIVIDADE, JSON.stringify(registros));
    } catch (e) {
      console.error(e);
    }
  }
};
