type Environment = "dev" | "qa" | "prod";

const ENVIRONMENT_MAP: Record<Environment, string> = {
  dev: "https://kavitechworld.com/VQBWebAPIDev/",
  qa: "https://kavitechworld.com/VQBWebAPIDev/",
  prod: "https://kavitechworld.com/VQBWebAPIDev/",
};

export const getBaseUrl = (): string => {
  const host = globalThis.location.hostname.toLowerCase();

  if (host.includes("localhost") || host.includes("dev")) {
    return ENVIRONMENT_MAP.dev;
  }

  if (host.includes("qa")) {
    return ENVIRONMENT_MAP.qa;
  }

  return ENVIRONMENT_MAP.prod; // default
};
