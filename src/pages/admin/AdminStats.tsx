import { useEffect, useState } from 'react';
import { MousePointerClick, TrendingUp, Calendar, Award, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabaseAdmin } from '../../lib/supabase';
import { getPageLabel } from '../../lib/trackClick';

type ClickRow = {
  id: string;
  created_at: string;
  page: string;
  button_label: string;
};

type PageStat = { page: string; label: string; count: number };
type DayStat = { date: string; count: number };

const PLANITY_URL = 'https://www.planity.com/soleana-bien-etre-31810-venerque';

function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-6 flex items-start gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${accent ?? 'bg-nude-50'}`}>
        <Icon size={20} className={accent ? 'text-white' : 'text-nude-600'} />
      </div>
      <div>
        <p className="text-xs text-stone-400 font-medium uppercase tracking-wider mb-1">{label}</p>
        <p className="text-3xl font-serif font-light text-stone-800 leading-none">{value}</p>
        {sub && <p className="text-xs text-stone-400 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

function BarChart({ data, max }: { data: PageStat[]; max: number }) {
  const colors = [
    'bg-nude-500', 'bg-sage-500', 'bg-ecru-400', 'bg-stone-400',
    'bg-nude-300', 'bg-sage-300', 'bg-ecru-300', 'bg-stone-300',
  ];
  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <div key={d.page} className="flex items-center gap-3">
          <span className="text-xs text-stone-500 w-44 truncate shrink-0 text-right">{d.label}</span>
          <div className="flex-1 h-7 bg-stone-50 rounded-lg overflow-hidden">
            <div
              className={`h-full rounded-lg transition-all duration-700 ${colors[i % colors.length]} flex items-center justify-end pr-2`}
              style={{ width: max > 0 ? `${Math.max(4, (d.count / max) * 100)}%` : '4%' }}
            >
              <span className="text-xs font-semibold text-white">{d.count}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SparkLine({ data }: { data: DayStat[] }) {
  if (data.length === 0) return null;
  const maxVal = Math.max(...data.map((d) => d.count), 1);
  const W = 600;
  const H = 80;
  const pad = 4;
  const step = (W - pad * 2) / Math.max(data.length - 1, 1);

  const points = data.map((d, i) => ({
    x: pad + i * step,
    y: H - pad - ((d.count / maxVal) * (H - pad * 2)),
  }));

  const polyline = points.map((p) => `${p.x},${p.y}`).join(' ');
  const area = `${points[0].x},${H} ` + polyline + ` ${points[points.length - 1].x},${H}`;

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c4a882" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#c4a882" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#sparkGrad)" />
        <polyline points={polyline} fill="none" stroke="#c4a882" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {points.map((p, i) => (
          data[i].count > 0 && (
            <circle key={i} cx={p.x} cy={p.y} r="3" fill="#c4a882" />
          )
        ))}
      </svg>
      <div className="flex justify-between text-[10px] text-stone-400 mt-1 px-1">
        <span>{data[0]?.date}</span>
        <span>{data[data.length - 1]?.date}</span>
      </div>
    </div>
  );
}

export default function AdminStats() {
  const [clicks, setClicks] = useState<ClickRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  async function load() {
    setLoading(true);
    const { data } = await supabaseAdmin
      .from('cta_clicks')
      .select('*')
      .order('created_at', { ascending: false });
    setClicks(data ?? []);
    setLastRefresh(new Date());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const total = clicks.length;
  const today = clicks.filter((c) => c.created_at.startsWith(todayStr)).length;
  const thisWeek = clicks.filter((c) => new Date(c.created_at) >= weekAgo).length;

  const byPage: Record<string, number> = {};
  for (const c of clicks) {
    byPage[c.page] = (byPage[c.page] ?? 0) + 1;
  }
  const pageStats: PageStat[] = Object.entries(byPage)
    .map(([page, count]) => ({ page, label: getPageLabel(page), count }))
    .sort((a, b) => b.count - a.count);
  const topPage = pageStats[0]?.label ?? '—';
  const maxCount = pageStats[0]?.count ?? 1;

  const last30: DayStat[] = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(now.getTime() - (29 - i) * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split('T')[0];
    const short = d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
    return {
      date: short,
      count: clicks.filter((c) => c.created_at.startsWith(dateStr)).length,
    };
  });

  const recent = clicks.slice(0, 15);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-stone-800 font-light">Statistiques Planity</h1>
          <p className="text-stone-400 text-sm mt-1">
            Clics vers la réservation en ligne ·{' '}
            <a href={PLANITY_URL} target="_blank" rel="noopener noreferrer" className="text-nude-600 hover:underline">
              planity.com
            </a>
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 text-sm text-stone-600 hover:bg-stone-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Actualiser
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard icon={MousePointerClick} label="Total clics" value={total} sub="depuis le début" accent="bg-nude-600" />
        <KpiCard icon={Calendar} label="Aujourd'hui" value={today} sub={todayStr} />
        <KpiCard icon={TrendingUp} label="Cette semaine" value={thisWeek} sub="7 derniers jours" />
        <KpiCard icon={Award} label="Page #1" value={topPage} sub={pageStats[0] ? `${pageStats[0].count} clics` : undefined} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Courbe 30 jours */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6">
          <h2 className="font-sans text-sm font-semibold text-stone-700 uppercase tracking-wider mb-5">
            Activité — 30 derniers jours
          </h2>
          {loading ? (
            <div className="h-20 bg-stone-50 rounded-xl animate-pulse" />
          ) : total === 0 ? (
            <p className="text-stone-400 text-sm text-center py-8">Aucune donnée pour l'instant</p>
          ) : (
            <SparkLine data={last30} />
          )}
        </div>

        {/* Répartition par page */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6">
          <h2 className="font-sans text-sm font-semibold text-stone-700 uppercase tracking-wider mb-5">
            Clics par page
          </h2>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-7 bg-stone-50 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : pageStats.length === 0 ? (
            <p className="text-stone-400 text-sm text-center py-8">Aucune donnée pour l'instant</p>
          ) : (
            <BarChart data={pageStats} max={maxCount} />
          )}
        </div>
      </div>

      {/* Derniers clics */}
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100">
          <h2 className="font-sans text-sm font-semibold text-stone-700 uppercase tracking-wider">
            Derniers clics
          </h2>
        </div>
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-stone-50 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="p-12 text-center">
            <MousePointerClick size={32} className="text-stone-200 mx-auto mb-3" />
            <p className="text-stone-400 text-sm">Aucun clic enregistré pour l'instant.</p>
            <p className="text-stone-300 text-xs mt-1">Les données apparaîtront dès le premier clic sur un bouton Planity.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="text-left text-xs font-medium text-stone-500 px-6 py-3 uppercase tracking-wider">Date & heure</th>
                <th className="text-left text-xs font-medium text-stone-500 px-6 py-3 uppercase tracking-wider hidden sm:table-cell">Page</th>
                <th className="text-left text-xs font-medium text-stone-500 px-6 py-3 uppercase tracking-wider hidden md:table-cell">Bouton cliqué</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {recent.map((c) => {
                const d = new Date(c.created_at);
                return (
                  <tr key={c.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-6 py-3">
                      <p className="text-sm text-stone-800">
                        {d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </p>
                      <p className="text-xs text-stone-400">
                        {d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </td>
                    <td className="px-6 py-3 hidden sm:table-cell">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-nude-50 text-nude-700">
                        {getPageLabel(c.page)}
                      </span>
                    </td>
                    <td className="px-6 py-3 hidden md:table-cell">
                      <span className="text-xs text-stone-500 italic line-clamp-1">{c.button_label || '—'}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-stone-400 text-right mt-3">
        Dernière mise à jour : {lastRefresh.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </p>
    </AdminLayout>
  );
}
