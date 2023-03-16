export abstract class AbstractCryptographyService {
  abstract hash(value: string): Promise<string>;
  abstract compareHash(
    hash: string,
    valueToBeCompared: string,
  ): Promise<boolean>;
}
