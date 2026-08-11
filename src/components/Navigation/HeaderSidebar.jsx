import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LIVROS_BIBLIA } from '../../data/bibliaACF';
import { 
  BookOpen, 
  LayoutDashboard, 
  Target, 
  User, 
  Settings, 
  Sun, 
  Moon, 
  Sparkles,
  ChevronDown,
  Search,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';

export default function HeaderSidebar() {
  const { 
    activeTab, 
    setActiveTab, 
    posicao, 
    irParaCapitulo, 
    settings, 
    setSettings, 
    setIsSettingsOpen,
    progressoCapitulos,
    toggleCapituloLido,
    planoAtivo
  } = useApp();

  const [isBookSelectorOpen, setIsBookSelectorOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const livroAtual = LIVROS_BIBLIA.find(l => l.id === posicao.livroId) || LIVROS_BIBLIA[0];
  const isCapLido = !!progressoCapitulos[`${posicao.livroId}-${posicao.capitulo}`];

  const toggleTheme = () => {
    const nextTheme = settings.theme === 'dark' ? 'light' : settings.theme === 'light' ? 'sepia' : 'dark';
    setSettings({ ...settings, theme: nextTheme });
  };

  const navItems = [
    { id: 'home', label: 'Fundamento', icon: LayoutDashboard },
    { id: 'reader', label: 'Raízes', icon: BookOpen },
    { id: 'plans', label: 'Obediência', icon: Target },
    { id: 'profile', label: 'Disciplina', icon: User },
  ];

  const livrosFiltrados = LIVROS_BIBLIA.filter(l => 
    l.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.abrev.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Top Header Bar */}
      <header class="sticky top-0 z-30 bg-[#FFFFFF]/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md border-b border-[#E4E4E7] dark:border-[#27272A] transition-colors">
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          
          {/* Logo, Hamburger Menu & Book Selector Button */}
          <div class="flex items-center gap-2.5">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              class="p-2 rounded-xl bg-[#F9F7F1] dark:bg-[#121212] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#232323] dark:text-[#EAE6DF] border border-[#E4E4E7] dark:border-[#27272A] md:hidden transition-colors"
              title="Abrir Menu Principal"
            >
              <Menu class="w-5 h-5 text-[#7A151C] dark:text-[#8B1C24]" />
            </button>

            <button 
              onClick={() => setActiveTab('home')}
              class="flex items-center gap-2.5 font-cinzel text-lg font-bold text-[#7A151C] dark:text-[#EAE6DF] hover:opacity-90 transition-opacity"
            >
              <div class="w-9 h-9 rounded-xl bg-[#7A151C] dark:bg-[#8B1C24] flex items-center justify-center text-[#EAE6DF] shadow-md shrink-0">
                <BookOpen class="w-5 h-5 text-[#EAE6DF]" />
              </div>
              <span class="hidden sm:inline tracking-wider font-bold">Solus Christus</span>
            </button>

            {/* Quick Passage Selector Pill */}
            <div class="relative">
              <button
                onClick={() => setIsBookSelectorOpen(!isBookSelectorOpen)}
                class="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#F9F7F1] dark:bg-[#121212] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#232323] dark:text-[#EAE6DF] text-sm font-bold transition-colors border border-[#E4E4E7] dark:border-[#27272A] shadow-xs"
              >
                <span>{livroAtual.nome} <span class="text-[#7A151C] dark:text-[#8B1C24]">{posicao.capitulo}</span></span>
                <ChevronDown class={`w-4 h-4 text-[#7A151C] dark:text-[#8B1C24] transition-transform duration-200 ${isBookSelectorOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Book & Chapter Selector Dropdown */}
              {isBookSelectorOpen && (
                <div class="absolute top-full left-0 mt-2 w-80 max-h-[480px] bg-[#FFFFFF] dark:bg-[#1C1C1E] border border-[#E4E4E7] dark:border-[#27272A] rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col animate-fade-in">
                  <div class="p-3 border-b border-[#E4E4E7] dark:border-[#27272A] bg-[#F9F7F1] dark:bg-[#121212]">
                    <div class="relative">
                      <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Buscar livro..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        class="w-full pl-9 pr-3 py-1.5 bg-[#FFFFFF] dark:bg-[#1C1C1E] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#7A151C] text-[#232323] dark:text-[#EAE6DF]"
                      />
                    </div>
                  </div>

                  <div class="overflow-y-auto flex-1 p-2 space-y-1">
                    {livrosFiltrados.map((livro) => (
                      <div key={livro.id} class="border-b border-[#E4E4E7]/60 dark:border-[#27272A]/60 last:border-0 pb-1">
                        <div class="text-xs font-bold px-2 py-1 text-[#7A151C] dark:text-[#8B1C24] flex justify-between uppercase tracking-wider">
                          <span>{livro.nome}</span>
                          <span class="text-[10px] text-stone-400 font-sans">{livro.testamento}</span>
                        </div>
                        <div class="grid grid-cols-6 gap-1 p-1">
                          {Array.from({ length: livro.capitulos }, (_, i) => i + 1).map((cap) => {
                            const isSelected = livro.id === posicao.livroId && cap === posicao.capitulo;
                            return (
                              <button
                                key={cap}
                                onClick={() => {
                                  irParaCapitulo(livro.id, cap);
                                  setIsBookSelectorOpen(false);
                                }}
                                class={`py-1 text-xs rounded-lg font-bold transition-colors ${
                                  isSelected
                                    ? 'bg-[#7A151C] dark:bg-[#8B1C24] text-white font-black shadow-sm'
                                    : 'bg-[#F9F7F1] dark:bg-[#121212] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#232323] dark:text-[#EAE6DF]'
                                }`}
                              >
                                {cap}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Header */}
          <div class="flex items-center gap-2">
            {/* Toggle Chapter Read status button */}
            {activeTab === 'reader' && (
              <button
                onClick={() => toggleCapituloLido(posicao.livroId, posicao.capitulo)}
                title={isCapLido ? "Marcado como lido" : "Marcar capítulo como lido"}
                class={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isCapLido
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-[#F9F7F1] dark:bg-[#121212] text-[#232323] dark:text-[#EAE6DF] hover:bg-stone-200 dark:hover:bg-stone-800 border border-[#E4E4E7] dark:border-[#27272A]'
                }`}
              >
                <CheckCircle2 class={`w-4 h-4 ${isCapLido ? 'text-emerald-600 dark:text-emerald-400 fill-emerald-600/20' : ''}`} />
                <span class="hidden sm:inline">{isCapLido ? 'Lido' : 'Concluir'}</span>
              </button>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={`Modo Atual: ${settings.theme}`}
              class="p-2 rounded-xl bg-[#F9F7F1] dark:bg-[#121212] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#232323] dark:text-[#EAE6DF] border border-[#E4E4E7] dark:border-[#27272A] transition-colors"
            >
              {settings.theme === 'dark' ? (
                <Moon class="w-4 h-4 text-[#EAE6DF]" />
              ) : settings.theme === 'sepia' ? (
                <Sparkles class="w-4 h-4 text-[#7A151C]" />
              ) : (
                <Sun class="w-4 h-4 text-[#7A151C]" />
              )}
            </button>

            {/* Reading Settings Modal Trigger */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              title="Configurações de Leitura"
              class="p-2 rounded-xl bg-[#F9F7F1] dark:bg-[#121212] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#232323] dark:text-[#EAE6DF] border border-[#E4E4E7] dark:border-[#27272A] transition-colors"
            >
              <Settings class="w-4 h-4 text-[#7A151C] dark:text-[#8B1C24]" />
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Navigation Sidebar (md screens+) */}
      <aside aria-label="Navegação Lateral" class="hidden md:flex fixed top-16 left-0 bottom-0 w-64 bg-[#FFFFFF] dark:bg-[#1C1C1E] border-r border-[#E4E4E7] dark:border-[#27272A] p-4 flex-col justify-between z-20">
        <div class="space-y-6">
          {/* Main Navigation Items */}
          <nav aria-label="Menu Principal" class="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  class={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-[#7A151C]/10 dark:bg-[#8B1C24]/20 text-[#7A151C] dark:text-[#EAE6DF] font-extrabold border-l-4 border-[#7A151C] dark:border-[#8B1C24] shadow-xs'
                      : 'text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F9F7F1] dark:hover:bg-[#121212] hover:text-[#232323] dark:hover:text-[#EAE6DF]'
                  }`}
                >
                  <Icon class={`w-5 h-5 ${isActive ? 'text-[#7A151C] dark:text-[#8B1C24] stroke-[2.5]' : 'stroke-2'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Active Plan Widget Badge */}
          {planoAtivo && (
            <div class="p-4 rounded-2xl bg-[#F9F7F1] dark:bg-[#121212] border border-[#7A151C]/30 dark:border-[#8B1C24]/40 space-y-2.5 shadow-sm">
              <div class="flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#7A151C] dark:text-[#8B1C24]">
                <span>Plano Ativo</span>
                <span class="text-[10px] bg-[#7A151C]/20 dark:bg-[#8B1C24]/30 text-[#7A151C] dark:text-[#EAE6DF] px-2 py-0.5 rounded-md border border-[#7A151C]/30 dark:border-[#8B1C24]/40">
                  Em Dia
                </span>
              </div>
              <p class="text-xs font-bold text-[#232323] dark:text-[#EAE6DF] line-clamp-1">
                {planoAtivo.titulo}
              </p>
              <div class="w-full bg-stone-200 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  class="bg-[#7A151C] dark:bg-[#8B1C24] h-full rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (Object.keys(planoAtivo.progressoDias || {}).length / Math.max(1, planoAtivo.duracaoDias)) * 100)}%` }}
                ></div>
              </div>
              <button
                onClick={() => setActiveTab('plans')}
                class="text-[11px] text-[#7A151C] dark:text-[#8B1C24] hover:underline font-bold block pt-1"
              >
                Ver metas do dia &rarr;
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div class="text-[11px] text-[#52525B] dark:text-[#A1A1AA] border-t border-[#E4E4E7] dark:border-[#27272A] pt-3 space-y-1">
          <p class="font-cinzel font-bold text-[#7A151C] dark:text-[#8B1C24] uppercase tracking-wider text-xs">SOLUS CHRISTUS</p>
          <p class="font-crimson italic text-[#232323] dark:text-[#EAE6DF] text-[11px] leading-snug">
            “Cristo no centro. A Palavra como fundamento. A fé como caminho.”
          </p>
          <p class="font-sans font-medium text-[10px] text-[#52525B] dark:text-[#A1A1AA] pt-0.5">
            Por <span class="font-semibold text-[#232323] dark:text-[#EAE6DF]">Paulo Vitor Ribeiro de Sousa</span>
          </p>
        </div>
      </aside>

      {/* Mobile Drawer Menu (Slide-in Overlay) */}
      {isMobileMenuOpen && (
        <div 
          class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            class="w-4/5 max-w-sm bg-[#FFFFFF] dark:bg-[#1C1C1E] h-full shadow-2xl p-5 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div class="space-y-6">
              {/* Drawer Header */}
              <div class="flex items-center justify-between pb-3 border-b border-[#E4E4E7] dark:border-[#27272A]">
                <div class="flex items-center gap-2.5 font-cinzel text-base font-bold text-[#7A151C] dark:text-[#EAE6DF]">
                  <div class="w-8 h-8 rounded-xl bg-[#7A151C] dark:bg-[#8B1C24] flex items-center justify-center text-[#EAE6DF] shadow-md">
                    <BookOpen class="w-4 h-4 text-[#EAE6DF]" />
                  </div>
                  <span>Solus Christus</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  class="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 transition-colors"
                >
                  <X class="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav aria-label="Menu Mobile" class="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      class={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                        isActive
                          ? 'bg-[#7A151C] dark:bg-[#8B1C24] text-white font-extrabold shadow-md'
                          : 'text-[#52525B] dark:text-[#A1A1AA] hover:bg-[#F9F7F1] dark:hover:bg-[#121212] hover:text-[#232323] dark:hover:text-[#EAE6DF]'
                      }`}
                    >
                      <Icon class="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Active Plan Widget Badge Mobile */}
              {planoAtivo && (
                <div class="p-4 rounded-2xl bg-[#F9F7F1] dark:bg-[#121212] border border-[#7A151C]/30 dark:border-[#8B1C24]/40 space-y-2 shadow-sm">
                  <div class="flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#7A151C] dark:text-[#8B1C24]">
                    <span>Plano Ativo</span>
                    <span class="text-[10px] bg-[#7A151C]/20 dark:bg-[#8B1C24]/30 text-[#7A151C] dark:text-[#EAE6DF] px-2 py-0.5 rounded-md border border-[#7A151C]/30">
                      Em Dia
                    </span>
                  </div>
                  <p class="text-xs font-bold text-[#232323] dark:text-[#EAE6DF] line-clamp-1">
                    {planoAtivo.titulo}
                  </p>
                  <div class="w-full bg-stone-200 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      class="bg-[#7A151C] dark:bg-[#8B1C24] h-full rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, (Object.keys(planoAtivo.progressoDias || {}).length / Math.max(1, planoAtivo.duracaoDias)) * 100)}%` }}
                    ></div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('plans');
                      setIsMobileMenuOpen(false);
                    }}
                    class="text-[11px] text-[#7A151C] dark:text-[#8B1C24] hover:underline font-bold block pt-1"
                  >
                    Ver metas do dia &rarr;
                  </button>
                </div>
              )}
            </div>

            {/* Footer App Info */}
            <div class="text-[11px] text-[#52525B] dark:text-[#A1A1AA] border-t border-[#E4E4E7] dark:border-[#27272A] pt-4 space-y-1">
              <p class="font-cinzel font-bold text-[#7A151C] dark:text-[#8B1C24] uppercase tracking-wider text-xs">SOLUS CHRISTUS</p>
              <p class="font-crimson italic text-[#232323] dark:text-[#EAE6DF] text-[11px] leading-snug">
                “Cristo no centro. A Palavra como fundamento. A fé como caminho.”
              </p>
              <p class="font-sans font-medium text-[10px] text-[#52525B] dark:text-[#A1A1AA] pt-0.5">
                Por <span class="font-semibold text-[#232323] dark:text-[#EAE6DF]">Paulo Vitor Ribeiro de Sousa</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
