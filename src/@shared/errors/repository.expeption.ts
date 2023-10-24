import { HttpException, HttpStatus } from '@nestjs/common';

export class RepositoryException extends HttpException {
  constructor(message: string) {
    super({ message, status: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
  }
}
