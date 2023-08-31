import { cn } from "@/lib";

export default function Divider({ className, ...rest }: any) {
  return <hr className={cn("my-8", className)} {...rest} />;
}
