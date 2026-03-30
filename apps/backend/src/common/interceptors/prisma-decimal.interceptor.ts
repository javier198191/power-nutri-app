import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaDecimalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.transformDatesAndDecimals(data)));
  }

  private transformDatesAndDecimals(data: any): any {
    if (data === null || data === undefined) {
      return data;
    }

    if (data instanceof Decimal) {
      return data.toNumber();
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.transformDatesAndDecimals(item));
    }

    if (typeof data === 'object') {
      // Prisma Decimal objects mimic objects with 'd', 'e', 's' properties internally
      // and they are instances of Decimal. But just in case:
      if (typeof data.toNumber === 'function') {
        return data.toNumber();
      }

      const transformedObj: any = {};
      for (const [key, value] of Object.entries(data)) {
        transformedObj[key] = this.transformDatesAndDecimals(value);
      }
      return transformedObj;
    }

    return data;
  }
}
