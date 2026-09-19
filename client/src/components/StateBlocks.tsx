import React from "react";

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="state-block">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="state-block">
      <h3>{title}</h3>
      {hint && <p>{hint}</p>}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="state-block">
      <h3>Something went wrong</h3>
      <p>{message}</p>
    </div>
  );
}
