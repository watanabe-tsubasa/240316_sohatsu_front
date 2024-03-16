import { toast } from "sonner";
import { useCallback } from "react";

interface useToastPropsType {
  status: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

export const useToast = ({ status, title, message }: useToastPropsType) => {
  const showToast = useCallback(() => {
    toast[status](title, {
      description: message,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  }, [title, status, message]);

  return showToast;
}