export type TiProduct = {
  id: number;
  name: string;
};

export type TiProductListsDic = "singleSelect" | "multiSelect";

export type TiCatalog<T extends string, K> = Record<T, K>;
