export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`mp-skeleton ${className}`} />;
}

// Skeleton de varias filas para listas (picks/calendario) mientras carga.
export function SkeletonList({ rows = 4 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-20 w-full" />
      ))}
    </div>
  );
}
