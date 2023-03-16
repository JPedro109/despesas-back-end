export abstract class AbstractGenerationService {
  abstract code(): string;
  abstract codeExpirationDate(timeInMinutes: number): number;
}
