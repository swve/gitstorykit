import { ParamsInterface } from "../../interfaces";
import { Octokit } from "@octokit/rest";
import parse from "parse-link-header";

export class GithubClient {
  private octokit;
  private config;

  init(params: ParamsInterface) {
    this.octokit = new Octokit({ auth: params.auth });
    this.config = {
      owner: params.owner,
      repo: params.repo,
    };
  }

  /**
   * Get first commit
   * @param params
   */
  async getFirstCommit() {
    // Get link header
    const res = await this.octokit.rest.repos.listCommits(this.config);
    const link = parse(res.headers.link);

    // Get first commit
    const commits = await this.octokit.rest.repos.listCommits({
      page: Number(link.last.page),
      per_page: Number(link.last.per_page),
      ...this.config,
    });
    const firstcommit = commits.data[commits.data.length - 1];
    return firstcommit;
  }

  /**
   * Get first commit date
   * Dates are in ISO 8601 format
   * @param params
   */
  async getFirstCommitDate() {
    const commit = this.getFirstCommit();
    const date = await (await commit).commit.author.date;
    return date;
  }

  /**
   * Get last commit date
   * Dates are in ISO 8601 format
   * @param params
   */
  async getLastCommitDate() {
    const commit = await this.octokit.rest.repos.listCommits({
      per_page: 1,
      ...this.config,
    });
    const date = await commit.data[0].commit.author.date;
    return date;
  }

  /**
   * Get a commit date
   * Dates are in ISO 8601 format
   */
  async getCommitDate(commit_sha: string) {
    const commit = await this.octokit.rest.git.getCommit({
      commit_sha: commit_sha,
      ...this.config,
    });
    const date = await commit.data.author.date;
    return date;
  }

  /**
   * Get a particular day commits
   * Dates are in ISO 8601 format
   * @param params
   */
  async getCommitsBetween(startDate: string, endDate: string, per_page: number, page: number) {
    const res = await this.octokit.rest.repos.listCommits({
      since: startDate,
      until: endDate,
      per_page: per_page,
      page: page,
      ...this.config,
    });
    return res;
  }

  /**
   * Get commits list until date in ISO 8601 format
   * Dates are in ISO 8601 format
   * @param date
   */
  async getCommitsUntil(date: string, per_page: number, page: number) {
    const res = await this.octokit.rest.repos.listCommits({
      until: date,
      per_page: per_page,
      page: page,
      ...this.config,
    });
    return res;
  }

  /**
   * Get a list of a repo active years
   * Returns an array of years
   * @param
   */
  async yearsActive() {
    const first = await this.getFirstCommitDate();
    const last = await this.getLastCommitDate();
    const firstYear = parseInt(first.substring(0, 4));
    const lastYear = parseInt(last.substring(0, 4));

    

    const years = [];
    for (let i = firstYear; i <= lastYear; i++) {
      years.push(i);
    }
    return years;
  }
}
