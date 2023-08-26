import { cn } from "@/lib";
import s from "./index.module.css";

export function Input({ type = "text", className, ...rest }: any) {
  return (
    <input type={type || "text"} {...rest} className={cn(className, s.input)} />
  );
}

export function Select({ className, ...rest }: any) {
  return <select {...rest} className={cn(className, s.input)} />;
}
