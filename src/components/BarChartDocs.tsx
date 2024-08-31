"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";


const chartConfig = {
  documents: {
    label: "Documents",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BarChartDocs() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/chart");
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <Card className="flex flex-col mt-10 p-2 w-[500px] h-[400px]">
      <CardHeader>
        <CardTitle>Documents Upload Data</CardTitle>
        <CardDescription>January - December {new Date().getFullYear()} </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 25,
              
            }}
            barSize={20}
            barCategoryGap={1}
            barGap={0.5}
            maxBarSize={40}
            stackOffset="sign"
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="documents" fill="var(--color-documents)" radius={1}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  );
}