import { plainToClass } from 'class-transformer';

export class FileImport {
  type: "FileImport" = "FileImport";
  source: string;

  constructor(source: string) {
      this.source = source;
  }
  
  static fromJson( value ) {
    return plainToClass(FileImport, value);
  }
}
