import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

class BaseErrors {
  code: number;
  keyValue: string;
  identificator: string;

  constructor(error: any) {
    this.code = error.code;
    this.identificator = Object.keys(error['keyValue'])[0];
    this.keyValue = error.keyValue[this.identificator];
  }
}
export const HandleErrorsResponse = (error: any) => {
  const errorInstance = new BaseErrors(error);

  switch (errorInstance.code) {
    case 11000:
      throw new BadRequestException(
        `Pokemon exist in db with identificatator: ${errorInstance.identificator} y value:${errorInstance.keyValue} `,
      );
    default:
      console.error({ error });
      throw new InternalServerErrorException(
        `Error Unhandled show the console`,
      );
  }
};
