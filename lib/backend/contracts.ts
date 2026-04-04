/**
 * Shared backend contracts and normalized dashboard types.
 */
export type ServiceName = "auth" | "billing" | "controlPlane" | "engine";

export type ServiceResult<T> = {
  configured: boolean;
  ok: boolean;
  data: T | null;
  error?: string;
  errorDetails?: unknown;
  endpoint?: string;
  status?: number;
};

export type DashboardOverview = {
  activeTunnels: number;
  requestsToday: number;
  activeTokens: number;
  activeProjects: number;
  errorRate: number;
  incidentStatus: "healthy" | "degraded" | "offline";
};

export type Tunnel = {
  id: string;
  name: string;
  hostname: string;
  protocol: string;
  region: string;
  status: "healthy" | "degraded" | "offline";
  requests24h: number;
  lastSeenAt: string;
};

export type ApiToken = {
  id: string;
  name: string;
  prefix: string;
  scope: string;
  createdAt: string;
  lastUsedAt?: string;
};

export type CreatedToken = {
  id: string;
  name: string;
  prefix: string;
  token: string;
  scope: string;
  createdAt: string;
};

export type TokenCreateInput = {
  name: string;
  scope: string;
};

export type UsageSummary = {
  periodLabel: string;
  requests: number;
  bandwidthGb: number;
  errorRate: number;
  series: Array<{
    date: string;
    requests: number;
    errors: number;
  }>;
  topRoutes: Array<{
    route: string;
    requests: number;
  }>;
};

export type BillingSummary = {
  planName: string;
  status: string;
  monthlySpendUsd: number;
  includedRequests: number;
  usageRequests: number;
  renewalDate?: string;
  customerPortalUrl?: string;
};

export type EngineHealth = {
  status: "healthy" | "degraded" | "offline";
  version: string;
  instanceName: string;
  region: string;
  uptimeSeconds: number;
};

export type EngineTunnel = {
  id: string;
  name: string;
  status: "healthy" | "degraded" | "offline";
  lastSeenAt: string;
};
