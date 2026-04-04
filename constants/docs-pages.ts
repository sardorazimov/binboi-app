export type DocsCodeSample = {
  language: string;
  title?: string;
  code: string;
};

export type DocsSection = {
  id: string;
  title: string;
  summary: string;
  paragraphs: string[];
  bullets?: string[];
  codeSamples?: DocsCodeSample[];
};

export type DocsNextStep = {
  title: string;
  description: string;
  href: string;
};

export type DocsPageContent = {
  key: string;
  href: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  summary: string[];
  sections: DocsSection[];
  nextSteps: DocsNextStep[];
};

export const DOCS_PAGES: DocsPageContent[] = [
  {
    key: "overview",
    href: "/docs",
    title: "Binboi Documentation",
    description:
      "Everything you need to install Binboi, authenticate safely, open HTTP tunnels, and debug traffic without guessing.",
    category: "Getting Started",
    readingTime: "5 min read",
    summary: [
      "Understand the product model before wiring real services.",
      "Pick the shortest setup path for local development and team rollouts.",
      "Jump from installation to debugging without changing mental models.",
    ],
    sections: [
      {
        id: "docs-map",
        title: "Docs map",
        summary: "Start with the route that matches the job you need to finish.",
        paragraphs: [
          "Binboi docs are organized around what teams actually do with the product: install the CLI, authenticate a workspace, expose local HTTP services, inspect requests, and diagnose failures when traffic does not look right.",
          "That means you do not need to learn an abstract platform vocabulary before getting value. If you are trying to share a local app, start in Quick Start. If you already have traffic flowing and want cleaner operations, move into Requests, Logs, Regions, and Troubleshooting.",
        ],
        bullets: [
          "Use Introduction to understand the product model and the control plane vocabulary.",
          "Use Quick Start when you want the fastest path to a working public URL.",
          "Use the workflow pages when you are standardizing how your team operates Binboi.",
        ],
      },
      {
        id: "first-setup",
        title: "Your first setup path",
        summary: "Most teams only need one successful tunnel before the rest of the docs click.",
        paragraphs: [
          "The shortest happy path is simple: install the CLI, sign in or create a scoped token, run an HTTP tunnel to your local port, and confirm the request stream in the dashboard. Once that works, the rest of the documentation becomes operational polish rather than existential troubleshooting.",
          "If you are rolling Binboi into a team workflow, keep the first setup intentionally boring. Use a disposable local service, a clearly named token, and a single region so you can separate product behavior from environment-specific complexity.",
        ],
        codeSamples: [
          {
            language: "bash",
            title: "Typical first-session flow",
            code: "brew install binboi/tap/binboi\nbinboi login\nbinboi http 3000\ncurl https://your-tunnel.binboi.dev/health",
          },
        ],
      },
      {
        id: "choose-workflow",
        title: "Choose the workflow that matches your job",
        summary: "Different pages exist because not every tunnel is the same kind of work.",
        paragraphs: [
          "Local demos and webhook debugging care about fast iteration, request visibility, and easy restarts. Shared staging environments care more about durable naming, team ownership, token rotation, and region selection. Production-adjacent usage adds API automation, observability, and rollout discipline.",
          "The docs keep those concerns close together so you can move from a quick experiment to a maintained setup without rewriting your mental model every time you need one more feature.",
        ],
        bullets: [
          "Local development: Quick Start, CLI, HTTP Tunnels.",
          "Operational visibility: Requests, Logs, Debugging.",
          "Team hardening: Authentication, Regions, Troubleshooting, API.",
        ],
      },
      {
        id: "operate-safely",
        title: "Operate safely from day one",
        summary: "A tunnel is part of your product surface, not a throwaway side channel.",
        paragraphs: [
          "Treat every public URL as something another human or system may rely on. Give tunnels recognizable names, avoid sharing personal tokens between teammates, and keep environment ownership obvious. The product UI is designed to support those habits instead of hiding them.",
          "If something goes wrong, start with the request path, the tunnel status, and the credential that created the session. Those three data points answer most of the questions teams ask during early rollout.",
        ],
      },
    ],
    nextSteps: [
      {
        title: "Read the introduction",
        description: "Get the control plane and workspace model clear before you wire real services.",
        href: "/docs/introduction",
      },
      {
        title: "Run quick start",
        description: "Go from install to your first routable tunnel in a single session.",
        href: "/docs/quick_start",
      },
    ],
  },
  {
    key: "introduction",
    href: "/docs/introduction",
    title: "Introduction",
    description:
      "Learn what Binboi is, which product surfaces matter first, and how the control plane fits your stack.",
    category: "Getting Started",
    readingTime: "4 min read",
    summary: [
      "Understand the product vocabulary before configuring anything.",
      "See how workspaces, tokens, tunnels, and request visibility connect.",
      "Choose the right docs path for solo setup or team rollout.",
    ],
    sections: [
      {
        id: "what-binboi-is",
        title: "What Binboi is",
        summary: "Binboi gives you a controlled way to expose local or internal services.",
        paragraphs: [
          "Binboi is a tunneling and traffic visibility product for teams that want public ingress without improvising access, naming, and observability every time a service needs to be shared. It sits between the service you run and the people or systems that need to reach it.",
          "In practice that means you get a stable public URL, workspace-aware credentials, and request inspection from one product surface. Instead of gluing together ad hoc scripts, reverse proxies, and manual screenshots of requests, you operate through a consistent workflow.",
        ],
      },
      {
        id: "core-building-blocks",
        title: "Core building blocks",
        summary: "Most of the product can be understood through four pieces.",
        paragraphs: [
          "A workspace is the operational boundary for your team. Tokens decide who or what can act inside that workspace. Tunnels connect a local or internal service to a routable public URL. Requests and logs show you what actually crossed that connection once it was live.",
          "These pieces are intentionally small and composable. The dashboard presents them as product surfaces, while the CLI turns them into repeatable commands that fit local development, CI, or internal staging environments.",
        ],
        bullets: [
          "Workspaces define ownership and shared visibility.",
          "Tokens carry access and should be scoped to real workflows.",
          "Tunnels expose services and report lifecycle state.",
          "Requests and logs explain what happened after traffic arrived.",
        ],
      },
      {
        id: "who-should-use-it",
        title: "Who should use it",
        summary: "The product is especially useful when traffic needs to be shared and explained.",
        paragraphs: [
          "Binboi is a good fit for teams demoing staging apps, integrating with third-party webhooks, exposing internal tools, or running controlled previews for QA and support. It is also useful when a team wants one mental model across local development and shared non-production environments.",
          "If your current setup depends on one engineer remembering a set of flags or copying a personal access token into chat, the product will feel immediately better because it makes those operational details visible and repeatable.",
        ],
      },
      {
        id: "product-mental-model",
        title: "Product mental model",
        summary: "Think of Binboi as a user-facing control plane wrapped around traffic ingress.",
        paragraphs: [
          "Your service still owns business logic. Binboi does not replace the application you are running. Instead, it manages the edge where traffic enters, where credentials are minted, and where request behavior becomes visible to humans.",
          "That framing matters because it helps you decide where a problem belongs. Authentication issues often start in token scope or identity setup. Delivery issues often start in tunnel health or local service reachability. Debugging issues usually start with request evidence rather than more configuration.",
        ],
      },
      {
        id: "how-to-read-docs",
        title: "How to read the rest of the docs",
        summary: "You do not need to read everything in order, but there is a sensible path.",
        paragraphs: [
          "If you are new, go straight from here to Quick Start, then Installation and Authentication if you want to harden your setup. If you already have a tunnel running, move into HTTP Tunnels, Requests, and Logs. If your team is introducing Binboi more broadly, add Regions, API, and Troubleshooting.",
          "Each page is written so you can drop in for one job and still keep the same terminology across the rest of the docs. That is why the structure stays consistent page to page.",
        ],
      },
    ],
    nextSteps: [
      {
        title: "Open Quick Start",
        description: "Run the fastest supported path from local machine to live tunnel.",
        href: "/docs/quick_start",
      },
      {
        title: "Review Installation",
        description: "Choose the install path that matches how your team distributes the CLI.",
        href: "/docs/installation",
      },
    ],
  },
  {
    key: "quick_start",
    href: "/docs/quick_start",
    title: "Quick Start",
    description:
      "The shortest path from install to a healthy public URL, with enough explanation to keep the result repeatable.",
    category: "Getting Started",
    readingTime: "6 min read",
    summary: [
      "Install the CLI and verify the binary.",
      "Authenticate with a workspace-safe identity or token.",
      "Open your first HTTP tunnel and confirm traffic end to end.",
    ],
    sections: [
      {
        id: "prepare-local-service",
        title: "Prepare a local service",
        summary: "Start with something simple so you can separate product behavior from app bugs.",
        paragraphs: [
          "Before opening a tunnel, make sure you have a local HTTP service running on a known port such as `3000` or `8080`. A health endpoint or static page is ideal because it removes application complexity from the first validation pass.",
          "The goal of quick start is not to prove every edge case in your stack. It is to prove that Binboi can authenticate, establish the tunnel, route traffic correctly, and show you what happened when a request arrived.",
        ],
      },
      {
        id: "install-cli",
        title: "Install the CLI",
        summary: "Use the package path that your team can keep consistent.",
        paragraphs: [
          "Homebrew is the easiest path on macOS, while a direct binary install works well for controlled environments or internal distribution. Whatever path you choose, keep it documented so teammates do not end up on slightly different binaries with slightly different behavior.",
          "After installation, run a version check immediately. That step sounds minor, but it catches path issues, stale shells, and partial installs before you start debugging a tunnel that never had a working CLI behind it.",
        ],
        codeSamples: [
          {
            language: "bash",
            title: "Install and verify",
            code: "brew install binboi/tap/binboi\nbinboi version",
          },
        ],
      },
      {
        id: "authenticate-workspace",
        title: "Authenticate the workspace",
        summary: "Use a credential that reflects the job you are doing right now.",
        paragraphs: [
          "If you are working interactively, the login flow is usually the clearest option because it binds a human to the session and makes later cleanup easier. If you are scripting or sharing an environment, create a named token in the dashboard with a scope that matches the workflow.",
          "Avoid the temptation to keep one magic credential around forever. Quick start works best when it models the same credential hygiene you want the team to use later.",
        ],
        codeSamples: [
          {
            language: "bash",
            title: "Interactive login",
            code: "binboi login",
          },
          {
            language: "bash",
            title: "Token-based login",
            code: "binboi login --token bb_live_xxxxx",
          },
        ],
      },
      {
        id: "open-http-tunnel",
        title: "Open an HTTP tunnel",
        summary: "Bind the public URL to the local port where your service is listening.",
        paragraphs: [
          "Once you are authenticated, point Binboi at the port that serves your local application. The CLI should return a public URL, current region, and a healthy lifecycle state. That output is the first confirmation that the transport layer is alive.",
          "If you already know the environment will be reused, prefer a descriptive name and region instead of the shortest command possible. It pays off immediately when the request list starts filling with traffic from teammates or third-party systems.",
        ],
        codeSamples: [
          {
            language: "bash",
            title: "Basic tunnel",
            code: "binboi http 3000",
          },
          {
            language: "bash",
            title: "Named tunnel with region",
            code: "binboi http 3000 --name docs-preview --region fra",
          },
        ],
      },
      {
        id: "verify-traffic",
        title: "Verify traffic end to end",
        summary: "A successful tunnel is not complete until a real request crosses it.",
        paragraphs: [
          "Send a request through the public URL and confirm that your local service handled it. Then open the dashboard request view and make sure the same request is visible there with method, path, status, and timing details. That closes the loop between transport and observability.",
          "If the request works in the browser but is missing from the dashboard, the problem is usually not the tunnel itself. It is more often a stale page, an event ingestion delay, or a mismatch between the workspace you authenticated against and the one you are viewing.",
        ],
        codeSamples: [
          {
            language: "bash",
            title: "Smoke test the tunnel",
            code: "curl https://your-tunnel.binboi.dev/health",
          },
        ],
      },
      {
        id: "make-it-repeatable",
        title: "Make the setup repeatable",
        summary: "Once the happy path works, save yourself from retyping fragile commands.",
        paragraphs: [
          "The next improvement is not usually more features. It is repeatability. Save the command in project docs, move configuration into a file if you need the same tunnel often, and note which token or region the setup assumes.",
          "That way the quick start becomes your baseline operating procedure instead of a one-time victory that takes four hours to recreate later.",
        ],
      },
    ],
    nextSteps: [
      {
        title: "Open Installation",
        description: "See supported install and upgrade strategies in more detail.",
        href: "/docs/installation",
      },
      {
        title: "Open Authentication",
        description: "Harden how humans and automations access the workspace.",
        href: "/docs/authentication",
      },
    ],
  },
  {
    key: "installation",
    href: "/docs/installation",
    title: "Installation",
    description:
      "Choose the install strategy that matches your operating system, distribution method, and upgrade discipline.",
    category: "Getting Started",
    readingTime: "5 min read",
    summary: [
      "Pick the right install channel for local use or managed rollout.",
      "Verify the CLI immediately after installation.",
      "Keep upgrades and removals predictable across the team.",
    ],
    sections: [
      {
        id: "choose-channel",
        title: "Choose an install channel",
        summary: "The best install path depends on how controlled the environment is.",
        paragraphs: [
          "Homebrew is convenient when engineers manage their own machines and expect fast upgrades. Direct binaries are a better fit when the team wants explicit version pinning, internal distribution, or automation in ephemeral environments.",
          "The most important choice is not which command looks cleaner. It is whether the whole team can use the same path without inventing exceptions that become support work later.",
        ],
      },
      {
        id: "homebrew-install",
        title: "Homebrew install",
        summary: "Use the tap flow when you want the fastest developer onboarding on macOS.",
        paragraphs: [
          "A Homebrew install is usually the best default for interactive development. It is easy to document, easy to verify, and familiar to most engineers working on macOS-based product teams.",
          "After installation, confirm that your shell resolves the expected binary. If another copy of the CLI exists in your PATH, you can lose time debugging a version mismatch that looks like a feature bug.",
        ],
        codeSamples: [
          {
            language: "bash",
            title: "Install via Homebrew",
            code: "brew tap binboi/tap\nbrew install binboi",
          },
        ],
      },
      {
        id: "manual-install",
        title: "Manual binary install",
        summary: "Use direct binaries when you need tighter control over versions and placement.",
        paragraphs: [
          "For CI images, internal base images, or locked-down machines, a direct binary install is easier to reason about than a package manager dependency. Download the release artifact, place it in a known executable path, and document the exact version used by your environment.",
          "This path also makes rollback easier because you can swap the binary with a known-good version instead of reasoning about package manager state.",
        ],
        codeSamples: [
          {
            language: "bash",
            title: "Example manual install flow",
            code: "curl -fsSL https://downloads.binboi.dev/binboi-darwin-arm64 -o /usr/local/bin/binboi\nchmod +x /usr/local/bin/binboi\nbinboi version",
          },
        ],
      },
      {
        id: "verify-install",
        title: "Verify the installation",
        summary: "Do not move on until the binary, shell path, and version all agree.",
        paragraphs: [
          "A version check is the minimum. A help screen check is better because it confirms the binary starts normally and exposes the subcommands you expect. If the CLI cannot even print help reliably, no tunnel command will be trustworthy.",
          "If you are documenting the setup for teammates, record the verified version in the same place you keep the install instructions. That avoids vague reports like 'the CLI looks different on my machine.'",
        ],
        codeSamples: [
          {
            language: "bash",
            title: "Verification commands",
            code: "which binboi\nbinboi version\nbinboi --help",
          },
        ],
      },
      {
        id: "upgrade-remove",
        title: "Upgrade and remove cleanly",
        summary: "A predictable lifecycle matters more than a clever one-liner.",
        paragraphs: [
          "Upgrades should be deliberate when the CLI is part of shared team workflows. Note when a new version changes defaults, flag names, or output shape. That is especially important if scripts or CI jobs parse CLI responses.",
          "Removal should also be documented. Engineers should know whether uninstalling the binary is enough or whether local config, cached credentials, or launch agents should be cleaned up as well.",
        ],
      },
    ],
    nextSteps: [
      {
        title: "Continue to Authentication",
        description: "Set up a credential model that is safe to use interactively and in automation.",
        href: "/docs/authentication",
      },
      {
        title: "Continue to CLI",
        description: "Learn the command patterns you will reuse after installation.",
        href: "/docs/cli",
      },
    ],
  },
  {
    key: "authentication",
    href: "/docs/authentication",
    title: "Authentication",
    description:
      "Use login sessions and scoped tokens in a way that stays understandable as your team and environments grow.",
    category: "Getting Started",
    readingTime: "5 min read",
    summary: [
      "Decide when to use interactive login versus tokens.",
      "Create credentials that map to real workflows and owners.",
      "Rotate and revoke access without mystery or downtime.",
    ],
    sections: [
      {
        id: "identity-model",
        title: "Choose the right identity model",
        summary: "Humans and automations should not share the same access pattern.",
        paragraphs: [
          "Interactive login is usually best for people working locally because it keeps accountability obvious and makes cleanup easier. Tokens are better for automation, reproducible environments, and service-owned workflows where no browser-based login should be required.",
          "The mistake to avoid is using one long-lived personal token for everything. It hides ownership, makes incident review harder, and turns routine rotation into a scary event.",
        ],
      },
      {
        id: "create-token",
        title: "Create a scoped token",
        summary: "A good token name should explain where it belongs before anyone opens the details.",
        paragraphs: [
          "When creating a token in the dashboard, name it after the workflow or environment that owns it, not after the person who happened to click the button. That keeps the system readable after staffing changes or handoffs.",
          "Limit the scope to the actions the workflow actually needs. If a CI job only creates tunnels, it should not also have broad account-management powers just because that was convenient the first day.",
        ],
        bullets: [
          "Prefer names like `ci-preview`, `stripe-webhook-debug`, or `staging-qa`.",
          "Record the owner and intended lifetime in team docs or the ticket that created it.",
          "Revoke stale tokens instead of letting them accumulate as institutional folklore.",
        ],
      },
      {
        id: "cli-login",
        title: "Authenticate from the CLI",
        summary: "The CLI should make the active workspace and identity legible.",
        paragraphs: [
          "After login, confirm which workspace the CLI is targeting. This matters in teams with multiple environments because a healthy tunnel in the wrong workspace is still the wrong result.",
          "If you are injecting a token through the shell or CI, make the source explicit. Environment variables, secret managers, and deployment configuration should point to a single canonical secret, not a chain of copy-pasted values.",
        ],
        codeSamples: [
          {
            language: "bash",
            title: "Interactive and token-based login",
            code: "binboi login\nbinboi login --token bb_live_xxxxx\nbinboi whoami",
          },
        ],
      },
      {
        id: "rotate-revoke",
        title: "Rotate and revoke access",
        summary: "Rotation becomes easy when credentials are already named and scoped well.",
        paragraphs: [
          "If a token is clearly tied to one workflow, rotation is a controlled change: mint the replacement, update the consumer, verify traffic, and revoke the old secret. Problems arise when one secret quietly powers five unrelated workflows and no one knows which ones will break.",
          "Revocation should be a routine operational tool, not an emergency-only button. If a tunnel or integration is retired, clean up the credential at the same time so your dashboard remains trustworthy.",
        ],
      },
      {
        id: "team-guardrails",
        title: "Set team guardrails early",
        summary: "Good auth hygiene feels light when the rules are simple and visible.",
        paragraphs: [
          "Decide upfront how your team names tokens, who is allowed to create them, and where secret ownership is recorded. Those lightweight rules reduce future confusion without adding process theater.",
          "The docs, dashboard, and CLI should all reinforce the same story: access belongs to workflows, owners, and environments, not to whoever was online when the tunnel needed to be created.",
        ],
      },
    ],
    nextSteps: [
      {
        title: "Open CLI",
        description: "Learn the command patterns that build on your authenticated session.",
        href: "/docs/cli",
      },
      {
        title: "Open HTTP Tunnels",
        description: "Use those credentials to expose services with deliberate naming and health checks.",
        href: "/docs/http_tunnels",
      },
    ],
  },
  {
    key: "cli",
    href: "/docs/cli",
    title: "CLI",
    description:
      "Understand the commands you will actually run day to day, from first tunnel to repeatable team workflows.",
    category: "Using Binboi",
    readingTime: "5 min read",
    summary: [
      "Learn the small set of commands that matter most.",
      "Move from one-off commands to repeatable configuration.",
      "Keep scripting and CI integrations predictable.",
    ],
    sections: [
      {
        id: "command-shape",
        title: "Command shape",
        summary: "Most CLI usage comes down to auth, tunnel creation, inspection, and lifecycle control.",
        paragraphs: [
          "The CLI is designed around a compact set of nouns and actions rather than a sprawling command tree. In daily work, you typically authenticate, open a tunnel, inspect status, and stop or restart the session when your local service changes.",
          "That small surface area is intentional. The product wants repeated tasks to feel obvious enough that engineers stop carrying personal cheat sheets for the basics.",
        ],
      },
      {
        id: "run-first-command",
        title: "Run a first useful command",
        summary: "The best CLI tutorial is one that produces a result you can verify immediately.",
        paragraphs: [
          "After logging in, run an HTTP tunnel against a local port and keep the terminal visible long enough to see its status output. That teaches you where the public URL appears, how the session identifies itself, and which region or metadata the CLI reports back.",
          "If your local service is not ready, do not keep adding flags. Validate the service first, then retry the simplest possible tunnel command.",
        ],
        codeSamples: [
          {
            language: "bash",
            title: "Open a tunnel",
            code: "binboi http 3000 --name local-web",
          },
        ],
      },
      {
        id: "config-file",
        title: "Move repeated commands into config",
        summary: "Configuration files beat fragile copy-paste once a workflow becomes habitual.",
        paragraphs: [
          "If you or your team run the same tunnel frequently, move the important pieces into a config file. That turns tribal knowledge into something versioned, reviewable, and reproducible across machines.",
          "A config file is especially useful when a workflow depends on a stable name, a region choice, or a group of tunnel settings that should not drift between environments.",
        ],
        codeSamples: [
          {
            language: "yaml",
            title: "Example config",
            code: "version: 1\nworkspace: dev-team\ntunnels:\n  docs-preview:\n    proto: http\n    addr: 3000\n    region: fra\n    inspect: true",
          },
        ],
      },
      {
        id: "automation",
        title: "Use the CLI in automation",
        summary: "Automation succeeds when command output and credentials are both stable.",
        paragraphs: [
          "For CI or scripted environments, prefer token-based login with explicit secret injection and pinned binary versions. If downstream tooling parses CLI output, make sure that behavior is documented and tested so upgrades do not break the pipeline unexpectedly.",
          "Keep automation narrow. A job that only needs to create a short-lived preview tunnel should not inherit a broad token or rely on a developer machine assumption such as a preexisting shell profile.",
        ],
      },
      {
        id: "operating-habits",
        title: "Build good operating habits",
        summary: "The CLI becomes easier the moment the team uses it consistently.",
        paragraphs: [
          "Use durable names, avoid unexplained local aliases, and standardize a few commands in team docs. That helps support, QA, and other engineers understand what is running without reverse engineering personal habits.",
          "Once the commands are stable, the CLI stops feeling like an implementation detail and starts feeling like part of the product surface itself.",
        ],
      },
    ],
    nextSteps: [
      {
        title: "Open HTTP Tunnels",
        description: "See how tunnel lifecycle, naming, and health fit into the wider platform.",
        href: "/docs/http_tunnels",
      },
      {
        title: "Open Requests",
        description: "Inspect what actually crossed the tunnel after the CLI created it.",
        href: "/docs/requests",
      },
    ],
  },
  {
    key: "http_tunnels",
    href: "/docs/http_tunnels",
    title: "HTTP Tunnels",
    description:
      "Learn how Binboi exposes local HTTP services, models tunnel health, and keeps routing understandable across environments.",
    category: "Using Binboi",
    readingTime: "6 min read",
    summary: [
      "Understand what an HTTP tunnel is responsible for and what it is not.",
      "Choose names, regions, and settings that make operations legible.",
      "Know where to look when the tunnel is up but traffic still fails.",
    ],
    sections: [
      {
        id: "tunnel-model",
        title: "Tunnel model",
        summary: "A tunnel connects a public entry point to a specific local or internal service.",
        paragraphs: [
          "An HTTP tunnel gives an externally reachable URL to a service listening on a private port. Binboi handles the ingress and lifecycle reporting around that connection, while your application still owns the actual response logic.",
          "This separation matters because it keeps debugging honest. A tunnel can be healthy while your service still returns `500`, or your service can be healthy while the tunnel is pointed at the wrong port or workspace.",
        ],
      },
      {
        id: "naming-and-routing",
        title: "Naming and routing",
        summary: "Tunnel names should explain purpose and ownership before anyone clicks deeper.",
        paragraphs: [
          "Use names that combine environment, service, or audience when a tunnel is shared for more than a few minutes. Clear naming lowers the cost of support, handoff, and cleanup because the dashboard stays readable even when many tunnels exist at once.",
          "Routing clarity matters just as much. If several services will be exposed, decide whether each gets its own tunnel, hostname pattern, or environment convention. That keeps public URLs from becoming accidental infrastructure.",
        ],
      },
      {
        id: "headers-and-hosts",
        title: "Headers and host behavior",
        summary: "Know what the upstream service expects before you start rewriting requests by instinct.",
        paragraphs: [
          "Some applications care deeply about the incoming host header, protocol, or forwarded metadata. If your local service generates bad redirects, mixed-content warnings, or CSRF errors, inspect how it interprets the request once it has passed through the tunnel.",
          "Binboi can get traffic to your service correctly while the service itself still rejects or rewrites the request due to assumptions about origin, scheme, or proxy headers. That is an application-level concern, not a sign that the tunnel failed to connect.",
        ],
      },
      {
        id: "health-and-reconnects",
        title: "Health and reconnects",
        summary: "A healthy session is more than one successful request.",
        paragraphs: [
          "Watch for lifecycle state, last seen timestamps, and repeated reconnect behavior. A tunnel that flaps in and out of health can create confusing symptoms where some requests arrive and others appear to vanish.",
          "If the tunnel reconnects often, check local process stability, machine sleep behavior, network conditions, and whether another service is contending for the same local port.",
        ],
      },
      {
        id: "production-adjacent-guardrails",
        title: "Production-adjacent guardrails",
        summary: "Shared environments deserve more than a one-liner and hope.",
        paragraphs: [
          "Once a tunnel supports real team workflows, add durable naming, explicit region selection, owned tokens, and basic runbooks for restart or handoff. Those guardrails prevent the setup from depending on a single person remembering special cases.",
          "The product is most useful when the same tunnel can be explained by anyone on the team after glancing at the dashboard, not just by the person who created it.",
        ],
      },
    ],
    nextSteps: [
      {
        title: "Open Requests",
        description: "Inspect the HTTP evidence that flows across your tunnels.",
        href: "/docs/requests",
      },
      {
        title: "Open Regions",
        description: "Choose where traffic should enter the network for latency and policy reasons.",
        href: "/docs/regions",
      },
    ],
  },
  {
    key: "requests",
    href: "/docs/requests",
    title: "Requests",
    description:
      "Inspect the traffic that passed through Binboi so product, support, and engineering can debug from the same evidence.",
    category: "Using Binboi",
    readingTime: "5 min read",
    summary: [
      "See what request metadata matters first.",
      "Trace a request from arrival to response outcome.",
      "Use captured traffic to answer operational questions quickly.",
    ],
    sections: [
      {
        id: "what-is-captured",
        title: "What Binboi captures",
        summary: "The request view should tell you what happened without making you reconstruct the story manually.",
        paragraphs: [
          "At minimum, request inspection should show method, path, status, timestamp, duration, and enough header or payload context to understand why the upstream service behaved the way it did. Binboi uses that data to turn a tunnel from a black box into an explainable system.",
          "The right amount of detail is the amount that helps a human make a decision. Too little and debugging becomes guesswork. Too much and the product turns into an unreadable packet dump.",
        ],
      },
      {
        id: "request-lifecycle",
        title: "Request lifecycle",
        summary: "A useful request trace explains both delivery and outcome.",
        paragraphs: [
          "When a request enters through a public URL, the system should make it clear which tunnel accepted it, when it was forwarded, and how the upstream service responded. That chain is what lets you tell the difference between network reachability, service errors, and client mistakes.",
          "If a request never appears, start by proving it reached the public URL at all. If it appears but ends badly, compare the status, path, and timing against your upstream logs.",
        ],
      },
      {
        id: "filtering-and-search",
        title: "Filtering and search",
        summary: "The fastest way to debug is usually to narrow the traffic set, not to read everything.",
        paragraphs: [
          "Filter by path, status code family, time window, or tunnel name when the dashboard starts filling with traffic. A narrow result set helps you isolate one failing integration without getting distracted by unrelated requests from other services or teammates.",
          "Good filters also make incident review easier. If support says a webhook failed at a specific time, you should be able to locate the relevant request in seconds, not after manually scrolling through an undifferentiated stream.",
        ],
      },
      {
        id: "response-debugging",
        title: "Response debugging",
        summary: "Captured traffic should help you reason about both client and server behavior.",
        paragraphs: [
          "If the upstream service returned an error, compare the request shape against what the service expects. Header mismatches, wrong methods, or missing signatures are common causes, especially in webhook flows.",
          "If the response looks correct in the upstream logs but wrong in the client, inspect redirects, host assumptions, and whether the client followed the expected path. Request visibility is often the bridge between two teams each convinced the other side is wrong.",
        ],
      },
      {
        id: "using-requests-operationally",
        title: "Use request data operationally",
        summary: "Requests are not only for debugging bugs after the fact.",
        paragraphs: [
          "Traffic data helps you decide whether a tunnel is still needed, which routes are noisy, and whether a shared environment is stable enough for other teams to depend on. It is also the foundation for future billing, alerting, and capacity conversations.",
          "When the product treats request data as a first-class surface, teams stop asking 'did anything even hit the service?' and move directly to the interesting question: 'what exactly happened and what should we change?'",
        ],
      },
    ],
    nextSteps: [
      {
        title: "Open Webhooks",
        description: "Apply request inspection to the most failure-prone integration pattern most teams use.",
        href: "/docs/webhooks",
      },
      {
        title: "Open Logs",
        description: "Correlate request data with broader system events and tunnel lifecycle details.",
        href: "/docs/logs",
      },
    ],
  },
  {
    key: "webhooks",
    href: "/docs/webhooks",
    title: "Webhooks",
    description:
      "Use Binboi to receive, inspect, replay, and explain third-party webhook traffic without burning hours on blind debugging.",
    category: "Debugging",
    readingTime: "6 min read",
    summary: [
      "Capture real provider traffic against a local or staging service.",
      "Inspect signatures, retries, and payload shape before changing code.",
      "Replay and compare webhook deliveries safely.",
    ],
    sections: [
      {
        id: "why-webhooks-are-hard",
        title: "Why webhooks are hard",
        summary: "Webhook debugging mixes network issues, payload issues, and application issues in one frustrating loop.",
        paragraphs: [
          "A provider says it sent an event. Your application says it never received one or rejected the signature. Meanwhile the network path between them is invisible unless you deliberately instrument it. That is why webhook work so often turns into speculation.",
          "Binboi helps because it gives you a stable ingress point and request evidence you can inspect immediately. Instead of wondering whether the provider retried, which path it hit, or what headers were present, you can look at the actual delivery attempt.",
        ],
      },
      {
        id: "capture-provider-traffic",
        title: "Capture provider traffic",
        summary: "Point the provider at a Binboi URL and keep the local handler simple at first.",
        paragraphs: [
          "When setting up a webhook provider, use a dedicated Binboi tunnel or route so the traffic is easy to isolate. If possible, start with a handler that logs the event type and responds successfully before layering on business logic.",
          "That approach proves the transport path first. Once you know the provider can reach your service through Binboi, you can narrow subsequent failures to parsing, validation, or downstream processing.",
        ],
      },
      {
        id: "verify-signatures",
        title: "Verify signatures and metadata",
        summary: "Most webhook mysteries become ordinary bugs once the headers are visible.",
        paragraphs: [
          "Signature failures usually come from reading the wrong raw body, using the wrong secret, or handling an unexpected header shape from the provider. Request inspection makes those mismatches concrete instead of theoretical.",
          "Do not rotate secrets or rewrite your handler blindly. First compare the captured delivery against the provider's docs and your application's verification code. A single missing header or altered payload encoding can explain the whole failure.",
        ],
      },
      {
        id: "replay-safely",
        title: "Replay safely",
        summary: "Replay should help you prove a fix, not create another layer of confusion.",
        paragraphs: [
          "Replaying a captured request is useful when you want to compare pre-fix and post-fix behavior without waiting for the provider to retry on its own schedule. It is also helpful when support or QA needs to reproduce a specific event type locally.",
          "Be careful with side effects. If the webhook mutates data or triggers emails, make sure you are replaying into an environment where those consequences are acceptable and understood.",
        ],
      },
      {
        id: "move-to-stable-workflow",
        title: "Move from ad hoc debugging to a stable workflow",
        summary: "The best webhook setup is boring enough that the next person can run it without you.",
        paragraphs: [
          "Once the flow works, document the provider endpoint, the owning token, the signature secret source, and where to inspect requests when something fails. That turns webhook debugging from a personal ritual into a repeatable operational path.",
          "The time you save here compounds quickly because webhook issues tend to return under deadline pressure, not when everyone is calmly available to reconstruct the setup from scratch.",
        ],
      },
    ],
    nextSteps: [
      {
        title: "Open API",
        description: "Automate tunnel and endpoint workflows once the manual webhook path is stable.",
        href: "/docs/api",
      },
      {
        title: "Open Troubleshooting",
        description: "Use a structured checklist when webhook traffic still does not behave correctly.",
        href: "/docs/troubleshooting",
      },
    ],
  },
  {
    key: "api",
    href: "/docs/api",
    title: "API",
    description:
      "Use the Binboi API to automate workspace operations, manage endpoints, and keep shared environments consistent across teams.",
    category: "Debugging",
    readingTime: "7 min read",
    summary: [
      "Understand when the API is better than the dashboard or CLI.",
      "Authenticate requests with explicit scope and ownership.",
      "Automate endpoints and policy updates in a controlled way.",
    ],
    sections: [
      {
        id: "api-gateway-model",
        title: "Think in control plane operations",
        summary: "The API is for repeatability and integration, not just for replacing button clicks.",
        paragraphs: [
          "Use the API when you need the same workspace changes to happen reliably across environments or as part of another system. That includes creating endpoints, updating traffic rules, enumerating active resources, and feeding request or usage data into your own tooling.",
          "The dashboard is still the easiest way to learn the product model. The API becomes valuable when the workflow needs to be replayed, reviewed, or run by automation without a human in the middle.",
        ],
      },
      {
        id: "auth-and-scopes",
        title: "Authenticate with explicit scopes",
        summary: "API credentials should be narrower than people think they need.",
        paragraphs: [
          "Give API consumers their own tokens instead of reusing interactive credentials. This keeps ownership legible and ensures revocation decisions affect exactly one workflow at a time.",
          "If an integration only needs to create or inspect endpoints, scope it to that responsibility. Broad API access may feel faster at the beginning, but it increases blast radius and makes future audits harder.",
        ],
        codeSamples: [
          {
            language: "bash",
            title: "Authenticated API request",
            code: "curl https://api.binboi.dev/v1/endpoints \\\n  -H 'Authorization: Bearer bb_api_xxxxx' \\\n  -H 'Content-Type: application/json'",
          },
        ],
      },
      {
        id: "create-and-update-resources",
        title: "Create and update resources predictably",
        summary: "Infrastructure-like workflows benefit from declarative or scripted updates.",
        paragraphs: [
          "If your team creates repeatable preview environments, webhook endpoints, or shared staging ingress, the API lets you encode those steps in scripts or deployment tooling rather than asking people to remember dashboard sequences.",
          "Keep request bodies explicit and version your payload examples next to the environments that depend on them. That creates a paper trail for why a route, policy, or endpoint changed.",
        ],
        codeSamples: [
          {
            language: "json",
            title: "Example endpoint payload",
            code: "{\n  \"name\": \"staging-api\",\n  \"protocol\": \"http\",\n  \"upstream\": {\n    \"url\": \"http://127.0.0.1:8080\"\n  },\n  \"region\": \"fra\"\n}",
          },
        ],
      },
      {
        id: "inspect-and-audit",
        title: "Inspect and audit changes",
        summary: "Automation is useful only when humans can still understand what changed.",
        paragraphs: [
          "Pair creation or update calls with read paths that verify the resulting state. If the API says an endpoint exists, the dashboard and CLI should tell the same story when a human checks the workspace.",
          "Auditability improves when integrations produce stable names and when the team knows where to look for request evidence after an automated change. Otherwise an API-driven workflow becomes harder to support than a manual one.",
        ],
      },
      {
        id: "ship-safely",
        title: "Ship API automation safely",
        summary: "Small guardrails prevent large configuration drift later.",
        paragraphs: [
          "Pin API versions or contract assumptions where possible, store example requests in the repo, and keep one owner for each automated workflow. Those habits make integrations safer to evolve as the product surface grows.",
          "The moment an API workflow starts managing something another team depends on, treat it like product infrastructure. Review the payloads, document failure modes, and make the cleanup path as explicit as the creation path.",
        ],
      },
    ],
    nextSteps: [
      {
        title: "Open Logs",
        description: "Correlate API-driven changes with tunnel lifecycle and request activity.",
        href: "/docs/logs",
      },
      {
        title: "Open Known Gaps",
        description: "See which surfaces are still rough or still depend on upstream services.",
        href: "/docs/bugs",
      },
    ],
  },
  {
    key: "logs",
    href: "/docs/logs",
    title: "Logs",
    description:
      "Use logs to understand tunnel lifecycle, relay activity, and the surrounding context that request lists alone cannot show.",
    category: "Debugging",
    readingTime: "5 min read",
    summary: [
      "Know which events belong in logs versus request inspection.",
      "Correlate lifecycle events with traffic and operator actions.",
      "Share useful evidence without flooding teammates with noise.",
    ],
    sections: [
      {
        id: "log-surfaces",
        title: "What logs are for",
        summary: "Logs explain the system context around a request, not only the request itself.",
        paragraphs: [
          "Request inspection is ideal when you need to study one HTTP exchange. Logs are better when you need to understand session lifecycle, reconnect patterns, auth failures, or other control-plane events that affect traffic before a request ever reaches the application.",
          "A healthy docs and product experience keeps those surfaces distinct but connected. You should know when to leave the request view and consult logs for the wider picture.",
        ],
      },
      {
        id: "correlate-events",
        title: "Correlate events",
        summary: "The most useful logs are the ones you can align with a real timeline.",
        paragraphs: [
          "When something failed, ask what else happened around the same minute: did the tunnel reconnect, did a token get revoked, did the local process restart, or did a region change occur? Logs help answer those questions without guesswork.",
          "If the request timeline and the log timeline disagree, that discrepancy is itself a clue. It may point to a workspace mismatch, stale UI state, or a problem in the event pipeline rather than in the service you are debugging.",
        ],
      },
      {
        id: "share-evidence",
        title: "Share evidence efficiently",
        summary: "The goal is to give teammates enough context to act, not to dump raw output into chat.",
        paragraphs: [
          "When escalating an issue, share the tunnel name, timestamp, region, and the small set of relevant log lines rather than pasting an unfiltered terminal history. That makes the handoff usable for support, platform, or another engineer stepping in later.",
          "A system becomes easier to operate when the logs naturally support this kind of short, high-signal escalation.",
        ],
      },
      {
        id: "common-patterns",
        title: "Recognize common patterns",
        summary: "Repeated log shapes often point to operational classes of problems.",
        paragraphs: [
          "Frequent reconnects often suggest local instability or network churn. Repeated unauthorized events point to token or workspace issues. Quiet logs during an expected delivery window suggest the traffic never arrived at the public edge in the first place.",
          "You do not need every event memorized. You need a reliable way to notice when the pattern does not match what the workflow should be doing.",
        ],
      },
      {
        id: "build-runbooks",
        title: "Turn log knowledge into runbooks",
        summary: "If the same investigation happens twice, it deserves a short documented path.",
        paragraphs: [
          "Use what you learn from logs to write tiny runbooks: what to check first, which fields matter, and what a good state looks like. That makes the next incident faster and lowers the dependence on individual memory.",
          "The best logs are not just visible. They are easy to turn into shared operational habits.",
        ],
      },
    ],
    nextSteps: [
      {
        title: "Open Regions",
        description: "Use placement information alongside logs to explain latency or policy-related behavior.",
        href: "/docs/regions",
      },
      {
        title: "Open Debugging",
        description: "Use logs, requests, and configuration checks together in a structured debugging flow.",
        href: "/docs/debugging",
      },
    ],
  },
  {
    key: "regions",
    href: "/docs/regions",
    title: "Regions",
    description:
      "Choose regions with intent so latency, ownership, and environment boundaries stay understandable as usage grows.",
    category: "Operations",
    readingTime: "4 min read",
    summary: [
      "Choose a region for user experience and operational clarity.",
      "Understand when region choice affects compliance or environment boundaries.",
      "Keep failover and ownership explicit rather than accidental.",
    ],
    sections: [
      {
        id: "why-region-choice-matters",
        title: "Why region choice matters",
        summary: "Regions shape both latency and operational expectations.",
        paragraphs: [
          "Choosing a region affects where traffic enters the network and how far it must travel before reaching your service. For local development the nearest region is often fine, but shared environments benefit from deliberate choices that reflect where teammates, systems, or compliance boundaries sit.",
          "A random region choice can still produce a working tunnel, but it may create subtle issues in latency, debugging expectations, or cross-team support when nobody remembers why it was selected.",
        ],
      },
      {
        id: "pick-a-default",
        title: "Pick a sensible default",
        summary: "Defaults reduce friction as long as the team knows when to override them.",
        paragraphs: [
          "For most teams, one primary development region is enough. That keeps comparisons fair when investigating performance or request timing and makes shared instructions easier to follow.",
          "If a workflow has a strong reason to use another region, name that reason explicitly in the setup docs or the tunnel itself so the exception remains legible.",
        ],
      },
      {
        id: "latency-and-boundaries",
        title: "Balance latency and boundaries",
        summary: "Fastest is not always the only requirement that matters.",
        paragraphs: [
          "Some teams choose regions for proximity to upstream services. Others choose them because data should enter the network in a certain geography or because support needs a consistent place to inspect traffic. Both are valid as long as the reason is understood.",
          "The important part is that the region is a conscious part of the workflow, not a forgotten flag copied from an old command.",
        ],
      },
      {
        id: "failover-thinking",
        title: "Think about failover before you need it",
        summary: "Region strategy becomes much easier when the fallback path is already named.",
        paragraphs: [
          "If a shared environment depends on a specific region, decide what the fallback is before an incident forces the question. That might be another region, a temporary local-only workflow, or a documented pause in availability.",
          "Failover planning does not need to be elaborate. It just needs to exist in a way that another teammate can follow without guessing.",
        ],
      },
    ],
    nextSteps: [
      {
        title: "Open Troubleshooting",
        description: "Use region context when diagnosing latency, reachability, or environment confusion.",
        href: "/docs/troubleshooting",
      },
      {
        title: "Open Logs",
        description: "Correlate region behavior with session lifecycle and request evidence.",
        href: "/docs/logs",
      },
    ],
  },
  {
    key: "troubleshooting",
    href: "/docs/troubleshooting",
    title: "Troubleshooting",
    description:
      "A practical checklist for the failures teams hit most often: bad tokens, dead tunnels, missing traffic, and confusing local behavior.",
    category: "Operations",
    readingTime: "6 min read",
    summary: [
      "Start with the smallest facts that prove where the failure lives.",
      "Use repeatable checks instead of changing multiple variables at once.",
      "Escalate with high-signal evidence when you need help.",
    ],
    sections: [
      {
        id: "tunnel-not-online",
        title: "Tunnel is not online",
        summary: "Start by proving the local service and the CLI session independently.",
        paragraphs: [
          "If a tunnel never becomes healthy, first confirm the service is actually listening on the port you passed to the CLI. Then confirm the CLI is authenticated to the workspace you expect and has not immediately exited or reconnected in a loop.",
          "This sounds basic, but it solves a large share of issues because it separates service availability from tunnel availability before you make the command more complex.",
        ],
      },
      {
        id: "auth-errors",
        title: "Authentication or token errors",
        summary: "Bad credentials are easiest to fix when ownership is clear.",
        paragraphs: [
          "If the CLI or API reports unauthorized access, check which token or login session is active and whether it belongs to the correct workspace. Tokens copied from old shell history or another environment are a common source of confusion.",
          "Do not generate three new secrets before confirming the current one. First identify the credential in use, then decide whether rotation, revocation, or a workspace switch is the correct fix.",
        ],
      },
      {
        id: "traffic-not-arriving",
        title: "Traffic is not arriving",
        summary: "Prove the request at each boundary instead of assuming it vanished somewhere in the middle.",
        paragraphs: [
          "Check whether the request reached the public URL at all. If it did, it should appear in request inspection or logs. If it appears there but not in your local service, the gap is between the edge and the upstream service. If it never appears, the issue is likely client-side, DNS-related, or pointing at the wrong URL.",
          "For webhooks, also confirm the provider is using the current endpoint and not a stale URL from a previous test.",
        ],
      },
      {
        id: "local-service-weirdness",
        title: "Local service behaves strangely",
        summary: "Some failures are app-level assumptions exposed by the tunnel, not tunnel failures.",
        paragraphs: [
          "If your service generates bad redirects, rejects requests due to origin checks, or fails signature validation after moving behind Binboi, inspect how it handles proxy headers, host values, and raw request bodies. The transport may be correct even when the application is not ready for proxied traffic.",
          "In these cases, the tunnel often reveals an application assumption that was always present but invisible during purely local testing.",
        ],
      },
      {
        id: "how-to-escalate",
        title: "Escalate with evidence",
        summary: "A short, precise bug report beats a long story built from guesses.",
        paragraphs: [
          "When you need help, share the tunnel name, timestamp, region, request path, and the smallest relevant error message or log excerpt. That gives the next person enough to reproduce the state mentally without drowning them in unrelated output.",
          "Good escalation is part of the product experience. The docs should make it obvious what evidence matters when the workflow leaves the happy path.",
        ],
      },
    ],
    nextSteps: [
      {
        title: "Open Debugging",
        description: "Use a more deliberate investigation loop once the basic checklist is complete.",
        href: "/docs/debugging",
      },
      {
        title: "Open Known Gaps",
        description: "Check whether the behavior lines up with an acknowledged rough edge in the current product.",
        href: "/docs/bugs",
      },
    ],
  },
  {
    key: "debugging",
    href: "/docs/debugging",
    title: "Debugging",
    description:
      "A structured investigation flow that connects configuration, requests, logs, and application behavior into one repeatable method.",
    category: "Operations",
    readingTime: "5 min read",
    summary: [
      "Start with a known-good baseline before changing anything.",
      "Use requests and logs together instead of in isolation.",
      "Turn one successful fix into a reusable debugging pattern.",
    ],
    sections: [
      {
        id: "establish-baseline",
        title: "Establish a baseline",
        summary: "You need one thing that is definitely true before you can interpret anything else.",
        paragraphs: [
          "Begin by proving a simple request can make it through the tunnel to your service. If you cannot do that, do not start with the weird edge case that originally brought you here. A baseline request tells you whether the stack is alive at all.",
          "That baseline can be as small as a health route returning `200`. The important part is that it removes ambiguity while you inspect the system.",
        ],
      },
      {
        id: "reduce-variables",
        title: "Reduce variables",
        summary: "Good debugging removes moving parts faster than it adds them.",
        paragraphs: [
          "Strip the workflow back to one tunnel, one credential, one region, and one request path if possible. Every extra layer you keep in play makes it harder to say which component actually caused the result you are seeing.",
          "This is especially important with webhooks, shared staging services, and automation, where multiple systems may be acting at once.",
        ],
      },
      {
        id: "compare-evidence",
        title: "Compare requests, logs, and application output",
        summary: "The answer usually lives in the mismatch between two sources of truth.",
        paragraphs: [
          "Look at the captured request, then compare it with your service logs and any client or provider feedback. If all three tell the same story, you already know where to fix the issue. If they disagree, that disagreement narrows the search space dramatically.",
          "For example, a request that appears in Binboi but not in the app logs points toward upstream routing or app listener issues. A request that appears in both but still fails may point to application logic or validation.",
        ],
      },
      {
        id: "verify-fix",
        title: "Verify the fix with the same input",
        summary: "A fix is only convincing when you can compare before and after with minimal noise.",
        paragraphs: [
          "Once you think you understand the problem, rerun the smallest request or replay the captured event. Keep everything else constant if possible so the difference in outcome is meaningful.",
          "This step is what converts debugging from a hopeful change into an actual learning loop.",
        ],
      },
      {
        id: "capture-learning",
        title: "Capture the learning",
        summary: "If the investigation was painful, leave the next person a shorter path.",
        paragraphs: [
          "Update the docs, the config comments, or a short internal runbook with what failed and what resolved it. The goal is not bureaucracy. It is reducing the odds that the same class of issue costs the team another late afternoon.",
          "Good product docs are part of that memory system, which is why this page exists at all.",
        ],
      },
    ],
    nextSteps: [
      {
        title: "Open Logs",
        description: "Dig deeper into lifecycle and event context around the requests you inspected.",
        href: "/docs/logs",
      },
      {
        title: "Open Troubleshooting",
        description: "Use the quick checklist version when you need a faster starting point.",
        href: "/docs/troubleshooting",
      },
    ],
  },
  {
    key: "bugs",
    href: "/docs/bugs",
    title: "Known Gaps",
    description:
      "Current rough edges, external dependencies, and product areas that still need hardening so you know what is real versus unfinished.",
    category: "Operations",
    readingTime: "4 min read",
    summary: [
      "See which workflows still depend on upstream or incomplete services.",
      "Recognize rough edges before treating them as your own integration bug.",
      "Understand where the next hardening work should go.",
    ],
    sections: [
      {
        id: "current-dependencies",
        title: "Current dependencies",
        summary: "Some product surfaces still assume other services exist and behave correctly.",
        paragraphs: [
          "Authentication, billing-ready usage views, and some control-plane actions still depend on upstream services beyond this frontend. If those backends are unavailable or only partially implemented, the UI may expose placeholders, empty states, or intentionally obvious gaps rather than pretending everything is complete.",
          "That honesty is useful. It tells you whether you are debugging your setup or simply running into an unfinished contract in the product itself.",
        ],
      },
      {
        id: "rough-ui-edges",
        title: "Current rough UI edges",
        summary: "Some docs and dashboard areas were scaffolded before their final content model existed.",
        paragraphs: [
          "A few pages in this repository started life as placeholders while the information architecture was still being sorted out. The fix is not more scattered page-specific code. It is shared content structure and consistent rendering, which is exactly the direction the docs should move.",
          "When you see mismatched language, sparse copy, or routes that feel more skeletal than explanatory, treat that as a product debt item rather than an integration failure.",
        ],
      },
      {
        id: "operational-caveats",
        title: "Operational caveats",
        summary: "Early-stage tooling benefits from explicit assumptions.",
        paragraphs: [
          "Local development workflows may be smoother than multi-user shared environments if backend contracts for collaboration, auditing, or billing are still evolving. That does not make the product unusable, but it does change what kind of confidence you should expect from each surface.",
          "Use durable naming and documented ownership anyway. Those habits make the later hardening work much easier.",
        ],
      },
      {
        id: "what-to-stabilize-next",
        title: "What to stabilize next",
        summary: "The next wins are the ones that reduce ambiguity for operators.",
        paragraphs: [
          "The highest-value improvements are stronger data contracts, cleaner docs rendering, more consistent token and workspace visibility, and reducing duplicate route-level UI code that drifts over time.",
          "Those changes help both the product team and the people using the product, because they make the system easier to explain under pressure.",
        ],
      },
    ],
    nextSteps: [
      {
        title: "Open Docs Layout",
        description: "See how the docs experience itself is structured so future changes stay consistent.",
        href: "/docs/layout",
      },
      {
        title: "Back to Overview",
        description: "Return to the main docs map and continue along the pages that match your workflow.",
        href: "/docs",
      },
    ],
  },
  {
    key: "layout",
    href: "/docs/layout",
    title: "Docs Layout",
    description:
      "How the documentation experience is structured so pages stay consistent, searchable, and easier to maintain over time.",
    category: "Operations",
    readingTime: "4 min read",
    summary: [
      "Understand the shared docs shell and why it exists.",
      "Keep right-side step navigation available on every page.",
      "Prefer shared content structure over page-by-page drift.",
    ],
    sections: [
      {
        id: "shell-and-sidebar",
        title: "Shell and sidebar",
        summary: "The docs shell should provide stable navigation without fighting the article content.",
        paragraphs: [
          "The left sidebar is responsible for durable route navigation across the docs experience. It should stay predictable, show the major categories clearly, and make it easy to jump between setup, workflow, and operations topics without losing context.",
          "That shell-level consistency matters because documentation becomes harder to trust the moment each page feels like it was built from a different product.",
        ],
      },
      {
        id: "step-navigation-pattern",
        title: "StepNavigation on every page",
        summary: "The right rail exists to keep long documentation scannable without hiding detail.",
        paragraphs: [
          "A page-level step navigation helps readers jump between sections, understand progress at a glance, and recover when they land in the middle of a long article. It is particularly valuable for docs written in a tutorial or operational-checklist style.",
          "Keeping the pattern on every page also reduces cognitive overhead. Once someone learns how to move through one page, the rest of the docs behave the same way.",
        ],
      },
      {
        id: "content-conventions",
        title: "Content conventions",
        summary: "Shared structure is what keeps documentation maintainable as it grows.",
        paragraphs: [
          "Each page should have a clear title, a short description, a set of section anchors, and a next-step path. That makes it easier to write, easier to review, and easier to update later without rethinking the whole UI.",
          "When content is centralized instead of embedded ad hoc in each page component, the docs become much easier to refactor without breaking route behavior or navigation patterns.",
        ],
      },
      {
        id: "future-extension",
        title: "Extend the docs carefully",
        summary: "New pages should inherit the system instead of inventing another one.",
        paragraphs: [
          "If you add more docs, prefer adding structured content and reusing shared renderers over introducing isolated one-off layouts. That keeps the visual language stable and prevents the exact kind of maintenance pain that appears when content and UI drift apart.",
          "A clean docs system is not just aesthetic. It materially reduces how long future changes take.",
        ],
      },
    ],
    nextSteps: [
      {
        title: "Back to Overview",
        description: "Return to the main docs hub and continue through product-focused documentation.",
        href: "/docs",
      },
      {
        title: "Open Known Gaps",
        description: "Review the product and documentation debt that still needs cleanup.",
        href: "/docs/bugs",
      },
    ],
  },
];

export function getDocsPageByKey(key: string) {
  return DOCS_PAGES.find((page) => page.key === key);
}

export function getDocsPageByHref(href: string) {
  return DOCS_PAGES.find((page) => page.href === href);
}
