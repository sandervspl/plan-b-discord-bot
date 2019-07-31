class Env {
  public get isDevelopment() { return process.env.NODE_ENV !== 'production'; }
  public get isProduction() { return process.env.NODE_ENV === 'production'; }
}

export default new Env();

