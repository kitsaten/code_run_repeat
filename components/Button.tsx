import React, { ButtonHTMLAttributes, forwardRef, ReactElement } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", asChild = false, children, ...props }, ref) => {
        const base =
            "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

        const variants = {
            primary: "bg-primary text-primary-foreground hover:bg-primary/90",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
        };

        const sizes = {
            sm: "h-9 px-3 text-xs",
            md: "h-10 px-4 py-2",
            lg: "h-11 px-8 text-lg",
        };

        const classes = cn(base, variants[variant], sizes[size], className);

        if (asChild && React.isValidElement(children)) {
            const child = children as ReactElement<{ className?: string }>;
            return React.cloneElement(child, {
                className: cn(classes, child.props.className),
            });
        }

        return (
            <button
                ref={ref}
                className={classes}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
