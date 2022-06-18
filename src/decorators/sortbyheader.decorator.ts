import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';

export const SortingBy = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const sorting = context.getArgByIndex(0).headers.sortingby;
    if (sorting) {
      return sorting;
    }
  },
);
