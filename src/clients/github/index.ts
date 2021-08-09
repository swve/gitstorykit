import { ParamsInterface, TimeInterface } from "../../interfaces";
import { Octokit } from "@octokit/rest";
import * as parse from "parse-link-header";

export class GithubClient {
  octokit = new Octokit();
  private config;

  init(params: ParamsInterface) {
    this.config = {
      owner: params.owner,
      repo: params.repo,
      token: params.token,
      sha: params.token,
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
   * @param params
   */
  async getFirstCommitDate() {
    const commit = this.getFirstCommit();
    const date = await (await commit).commit.author.date;
    return date;
  }

  /**
   * Get a commit date
   */ 
  async getCommitDate(commit_sha:string) {
    const commit = await this.octokit.rest.git.getCommit({
      commit_sha: commit_sha,
      ...this.config
    });
    const date = await commit.data.author.date;
    return date;
  }

  /**
   * Get a particular day commits 
   * @param params 
   * @returns 
   */
   async getCommitsBetween(startDate:string,endDate:string){
    const res = await this.octokit.rest.repos.listCommits({
      since:startDate,
      until:endDate,
      ...this.config
    }) 
    return res;
  }


}
