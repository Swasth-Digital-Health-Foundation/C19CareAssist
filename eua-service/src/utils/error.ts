class EUAError extends Error {
  public message;
  public code;

  constructor(code: number, message: string) {
    super();
    this.message = message;
    this.code = code;
  }

}

export default EUAError;