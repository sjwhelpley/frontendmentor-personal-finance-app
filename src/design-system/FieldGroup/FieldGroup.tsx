import { ReactNode } from "react";

/**
 * Stacks a field label above content (matches Input / modal form layout).
 * Use with design-system Input, Select, or any custom control.
 */
export default function FieldGroup({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full ${className}`}>
      <p className="text-preset-4-bold text-grey-900 mb-1">{label}</p>
      {children}
    </div>
  );
}
