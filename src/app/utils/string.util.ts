export class StringUtil {
 public static clean<T>(s: string): string {
    return s.replace(/\(.*\)/g, '').replace(/\W/g, '').toLowerCase();
  }
}
