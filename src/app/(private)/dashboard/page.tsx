import { ChartAreaInteractive } from "@/shared/components/chart-area-interactive"
import { DataTable } from "@/shared/components/data-table"
import { SectionCards } from "@/shared/components/section-cards"
import data from "./data.json"

export default function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <SectionCards />
      <ChartAreaInteractive />
      <DataTable data={data} />
    </div>
  )
}