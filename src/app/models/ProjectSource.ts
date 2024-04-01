export interface ProjectSource{
  Id: string,
  Name: string,
  Key: string
};

export interface SourceCredentials{
  Id: number,
  SourceURL: string,
  SourceUserEmail: string,
  SourceAuthToken: string
};
