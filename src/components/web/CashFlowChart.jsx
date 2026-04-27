import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CashFlowChart = () => {
  // Mock data for last 6 months
  const data = [
    { month: 'Aug', revenue: 45000, expenses: 28000 },
    { month: 'Sep', revenue: 52000, expenses: 30500 },
    { month: 'Oct', revenue: 48000, expenses: 29000 },
    { month: 'Nov', revenue: 61000, expenses: 32000 },
    { month: 'Dec', revenue: 55000, expenses: 31500 },
    { month: 'Jan', revenue: 67000, expenses: 34000 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-slate-800">
            {payload[0].payload.month}
          </p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="text-sm font-medium"
              style={{ color: entry.color }}
            >
              {entry.name}: ₱{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            {/* Gradient for Revenue (RAFI Blue) */}
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>

            {/* Gradient for Expenses (Slate Gray) */}
            <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            stroke="#94a3b8"
            style={{ fontSize: '12px', fontWeight: 500 }}
          />
          <YAxis
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `₱${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#revenueGradient)"
            name="Revenue"
            isAnimationActive={true}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#94a3b8"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#expensesGradient)"
            name="Expenses"
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex justify-center gap-8 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span className="font-medium text-slate-700">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
          <span className="font-medium text-slate-700">Expenses</span>
        </div>
      </div>
    </div>
  );
};

export default CashFlowChart;
