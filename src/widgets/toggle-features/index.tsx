"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ToggleAddParameter from "@/features/toggle/ui/toggle-add-parameter";
import ToggleTable from "@/features/toggle/ui/toggle-table";
import ToggleFormModal from "@/features/toggle/ui/toggle-form-modal";
import { useToggleManagement } from "@/features/toggle/model";
import { useToggles } from "@/entities/toggle";

export default function ToggleFeatures() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    
    const page = parseInt(searchParams.get('page') || '1')
    const { data: togglesResponse, isLoading } = useToggles(page, 10)
    const toggles = togglesResponse?.data || []
    const pagination = togglesResponse?.pagination
    
    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', newPage.toString())
        router.push(`${pathname}?${params.toString()}`)
    }
    const {
        // Create modal
        isOpen,
        openModal,
        closeModal,
        handleSubmit,
        // Edit modal
        editData,
        isEditOpen,
        handleEdit,
        handleEditSubmit,
        handleEditClose,
        // Table actions
        handleDuplicate,
        handleDelete,
    } = useToggleManagement()

    return (
        <div>
            <div className="flex flex-col gap-4">
                <ToggleAddParameter onAdd={openModal} />
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <ToggleTable 
                        data={toggles}
                        pagination={pagination}
                        onPageChange={handlePageChange}
                        onEdit={handleEdit}
                        onDuplicate={handleDuplicate}
                        onDelete={handleDelete}
                    />
                )}
            </div>
            <ToggleFormModal 
                mode="create"
                open={isOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}
            />
            <ToggleFormModal 
                mode="edit"
                data={editData}
                open={isEditOpen}
                onClose={handleEditClose}
                onSubmit={handleEditSubmit}
            />
        </div>
    )
}