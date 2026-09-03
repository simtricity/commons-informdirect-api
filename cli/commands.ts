import type { InformDirectClient } from "../lib/mod.ts";
import { formatCompanyTable, formatTokenInfo } from "./format.ts";

/** Output mode shared by every command. `json` prints one JSON document to stdout and nothing else. */
export interface OutputOptions {
  json: boolean;
  environment: "sandbox" | "production";
  baseUrl: string;
}

function emit(opts: OutputOptions, data: unknown, human: () => void): void {
  if (opts.json) {
    console.log(JSON.stringify(data, null, 2));
  } else {
    human();
  }
}

function requireCompany(companyNumber?: string): string {
  if (!companyNumber) {
    console.error("Error: --company (-c) is required");
    Deno.exit(1);
  }
  return companyNumber;
}

/**
 * Prove live access: authenticate and read the portfolio. Exits non-zero (via the caller's
 * catch) if either step fails. `authenticate` is kept as an alias.
 */
export async function whoami(
  client: InformDirectClient,
  opts: OutputOptions,
): Promise<void> {
  const tokens = await client.authenticate();
  const companies = await client.getCompanies();
  emit(opts, {
    ok: true,
    environment: opts.environment,
    baseUrl: opts.baseUrl,
    companyCount: companies.length,
    accessTokenSuffix: tokens.AccessToken.slice(-6),
  }, () => {
    console.log(`Authenticated against ${opts.environment} (${opts.baseUrl})`);
    formatTokenInfo(tokens);
    console.log(`  Companies     : ${companies.length}`);
  });
}

export async function listCompanies(
  client: InformDirectClient,
  opts: OutputOptions,
): Promise<void> {
  const companies = await client.getCompanies();
  emit(opts, { companies }, () => {
    if (companies.length === 0) {
      console.log("No companies in portfolio.");
      return;
    }
    console.log(`${companies.length} company(ies):\n`);
    formatCompanyTable(companies);
  });
}

export async function getCompany(
  client: InformDirectClient,
  opts: OutputOptions,
  companyNumber?: string,
): Promise<void> {
  const num = requireCompany(companyNumber);
  const company = await client.getCompany(num);
  emit(opts, { company: company ?? null }, () => {
    if (!company) {
      console.log(`Company ${num} not found in portfolio.`);
      return;
    }
    console.log(`Company: ${company.Name}`);
    console.log(`Number:  ${company.CompanyNumber}`);
    console.log(`URL:     ${company.PublicUrl}`);
  });
}

export async function addCompany(
  client: InformDirectClient,
  opts: OutputOptions,
  companyNumber?: string,
  authCode?: string,
): Promise<void> {
  const num = requireCompany(companyNumber);
  const result = await client.addCompany(num, authCode);
  emit(
    opts,
    { ok: true, companyNumber: num, message: result.Message ?? null },
    () => {
      console.log(result.Message ?? "Company added successfully.");
    },
  );
}

export async function removeCompany(
  client: InformDirectClient,
  opts: OutputOptions,
  companyNumber?: string,
  options?: { saveRegisters?: boolean; saveDocuments?: boolean },
): Promise<void> {
  const num = requireCompany(companyNumber);
  const result = await client.removeCompany(num, options);
  emit(
    opts,
    { ok: true, companyNumber: num, message: result.Message ?? null },
    () => {
      console.log(result.Message ?? "Company removed successfully.");
    },
  );
}
