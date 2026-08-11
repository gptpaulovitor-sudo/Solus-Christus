import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { geminiService } from '../../services/geminiService';
import { X, Type, Sun, Moon, Sparkles, Columns, AlignLeft } from 'lucide-react';

export default function ReadingSettingsModal() {
  const { isSettingsOpen, setIsSettingsOpen, settings, setSettings } = useApp();
  const [geminiApiKey, setGeminiApiKey] = useState(() => geminiService.getApiKey());
  const [testStatus, setTestStatus] = useState(null);

  if (!isSettingsOpen) return null;

  const updateSetting = (key, val) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div 
        class="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div class="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div class="flex items-center gap-2">
            <Type class="w-5 h-5 text-amber-600" />
            <h3 class="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              Ajustes de Leitura
            </h3>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            class="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <div class="py-5 space-y-6">
          {/* Font Size Control */}
          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Tamanho da Fonte
              </label>
              <span class="text-sm font-semibold text-amber-600 dark:text-amber-400">{settings.fontSize}px</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs font-serif text-stone-400">A</span>
              <input
                type="range"
                min={16}
                max={28}
                step={1}
                value={settings.fontSize}
                onChange={(e) => updateSetting('fontSize', parseInt(e.target.value, 10))}
                class="w-full accent-amber-600 h-2 bg-stone-200 dark:bg-stone-800 rounded-lg cursor-pointer"
              />
              <span class="text-xl font-serif text-stone-700 dark:text-stone-300">A</span>
            </div>
          </div>

          {/* Typography Family */}
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              Estilo da Fonte
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateSetting('fontFamily', 'serif')}
                class={`py-2.5 px-3 rounded-2xl border text-sm font-serif transition-all flex items-center justify-center gap-2 ${
                  settings.fontFamily === 'serif'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50'
                }`}
              >
                <span>Serifada (Clássica)</span>
              </button>
              <button
                onClick={() => updateSetting('fontFamily', 'sans')}
                class={`py-2.5 px-3 rounded-2xl border text-sm font-sans transition-all flex items-center justify-center gap-2 ${
                  settings.fontFamily === 'sans'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50'
                }`}
              >
                <span>Sem Serifa (Moderna)</span>
              </button>
            </div>
          </div>

          {/* Reading Theme */}
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              Modo de Cor e Aparência
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button
                onClick={() => updateSetting('theme', 'light')}
                class={`py-3 px-2 rounded-2xl border text-xs font-semibold transition-all flex flex-col items-center gap-1.5 ${
                  settings.theme === 'light'
                    ? 'border-amber-500 bg-stone-100 text-stone-900 ring-2 ring-amber-500/20'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Sun class="w-4 h-4 text-amber-500" />
                <span>Modo Claro</span>
              </button>

              <button
                onClick={() => updateSetting('theme', 'sepia')}
                class={`py-3 px-2 rounded-2xl border text-xs font-semibold transition-all flex flex-col items-center gap-1.5 ${
                  settings.theme === 'sepia'
                    ? 'border-[#7A151C] bg-[#EBE4D5] text-[#4A3B32] ring-2 ring-[#7A151C]/30 font-bold'
                    : 'border-[#D6CDBA] bg-[#F4EFE6] text-[#786B60] hover:bg-[#EBE4D5]'
                }`}
              >
                <Sparkles class="w-4 h-4 text-[#7A151C]" />
                <span>Modo Sépia</span>
              </button>

              <button
                onClick={() => updateSetting('theme', 'dark')}
                class={`py-3 px-2 rounded-2xl border text-xs font-semibold transition-all flex flex-col items-center gap-1.5 ${
                  settings.theme === 'dark'
                    ? 'border-amber-500 bg-stone-950 text-stone-100 ring-2 ring-amber-500/20'
                    : 'border-stone-800 bg-stone-900 text-stone-400 hover:bg-stone-800'
                }`}
              >
                <Moon class="w-4 h-4 text-amber-400" />
                <span>Modo Escuro</span>
              </button>
            </div>
          </div>

          {/* Layout Display Mode for Study Notes */}
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              Exibição dos Comentários
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateSetting('layoutMode', 'split')}
                class={`py-2.5 px-3 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                  settings.layoutMode === 'split'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                <Columns class="w-4 h-4" />
                <span>Lado a Lado / Rodapé</span>
              </button>
              <button
                onClick={() => updateSetting('layoutMode', 'inline')}
                class={`py-2.5 px-3 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                  settings.layoutMode === 'inline'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                <AlignLeft class="w-4 h-4" />
                <span>Em linha Expansível</span>
              </button>
            </div>
          </div>

          {/* Gemini API Key */}
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                <Sparkles class="w-4 h-4 text-[#7A151C] dark:text-[#8B1C24]" />
                <span>Chave API Gemini (Opcional)</span>
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[11px] text-[#7A151C] dark:text-[#8B1C24] hover:underline font-semibold"
              >
                Gerar chave grátis &rarr;
              </a>
            </div>

            <div class="flex items-center gap-2">
              <input
                type="password"
                placeholder="Cole sua API Key do Gemini aqui..."
                value={geminiApiKey}
                onChange={(e) => {
                  const cleaned = geminiService.saveApiKey(e.target.value);
                  setGeminiApiKey(cleaned);
                  setTestStatus(null);
                }}
                class="flex-1 px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#7A151C] text-[#232323] dark:text-[#EAE6DF]"
              />
              <button
                type="button"
                onClick={async () => {
                  setTestStatus({ loading: true });
                  const cleaned = geminiService.saveApiKey(geminiApiKey);
                  setGeminiApiKey(cleaned);
                  const res = await geminiService.testarApiKey(cleaned);
                  setTestStatus(res);
                }}
                class="px-3 py-2 bg-[#7A151C]/10 dark:bg-[#8B1C24]/20 hover:bg-[#7A151C]/20 text-[#7A151C] dark:text-[#8B1C24] text-xs font-bold rounded-xl border border-[#7A151C]/30 shrink-0"
              >
                {testStatus?.loading ? 'Testando...' : 'Testar Chave'}
              </button>
            </div>

            {testStatus && !testStatus.loading && (
              <div class={`mt-2 p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                testStatus.ok 
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300' 
                  : 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-200 border border-red-300'
              }`}>
                <span>{testStatus.ok ? '✅ Chave API válida e conectada com sucesso!' : `❌ Falha: ${testStatus.error}`}</span>
              </div>
            )}

            <p class="text-[10px] text-stone-400 mt-1">
              Sem a chave, a aplicação utilizará automaticamente o motor exegético local integrado.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div class="pt-3 border-t border-stone-100 dark:border-stone-800 flex justify-end">
          <button
            onClick={() => setIsSettingsOpen(false)}
            class="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
          >
            Concluído
          </button>
        </div>
      </div>
    </div>
  );
}
