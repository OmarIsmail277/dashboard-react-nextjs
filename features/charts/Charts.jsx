"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/repositories/productRepository";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#BCE784",
  "#FFB5C2",
  "#5DD39E",
  "#3777FF",
  "#FFE156",
  "#FFBE86",
  "#B2AA8E",
  "#7A306C",
  "#03B5AA",
  "#DBFE87",
];

export default function Charts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setProducts(data);
    })();
  }, []);

  if (!products.length) return <p>Loading charts...</p>;

  // === PIE CHART ===
  const categoryData = Object.values(
    products.reduce((acc, p) => {
      if (!acc[p.category]) acc[p.category] = { name: p.category, value: 0 };
      acc[p.category].value += 1;
      return acc;
    }, {})
  );

  // === BAR CHART === (Average price per category)
  const barData = Object.values(
    products.reduce((acc, p) => {
      if (!acc[p.category])
        acc[p.category] = { category: p.category, total: 0, count: 0 };
      acc[p.category].total += p.price;
      acc[p.category].count += 1;
      return acc;
    }, {})
  ).map((d) => ({
    category: d.category,
    avgPrice: +(d.total / d.count).toFixed(2),
  }));

  // === LINE CHART === (Products count over time)
  const lineData = Object.values(
    products.reduce((acc, p) => {
      const date = new Date(p.date_added).toLocaleDateString("en-GB");
      if (!acc[date]) acc[date] = { date, count: 0 };
      acc[date].count += 1;
      return acc;
    }, {})
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* PIE CHART */}
      <div className="p-6 rounded-2xl bg-zinc-900 shadow-md">
        <h3 className="text-xl mb-4 text-white text-center">
          Products by Category
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="p-6 rounded-2xl bg-zinc-900 shadow-md">
        <h3 className="text-xl mb-4 text-white text-center">
          Average Price per Category
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="category"
              angle={-40}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgPrice" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* LINE CHART */}
      <div className="p-6 rounded-2xl bg-zinc-900 shadow-md md:col-span-2">
        <h3 className="text-xl mb-4 text-white text-center">
          Products Added Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#FF8042" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
