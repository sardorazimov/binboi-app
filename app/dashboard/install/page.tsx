/**
 * Installation page that helps teams move from UI to CLI-backed onboarding.
 */
import { DashboardPageIntro } from "@/components/dashboard/dashboard-page-intro";
import { IntegrationState } from "@/components/dashboard/integration-state";
import { Panel } from "@/components/ui/panel";
import { INSTALL_STEPS } from "@/constants";
import { getEngineInstallOverview } from "@/lib/backend/engine";
import { env } from "@/lib/env";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Install",
  description: "CLI and tunnel onboarding guidance for Binboi workspaces.",
  path: "/dashboard/install",
});

type InstallCommandCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  command: string;
};

/**
 * Compact command card used to present setup actions without turning the page into docs.
 */
function InstallCommandCard({
  command,
  description,
  eyebrow,
  title,
}: InstallCommandCardProps) {
  return (
    <Panel className="space-y-4 p-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/52">
          {eyebrow}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="text-sm leading-7 text-foreground/62">{description}</p>
      </div>
      <pre className="overflow-x-auto rounded-[24px] border border-white/8 bg-black/22 p-5 text-sm leading-7 text-foreground/82">
        <code>{command}</code>
      </pre>
    </Panel>
  );
}

export default async function InstallPage() {
  const engineOverview = await getEngineInstallOverview();
  const commands = [
    {
      eyebrow: "Step 1",
      title: "Install the CLI",
      description:
        "Bootstrap an operator machine or CI environment with the same install path you will support in production.",
      command: "curl -fsSL https://binboi.example/install.sh | sh",
    },
    {
      eyebrow: "Step 2",
      title: "Bind the CLI to this control plane",
      description:
        "Create a token from the dashboard, then log the CLI into the product/control-plane URL.",
      command: `export BINBOI_CONTROL_PLANE_URL=${env.appUrl}\nbinboi login --token <token>`,
    },
    {
      eyebrow: "Step 3",
      title: "Verify engine reachability",
      description:
        "Keep engine verification explicit so the product app and `binboi-go` remain separate services with a clear boundary.",
      command: env.engineApiUrl
        ? 'curl -H "Authorization: Bearer <ENGINE_API_KEY>" \\\n' +
          `  ${env.engineApiUrl}${env.engineHealthPath}`
        : 'curl -H "Authorization: Bearer <ENGINE_API_KEY>" \\\n  http://localhost:9090/v1/health',
    },
  ];

  return (
    <div className="space-y-8">
      <DashboardPageIntro
        eyebrow="Install"
        title="Onboard engineers with a clear install path"
        description="The install flow stays focused on real setup work: get the CLI on a machine, authenticate against the control plane, and verify that the separate `binboi-go` engine is reachable."
      />

      <IntegrationState
        configured={engineOverview.configured}
        ok={engineOverview.health?.status === "healthy"}
        title="binboi-go engine connection"
        description="The install surface now reads engine health through a centralized server-side adapter instead of embedding engine calls in UI components."
        error={engineOverview.healthError ?? engineOverview.tunnelError}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_360px]">
        <div className="space-y-6">
          <Panel className="space-y-6 p-7">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/52">
                Setup sequence
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Move from install to a first healthy tunnel without guesswork
              </h2>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              {INSTALL_STEPS.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-[24px] border border-white/8 bg-black/16 p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/44">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-foreground/62">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          <div className="grid gap-6">
            {commands.map((command) => (
              <InstallCommandCard key={command.title} {...command} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Panel className="space-y-4 p-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/52">
                Engine status
              </p>
              <h2 className="text-xl font-semibold text-foreground">Current connection</h2>
            </div>

            <div className="grid gap-3">
              <div className="rounded-[22px] border border-white/8 bg-black/16 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/42">
                  Engine URL
                </p>
                <p className="mt-2 break-all text-sm text-foreground/72">
                  {engineOverview.engineBaseUrl || "Not configured"}
                </p>
              </div>
              <div className="rounded-[22px] border border-white/8 bg-black/16 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/42">
                  Health
                </p>
                <p className="mt-2 text-sm text-foreground/72">
                  {engineOverview.health
                    ? `${engineOverview.health.status} · ${engineOverview.health.version}`
                    : "Unavailable"}
                </p>
              </div>
              <div className="rounded-[22px] border border-white/8 bg-black/16 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/42">
                  Engine tunnels
                </p>
                <p className="mt-2 text-sm text-foreground/72">
                  {engineOverview.tunnelCount} returned
                </p>
              </div>
            </div>
          </Panel>

          <Panel className="space-y-4 p-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/52">
                Service boundary
              </p>
              <h2 className="text-xl font-semibold text-foreground">
                App and engine stay separate
              </h2>
            </div>

            <div className="space-y-3 text-sm leading-7 text-foreground/64">
              <p>Control plane URL: {engineOverview.controlPlaneBaseUrl}</p>
              <p>
                Internal control URL:{" "}
                {engineOverview.controlPlaneInternalUrl || "Not configured"}
              </p>
              <p>Protected health endpoint: {engineOverview.internalHealthUrl}</p>
            </div>
          </Panel>

          <Panel className="space-y-4 p-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/52">
                Expected engine paths
              </p>
              <h2 className="text-xl font-semibold text-foreground">Current adapter contract</h2>
            </div>

            <div className="space-y-3 text-sm leading-7 text-foreground/64">
              <p>Health: {engineOverview.expectedPaths.health}</p>
              <p>Tunnels: {engineOverview.expectedPaths.tunnels}</p>
              <p>Sessions: {engineOverview.expectedPaths.sessions}</p>
              <p>Connect: {engineOverview.expectedPaths.connect}</p>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
