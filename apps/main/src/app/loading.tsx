export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--paper)]">
      <div className="text-center">
        <div className="font-serif text-2xl font-light text-[var(--ink)] mb-4">
          Nikolas <em className="italic">Stepan</em>
        </div>
        <div className="w-24 h-px bg-[var(--rule)] mx-auto animate-pulse" />
      </div>
    </div>
  );
}
