import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
    container?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
    ({ className, container = true, children, ...props }, ref) => {
        return (
            <section
                ref={ref}
                className={cn("py-12 md:py-24 lg:py-32", className)}
                {...props}
            >
                {container ? (
                    <div className="container-custom">{children}</div>
                ) : (
                    children
                )}
            </section>
        );
    }
);
Section.displayName = "Section";

export { Section };
