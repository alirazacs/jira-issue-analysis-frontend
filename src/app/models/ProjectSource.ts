
export interface SourceProject {
  id: string,
  name: string,
  key: string,
};

export interface SourceCredentials {
  id: number,
  sourceURL: string,
  sourceUserEmail: string,
  sourceAuthToken: string
};

export interface CustomField {
  id: number;
  customFieldKey: string;
  customFieldValue: string;
}
export interface SourceFieldsResponse {
  sourceCustomFields: CustomField[];
  teamBoardCustomField?: CustomField;
  storyPointsCustomField?: CustomField;
  sourceProjects: SourceProject[];
  userProject?: SourceProject;
}
