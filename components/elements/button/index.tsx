import { cn } from "@/lib";
import s from "./index.module.css";

export default function Button({
  className,
  children,
  as = "button",
  ...rest
}: any) {
  const Component = as;
  return (
    <Component {...rest} className={cn(className, s.button)}>
      {children}
    </Component>
  );
}
