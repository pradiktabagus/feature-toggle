import { ColumnDef } from "@tanstack/react-table";
import { ToggleData } from "./types";
import ToggleAction from "../ui/toggle-action";
import { Switch } from "@/shared/components/ui/switch";
import { Badge } from "@/shared/components/ui/badge";
import { useState } from "react";
import JsonViewerModal from "../ui/json-viewer-modal";
import { useUpdateToggleStatus } from "@/entities/toggle/model/use-toggles";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StatusCell({ row }: { row: any }) {
    const { isActive, id, name } = row.original;
    const updateStatus = useUpdateToggleStatus();
    const [showConfirm, setShowConfirm] = useState(false);
    
    const handleToggle = () => {
        updateStatus.mutate({ id, isActive: !isActive });
        setShowConfirm(false);
    };
    
    return (
        <div className="flex items-center gap-2">
            <Switch 
                checked={isActive} 
                disabled={updateStatus.isPending}
                className={isActive 
                    ? "data-[state=checked]:bg-emerald-700 dark:data-[state=checked]:bg-emerald-600" 
                    : "data-[state=unchecked]:bg-slate-600 dark:data-[state=unchecked]:bg-slate-500"
                }
                onClick={() => setShowConfirm(true)}
            />
            <Badge variant={isActive ? "default" : "secondary"}>
                {isActive ? 'Active' : 'Inactive'}
            </Badge>
            <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to {isActive ? 'deactivate' : 'activate'} the toggle &quot;{name}&quot;?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleToggle}>
                            {isActive ? 'Deactivate' : 'Activate'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ValueCell({ row }: { row: any }) {
    const { value, type } = row.original;
    const [showJsonModal, setShowJsonModal] = useState(false);
    
    switch (type) {
        case 'BOOLEAN':
            const boolValue = value === 'true' || value === true;
            return (
                <div className="flex items-center gap-2">
                    <Switch checked={boolValue} disabled />
                    <Badge variant={boolValue ? "default" : "secondary"}>
                        {boolValue ? 'True' : 'False'}
                    </Badge>
                </div>
            );
        case 'JSON':
            const jsonValue = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
            return (
                <>
                    <div className="w-32 md:w-64">
                        <pre 
                            className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded max-h-20 overflow-hidden relative cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setShowJsonModal(true)}
                            title="Click to view full JSON"
                        >
                            <div className="line-clamp-3">{jsonValue}</div>
                            {jsonValue.length > 100 && (
                                <div className="absolute bottom-0 right-0 bg-gradient-to-l from-gray-100 dark:from-gray-800 to-transparent px-2 text-gray-500">...</div>
                            )}
                        </pre>
                    </div>
                    <JsonViewerModal
                        open={showJsonModal}
                        onClose={() => setShowJsonModal(false)}
                        value={jsonValue}
                        title={`JSON Value - ${row.original.name}`}
                    />
                </>
            );
        default:
            const stringValue = String(value);
            const displayValue = type === 'STRING' ? `"${stringValue}"` : stringValue;
            return (
                <div className="w-32 md:w-64">
                    <div className="font-mono text-sm truncate" title={displayValue}>
                        {displayValue}
                    </div>
                </div>
            );
    }
}

interface ColumnsProps {
    onEdit?: (data: ToggleData) => void;
    onDuplicate?: (data: ToggleData) => void;
    onDelete?: (data: ToggleData) => void;
}

export const createColumns = ({ onEdit, onDuplicate, onDelete }: ColumnsProps): ColumnDef<ToggleData>[] => [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="w-24 md:w-56 truncate">{row.original.name}</div>
        ),
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => <StatusCell row={row} />,
    },
    {
        accessorKey: "description",
        header: "Description", 
        cell: ({ row }) => (
            <div className="w-32 md:w-64 truncate">{row.original.description}</div>
        ),
    },
    {
        accessorKey: "value",
        header: "Value", 
        cell: ({ row }) => <ValueCell row={row} />,

    },
    {
        accessorKey: "update",
        header: "Last Update", 
        cell: ({ row }) => {
            const { createdAt, updatedAt, user, updatedByUser } = row.original;
            const isFirstTime = createdAt === updatedAt;
            const lastUpdateUser = updatedByUser || user;
            const userName = lastUpdateUser?.name || lastUpdateUser?.email || 'Unknown';
            
            return (
                <div className="text-sm">
                    <div className="font-medium">{userName}</div>
                    <div className="text-gray-500 text-xs">
                        {isFirstTime ? 'Created' : 'Updated'} {new Date(updatedAt).toLocaleDateString()}
                    </div>
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <ToggleAction 
                data={row.original}
                onEdit={onEdit}
                onDuplicate={onDuplicate}
                onDelete={onDelete}
            />
        ),
    },
];

// Backward compatibility - default columns without handlers
export const columns = createColumns({});