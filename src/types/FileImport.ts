import { plainToClass } from 'class-transformer';

export class FileImport {
  type: "FileImport" = "FileImport";
  source: string;
  
  static fromJson( value ) {
    return plainToClass(FileImport, value);
  }
}
