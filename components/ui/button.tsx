import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gold text-white shadow-md hover:bg-gold-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-cream-dark text-bark border-2 border-gold/30 hover:border-gold hover:bg-cream hover:shadow-md",
        outline:
          "border-2 border-bark/20 text-bark hover:bg-bark hover:text-cream",
        ghost:
          "text-bark hover:bg-bark/5",
        seeds:
          "bg-seeds text-white shadow-md hover:bg-seeds-dark hover:shadow-lg hover:-translate-y-0.5",
        sprouts:
          "bg-sprouts text-white shadow-md hover:bg-sprouts-dark hover:shadow-lg hover:-translate-y-0.5",
        branches:
          "bg-branches text-white shadow-md hover:bg-branches-dark hover:shadow-lg hover:-translate-y-0.5",
        roots:
          "bg-roots text-white shadow-md hover:bg-roots-dark hover:shadow-lg hover:-translate-y-0.5",
        etsy:
          "bg-[#F1641E] text-white shadow-md hover:bg-[#D4551A] hover:shadow-lg hover:-translate-y-0.5",
        gumroad:
          "bg-[#FF90E8] text-gray-900 shadow-md hover:bg-[#E87DD1] hover:shadow-lg hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
