class EnvUtils {
  static getEnv(key: string, defaultValue?: string): string {
    const value = process.env[key];
    if (value === undefined) {
      if (defaultValue === undefined) {
        throw new Error(`Environment variable ${key} is not set`);
      }
      return defaultValue;
    }
    return value;
  }

  static getEnvNumber(key: string, defaultValue: number): number {
    const value = this.getEnv(key, defaultValue.toString());
    return Number(value);
  }

  static getEnvBoolean(key: string, defaultValue: boolean): boolean {
    const value = this.getEnv(key, defaultValue.toString());
    return value.toLowerCase() === "true";
  }
}
export default EnvUtils;
