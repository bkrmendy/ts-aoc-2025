declare module "bun" {
  interface Env {
    SESSION: string
    YEAR: string
  }
}

declare module "*.txt" {
  const content: string;
  export default content;
}
