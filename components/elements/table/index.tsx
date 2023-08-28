import { cn } from "@/lib";
import s from "./index.module.css";

export default function Table({ data }: { data: Record<string, any>[] }) {
  return (
    <div className="border-2 rounded-lg">
      <table className={cn(s.feedingTable)}>
        <thead>
          <tr>
            {data &&
              data.length > 0 &&
              Object.keys(data[0]).map((key, id) => (
                <th
                  key={`table_heading_${key}_${id}`}
                  className={cn(s.feedingTableHeading)}
                >
                  {key.replace(/_/g, " ")}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowId) => (
            <tr key={`table_row_${rowId}`} className={cn(s.feedingTableRow)}>
              {Object.keys(row).map((rowKey, id) => (
                <td
                  key={`table_row_${rowId}_${rowKey}_${id}`}
                  className={cn(s.feedingTableColumn)}
                >
                  {typeof row[rowKey] === "function"
                    ? row[rowKey]({ row })
                    : row[rowKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
