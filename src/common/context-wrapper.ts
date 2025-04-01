import { ErrorContext } from './component-entities/error-context';

export class ContextWrapper<T> {
  constructor(
    public readonly entity?: T,
    public context?: ErrorContext,
  ) {}
}
