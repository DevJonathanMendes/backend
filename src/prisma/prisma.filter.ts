import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(PrismaClientValidationError, PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(err: unknown & { meta: { cause: string } }, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      if (err?.meta.cause.includes('delete')) {
        return res.status(HttpStatus.OK).end();
      }

      if (err?.meta.cause.includes('update')) {
        const statusCode = HttpStatus.BAD_REQUEST;
        return res.status(statusCode).json({
          message: ['The user does not exist'],
          error: 'Bad Request',
          statusCode,
        });
      }
    }

    if (err instanceof PrismaClientValidationError) {
      const statusCode = HttpStatus.BAD_REQUEST;
      return res.status(statusCode).json({
        message: ['Missing field or incorrect field type provided'],
        error: 'Bad Request',
        statusCode,
      });
    }

    console.log(err);
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    return res.status(statusCode).json({
      message: ['Something unexpected happened in the database'],
      error: 'Internal Server Error',
      statusCode,
    });
  }
}
