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
const chartData = [
  { month: "January", documents: 186 },
  { month: "February", documents: 305 },
  { month: "March", documents: 237 },
  { month: "April", documents: 73 },
  { month: "May", documents: 209 },
  { month: "June", documents: 214 },
  { month: "July", documents: 4 },
  { month: "August", documents: 24 },
  { month: "September", documents: 664 },
  { month: "October", documents: 104 },
  { month: "November", documents: 100 },
  { month: "December", documents: 291 },
];

const chartConfig = {
  documents: {
    label: "Documents",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BarChartDocs() {
  return (
    <Card className="flex flex-col mt-5 w-[500px] h-fit">
      <CardHeader>
        <CardTitle>Documents Upload Data</CardTitle>
        <CardDescription>January - December </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium text-sm leading-none">
          Upload rate up by 5.2% this month <TrendingUp className="w-4 h-4" />
        </div>
      </CardFooter>
    </Card>
  );
}