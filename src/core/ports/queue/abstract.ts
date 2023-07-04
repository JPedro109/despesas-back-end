export abstract class AbstractQueue {
  abstract sendMessage(queue: string, object: object): Promise<void>;
}
