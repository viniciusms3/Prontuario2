import React, { useState } from 'react';
import { physicalFolderItems } from '../data/physicalFolder';
import { PhysicalFolderItem } from '../types/medical';
import {
  Folder,
  FileText,
  Calendar,
  Hospital,
  User,
  Check,
  ExternalLink,
  Tag,
  Layers,
} from 'lucide-react';

interface PhysicalFolderNavProps {
  onOpenDocument: (item: PhysicalFolderItem) => void;
  onOpenGallery?: (galleryId: string) => void;
  onOpenDividersModal?: (type: 'dividers' | 'labels') => void;
  onOpenBlock?: (blockNum: 1 | 2 | 3 | 4) => void;
  initialTab?: 1 | 2 | 3 | 4;
}

export const PhysicalFolderNav: React.FC<PhysicalFolderNavProps> = ({
  onOpenDocument,
  onOpenGallery,
  onOpenDividersModal,
  onOpenBlock,
  initialTab,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 1 | 2 | 3 | 4>(
    initialTab || 'all'
  );

  // Metadata mappings for each item corresponding to screenshots 2 and 3
  const itemMeta: Record<
    number,
    {
      category: string;
      tags: string[];
      statusText: string;
    }
  > = {
    1: {
      category: 'Relatórios e Histórico de Internação',
      tags: ['#Evolução Médica', '#Cirurgia Vascular', '#Transferência HNMD', '#Santa Casa', '#Aba 1'],
      statusText: 'Disponível na pasta e digitalizado',
    },
    2: {
      category: 'Relatórios e Histórico de Internação',
      tags: ['#Resumo de Alta', '#Internação', '#Aba 1'],
      statusText: 'Constante na pasta física',
    },
    3: {
      category: 'Relatórios e Histórico de Internação',
      tags: ['#Enfermagem', '#Cuidados', '#Aba 1'],
      statusText: 'Documento arquivado',
    },
    4: {
      category: 'Relatórios e Histórico de Internação',
      tags: ['#Protocolo', '#Prontuário', '#SAME', '#Aba 1'],
      statusText: 'Protocolo arquivado',
    },
    5: {
      category: 'Prescrições e Medicações',
      tags: ['#Receita', '#AAS', '#Cilostazol', '#Vascular', '#Aba 2'],
      statusText: 'Receita original na pasta',
    },
    6: {
      category: 'Prescrições e Medicações',
      tags: ['#Receita', '#HGeJF', '#Tramadol', '#Baclofeno', '#Aba 2'],
      statusText: 'Receita original na pasta',
    },
    7: {
      category: 'Prescrições e Medicações',
      tags: ['#SICLOM', '#Tarv', '#HIV', '#Aba 2'],
      statusText: 'Dispensação regular',
    },
    8: {
      category: 'Infectologia e Exames de Sangue',
      tags: ['#Infectologia', '#Apto Cirurgia', '#CD4', '#Carga Viral', '#Aba 3'],
      statusText: 'Atestado de Aptidão Concedido',
    },
    9: {
      category: 'Infectologia e Exames de Sangue',
      tags: ['#Carga Viral', '#CD4', '#CD8', '#Imunologia', '#Aba 3'],
      statusText: 'Estável e Controlado',
    },
    10: {
      category: 'Infectologia e Exames de Sangue',
      tags: ['#Pedido Médico', '#Carga Viral', '#Aba 3'],
      statusText: 'Coleta realizada / Protocolada',
    },
    11: {
      category: 'Infectologia e Exames de Sangue',
      tags: ['#Hemograma', '#Bioquímica', '#Função Renal', '#Urina EAS', '#Aba 3'],
      statusText: '9 Páginas Completas Analisadas',
    },
    12: {
      category: 'Infectologia e Exames de Sangue',
      tags: ['#Sumário', '#4 Blocos', '#Consolidado', '#Aba 3'],
      statusText: 'Índice de 4 Blocos Consolidado',
    },
    13: {
      category: 'Cirurgia Vascular e Imagens',
      tags: ['#Cateterismo', '#CATE 88181', '#Coronárias Livres', '#Aba 4'],
      statusText: 'Obstruções excluídas (Normal)',
    },
    14: {
      category: 'Cirurgia Vascular e Imagens',
      tags: ['#Doppler', '#Carótidas', '#Vertebrais', '#Normal', '#Aba 4'],
      statusText: 'Normalidade confirmada',
    },
    15: {
      category: 'Cirurgia Vascular e Imagens',
      tags: ['#Doppler', '#Femoral Superficial', '#Oclusão MMII', '#Aba 4'],
      statusText: 'Oclusão detalhada (5-25cm)',
    },
    16: {
      category: 'Cirurgia Vascular e Imagens',
      tags: ['#AngioTC', '#Torácica', '#Pulmonar', '#Aba 4'],
      statusText: 'Laudo e imagens disponíveis',
    },
    17: {
      category: 'Cirurgia Vascular e Imagens',
      tags: ['#AngioTC', '#Aorta Abdominal', '#Ilíacas', '#Aba 4'],
      statusText: 'Falhas de enchimento evidenciadas',
    },
    18: {
      category: 'Cirurgia Vascular e Imagens',
      tags: ['#Envelope', '#3 CDs DICOM', '#Filmes Impressos', '#Aba 4'],
      statusText: 'Mídias físicas prontas para entrega',
    },
  };

  const filteredItems =
    filterTab === 'all'
      ? physicalFolderItems
      : physicalFolderItems.filter((i) => i.tab === filterTab);

  return (
    <div className="space-y-6">
      {/* Title Header Matching image_e68739a6.png */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-900">
              <Folder className="w-5 h-5 text-cyan-600" />
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                Organização Sequencial da Pasta Física de Exames
              </h2>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
              Índice 100% espelhado nas divisórias plásticas e etiquetas físicas levadas pelo paciente ao hospital. O médico pode localizar o documento original em papel ou abrir a versão digital em PDF/imagem instantaneamente.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenDividersModal && onOpenDividersModal('dividers')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-700" />
              <span>Ver Divisórias A4</span>
            </button>

            <button
              onClick={() => onOpenDividersModal && onOpenDividersModal('labels')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Tag className="w-3.5 h-3.5 text-teal-700" />
              <span>Ver Folha de Etiquetas</span>
            </button>
          </div>
        </div>

        {/* 5 Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterTab === 'all'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-slate-50'
            }`}
          >
            Todos os Itens (01 a 18)
          </button>

          <button
            onClick={() => setFilterTab(1)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterTab === 1
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-slate-50'
            }`}
          >
            ABA 1: Relatórios & Histórico
          </button>

          <button
            onClick={() => setFilterTab(2)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterTab === 2
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-slate-50'
            }`}
          >
            ABA 2: Prescrições & Medicamentos
          </button>

          <button
            onClick={() => setFilterTab(3)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterTab === 3
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-slate-50'
            }`}
          >
            ABA 3: Infectologia & Sangue
          </button>

          <button
            onClick={() => setFilterTab(4)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterTab === 4
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-slate-50'
            }`}
          >
            ABA 4: Cirurgia Vascular & Imagem
          </button>
        </div>
      </div>

      {/* 2-Column Grid of Items (01 to 18) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const meta = itemMeta[item.itemNumber] || {
            category: item.tabName,
            tags: [`#Aba ${item.tab}`],
            statusText: 'Disponível na pasta e digitalizado',
          };

          return (
            <div
              key={item.itemNumber}
              className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                {/* Header row: Badges on left, Category on right */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold bg-teal-800 text-white px-2 py-0.5 rounded">
                      ITEM {String(item.itemNumber).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200 px-2 py-0.5 rounded">
                      ABA {item.tab}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-500 font-medium truncate max-w-[50%] text-right">
                    {meta.category}
                  </span>
                </div>

                {/* Title and Subtitle */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {item.itemNumber}. {item.title}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                    {item.subtitle}
                  </div>
                </div>

                {/* Metadata Line with icons */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {item.date.split(' às')[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Hospital className="w-3 h-3 text-slate-400" />
                    <span className="truncate max-w-[140px] sm:max-w-[180px]">{item.institution}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" />
                    <span className="truncate max-w-[140px] sm:max-w-[180px]">{item.doctor.split(' (')[0]}</span>
                  </span>
                </div>

                {/* Summary / Highlights text */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {item.highlights[0] || item.subtitle}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {meta.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] text-slate-500 bg-slate-100 hover:bg-slate-200 px-1.5 py-0.5 rounded transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer row: Status check on left, Visualizar button on right */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                  <Check className="w-3.5 h-3.5" />
                  <span>{meta.statusText}</span>
                </span>

                <button
                  onClick={() => onOpenDocument(item)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Visualizar Documento</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section Matching image_044ccae2.png: Detalhamento dos 4 Blocos de Laudos de Sangue */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-teal-700" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Detalhamento dos 4 Blocos de Laudos de Sangue (Aba 3 - Item 12)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Bloco 1 */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-teal-800">
                <span>BLOCO 1</span>
                <span>8 PÁGS</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mt-1">
                Carlos Chagas (Outubro/2026)
              </h4>
              <p className="text-[11px] text-slate-600 mt-1">
                Dra. Cecília e Dr. Túlio: Hemograma, Ureia, Creatinina, Glicose, HbA1c 5,3%, EAS/Urina.
              </p>
            </div>
            <button
              onClick={() => onOpenBlock && onOpenBlock(1)}
              className="w-full py-1.5 px-2.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <span>Abrir Laudo Bloco 1 (8 Págs)</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </button>
          </div>

          {/* Bloco 2 */}
          <div className="bg-teal-50/40 border border-teal-200/80 rounded-xl p-3.5 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-teal-900">
                <span>BLOCO 2 (PRINCIPAL)</span>
                <span>9 PÁGS</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mt-1">
                Carlos Chagas (Dra. Cecília)
              </h4>
              <p className="text-[11px] text-slate-600 mt-1">
                Protocolo completo 9 páginas: Hemograma (Hb 14,1), Ureia (29,2), Creatinina (1,10), Na/K, Urina, Carga Viral.
              </p>
            </div>
            <button
              onClick={() => onOpenBlock && onOpenBlock(2)}
              className="w-full py-1.5 px-2.5 text-xs font-semibold text-teal-900 bg-teal-100/70 hover:bg-teal-200/80 border border-teal-300 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <span>Abrir Laudo Bloco 2 (9 Págs)</span>
              <ExternalLink className="w-3 h-3 text-teal-700" />
            </button>
          </div>

          {/* Bloco 3 */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-cyan-800">
                <span>BLOCO 3</span>
                <span>9 PÁGS</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mt-1">
                Carlos Chagas & HGeJF
              </h4>
              <p className="text-[11px] text-slate-600 mt-1">
                Dr. Arthur Valdier / Dr. Túlio: Glicemia, Perfil Lipídico, Hormonal (Estradiol/Testosterona), PSA.
              </p>
            </div>
            <button
              onClick={() => onOpenBlock && onOpenBlock(3)}
              className="w-full py-1.5 px-2.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <span>Abrir Laudo Bloco 3 (9 Págs)</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </button>
          </div>

          {/* Bloco 4 */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-indigo-800">
                <span>BLOCO 4</span>
                <span>12 PÁGS</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mt-1">
                Santa Casa de Misericórdia
              </h4>
              <p className="text-[11px] text-slate-600 mt-1">
                Dr. Luiz Kingma e Dr. Lucas Klier: 12 páginas de exames da internação, Coagulograma (TAP/TTPA 100%), Gasometria.
              </p>
            </div>
            <button
              onClick={() => onOpenBlock && onOpenBlock(4)}
              className="w-full py-1.5 px-2.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <span>Abrir Laudos Bloco 4 (12 Págs)</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
