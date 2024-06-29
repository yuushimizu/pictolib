export type PictoComponentConstraint = Readonly<{
  type: string;
}>;

export type PictoData<C extends PictoComponentConstraint> = Readonly<{
  components: readonly C[];
}>;

export const emptyData: PictoData<never> = { components: [] };
