import React from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, BookOpen, Target, User } from 'lucide-react';

export default function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  const navItems = [
    { id: 'home', label: 'Fundamento', icon: LayoutDashboard },
    { id: 'reader', label: 'Raízes', icon: BookOpen },
    { id: 'plans', label: 'Obediência', icon: Target },
    { id: 'profile', label: 'Disciplina', icon: User },
  ];

  return (
    <nav aria-label="Navegação Principal" class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md border-t border-[#E4E4E7] dark:border-[#27272A] px-4 py-2">
      <div class="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              class={`flex flex-col items-center py-1 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-[#7A151C] dark:text-[#8B1C24] font-bold scale-105'
                  : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#232323] dark:hover:text-[#EAE6DF]'
              }`}
            >
              <Icon class={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span class="text-[11px] mt-1 tracking-tight font-sans">{item.label}</span>
              {isActive && (
                <span class="w-1 h-1 rounded-full bg-[#7A151C] dark:bg-[#8B1C24] mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
