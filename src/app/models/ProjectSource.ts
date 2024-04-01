
export interface SourceProject {
  Id: string,
  Name: string,
  Key: string,
};

export interface SourceCredentials {
  Id: number,
  SourceURL: string,
  SourceUserEmail: string,
  SourceAuthToken: string
};

export interface CustomField {
  Id: number;
  CustomFieldKey: string;
  CustomFieldValue: string;
}
export interface SourceFieldsResponse {
  sourceCustomFields: CustomField[];
  userCustomFields: CustomField[];
  sourceProject: SourceProject[];
  userProject?: SourceProject;
}
