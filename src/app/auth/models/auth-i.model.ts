export interface AuthIModel {
  id: number;
  username: string;
  email: string;
  user?: Array<any>;
  tokenType?: string;
  access_token: string;
  expires_in?: string;

}
