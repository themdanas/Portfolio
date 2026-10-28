interface PageIntroProps {
  title: string;
  children?: React.ReactNode;
}

export default function PageIntro({ title, children }: PageIntroProps) {
  return (
    <header className="mb-10 sm:mb-12">
      <h1 className="m-0 text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.025em] text-[var(--ink)]">
        {title}
      </h1>
      {children && (
        <p className="mt-3 mb-0 max-w-[34rem] text-[1.0625rem] text-[var(--ink-2)]">{children}</p>
      )}
    </header>
  );
}
