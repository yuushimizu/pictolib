export type PictoComponentConstraint = Readonly<{
  type: string;
}>;

export type PictoData<C extends PictoComponentConstraint> = Readonly<{
  components: readonly C[];
}>;

export const emptyData: PictoData<never> = { components: [] };

export const addComponent = <C extends PictoComponentConstraint>(data: PictoData<C>, component: C): PictoData<C> => ({
  ...data,
  components: [...data.components, component],
});
