import { Button } from "@/shared/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

interface ToggleAddParameterProps {
    onAdd?: () => void;
}

export default function ToggleAddParameter({ onAdd }: ToggleAddParameterProps){
    return (
        <div className="flex justify-end px-4 lg:px-6">
            <Button onClick={onAdd} className="cursor-pointer" variant="outline" size="sm">
                <IconPlus />
                <span className="hidden lg:inline">Add Parameter</span>
            </Button>
        </div>
    )
}