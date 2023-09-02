import { cn } from "@/lib";
import s from "./index.module.css";

export function Input({
  type = "text",
  label,
  id,
  name,
  className,
  ...rest
}: any) {
  return (
    <div className={cn("flex items-center w-full", className)}>
      <div className={s.labelWrapper}>
        <label htmlFor={id || `id_${name}`} className={s.label}>
          {label}
        </label>
      </div>
      <input
        id={id || `id_${name}`}
        type={type || "text"}
        name={name}
        {...rest}
        className={cn(s.input)}
      />
    </div>
  );
}

export function Select({ className, id, name, label, ...rest }: any) {
  return (
    <div className={cn("flex items-center w-full", className)}>
      <div className={s.labelWrapper}>
        <label htmlFor={id || `id_${name}`} className={s.label}>
          {label}
        </label>
      </div>
      <select
        id={id || `id_${name}`}
        name={name}
        {...rest}
        className={cn(s.input)}
      />
    </div>
  );
}
