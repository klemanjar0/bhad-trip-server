export interface FileMetadata extends Record<string, string> {
  name: string;
  type: string;
  size: string;
  path?: string;
}
