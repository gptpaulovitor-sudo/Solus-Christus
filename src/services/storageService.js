import { PLANOS_PREDEFINIDOS } from '../data/planosPreset';
import { calcularPlanoPersonalizado } from './planCalculator';

const KEYS = {
  SETTINGS: 'biblia_estudo_settings',
  PROGRESSO_CAPITULOS: 'biblia_estudo_progresso',
  VERSICULOS_MARCADOS: 'biblia_estudo_marcacoes',
  PLANO_ATIVO: 'biblia_estudo_plano_ativo',
  POSICAO_LEITURA: 'biblia_estudo_posicao'
};

const DEFAULT_SETTINGS = {
  fontSize: 18, // 14px - 28px
  fontFamily: 'serif', // serif | sans
  theme: 'dark', // light | dark | sepia
  layoutMode: 'split', // split (side-by-side desktop / footer mobile) | inline
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
      console.error('Erro ao salvar configurações', e);
    }
  },

  // Posicao de leitura atual { livroId: 'salmos', capitulo: 23 }
  getPosicaoLeitura() {
    try {
      const data = localStorage.getItem(KEYS.POSICAO_LEITURA);
      return data ? JSON.parse(data) : { livroId: 'genesis', capitulo: 1 };
    } catch (e) {
      return { livroId: 'genesis', capitulo: 1 };
    }
  },
  savePosicaoLeitura(pos) {
    try {
      localStorage.setItem(KEYS.POSICAO_LEITURA, JSON.stringify(pos));
    } catch (e) {
      console.error(e);
    }
  },

  // Progresso de capitulos lidos { 'genesis-1': true }
  getProgressoCapitulos() {
    try {
      const data = localStorage.getItem(KEYS.PROGRESSO_CAPITULOS);
      return data ? JSON.parse(data) : { 'genesis-1': true };
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

  // Versiculos Marcados (Highlights e Bloco de Notas)
  getVersiculosMarcados() {
    try {
      const data = localStorage.getItem(KEYS.VERSICULOS_MARCADOS);
      if (data) return JSON.parse(data);
      // Dados iniciais de demonstração ricos
      return [
        {
          id: 'v_salmos_23_1',
          livroId: 'salmos',
          capitulo: 23,
          versiculo: 1,
          cor: 'yellow',
          nota: 'Minha âncora de descanso nas tribulações.',
          data: new Date().toISOString()
        },
        {
          id: 'v_joao_1_1',
          livroId: 'joao',
          capitulo: 1,
          versiculo: 1,
          cor: 'blue',
          nota: 'A divindade absoluta de Jesus Cristo revelada.',
          data: new Date().toISOString()
        }
      ];
    } catch (e) {
      return [];
    }
  },
  saveVersiculosMarcados(marcacoes) {
    try {
      localStorage.setItem(KEYS.VERSICULOS_MARCADOS, JSON.stringify(marcacoes));
    } catch (e) {
      console.error(e);
    }
  },

  // Plano de Leitura Ativo
  getPlanoAtivo() {
    try {
      const data = localStorage.getItem(KEYS.PLANO_ATIVO);
      if (data) return JSON.parse(data);
      
      // Criar plano de 1 ano por padrão
      const hoje = new Date();
      const em1Ano = new Date();
      em1Ano.setFullYear(hoje.getFullYear() + 1);

      const planoDefault = calcularPlanoPersonalizado({
        titulo: PLANOS_PREDEFINIDOS[0].titulo,
        dataInicio: hoje.toISOString().split('T')[0],
        dataFim: em1Ano.toISOString().split('T')[0],
        livrosIds: ['todos']
      });

      // Simular progresso do Dia 1 como concluído
      planoDefault.progressoDias = { 1: true };

      localStorage.setItem(KEYS.PLANO_ATIVO, JSON.stringify(planoDefault));
      return planoDefault;
    } catch (e) {
      return null;
    }
  },
  savePlanoAtivo(plano) {
    try {
      localStorage.setItem(KEYS.PLANO_ATIVO, JSON.stringify(plano));
    } catch (e) {
      console.error(e);
    }
  },
  removerPlanoAtivo() {
    try {
      localStorage.setItem(KEYS.PLANO_ATIVO, 'null');
    } catch (e) {
      console.error(e);
    }
  },

  // Registro diário de leitura (Ofensiva / Streak)
  getRegistrosAtividade() {
    try {
      const data = localStorage.getItem('biblia_estudo_atividade');
      if (data) return JSON.parse(data);

      // Gerar histórico inicial de 7 dias para demonstração
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
      localStorage.setItem('biblia_estudo_atividade', JSON.stringify(inicial));
      return inicial;
    } catch (e) {
      return {};
    }
  },
  saveRegistrosAtividade(registros) {
    try {
      localStorage.setItem('biblia_estudo_atividade', JSON.stringify(registros));
    } catch (e) {
      console.error(e);
    }
  }
};
