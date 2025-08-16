"use client";

import { DataTable } from "@/shared/components/data-table";
import { ToggleData } from "../model/types";
import { createColumns } from "../model/columns";

interface ToggleTableProps {
    data?: ToggleData[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    onPageChange?: (page: number) => void;
    onEdit?: (data: ToggleData) => void;
    onDuplicate?: (data: ToggleData) => void;
    onDelete?: (data: ToggleData) => void;
}

export default function ToggleTable({ data, pagination, onPageChange, onEdit, onDuplicate, onDelete }: ToggleTableProps){
    const columns = createColumns({ onEdit, onDuplicate, onDelete });
    return <DataTable<ToggleData> data={data || []} columns={columns} pagination={pagination} onPageChange={onPageChange} />
}