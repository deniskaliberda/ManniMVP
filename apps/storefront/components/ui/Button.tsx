import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export type ButtonVariant = "primary" | "secondary" | "ghost" | "lignoloc"
export type ButtonSize = "sm" | "md" | "lg"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-primary-500 text-white",
    "hover:bg-primary-600",
    "active:bg-primary-700",
    "focus-visible:ring-primary-500",
  ].join(" "),
  secondary: [
    "border-2 border-primary-500 text-primary-500 bg-transparent",
    "hover:bg-primary-50 hover:border-primary-600 hover:text-primary-600",
    "active:bg-primary-100",
    "focus-visible:ring-primary-500",
  ].join(" "),
  ghost: [
    "text-neutral-700 bg-transparent",
    "hover:bg-neutral-100 hover:text-neutral-900",
    "active:bg-neutral-200",
    "focus-visible:ring-neutral-500",
  ].join(" "),
  lignoloc: [
    "bg-lignoloc-500 text-white",
    "hover:bg-lignoloc-400",
    "active:bg-lignoloc-600",
    "focus-visible:ring-lignoloc-500",
  ].join(" "),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export { Button }
