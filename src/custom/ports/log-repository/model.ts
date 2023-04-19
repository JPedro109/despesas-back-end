export class LogModel {
  constructor(
    public readonly id: string,
    public readonly message: string,
    public readonly stack: string,
    public readonly name: string,
  ) {}
}
