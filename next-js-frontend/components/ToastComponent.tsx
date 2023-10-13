import { useToast } from "@/components/ui/use-toast";

export default function ToastComponent(props: {
  title: string;
  description: string;
  variant: "default" | "destructive" | null | undefined;
}) {
  const { toast } = useToast();

  return toast({
    title: props.title,
    description: props.description,
    variant: props.variant,
  });
}
