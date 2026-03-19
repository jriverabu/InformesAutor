import React, { useState, useMemo } from 'react';
import { 
  MessageCircle, 
  MousePointer2, 
  Users, 
  TrendingUp, 
  DollarSign, 
  BarChart3,
  Layers,
  ArrowUpRight
} from 'lucide-react';

const rawData = [
  { nombre: "Hay lugares que no se visitan una sola vez...", resultados: 4491, indicador: "Interacciones", costo: 33.39, gasto: 149969, alcance: 37561 },
  { nombre: "Cuando el sushi se ve así... sabes que va a ser increíble", resultados: 34, indicador: "Mensajes WhatsApp", costo: 4411.76, gasto: 150000, alcance: 14998 },
  { nombre: "Si vienes a Autor este febrero, empieza por aquí", resultados: 1016, indicador: "Interacciones", costo: 147.63, gasto: 150000, alcance: 42876 },
  { nombre: "No sabemos qué día cumples años (A)", resultados: 64, indicador: "Mensajes WhatsApp", costo: 2319.40, gasto: 148442, alcance: 9494 },
  { nombre: "Antes de ser cócteles, fueron intuición", resultados: 302, indicador: "Interacciones", costo: 331.12, gasto: 100000, alcance: 38892 },
  { nombre: "Después de una buena cena, siempre viene la tarta de queso", resultados: 2162, indicador: "Interacciones", costo: 69.00, gasto: 149190, alcance: 159636 },
  { nombre: "En Autor creamos celebraciones estilo Pinterest", resultados: 64, indicador: "Mensajes WhatsApp", costo: 2342.12, gasto: 149896, alcance: 18055 },
  { nombre: "No sabemos qué día cumples años... (B)", resultados: 33, indicador: "Mensajes WhatsApp", costo: 2483.75, gasto: 81964, alcance: 6869 },
  { nombre: "Algo nuevo está por llegar a Autor", resultados: 410, indicador: "visitas al perfil", costo: 132.97, gasto: 54518, alcance: 10549 },
];

const App = () => {
  const totals = useMemo(() => {
    const categories = {
      "Mensajes WhatsApp": { count: 0, spend: 0, res: 0 },
      "Interacciones": { count: 0, spend: 0, res: 0 },
      "visitas al perfil": { count: 0, spend: 0, res: 0 }
    };

    let totalSpend = 0;
    let totalReach = 0;

    rawData.forEach(item => {
      categories[item.indicador].count += 1;
      categories[item.indicador].spend += item.gasto;
      categories[item.indicador].res += item.resultados;
      totalSpend += item.gasto;
      totalReach += item.alcance;
    });

    return { categories, totalSpend, totalReach };
  }, []);

  const formatCurrency = (val) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  const formatNumber = (val) => new Intl.NumberFormat('es-CO').format(val);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Informe de Rendimiento Publicitario</h1>
          <p className="text-slate-500 mt-1 uppercase text-xs font-semibold tracking-widest">Resumen ejecutivo para Cliente - Autor</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <DollarSign className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Inversión Total</p>
            <p className="text-lg font-bold text-slate-800">{formatCurrency(totals.totalSpend)}</p>
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard 
          title="Mensajes WhatsApp" 
          value={totals.categories["Mensajes WhatsApp"].res} 
          subValue={`Costo Prom: ${formatCurrency(totals.categories["Mensajes WhatsApp"].spend / totals.categories["Mensajes WhatsApp"].res)}`}
          icon={<MessageCircle className="w-6 h-6 text-emerald-600" />}
          color="bg-emerald-50"
        />
        <KPICard 
          title="Interacciones" 
          value={formatNumber(totals.categories["Interacciones"].res)} 
          subValue={`Costo Prom: ${formatCurrency(totals.categories["Interacciones"].spend / totals.categories["Interacciones"].res)}`}
          icon={<MousePointer2 className="w-6 h-6 text-blue-600" />}
          color="bg-blue-50"
        />
        <KPICard 
          title="Visitas al Perfil" 
          value={totals.categories["visitas al perfil"].res} 
          subValue={`Costo Prom: ${formatCurrency(totals.categories["visitas al perfil"].spend / totals.categories["visitas al perfil"].res)}`}
          icon={<Users className="w-6 h-6 text-purple-600" />}
          color="bg-purple-50"
        />
        <KPICard 
          title="Alcance Total" 
          value={formatNumber(totals.totalReach)} 
          subValue="Personas alcanzadas"
          icon={<BarChart3 className="w-6 h-6 text-orange-600" />}
          color="bg-orange-50"
        />
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Detail Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-500" />
              Desglose por Campaña
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Campaña</th>
                  <th className="px-6 py-4">Resultados</th>
                  <th className="px-6 py-4">Costo/R</th>
                  <th className="px-6 py-4">Inversión</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rawData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-700 truncate max-w-xs">{item.nombre}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        item.indicador.includes('Mensajes') ? 'bg-emerald-100 text-emerald-700' : 
                        item.indicador.includes('Interacciones') ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {item.indicador}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-800">{formatNumber(item.resultados)}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {formatCurrency(item.costo)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                      {formatCurrency(item.gasto)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Breakdown Panel */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              Costo por Objetivo
            </h3>
            <div className="space-y-6">
              <MetricProgress 
                label="WhatsApp" 
                cost={totals.categories["Mensajes WhatsApp"].spend / totals.categories["Mensajes WhatsApp"].res} 
                max={5000}
                color="bg-emerald-500"
              />
              <MetricProgress 
                label="Interacciones" 
                cost={totals.categories["Interacciones"].spend / totals.categories["Interacciones"].res} 
                max={5000}
                color="bg-blue-500"
              />
              <MetricProgress 
                label="Visitas Perfil" 
                cost={totals.categories["visitas al perfil"].spend / totals.categories["visitas al perfil"].res} 
                max={5000}
                color="bg-purple-500"
              />
            </div>
          </div>

          <div className="bg-indigo-600 p-6 rounded-3xl shadow-lg text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-1">Alcance Total</h4>
              <p className="text-4xl font-bold mb-4">{formatNumber(totals.totalReach)}</p>
              <div className="flex items-center gap-2 text-indigo-100 text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>Usuarios impactados este periodo</span>
              </div>
            </div>
            {/* Abstract Background element */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

const KPICard = ({ title, value, subValue, icon, color }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between h-full hover:border-slate-300 transition-all">
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <div>
      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</h3>
      <p className="text-2xl font-black text-slate-800">{value}</p>
      <p className="text-[11px] text-slate-500 mt-2 font-medium">{subValue}</p>
    </div>
  </div>
);

const MetricProgress = ({ label, cost, max, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end">
      <span className="text-sm font-bold text-slate-600">{label}</span>
      <span className="text-sm font-black text-slate-800">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(cost)}</span>
    </div>
    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
      <div 
        className={`${color} h-full rounded-full transition-all duration-1000`} 
        style={{ width: `${Math.min((cost / max) * 100, 100)}%` }}
      ></div>
    </div>
  </div>
);

export default App;
