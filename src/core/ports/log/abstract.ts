export abstract class AbstractLogService {
  abstract trace(title: string, message: string, trace: string): boolean;
  abstract log(title: string, message: string): boolean;
  abstract warn(title: string, message: string): boolean;
  abstract error(title: string, message: string): boolean;
}
