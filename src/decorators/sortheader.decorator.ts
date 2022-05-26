import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';

export const Sorting = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const sorting = context.getArgByIndex(0).headers.sorting;

    if (sorting) {
      if (sorting == 'asc' || sorting == 'desc') {
        return sorting;
      }
      throw new HttpException('wrong sort type', 500);
    }

    return 'none';
  },
);
