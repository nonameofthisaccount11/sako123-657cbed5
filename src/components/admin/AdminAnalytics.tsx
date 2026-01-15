import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Eye, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface AnalyticsData {
  totalVisits: number;
  todayVisits: number;
  weeklyVisits: number;
  monthlyVisits: number;
  pageViews: { page_path: string; count: number }[];
  dailyVisits: { date: string; visits: number }[];
  recentVisits: { page_path: string; created_at: string }[];
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', '#10b981', '#6366f1', '#f59e0b'];

export function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const monthStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

      // Fetch all visits
      const { data: allVisits, error: allError } = await supabase
        .from("page_visits")
        .select("*")
        .order("created_at", { ascending: false });

      if (allError) throw allError;

      const visits = allVisits || [];
      
      // Calculate stats
      const todayVisits = visits.filter(v => new Date(v.created_at) >= new Date(todayStart)).length;
      const weeklyVisits = visits.filter(v => new Date(v.created_at) >= new Date(weekStart)).length;
      const monthlyVisits = visits.filter(v => new Date(v.created_at) >= new Date(monthStart)).length;

      // Group by page
      const pageGroups: Record<string, number> = {};
      visits.forEach(v => {
        pageGroups[v.page_path] = (pageGroups[v.page_path] || 0) + 1;
      });
      const pageViews = Object.entries(pageGroups)
        .map(([page_path, count]) => ({ page_path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Daily visits for chart (last 14 days)
      const dailyGroups: Record<string, number> = {};
      for (let i = 13; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split('T')[0];
        dailyGroups[dateStr] = 0;
      }
      visits.forEach(v => {
        const dateStr = new Date(v.created_at).toISOString().split('T')[0];
        if (dailyGroups[dateStr] !== undefined) {
          dailyGroups[dateStr]++;
        }
      });
      const dailyVisits = Object.entries(dailyGroups).map(([date, visits]) => ({
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        visits
      }));

      setData({
        totalVisits: visits.length,
        todayVisits,
        weeklyVisits,
        monthlyVisits,
        pageViews,
        dailyVisits,
        recentVisits: visits.slice(0, 20)
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  if (!data) {
    return <div className="text-center py-8 text-muted-foreground">No analytics data available</div>;
  }

  const stats = [
    { label: "Total Visits", value: data.totalVisits, icon: Eye, color: "text-blue-400", change: "+12%" },
    { label: "Today", value: data.todayVisits, icon: Clock, color: "text-green-400", change: "+5%" },
    { label: "This Week", value: data.weeklyVisits, icon: TrendingUp, color: "text-purple-400", change: "+8%" },
    { label: "This Month", value: data.monthlyVisits, icon: Users, color: "text-amber-400", change: "+15%" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold">Analytics</h2>
        <p className="text-muted-foreground">Track your website's performance and visitor behavior</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div className="flex items-center gap-1 text-sm text-green-400">
                <ArrowUpRight className="w-4 h-4" />
                <span>{stat.change}</span>
              </div>
            </div>
            <span className="text-3xl font-display font-bold">{stat.value}</span>
            <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily Visits Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-display font-semibold mb-6">Daily Visits (Last 14 Days)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.dailyVisits}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Pages Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-display font-semibold mb-6">Top Pages</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.pageViews} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis
                  dataKey="page_path"
                  type="category"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  width={100}
                  tickFormatter={(value) => value.length > 15 ? value.slice(0, 15) + '...' : value}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Page Distribution Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-display font-semibold mb-6">Traffic Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.pageViews.slice(0, 5)}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="page_path"
                  label={({ page_path }) => page_path}
                >
                  {data.pageViews.slice(0, 5).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Visits */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-display font-semibold mb-6">Recent Visits</h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {data.recentVisits.map((visit, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm font-medium">{visit.page_path}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(visit.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
