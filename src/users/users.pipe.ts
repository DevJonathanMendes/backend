import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
class UsersPipeTransform implements PipeTransform {
  transform(data: CreateUserDto, { metatype }: ArgumentMetadata) {
    if (typeof data !== 'object' || data === null) return data;

    const sanitizedData: Record<string, any> = {};

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'username' || isEmail(value)) {
        return (sanitizedData[key] = value.toLowerCase());
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
}
