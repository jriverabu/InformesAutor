import React, { useState, useMemo } from 'react';

// Mapeo exacto de las 12 campañas y sus métricas provenientes de la plataforma publicitaria
const CAMPAIGN_DATA = [
  {
    id: 1,
    nombre: "Por un 2026 lleno de momentos, risas y mesas que se quedan en la memoria",
    resultados: 1171,
    indicador: "Interacción en Publicación",
    costoPorResultado: 42.69,
    gasto: 49985,
    impresiones: 20866,
    alcance: 10455
  },
  {
    id: 2,
    nombre: "Una nueva experiencia llega a autor",
    resultados: 559,
    indicador: "Visitas al Perfil de Instagram",
    costoPorResultado: 178.60,
    gasto: 99839,
    impresiones: 32330,
    alcance: 18087
  },
  {
    id: 3,
    nombre: "Cumpleaños Semana 13-04-2026",
    resultados: 148,
    indicador: "Conversaciones a WhatsApp",
    costoPorResultado: 1011.54,
    gasto: 149708,
    impresiones: 37206,
    alcance: 19980
  },
  {
    id: 4,
    nombre: "Cumpleaños Semana 24-04-2026",
    resultados: 61,
    indicador: "Conversaciones a WhatsApp",
    costoPorResultado: 2458.84,
    gasto: 149989,
    impresiones: 34493,
    alcance: 19103
  },
  {
    id: 5,
    nombre: "Para los que aman probar de todo: esta es su señal.",
    resultados: 85,
    indicador: "Conversaciones a WhatsApp",
    costoPorResultado: 1764.65,
    gasto: 149995,
    impresiones: 30956,
    alcance: 14901
  },
  {
    id: 6,
    nombre: "No dejes que nadie escriba tu historia, atrévete a ser AutoR",
    resultados: 569,
    indicador: "Visitas al Perfil de Instagram",
    costoPorResultado: 263.61,
    gasto: 149993,
    impresiones: 40704,
    alcance: 22165
  },
  {
    id: 7,
    nombre: "Cada plato es parte de la celebración,",
    resultados: 39,
    indicador: "Conversaciones a WhatsApp",
    costoPorResultado: 2563.79,
    gasto: 99988,
    impresiones: 18269,
    alcance: 8972
  },
  {
    id: 8,
    nombre: "Hay lugares bonitos...",
    resultados: 681,
    indicador: "Visitas al Perfil de Instagram",
    costoPorResultado: 73.02,
    gasto: 49727,
    impresiones: 25874,
    alcance: 14735
  },
  {
    id: 9,
    nombre: "Mamá merece lo mejor. Mamá merece Autor",
    resultados: 2,
    indicador: "Conversaciones a WhatsApp",
    costoPorResultado: 3164.50,
    gasto: 6329,
    impresiones: 1147,
    alcance: 969
  },
  {
    id: 10,
    nombre: "La cena perfecta existe y se ve así",
    resultados: 17,
    indicador: "Conversaciones a WhatsApp",
    costoPorResultado: 4483.24,
    gasto: 76215,
    impresiones: 14093,
    alcance: 7587
  },
  {
    id: 11,
    nombre: "Este mes de las madres, ven a celebrar en Autor",
    resultados: 26,
    indicador: "Conversaciones a WhatsApp",
    costoPorResultado: 2882.27,
    gasto: 74939,
    impresiones: 10491,
    alcance: 6186
  },
  {
    id: 12,
    nombre: "Mamá merece una experiencia a la altura de todo lo que representa",
    resultados: 16,
    indicador: "Conversaciones a WhatsApp",
    costoPorResultado: 4251.19,
    gasto: 68019,
    impresiones: 11883,
    alcance: 6382
  }
];

export default function App() {
  const [filtroIndicador, setFiltroIndicador] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const formatCOP = (val) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(val);
  };

  const formatNumber = (val) => {
    return new Intl.NumberFormat('es-CO').format(val);
  };

  // Consolidado macro sumado estrictamente según auditoría de datos
  const totals = useMemo(() => {
    let gasto = 0;
    let resultados = 0;
    let impresiones = 0;
    let alcance = 0;

    CAMPAIGN_DATA.forEach(c => {
      gasto += c.gasto;
      resultados += c.resultados;
      impresiones += c.impresiones;
      alcance += c.alcance;
    });

    return { gasto, resultados, impresiones, alcance };
  }, []);

  // Segmentación por indicadores objetivos requeridos
  const objectiveMetrics = useMemo(() => {
    const segments = {
      'Conversaciones a WhatsApp': { resultados: 0, gasto: 0, label: 'Mensajes a WhatsApp (Conversaciones)' },
      'Visitas al Perfil de Instagram': { resultados: 0, gasto: 0, label: 'Visitas al Perfil de Instagram' },
      'Interacción en Publicación': { resultados: 0, gasto: 0, label: 'Interacción en Publicación' }
    };

    CAMPAIGN_DATA.forEach(c => {
      if (segments[c.indicador]) {
        segments[c.indicador].resultados += c.resultados;
        segments[c.indicador].gasto += c.gasto;
      }
    });

    return Object.keys(segments).map(key => ({
      indicador: key,
      ...segments[key],
      costoMedio: segments[key].resultados > 0 ? segments[key].gasto / segments[key].resultados : 0
    }));
  }, []);

  const filteredCampaigns = useMemo(() => {
    return CAMPAIGN_DATA.filter(c => {
      const matchesFilter = filtroIndicador === 'Todos' || c.indicador === filtroIndicador;
      const matchesSearch = c.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filtroIndicador, searchTerm]);

  return (
    <div className="min-h-screen bg-restaurant-dark text-gray-100 p-6 md:p-10 font-sans selection:bg-restaurant-accent selection:text-restaurant-dark">
      
      {/* Header Corporativo de Alta Fidelidad */}
      <header className="border-b border-restaurant-border pb-6 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="text-restaurant-accent tracking-widest text-xs uppercase font-semibold">Dashboard de Tráfico Publicitario</span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mt-1 tracking-tight">AUTOR CÚCUTA</h1>
          <p className="text-restaurant-muted text-sm mt-2 font-light">Informe General de Rendimiento y Consolidación de Métricas de Campañas</p>
        </div>
        <div className="bg-restaurant-card border border-restaurant-border px-4 py-2.5 rounded-md flex items-center gap-3 self-start md:self-auto">
          <div className="h-2.5 w-2.5 rounded-full bg-restaurant-accent animate-pulse"></div>
          <span className="text-xs uppercase tracking-wider font-medium text-gray-300">Métricas Consolidadas</span>
        </div>
      </header>

      {/* Resumen General Macroeconómico */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-restaurant-card border border-restaurant-border rounded-lg p-5 hover:border-restaurant-accent transition-all duration-300 shadow-xl">
          <div className="flex items-center justify-between text-restaurant-muted mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Importe Gastado Total</span>
            <svg className="w-5 h-5 text-restaurant-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <p className="text-2xl lg:text-3xl font-bold font-serif text-white">{formatCOP(totals.gasto)}</p>
          <div className="h-1 bg-restaurant-border rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-restaurant-accent w-full rounded-full"></div>
          </div>
        </div>

        <div className="bg-restaurant-card border border-restaurant-border rounded-lg p-5 hover:border-restaurant-accent transition-all duration-300 shadow-xl">
          <div className="flex items-center justify-between text-restaurant-muted mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Resultados Globales</span>
            <svg className="w-5 h-5 text-restaurant-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <p className="text-2xl lg:text-3xl font-bold font-serif text-white">{formatNumber(totals.resultados)}</p>
          <span className="text-xs text-restaurant-muted block mt-2">Acciones totales registradas</span>
        </div>

        <div className="bg-restaurant-card border border-restaurant-border rounded-lg p-5 hover:border-restaurant-accent transition-all duration-300 shadow-xl">
          <div className="flex items-center justify-between text-restaurant-muted mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Impresiones Totales</span>
            <svg className="w-5 h-5 text-restaurant-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
          </div>
          <p className="text-2xl lg:text-3xl font-bold font-serif text-white">{formatNumber(totals.impresiones)}</p>
          <span className="text-xs text-restaurant-muted block mt-2">Impactos visuales en pantallas</span>
        </div>

        <div className="bg-restaurant-card border border-restaurant-border rounded-lg p-5 hover:border-restaurant-accent transition-all duration-300 shadow-xl">
          <div className="flex items-center justify-between text-restaurant-muted mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Alcance Único</span>
            <svg className="w-5 h-5 text-restaurant-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <p className="text-2xl lg:text-3xl font-bold font-serif text-white">{formatNumber(totals.alcance)}</p>
          <span className="text-xs text-restaurant-muted block mt-2">Personas únicas alcanzadas</span>
        </div>
      </section>

      {/* Bloque Exclusivo de Desglose de Costo por Resultado Medio y Volumen */}
      <section className="mb-8">
        <h2 className="text-sm uppercase tracking-widest font-semibold text-restaurant-accent mb-4">Rendimiento por Desglose de Objetivo</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {objectiveMetrics.map((om, idx) => {
            let colorTheme = 'border-restaurant-whatsapp';
            let dotColor = 'bg-restaurant-whatsapp';
            if (om.indicador.includes('Perfil')) { colorTheme = 'border-restaurant-instagram'; dotColor = 'bg-restaurant-instagram'; }
            if (om.indicador.includes('Interacción')) { colorTheme = 'border-restaurant-interaction'; dotColor = 'bg-restaurant-interaction'; }

            return (
              <div key={idx} className={`bg-restaurant-card border-l-4 ${colorTheme} border-y border-r border-restaurant-border rounded-r-lg p-5 shadow-lg`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`h-2 w-2 rounded-full ${dotColor}`}></div>
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider">{om.label}</h3>
                </div>
                <div className="space-y-2 mt-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-restaurant-muted">Resultados acumulados:</span>
                    <span className="font-bold text-white text-sm">{formatNumber(om.resultados)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-restaurant-muted">Presupuesto Ejecutado:</span>
                    <span className="font-medium text-gray-300">{formatCOP(om.gasto)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-restaurant-border/60">
                    <span className="text-restaurant-accent font-medium">Costo Medio x Resultado:</span>
                    <span className="font-bold text-restaurant-accent text-sm">{formatCOP(om.costoMedio)}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-restaurant-dark h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${dotColor}`} style={{ width: `${(om.gasto / totals.gasto) * 100}%` }}></div>
                  </div>
                  <span className="text-[10px] text-restaurant-muted mt-1 block text-right">
                    {((om.gasto / totals.gasto) * 100).toFixed(1)}% de participación de inversión
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Controles de Filtrado e Interacción de la Tabla */}
      <section className="bg-restaurant-card border border-restaurant-border rounded-t-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {['Todos', 'Conversaciones a WhatsApp', 'Visitas al Perfil de Instagram', 'Interacción en Publicación'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFiltroIndicador(tab)}
              className={`px-3 py-1.5 rounded text-xs transition-all ${
                filtroIndicador === tab
                  ? 'bg-restaurant-accent text-restaurant-dark font-semibold'
                  : 'bg-restaurant-dark hover:bg-restaurant-border text-gray-300 border border-restaurant-border'
              }`}
            >
              {tab === 'Todos' ? 'Todas las Campañas' : tab}
            </button>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="Filtrar por nombre de campaña..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-restaurant-dark border border-restaurant-border rounded px-3 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-restaurant-accent w-full sm:w-64 placeholder-restaurant-muted"
          />
        </div>
      </section>

      {/* Estructura de Datos Tabular Integral */}
      <section className="bg-restaurant-card border-x border-b border-restaurant-border rounded-b-lg overflow-x-auto shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[950px]">
          <thead>
            <tr className="bg-restaurant-dark/60 text-restaurant-muted uppercase text-[10px] tracking-wider border-b border-restaurant-border">
              <th className="p-4 font-semibold">Nombre de la Campaña</th>
              <th className="p-4 font-semibold text-center">Indicador de Resultado</th>
              <th className="p-4 font-semibold text-right">Resultados</th>
              <th className="p-4 font-semibold text-right">Costo por Resultado</th>
              <th className="p-4 font-semibold text-right">Importe Gastado (COP)</th>
              <th className="p-4 font-semibold text-right">Impresiones</th>
              <th className="p-4 font-semibold text-right">Alcance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-restaurant-border/40 text-xs">
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((c) => {
                let badge = "bg-restaurant-whatsapp/10 text-restaurant-whatsapp";
                if (c.indicador.includes('Perfil')) badge = "bg-restaurant-instagram/10 text-restaurant-instagram";
                if (c.indicador.includes('Interacción')) badge = "bg-restaurant-interaction/10 text-restaurant-interaction";

                return (
                  <tr key={c.id} className="hover:bg-restaurant-dark/40 transition-colors">
                    <td className="p-4 font-medium text-white max-w-[340px] truncate" title={c.nombre}>{c.nombre}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wide inline-block font-medium ${badge}`}>
                        {c.indicador === 'Conversaciones a WhatsApp' ? 'WhatsApp' : c.indicador === 'Visitas al Perfil de Instagram' ? 'Perfil IG' : 'Interacción'}
                      </span>
                    </td>
                    <td className="p-4 text-right font-semibold text-gray-100">{formatNumber(c.resultados)}</td>
                    <td className="p-4 text-right text-restaurant-accent font-medium">{formatCOP(c.costoPorResultado)}</td>
                    <td className="p-4 text-right font-medium text-gray-200">{formatCOP(c.gasto)}</td>
                    <td className="p-4 text-right text-restaurant-muted">{formatNumber(c.impresiones)}</td>
                    <td className="p-4 text-right text-restaurant-muted">{formatNumber(c.alcance)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="p-10 text-center text-restaurant-muted italic">
                  No se registran elementos que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <footer className="mt-10 text-center text-[10px] text-restaurant-muted tracking-wide">
        <p>© 2026 Autor Cúcuta • Cuadro de Mando de Tráfico Digital Exclusivo</p>
      </footer>
    </div>
  );
}
