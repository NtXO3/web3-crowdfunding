declare module "*.svg" {
  const src: string;
  const ReactComponent: ComponentType;

  export default src;
  export { ReactComponent };
}
