import { Injectable, PipeTransform } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { createHash } from 'crypto';

@Injectable()
export class UsersPipeTransform implements PipeTransform {
  transform(data: Record<string, any>) {
    const sanitizedData: Record<string, any> = {};

    if (typeof data === 'object') {
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'password') {
          sanitizedData[key] = this.passwordHash(value);
        } else {
          sanitizedData[key] = this.sanitizeValue(value);
        }
      });

      return sanitizedData;
    }

    return data;
  }

  private sanitizeValue(value: string): string {
    if (typeof value === 'string') {
      value = value.replace(/\s{2,}(?![\d\s]*$)/g, ' ').trim();

      if (isEmail(value)) {
        value = value.toLowerCase();
      }
    }

    return value;
  }

  private passwordHash(password: string) {
    if (password.length < 1) return undefined;

    return createHash('sha256')
      .update(password + process.env.JWT_SECRET)
      .digest('hex');
  }
}
