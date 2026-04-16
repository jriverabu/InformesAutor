import React, { useMemo } from 'react';
import { 
  BarChart3, 
  MessageCircle, 
  UserCircle2, 
  MousePointer2, 
  DollarSign, 
  Eye, 
  Target,
  LayoutDashboard
} from 'lucide-react';

// Datos extraídos de la campaña de AutoR Cúcuta
const campaignsData = [
  { name: "No sabemos qué día cumples años...", results: 24, type: "Mensajes a WhatsApp", cpr: 3248.79, spend: 77971, impressions: 10939, reach: 6811 },
  { name: "Algo nuevo está por llegar a Autor", results: 280, type: "Visitas al Perfil", cpr: 162.41, spend: 45476, impressions: 14241, reach: 10003 },
  { name: "Lo nuevo está por llegar a Autor... y no es cualquier lanzamiento", results: 800, type: "Visitas al Perfil", cpr: 120.75, spend: 96603, impressions: 34500, reach: 18871 },
  { name: "Interacciones - Algo nuevo está por llegar a Autor", results: 1319, type: "Interacciones", cpr: 72.81, spend: 96039, impressions: 50360, reach: 20485 },
  { name: "La espera terminó... nuestra nueva carta de autor ya está aquí", results: 77, type: "Mensajes a WhatsApp", cpr: 2597.35, spend: 199996, impressions: 36070, reach: 16818 },
  { name: "Una nueva historia de sabores comienza en nuestra cocina", results: 1128, type: "Visitas al Perfil", cpr: 132.88, spend: 149891, impressions: 47480, reach: 24420 },
  { name: "12/03/2026 - Porque cumplir años también es una excusa perfecta para celebrar la vida", results: 134, type: "Mensajes a WhatsApp", cpr: 1119.38, spend: 149998, impressions: 26228, reach: 15154 },
  { name: "Historia Día del Hombre", results: 24, type: "Mensajes a WhatsApp", cpr: 4077.45, spend: 97859, impressions: 15230, reach: 10480 },
  { name: "Celebrar tu cumpleaños en Autor es otro nivel", results: 102, type: "Mensajes a WhatsApp", cpr: 1470.37, spend: 149978, impressions: 47102, reach: 26438 },
  { name: "Hay lugares a los que vienes a comer... y otros a vivir algo distinto (A)", results: 43, type: "Mensajes a WhatsApp", cpr: 3486.39, spend: 149915, impressions: 34877, reach: 18148 },
  { name: "Hay lugares a los que vienes a comer... y otros a vivir algo distinto (B)", results: 55, type: "Mensajes a WhatsApp", cpr: 2727, spend: 149985, impressions: 31370, reach: 14459 },
  { name: "El primer bocado lo cambia todo", results: 1279, type: "Visitas al Perfil", cpr: 117.26, spend: 149985, impressions: 72306, reach: 40038 },
  { name: "Si no sabes qué pedir... empieza por aquí", results: 46, type: "Mensajes a WhatsApp", cpr: 3260.86, spend: 150000, impressions: 24042, reach: 10847 }
];

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 transition-all hover:shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon size={24} />
      </div>
      <span className="text-zinc-400 text-xs font-medium uppercase tracking-wider">Métrica Total</span>
    </div>
    <h3 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">{value}</p>
  </div>
);

export default function App() {
  const totals = useMemo(() => {
    return campaignsData.reduce((acc, curr) => {
      acc.spend += curr.spend;
      acc.impressions += curr.impressions;
      acc.reach += curr.reach;
      if (curr.type === "Mensajes a WhatsApp") acc.whatsapp += curr.results;
      if (curr.type === "Visitas al Perfil") acc.visits += curr.results;
      if (curr.type === "Interacciones") acc.interacts += curr.results;
      return acc;
    }, { spend: 0, impressions: 0, reach: 0, whatsapp: 0, visits: 0, interacts: 0 });
  }, []);

  const formatCurrency = (val) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  const formatNumber = (val) => new Intl.NumberFormat('es-CO').format(val);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 md:p-8 font-sans text-zinc-900 dark:text-zinc-100 w-full">
      <header className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">AutoR Cúcuta</h1>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-2 text-sm md:text-base">
              <LayoutDashboard size={18} className="text-orange-500" />
              Informe Consolidado de Métricas - AutoR Cúcuta
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 p-2 rounded-full border border-zinc-200 dark:border-zinc-800 px-4 w-fit">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs md:text-sm font-bold">Resumen de Campaña Activa</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        {/* Grid de KPIs principales */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Inversión Total" 
            value={formatCurrency(totals.spend)} 
            icon={DollarSign} 
            colorClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30"
          />
          <StatCard 
            title="Mensajes WhatsApp" 
            value={formatNumber(totals.whatsapp)} 
            icon={MessageCircle} 
            colorClass="bg-blue-100 text-blue-600 dark:bg-blue-950/30"
          />
          <StatCard 
            title="Visitas al Perfil" 
            value={formatNumber(totals.visits)} 
            icon={UserCircle2} 
            colorClass="bg-purple-100 text-purple-600 dark:bg-purple-950/30"
          />
          <StatCard 
            title="Interacciones" 
            value={formatNumber(totals.interacts)} 
            icon={MousePointer2} 
            colorClass="bg-orange-100 text-orange-600 dark:bg-orange-950/30"
          />
        </section>

        {/* Alcance e Impresiones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-zinc-900 text-white p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-zinc-400 text-sm mb-1 font-medium">Total Alcance</p>
              <h4 className="text-3xl font-bold">{formatNumber(totals.reach)}</h4>
            </div>
            <Target size={40} className="text-zinc-700" />
          </div>
          <div className="bg-zinc-900 text-white p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-zinc-400 text-sm mb-1 font-medium">Total Impresiones</p>
              <h4 className="text-3xl font-bold">{formatNumber(totals.impressions)}</h4>
            </div>
            <Eye size={40} className="text-zinc-700" />
          </div>
        </div>

        {/* Tabla de Resultados Detallada */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <BarChart3 size={20} className="text-orange-500" />
              Desglose de Campañas (13)
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Campaña</th>
                  <th className="px-6 py-4 font-semibold text-center">Tipo de Resultado</th>
                  <th className="px-6 py-4 font-semibold text-right">Cantidad</th>
                  <th className="px-6 py-4 font-semibold text-right">Costo / Res.</th>
                  <th className="px-6 py-4 font-semibold text-right">Inversión</th>
                  <th className="px-6 py-4 font-semibold text-right">Alcance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {campaignsData.map((camp, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 line-clamp-1 max-w-[250px]">{camp.name}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                        camp.type === "Mensajes a WhatsApp" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" :
                        camp.type === "Visitas al Perfil" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" :
                        "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                      }`}>
                        {camp.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-bold text-zinc-900 dark:text-white">{formatNumber(camp.results)}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-sm text-zinc-600 dark:text-zinc-400">
                      {formatCurrency(camp.cpr)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-white">{formatCurrency(camp.spend)}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-zinc-500 text-sm">
                      {formatNumber(camp.reach)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-10">
          <p className="text-zinc-400 text-sm">
            Informe generado para AutoR Cúcuta • AutoR Cúcuta • 2026
          </p>
        </footer>
      </main>
    </div>
  );
}
