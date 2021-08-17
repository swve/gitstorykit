import { GithubClient } from "./clients/github";
import { ParamsInterface } from "./interfaces";

// GitStory
export default class GitStory {
  private clientName: string;
  private client;

  constructor(client) {
    this.clientName = client;
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

  async getCommitDate(commit_sha){
    return this.client.getCommitDate(commit_sha);
  }

  async getCommitsBetweenDates(startDate, endDate) {
    return this.client.getCommitsBetween(startDate, endDate);
  }

  async getCommitsUntilDate(date) {
    return this.client.getCommitsUntil(date);
  }

}


