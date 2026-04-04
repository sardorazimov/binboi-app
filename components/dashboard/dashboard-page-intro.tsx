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
    <div className="max-w-4xl space-y-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6ca3ff]">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-[2.7rem]">
        {title}
      </h1>
      <p className="max-w-3xl text-sm leading-8 text-white/64 sm:text-base">
        {description}
      </p>
    </div>
  );
}
