import { cn } from "@/lib";
import s from "./index.module.css";

export default function Heading({ as = "div", ...rest }) {
  const Component = as as any;
  return (
    <Component
      className={cn(s.heading, {
        [s.h1]: Component === "div" || Component === "h1",
        [s.h2]: Component === "h2",
        [s.h3]: Component === "h3",
        [s.h4]: Component === "h4",
        [s.h5]: Component === "h5",
        [s.h6]: Component === "h6",
      })}
      {...rest}
    />
  );
}
