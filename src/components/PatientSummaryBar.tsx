import React, { useState } from 'react';
import { patientData } from '../data/patientData';
import {
  User,
  Calendar,
  Key,
  Phone,
  ChevronDown,
  ChevronUp,
  Hospital,
  AlertTriangle,
  Shield,
} from 'lucide-react';

interface PatientSummaryBarProps {
  onOpenCredentials?: () => void;
}

export const PatientSummaryBar: React.FC<PatientSummaryBarProps> = ({
  onOpenCredentials,
}) => {
  const [showContacts, setShowContacts] = useState(true);
  const [showClinicalSummary, setShowClinicalSummary] = useState(false);

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* Patient Card Box */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left: Avatar & Demographics */}
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                <User className="w-6 h-6 text-slate-600" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    {patientData.name}
                  </h2>
                  <span className="text-[11px] font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200/80 px-2.5 py-0.5 rounded-full">
                    Capitania Fluvial de Minas Gerais (Marinha do Brasil)
                  </span>
                </div>

                <div className="text-xs text-slate-600 font-mono mt-0.5">
                  NIP: {patientData.nip} · CPF: {patientData.cpf} · Nasc: {patientData.birthDate} ({patientData.age} anos)
                </div>
              </div>
            </div>

            {/* Right: Hospital Admission & Lab Credentials badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Orange box for Admission */}
              <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl px-3.5 py-2 flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-amber-950 leading-tight">
                    Internação / Avaliação HNMD
                  </div>
                  <div className="text-[11px] text-amber-800">
                    09/11/2026 (Segundo Tempo) · Cirurgia Vascular
                  </div>
                </div>
              </div>

              {/* Yellow box for Labs Passwords */}
              <button
                onClick={onOpenCredentials}
                className="bg-yellow-50/80 border border-yellow-200/90 hover:bg-yellow-100/70 rounded-xl px-3.5 py-2 flex items-center gap-2 transition-colors cursor-pointer text-left"
                title="Ver senhas dos portais online"
              >
                <Key className="w-4 h-4 text-yellow-700 shrink-0" />
                <span className="text-xs font-bold text-yellow-950">
                  Senhas dos Labs (4)
                </span>
              </button>
            </div>
          </div>

          {/* Toggle buttons row */}
          <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-slate-100">
            <button
              onClick={() => setShowContacts(!showContacts)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-700" />
              <span>Contatos de Emergência ({patientData.contacts.length})</span>
              {showContacts ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            <button
              onClick={() => setShowClinicalSummary(!showClinicalSummary)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
            >
              <span>Ver Resumo Clínico</span>
              {showClinicalSummary ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
          </div>

          {/* Emergency Contacts Cards Strip (Matching image_d8f1109d.png) */}
          {showContacts && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 animate-in fade-in duration-150">
              {patientData.contacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-xl p-3 flex items-center justify-between hover:border-cyan-300 transition-colors shadow-2xs"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {contact.relation}: {contact.name}
                    </div>
                    <div className="text-xs font-mono font-medium text-cyan-800 mt-0.5">
                      {contact.phone}
                    </div>
                  </div>

                  <a
                    href={`tel:${contact.phone.replace(/\D/g, '')}`}
                    className="w-8 h-8 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-800 flex items-center justify-center transition-colors"
                    title={`Ligar para ${contact.name}`}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Collapsible Clinical Summary */}
          {showClinicalSummary && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs animate-in fade-in duration-150">
              <div className="flex items-start gap-2 text-rose-900 font-semibold">
                <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Diagnóstico Vascular Principal:</span> {patientData.diagnosis}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700 pt-1">
                <div>
                  <strong className="text-slate-900">Destino de Transferência:</strong> {patientData.destination}
                </div>
                <div>
                  <strong className="text-slate-900">Histórico de Hábitos:</strong> {patientData.habits}
                </div>
                <div>
                  <strong className="text-slate-900">Alergias Relatadas:</strong> {patientData.allergies}
                </div>
                <div>
                  <strong className="text-slate-900">Documento Regulatório:</strong> Mensagem SIGAD-MB P221325Z/OUT/2026 (CFMG)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
