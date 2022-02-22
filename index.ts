import { GithubClient } from "./clients/github";
import { ParamsInterface } from "./interfaces";

// GitStory
export default class GitStory {
  private clientName: string;
  private client;

  constructor(clientName: string) {
    this.clientName = clientName;
  }

  /**
   * Git client init
   * @param params
   */

  init(params: ParamsInterface) {
    switch (this.clientName.toLowerCase()) {
      case "github":
        this.client = new GithubClient();
        this.client.init(params);

        break;

      case "gitlab":
        break;
    }
  }

  /**
   * Git Functions
   * Available Features/endpoints
   */

  async getFirstCommit() {
    return this.client.getFirstCommit();
  }

  async getFirstCommitDate() {
    return this.client.getFirstCommitDate();
  }

  async getCommitDate(commit_sha) {
    return this.client.getCommitDate(commit_sha);
  }

  async getCommitsBetweenDates(startDate, endDate, per_page: number, page: number) {
    return this.client.getCommitsBetween(startDate, endDate, per_page, page);
  }

  async getCommitsUntilDate(date, per_page: number, page: number) {
    return this.client.getCommitsUntil(date, per_page, page);
  }

  async yearsActive() {
    return this.client.yearsActive();
  }
}
