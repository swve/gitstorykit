export interface ParamsInterface {
  owner: string;
  repo: string;
  sha: string;
  token?: string;
}

export interface TimeInterface {
  date: {
    years?: number;
    weeks?: number;
    months?: number;
  };
  commit?: string;
}
