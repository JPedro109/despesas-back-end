export class LogModel {
  constructor(
    public readonly id: string,
    public readonly level: string,
    public readonly title: string,
    public readonly message: string,
    public readonly trace?: string,
  ) {}
}
