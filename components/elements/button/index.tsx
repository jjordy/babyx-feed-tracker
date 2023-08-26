import { cn } from "@/lib";
import s from "./index.module.css";

export default function Button({ className, children, ...rest }: any) {
  return (
    <button {...rest} className={cn(className, s.button)}>
      {children}
    </button>
  );
}
