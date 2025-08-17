import { DataTableRow } from "@/shared/components/data-table";

export type ToggleData = DataTableRow & {
  id: string;
  key: string;
  name: string;
  description: string | null;
  value: string | number | boolean | Record<string, unknown>;
  type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy?: string | null;
  user: {
    name: string | null;
    email: string | null;
  };
  updatedByUser?: {
    name: string | null;
    email: string | null;
  } | null;
  update?: string; // Optional for backward compatibility
};

export type CreateToggleData = {
  name: string;
  description: string;
  value: string;
  type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON'
};

export type ToggleFormMode = 'create' | 'edit';