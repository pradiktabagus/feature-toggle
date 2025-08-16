import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateToggleData } from "./types";
import { createToggleSchema } from "./schemas";

export function useCreateToggleForm() {
  const form = useForm<CreateToggleData>({
    resolver: zodResolver(createToggleSchema),
    defaultValues: {
      name: "",
      description: "",
      value: "",
      type: "STRING" as const,
    },
  });

  const handleSubmit = (onSubmit?: (data: CreateToggleData) => void, onClose?: () => void) => {
    return form.handleSubmit((data) => {
      // Convert Boolean type value from string to string representation
      const processedData = {
        ...data,
        value: String(data.value)
      };
      onSubmit?.(processedData);
      form.reset();
      onClose?.();
    });
  };

  return {
    form,
    handleSubmit,
  };
}