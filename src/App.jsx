import React, { useState } from 'react';
import { 
  Target, 
  Users, 
  DollarSign, 
  Zap, 
  MessageCircle, 
  Info, 
} from 'lucide-react';

// --- DATA FROM CSV CON ANÁLISIS EXPERTO MANUAL ---
const rawData = [
  {
    name: "Ahora en AutoR tus momentos se vuelven inolvidables al instante",
    budget: 200000,
    results: 47,
    indicator: "Conversaciones a WhatsApp",
    reach: 13077,
    impressions: 24454,
    cpr: 4254,
    spent: 199975,
    image: "🥂",
    analysis: {
      verdict: "⚠️ ÁNGULO MUY AMPLIO",
      insight: "La promesa 'momentos inolvidables' es un cliché en restauración. Al no haber un gancho específico (un plato, un precio o una fecha), el usuario no siente urgencia. El CPR de $4,200 indica que se compite por atención sin una oferta clara.",
      action: "Cambiar el copy a situaciones específicas: 'Celebra tu Aniversario aquí'. Segmentar por 'Aniversario en los próximos 30 días'."
    }
  },
  {
    name: "Historia Cumpleaños 8/10/2025",
    budget: 100000,
    results: 28,
    indicator: "Conversaciones a WhatsApp",
    reach: 9089,
    impressions: 18436,
    cpr: 3570,
    spent: 99964,
    image: "🎂",
    analysis: {
      verdict: "⚖️ NICHO COSTOSO",
      insight: "Aunque el ángulo es bueno (cumpleaños), el costo es alto ($3,570) para una Historia. Probablemente la segmentación fue muy abierta y se mostró el anuncio a gente que no cumplía años en octubre.",
      action: "Usar la segmentación nativa de Meta: 'Amigos de personas que cumplen años en 0-7 días' o 'Cumpleaños en el mes actual'."
    }
  },
  {
    name: "Historia Menú Domingos",
    budget: 150000,
    results: 30,
    indicator: "Conversaciones a WhatsApp",
    reach: 10352,
    impressions: 26549,
    cpr: 4991,
    spent: 149759,
    image: "🍛",
    analysis: {
      verdict: "❌ FATIGA DE FRECUENCIA",
      insight: "Fíjese en las impresiones vs alcance (2.6x de frecuencia). Se mostró el anuncio casi 3 veces a la misma gente y no compraron. El domingo es un día de decisión rápida; si no convierten a la primera, no lo harán a la tercera.",
      action: "Limitar la campaña a correr solo Viernes, Sábado y Domingo (Dayparting). Cambiar la foto del plato cada semana."
    }
  },
  {
    name: "Hay momentos que merecen celebrarse con sabor, estilo y emoción.",
    budget: 150000,
    results: 19,
    indicator: "Conversaciones a WhatsApp",
    reach: 6356,
    impressions: 14071,
    cpr: 7870,
    spent: 149533,
    image: "✨",
    analysis: {
      verdict: "🎯 OBJETIVO DESALINEADO",
      insight: "El título vende una experiencia sensorial ('celebrar', 'emoción'), no un producto de urgencia. Al configurar la campaña con objetivo 'Mensajes', forzamos una venta dura sobre un contenido inspiracional. El costo alto ($7,870) no es fallo del anuncio, es fallo de solicitar la métrica equivocada.",
      action: "Cambiar el objetivo de la campaña a 'Reconocimiento'. Dejar que el anuncio atraiga curiosos, y que el perfil se encargue de cerrar la venta después."
    }
  },
  {
    name: "Tu antojo de autor llega hasta tu puerta.",
    budget: 250000,
    results: 36,
    indicator: "Conversaciones a WhatsApp",
    reach: 9425,
    impressions: 15032,
    cpr: 2953,
    spent: 106331,
    image: "🛵",
    analysis: {
      verdict: "✅ CONVENIENCIA",
      insight: "El delivery tiene menos fricción psicológica que ir al restaurante. Un CPR de $2,900 es saludable. Funciona porque resuelve un problema inmediato ('tengo hambre, no quiero salir').",
      action: "Activar pauta meteorológica: Aumentar presupuesto un 50% los días que llueve en Cúcuta. El delivery explota con lluvia."
    }
  },
  {
    name: "Somos AutoR ✍️ 🔥",
    budget: 175000,
    results: 43,
    indicator: "Visitas al Perfil",
    reach: 1254,
    impressions: 1331,
    cpr: 90, 
    spent: 3883,
    image: "🔥",
    analysis: {
      verdict: "🚀 TRÁFICO BARATO",
      insight: "Ojo aquí: $90 pesos por visita es regalado. Se está llenando el perfil de gente interesada por casi nada. Esta campaña es la gasolina para las campañas de retargeting.",
      action: "Mantener 'Always On' con presupuesto bajo ($5k/día). Crear Público Personalizado de 'Visitantes al perfil 30 días' y vender la cena allí."
    }
  },
  {
    name: "Descubre nuestros menús diseñados para compartir",
    budget: 350000,
    results: 97,
    indicator: "Conversaciones a WhatsApp",
    reach: 20305,
    impressions: 40430,
    cpr: 3603,
    spent: 349498,
    image: "🥗",
    analysis: {
      verdict: "⚖️ TICKET ALTO",
      insight: "Al hablar de 'compartir', el ticket promedio sube. Un CPR de $3,600 es aceptable si vienen grupos de 4 personas. El costo sube porque coordinar un grupo es más difícil que ir solo.",
      action: "Enfocar el copy al organizador del grupo: 'Queda bien con su equipo/familia'. Probar botón 'Reservar Mesa' en lugar de WhatsApp."
    }
  },
  {
    name: "Reuniones que se disfrutan mejor con buena comida",
    budget: 350000,
    results: 66,
    indicator: "Conversaciones a WhatsApp",
    reach: 26855,
    impressions: 57153,
    cpr: 5298,
    spent: 349704,
    image: "🤝",
    analysis: {
      verdict: "👥 ESTRATEGIA SOCIAL",
      insight: "El título apunta a 'Reuniones' y grupos. Esta es una decisión social que requiere consultar con otros, no una compra impulsiva individual. Pedir un WhatsApp directo ante un evento eleva el costo ($5,298).",
      action: "Cambiar el objetivo a 'Interacción' (Comentarios/Compartir). Los resultados aquí no son el chat, es que la gente etiquete al jefe o a los amigos en los comentarios para organizar el plan. Eso da alcance viral gratuito."
    }
  },
  {
    name: "Mini carta (Adelanto disponible 13 nov - 30 dic)",
    budget: 150000,
    results: 73,
    indicator: "Conversaciones a WhatsApp",
    reach: 10474,
    impressions: 18850,
    cpr: 2054,
    spent: 149943,
    image: "📜",
    analysis: {
      verdict: "💎 EFECTO FOMO",
      insight: "El mejor ejemplo de psicología de consumo. Al poner fecha límite (30 dic), se activó el sesgo de escasez (FOMO). La gente actuó rápido ($2,054) por miedo a perderse la novedad.",
      action: "REPLICAR MENSUALMENTE. Crear la 'Semana del Chef' o 'Plato Fantasma' (solo disponible 3 días). La urgencia vende."
    }
  },
  {
    name: "Desde hoy puedes disfrutar nuestro menú especial",
    budget: 150000,
    results: 55,
    indicator: "Conversaciones a WhatsApp",
    reach: 13423,
    impressions: 24462,
    cpr: 2724,
    spent: 149835,
    image: "🍽️",
    analysis: {
      verdict: "✅ CONSTANCIA",
      insight: "Un CPR sólido ($2,724). La palabra 'Hoy' y 'Especial' funcionan bien juntas. Es una campaña estable que sostiene la facturación diaria sin grandes picos ni caídas.",
      action: "Usar esta estructura para días flojos (Martes/Miércoles). 'Solo por hoy miércoles: Menú especial'."
    }
  },
  {
    name: "Nuevos platos, nuevos antojos",
    budget: 250000,
    results: 103,
    indicator: "Conversaciones a WhatsApp",
    reach: 15110,
    impressions: 30409,
    cpr: 2426,
    spent: 249932,
    image: "😋",
    analysis: {
      verdict: "💎 NOVEDAD",
      insight: "El cerebro humano busca novedad y dopamina. CPR excelente ($2,426) con alto volumen (103 chats). Las fotos de comida 'porn food' (primer plano) suelen ser las responsables aquí.",
      action: "Rotación creativa obligatoria. Una vez el cliente ve el plato nuevo, deja de ser nuevo. Lanzar fotos nuevas cada 10 días."
    }
  },
  {
    name: "Prepárate para el primer all you can drink wine de Cúcuta",
    budget: 200000,
    results: 155,
    indicator: "Conversaciones a WhatsApp",
    reach: 20753,
    impressions: 34027,
    cpr: 1287,
    spent: 199500,
    image: "🍷",
    analysis: {
      verdict: "🦄 EL UNICORNIO",
      insight: "Esto es una Masterclass. CPR ridículamente bajo ($1,287). ¿Por qué? 1. Propuesta de Valor Irresistible (Ilimitado). 2. Primicia ('El primero en Cúcuta'). 3. Nicho aspiracional (Vino). Rompió el mercado.",
      action: "ESCALAR AGRESIVAMENTE. Crear franquicia de eventos: 'All you can Gin', 'Noche de Tapas Ilimitadas'. Asignar el 40% del presupuesto aquí."
    }
  }
];

// --- STYLES & CONSTANTS ---
const THEME = {
  primary: '#284438',    // Deep Emerald Green
  primaryDark: '#1B2E26',
  gold: '#C8A764',       // Classic Gold
  goldLight: '#E8D4A6',
  bg: '#121212',         // Almost black
  cardBg: 'rgba(255, 255, 255, 0.05)', // Glass effect
  text: '#F9F9F7',
};

const formatCurrency = (val) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
};

// --- HELPER COMPONENTS ---

const Tooltip = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative inline-block ml-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-white opacity-50 hover:opacity-100 hover:text-yellow-400 transition-all"
      >
        <Info size={16} />
      </button>
      {isOpen && (
        <div className="absolute z-50 w-64 p-4 mt-2 -ml-28 bg-white text-gray-800 text-xs rounded-lg shadow-2xl border-l-4 border-yellow-500 animate-fade-in">
          <p className="font-bold mb-1 uppercase text-yellow-700">{title}</p>
          <p>{content}</p>
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-1 right-2 text-gray-400 font-bold text-lg"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

const LuxuryCard = ({ children, className = "" }) => (
  <div 
    className={`rounded-2xl backdrop-blur-md border border-white border-opacity-10 ${className}`}
    style={{ backgroundColor: THEME.cardBg }}
  >
    {children}
  </div>
);

// --- MAIN COMPONENTS ---

const KpiCard = ({ icon: Icon, title, value, explanation, trend }) => (
  <LuxuryCard className="p-6 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
    
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-700 to-yellow-900 text-white shadow-lg">
        <Icon size={24} />
      </div>
      {trend && (
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${trend === 'good' ? 'bg-green-500 bg-opacity-20 text-green-300' : 'bg-red-500 bg-opacity-20 text-red-300'}`}>
          {trend === 'good' ? 'Excelente' : 'Atención'}
        </span>
      )}
    </div>
    
    <div className="flex items-center">
      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">{title}</h3>
      <Tooltip title={title} content={explanation} />
    </div>
    
    <p className="text-2xl md:text-3xl font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">
      {value}
    </p>
  </LuxuryCard>
);

const CampaignCard = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false);
  const isEfficient = data.cpr < 3000;
  const isExpensive = data.cpr > 5000;
  
  return (
    <LuxuryCard className="mb-6 hover:border-yellow-500/30 transition-all duration-300">
      <div 
        className="p-5 md:p-6 cursor-pointer"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl flex-shrink-0">
            {data.image}
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${isEfficient ? 'border-green-500 text-green-400' : isExpensive ? 'border-purple-500 text-purple-400' : 'border-yellow-500 text-yellow-400'}`}>
                {data.analysis.verdict}
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider border border-gray-700 px-2 py-0.5 rounded">
                {data.indicator.includes("WhatsApp") ? "Mensajes" : "Visitas Perfil"}
              </span>
            </div>
            <h3 className="text-lg font-medium text-white leading-tight">{data.name}</h3>
          </div>

          <div className="text-left md:text-right mt-2 md:mt-0 w-full md:w-auto bg-black/20 md:bg-transparent p-3 md:p-0 rounded-lg">
            <p className="text-xs text-gray-400 uppercase">Costo por Cliente</p>
            <p className={`text-xl font-bold font-mono ${isEfficient ? 'text-green-400' : isExpensive ? 'text-purple-400' : 'text-yellow-400'}`}>
              {formatCurrency(data.cpr)}
            </p>
            <p className="text-[10px] text-gray-500 mt-1">
              (Lo que se pagó por cada chat)
            </p>
          </div>
        </div>
      </div>

      {/* Details (Acordeón) */}
      {showDetails && (
        <div className="border-t border-white/5 bg-black/20 p-5 md:p-6 animate-fade-in-down">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-yellow-500 text-sm font-bold mb-3 flex items-center gap-2">
                <Target size={16} /> Métricas Clave
              </h4>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                  <span className="text-gray-400">Resultados:</span>
                  <span className="text-white font-bold">{data.results}</span>
                </li>
                <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                  <span className="text-gray-400 flex items-center gap-1">
                    Inversión:
                  </span>
                  <span className="text-white font-bold">{formatCurrency(data.spent)}</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 flex items-center gap-1">
                    Alcance:
                  </span>
                  <span className="text-white font-bold">{data.reach.toLocaleString()}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <h4 className="text-yellow-500 text-sm font-bold mb-2 flex items-center gap-2">
                <MessageCircle size={16} /> Análisis del Trafficker
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">
                "{data.analysis.insight}"
              </p>
              
              <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                <p className="text-xs text-yellow-200 font-bold uppercase mb-1">Estrategia sugerida:</p>
                <p className="text-xs text-gray-300 font-medium">
                  {data.analysis.action}
                </p>
              </div>
            </div>
          </div>

        </div>
      )}
    </LuxuryCard>
  );
};

export default function App() {
  const [filter, setFilter] = useState('all'); 

  // Totals
  const totalSpent = rawData.reduce((acc, curr) => acc + curr.spent, 0);
  const totalResults = rawData.reduce((acc, curr) => acc + curr.results, 0);
  const avgCPR = totalSpent / totalResults;
  const totalReach = rawData.reduce((acc, curr) => acc + curr.reach, 0);

  const filteredData = rawData.filter(item => {
    if (filter === 'winners') return item.cpr < 3500;
    if (filter === 'losers') return item.cpr >= 3500;
    return true;
  }).sort((a, b) => a.cpr - b.cpr);

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: THEME.primary, color: THEME.text }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          body { font-family: 'Poppins', sans-serif; }
          .animate-fade-in { animation: fadeIn 0.3s ease-in-out; }
          .animate-fade-in-down { animation: fadeInDown 0.3s ease-in-out; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
          
          /* Custom Scrollbar */
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #1B2E26; }
          ::-webkit-scrollbar-thumb { background: #C8A764; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #E8D4A6; }
        `}
      </style>
      
      {/* Top Bar - Mobile Optimized */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl border-b border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-black font-bold text-xl shadow-[0_0_15px_rgba(200,167,100,0.5)]">
              A
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">AUTOR</h1>
              <p className="text-[10px] text-yellow-500 tracking-[0.2em] uppercase">Informe Exclusivo</p>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 pb-20">
        
        {/* Hero Section */}
        <div className="mb-12 text-center relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-white">
            Resultados Trimestrales
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Hemos analizado dónde se fue cada peso de la inversión. Aquí mostramos qué funcionó de maravilla y qué se debe apagar para febrero.
          </p>
        </div>

        {/* KPI Grid - Mobile: Stacked, Desktop: 4 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <KpiCard 
            icon={DollarSign} 
            title="Dinero Invertido" 
            value={formatCurrency(totalSpent)} 
            explanation="Es la suma total de lo que se pagó a Meta (Facebook/Instagram) durante estos 3 meses por todos los anuncios."
          />
          <KpiCard 
            icon={MessageCircle} 
            title="Clientes Interesados" 
            value={totalResults} 
            trend="good"
            explanation="Número total de personas que hicieron clic y llegaron al WhatsApp o visitaron el perfil. ¡Son leads calientes!"
          />
          <KpiCard 
            icon={Users} 
            title="Personas Alcanzadas" 
            value={totalReach.toLocaleString()} 
            explanation="La cantidad de gente ÚNICA que vio la marca. Si una persona lo ve 10 veces, cuenta como 1 persona alcanzada."
          />
          <KpiCard 
            icon={Target} 
            title="Costo Promedio" 
            value={formatCurrency(avgCPR)} 
            trend={avgCPR < 3500 ? 'good' : 'bad'}
            explanation="En promedio, esto es lo que le cuesta a la empresa que 1 persona escriba. Si baja, es mejor (más barato). Si sube, es peor."
          />
        </div>

        {/* Strategy Section */}
        <div className="mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-3xl opacity-20 blur-xl"></div>
          <LuxuryCard className="p-8 md:p-12 relative border-yellow-500/30">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-yellow-500 text-black px-3 py-1 rounded text-xs font-bold uppercase">Estrategia Empresarial 2026</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                  El secreto fue la <span className="text-yellow-400">"Escasez"</span>
                </h3>
                <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
                  Analizando los datos, descubrimos algo importante: <br/><br/>
                  Cuando publicamos anuncios "bonitos" de marca ("Momentos inolvidables"), la gente los ignora y salen caros ($4,200+). 
                  <br/><br/>
                  Pero cuando publicamos <strong>Eventos o Promociones Limitadas</strong> ("All you can drink" o "Mini carta por días"), la gente corre a escribirte y sale baratísimo ($1,200).
                </p>
                
                <div className="bg-black/30 p-4 rounded-xl border-l-4 border-yellow-500">
                  <p className="text-yellow-100 font-medium text-sm">
                    🚀 <strong>Plan de Acción para Febrero:</strong> Dejemos de vender "comida" y empecemos a vender "eventos exclusivos". La gente quiere sentir que se pierde de algo si no va.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-yellow-500/20 to-transparent border border-yellow-500/30 flex flex-col items-center justify-center text-center p-6">
                  <Zap size={48} className="text-yellow-400 mb-4" />
                  <p className="text-white font-bold text-lg">Potencial de Ahorro</p>
                  <p className="text-3xl font-bold text-green-400 my-2">40%</p>
                  <p className="text-xs text-gray-400">Si se aplica esta estrategia, se podría reducir el gasto publicitario casi a la mitad manteniendo los mismos resultados.</p>
                </div>
              </div>
            </div>
          </LuxuryCard>
        </div>

        {/* Ads Breakdown */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center border-b border-white/10 pb-4">
            <div>
              <h3 className="text-2xl font-bold text-white">Análisis de Anuncios</h3>
              <p className="text-sm text-gray-500 mt-1">Toque cualquier tarjeta para ver el detalle</p>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0 bg-black/20 p-1 rounded-lg">
              <button 
                onClick={() => setFilter('all')}
                className={`flex-1 md:flex-none px-4 py-2 text-xs font-medium rounded-md transition-all ${filter === 'all' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
              >
                Todos
              </button>
              <button 
                onClick={() => setFilter('winners')}
                className={`flex-1 md:flex-none px-4 py-2 text-xs font-medium rounded-md transition-all ${filter === 'winners' ? 'bg-green-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'text-gray-400 hover:text-green-400'}`}
              >
                Los Mejores
              </button>
              <button 
                onClick={() => setFilter('losers')}
                className={`flex-1 md:flex-none px-4 py-2 text-xs font-medium rounded-md transition-all ${filter === 'losers' ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'text-gray-400 hover:text-red-400'}`}
              >
                Por Mejorar
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredData.map((campaign, index) => (
              <CampaignCard key={index} data={campaign} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/5 py-10 text-center">
          <p className="text-yellow-500 font-bold tracking-widest text-xs uppercase mb-2">Informe Privado</p>
          <p className="text-gray-600 text-sm">Creado exclusivamente para la dirección de Autor.</p>
        </footer>

      </main>
    </div>
  );
}
