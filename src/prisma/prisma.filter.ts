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

    console.log(err);
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2000') {
        const statusCode = HttpStatus.BAD_REQUEST;
        return res.status(statusCode).json({
          message: [`The value provided for the column is too long.`],
          error: 'Bad Request',
          statusCode,
        });
      }

      if (err.code === 'P2021') {
        const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({
          message: [`The table ${err?.meta.modelName} does not exist.`],
          error: 'Internal Server Error',
          statusCode,
        });
      }

      if (err.code === 'P2025') {
        if (err?.meta.cause.includes('delete')) {
          return res.status(HttpStatus.OK).end();
        }

        if (err?.meta.cause.includes('update')) {
          const statusCode = HttpStatus.BAD_REQUEST;
          return res.status(statusCode).json({
            message: ['user does not exist'],
            error: 'Bad Request',
            statusCode,
          });
        }
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

    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    return res.status(statusCode).json({
      message: ['Something unexpected happened in the database'],
      error: 'Internal Server Error',
      statusCode,
    });
  }
}
