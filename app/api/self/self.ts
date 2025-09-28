import {
  SelfBackendVerifier,
  IConfigStorage,
  VerificationConfig,
} from "@selfxyz/core";

// Configuration storage implementation
class ConfigStorage implements IConfigStorage {
  async getConfig(_: string): Promise<VerificationConfig> {
    return new Promise<VerificationConfig>((res) =>
      res({
        excludedCountries: [],
      })
    );
  }

  async setConfig(_: string, __: VerificationConfig): Promise<boolean> {
    return new Promise((res) => res(true));
  }

  async getActionId(_: string, __: string): Promise<string> {
    return new Promise((res) => res("default_config"));
  }
}

const allowedIds = new Map<1 | 2, boolean>();
allowedIds.set(1, true);

const productionUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
const developmentUrl = process.env.NEXT_PUBLIC_DEVELOPMENT_URL;

export const selfBackendVerifier = new SelfBackendVerifier(
  "reclaim",
  developmentUrl
    ? `${developmentUrl}/api/self/`
    : productionUrl
    ? `https://${productionUrl}/api/self/`
    : "",
  developmentUrl ? true : false,
  allowedIds,
  new ConfigStorage(),
  "hex"
);
