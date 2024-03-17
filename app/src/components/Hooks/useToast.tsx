import { toast } from "sonner";
import { useCallback } from "react";

interface useToastPropsType {
  status: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  func?: () => void;
  label: string;
}
export const useToast = ({ status, title, message, func, label }: useToastPropsType) => {
  const showToast = useCallback(() => {
    toast[status](title, {
      description: message,
      duration: 10000,
      action: {
        label: label,
        onClick: () => {
          if (func) {
            func();
          } else {
            console.log('clicked')
          }
        }
      },
    });
  }, [title, status, message, func, label]);

  return showToast;
}