import { Card, Skeleton } from "@nextui-org/react";
import { LineChart, Title } from "@tremor/react";

const valueFormatter = (number) => `$ ${number}`;

export const SellsThisWeek = ({ totalSalesPerDay }) => {
	return (
		<Card className="w-full transition p-4" decorationColor="blue">
			<Title>Ventas esta semana por dia</Title>
			{!totalSalesPerDay && (
				<Skeleton className="mt-4 rounded-lg">
					<div className="h-72 w-full rounded-lg bg-default-200"></div>
				</Skeleton>
			)}
			{totalSalesPerDay && (
				<LineChart
					className="mt-6"
					data={Object.entries(totalSalesPerDay).map(([date, total]) => ({
						date,
						total,
					}))}
					index="date"
					categories={["total"]}
					colors={["emerald"]}
					valueFormatter={valueFormatter}
					yAxisWidth={40}
				/>
			)}
		</Card>
	);
};
