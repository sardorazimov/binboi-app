/**
 * Standard page intro used across dashboard sections with the same calm type hierarchy as the site.
 */
type DashboardPageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function DashboardPageIntro({
  description,
  eyebrow,
  title,
}: DashboardPageIntroProps) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-[2.3rem]">
        {title}
      </h1>
      <p className="max-w-3xl text-sm leading-7 text-foreground/66 sm:text-base">
        {description}
      </p>
    </div>
  );
}
