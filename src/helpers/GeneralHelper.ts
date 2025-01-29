function* idGenerator() {
  let id = 1;

  while (true) {
    yield String(id);
    id++;
  }
}
const idGeneratorInstance = idGenerator();

export default abstract class GeneralHelper {
  static uniqueId() {
    return idGeneratorInstance.next().value as string;
  }

  static formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';

    const bytesInKb = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const sizeIndex = Math.floor(Math.log(bytes) / Math.log(bytesInKb));

    return `${parseFloat((bytes / bytesInKb ** sizeIndex).toFixed(dm))} ${sizes[sizeIndex]}`;
  }

  static debounce<T extends (...args: unknown[]) => void>(
    func: T,
    delayMs: number,
  ): (...args: Parameters<T>) => void {
    let isDebounced = false;

    return (...args) => {
      if (isDebounced) {
        return;
      }

      func.apply(this, args);
      isDebounced = true;

      setTimeout(() => {
        isDebounced = false;
      }, delayMs);
    };
  }
}
