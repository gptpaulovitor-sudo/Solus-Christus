import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { geminiService } from '../../services/geminiService';
import { X, Sparkles, Copy, Check, Key, RefreshCw, BookOpen, NotebookPen } from 'lucide-react';

export default function GeminiExplanationModal() {
  const { 
    geminiVerseModal, 
    setGeminiVerseModal, 
    salvarVersiculoMarcado, 
    setIsSettingsOpen,
    showToast 
  } = useApp();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!geminiVerseModal) {
      setResult(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setResult(null);

    geminiService.explicarVersiculo({
      livroNome: geminiVerseModal.livroNome,
      capitulo: geminiVerseModal.capitulo,
      versiculo: geminiVerseModal.versiculo,
      texto: geminiVerseModal.texto
    }).then(res => {
      if (isMounted) {
        setResult(res);
        setLoading(false);
      }
    }).catch(err => {
      if (isMounted) {
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [geminiVerseModal]);

  if (!geminiVerseModal) return null;

  const { livroNome, capitulo, versiculo, texto, livroId } = geminiVerseModal;

  const handleCopy = () => {
    if (!result?.text) return;
    const textFormat = `✨ Explicação de ${livroNome} ${capitulo}:${versiculo}\n"${texto}"\n\n${result.text}\n\n— Gerado no Solus Christus`;
    navigator.clipboard.writeText(textFormat);
    setIsCopied(true);
    showToast('Explicação copiada para a área de transferência!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSaveToNotes = () => {
    if (!result?.text) return;
    salvarVersiculoMarcado({
      livroId,
      capitulo,
      versiculo,
      nota: `✨ Explicação Gemini:\n\n${result.text}`
    });
    showToast('Explicação salva no seu Caderno de Notas!');
    setGeminiVerseModal(null);
  };

  // Renderizar o texto formatado das 3 seções
  const renderFormattedText = (rawText) => {
    if (!rawText) return null;

    const sections = rawText.split(/(?=###\s)/g);

    return (
      <div className="space-y-4 text-xs md:text-sm leading-relaxed text-[#232323] dark:text-[#EAE6DF] font-sans">
        {sections.map((section, idx) => {
          const lines = section.trim().split('\n');
          const titleLine = lines[0].replace(/^###\s*/, '');
          const bodyLines = lines.slice(1).join('\n');

          return (
            <div key={idx} className="p-4 rounded-2xl bg-[#F9F7F1] dark:bg-[#121212] border border-[#E4E4E7] dark:border-[#27272A] space-y-2">
              <h4 className="font-cinzel font-bold text-sm text-[#7A151C] dark:text-[#8B1C24] flex items-center gap-1.5 border-b border-[#E4E4E7] dark:border-[#27272A] pb-1.5">
                <span>{titleLine}</span>
              </h4>
              <div className="whitespace-pre-line text-xs font-normal text-[#232323] dark:text-[#EAE6DF]">
                {bodyLines}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-[#FFFFFF] dark:bg-[#1C1C1E] rounded-3xl border border-[#E4E4E7] dark:border-[#27272A] shadow-2xl p-6 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7] dark:border-[#27272A]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#7A151C]/10 dark:bg-[#8B1C24]/20 text-[#7A151C] dark:text-[#8B1C24] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#7A151C] dark:text-[#8B1C24]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A151C] dark:text-[#8B1C24]">
                Explicação Gemini AI (Prática & Lógica)
              </span>
              <h3 className="font-cinzel font-bold text-lg text-[#232323] dark:text-[#EAE6DF]">
                {livroNome} {capitulo}:{versiculo}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setGeminiVerseModal(null)}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verse Quote */}
        <div className="my-3 p-3.5 rounded-2xl bg-[#F9F7F1] dark:bg-[#121212] border-l-4 border-[#7A151C] dark:border-[#8B1C24] font-crimson italic text-[#232323] dark:text-[#EAE6DF] text-xs md:text-sm">
          "{texto}"
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 my-2">
          {loading ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#7A151C]/10 dark:bg-[#8B1C24]/20 text-[#7A151C] dark:text-[#8B1C24] mx-auto flex items-center justify-center animate-bounce">
                <Sparkles className="w-6 h-6 animate-spin" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#232323] dark:text-[#EAE6DF]">
                  Analisando o texto bíblico com Gemini...
                </p>
                <p className="text-xs text-[#52525B] dark:text-[#A1A1AA]">
                  Sintetizando a lógica do texto, o foco em Cristo e 3 aplicações práticas.
                </p>
              </div>
            </div>
          ) : result ? (
            <div>
              {/* Badge da Fonte de Resposta */}
              <div className="flex items-center justify-between mb-3 text-[11px]">
                <span className="font-bold text-[#7A151C] dark:text-[#8B1C24] bg-[#7A151C]/10 dark:bg-[#8B1C24]/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {result.source === 'gemini_api' ? 'Resposta via Gemini API (Online)' : 'Resposta via Motor Exegético Solus'}
                </span>

                {result.source !== 'gemini_api' && (
                  <button
                    onClick={() => {
                      setGeminiVerseModal(null);
                      setIsSettingsOpen(true);
                    }}
                    className="text-[11px] text-[#7A151C] dark:text-[#8B1C24] hover:underline font-bold flex items-center gap-1"
                  >
                    <Key className="w-3 h-3" />
                    <span>Adicionar Chave API Gemini</span>
                  </button>
                )}
              </div>

              {renderFormattedText(result.text)}
            </div>
          ) : null}
        </div>

        {/* Footer Actions */}
        {!loading && result && (
          <div className="pt-4 border-t border-[#E4E4E7] dark:border-[#27272A] flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F9F7F1] dark:bg-[#121212] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#232323] dark:text-[#EAE6DF] text-xs font-bold transition-colors border border-[#E4E4E7] dark:border-[#27272A]"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? 'Copiado!' : 'Copiar Explicação'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveToNotes}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7A151C] dark:bg-[#8B1C24] hover:bg-[#681117] text-white text-xs font-bold shadow-md transition-all"
              >
                <NotebookPen className="w-4 h-4" />
                <span>Salvar nas Minhas Notas</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
