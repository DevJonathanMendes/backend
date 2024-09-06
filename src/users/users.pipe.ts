import { Injectable, PipeTransform } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { createHash } from 'crypto';

@Injectable()
export class UsersPipeTransform implements PipeTransform {
  transform(data: Record<string, any>) {
    const sanitizedData: Record<string, any> = {};

    if (typeof data !== 'object' || data === null) return data;

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'username' || isEmail(value)) {
        return (sanitizedData[key] = value.toLowerCase());
      }

      if (key === 'password') {
        return (sanitizedData[key] = this.passwordHash(value));
      }

      return (sanitizedData[key] = value);

      // Remove espaços em branco duplicados.
      /* if (typeof value === 'string') {
        return (sanitizedData[key] = value
          .replace(/\s{2,}(?![\d\s]*$)/g, ' ')
          .trim());
      } */
    });

    return sanitizedData;
  }

  private passwordHash(password: string) {
    return password.length > 0
      ? createHash('sha256')
          .update(password + process.env.JWT_SECRET)
          .digest('hex')
      : undefined;
  }
}
