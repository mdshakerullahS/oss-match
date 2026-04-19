import { parseDateValue, isFutureDate, formatRegex } from "@/utils/queryParser";

const DEFAULT_LOOKBACK_DAYS = 90;

export function buildGitHubQuery(searchParams: URLSearchParams) {
  const q = searchParams.get("q");
  const label = searchParams.get("label");
  const language = searchParams.get("language");
  const sort = searchParams.get("sort");
  const updated = searchParams.get("updated");
  const comments = searchParams.get("comments");
  const unassigned = searchParams.get("unassigned") === "true";
  const pageParam = searchParams.get("page") || "1";

  const page = Math.min(Number(pageParam), 100);

  if (isNaN(page) || page < 1) {
    throw new Error("Invalid page number");
  }

  let updatedQuery = "";

  if (updated) {
    const match = updated.match(formatRegex);
    if (!match) throw new Error("Invalid updated format");

    const operator = match[1] || "";
    const val1 = match[2];
    const val2 = match[3];

    const date1 = parseDateValue(val1);
    if (isFutureDate(date1)) throw new Error("Invalid updated date");

    if (val2) {
      const date2 = parseDateValue(val2);
      if (isFutureDate(date2)) throw new Error("Invalid updated date");

      const [start, end] = [date1, date2].sort();
      updatedQuery = `updated:${start}..${end}`;
    } else {
      updatedQuery = `updated:${operator}${date1}`;
    }
  }

  const queryParts: string[] = [
    "state:open",
    "is:issue",
    "archived:false",
    `created:>${parseDateValue(String(DEFAULT_LOOKBACK_DAYS))}`,
  ];

  if (q) queryParts.push(q);
  if (label) queryParts.push(`label:"${label}"`);
  if (language) queryParts.push(`language:${language}`);
  if (updatedQuery) queryParts.push(updatedQuery);
  if (comments) queryParts.push(`comments:${comments}`);
  if (unassigned) queryParts.push("no:assignee");

  const githubQuery = queryParts.join(" ");

  let sortParams = "&sort=created&order=desc";
  if (sort === "created-asc") {
    sortParams = "&sort=created&order=asc";
  }

  return { githubQuery, sortParams, page };
}
