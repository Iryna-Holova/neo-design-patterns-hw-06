// Декоратор для додавання timestamp [YYYY-MM-DD HH:mm:ss]
export function withTimestamp(
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
): PropertyDescriptor | void {
  const originalMethod = descriptor.value as (...args: any[]) => any;

  descriptor.value = function (this: unknown, ...args: any[]): any {
    const [message, ...rest] = args as [string, ...any[]];
    const pad = (value: number) => value.toString().padStart(2, '0');
    const now = new Date();
    const timestamp = `[${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
      now.getDate(),
    )} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}]`;
    return originalMethod.apply(this, [`${timestamp} ${message}`, ...rest]);
  };

  return descriptor;
}

// Декоратор для перетворення в верхній регістр
export function uppercase(
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
): PropertyDescriptor | void {
  const originalMethod = descriptor.value as (...args: any[]) => any;

  descriptor.value = function (this: unknown, ...args: any[]): any {
    const [message, ...rest] = args as [string, ...any[]];
    return originalMethod.apply(this, [message.toUpperCase(), ...rest]);
  };

  return descriptor;
}
