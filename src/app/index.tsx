import { TiCatalog, TiProduct, TiProductListsDic } from "@types";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { fetchJson, measureExecutionTime, withDelay } from "@utils";
import { useAsyncRequest, useMultipleSelect, useSingleSelect } from "@hooks";
import { AppButton, AppCard, AppList, AppError, AppLoader } from "@components";
import style from "./style.module.css";

const fetchJsonWithDelay = withDelay<TiProduct[]>(fetchJson);

const App: FunctionComponent = () => {
  const [productCatalog, setProductCatalog] =
    useState<TiCatalog<TiProductListsDic, TiProduct[]>>();

  const getProductCatalog = useCallback(async () => {
    const [data1, data2] = await Promise.all([
      fetchJsonWithDelay("/mock-data-1.json"),
      fetchJsonWithDelay("/mock-data-2.json"),
    ]);
    setProductCatalog({ multiSelect: data1, singleSelect: data2 });
  }, []);

  const getProductCatalogWithTimeMeasure = useCallback(async () => {
    return await measureExecutionTime(getProductCatalog)();
  }, [getProductCatalog]);

  const { errorMessage, isLoading, requestHandler } = useAsyncRequest(
    getProductCatalogWithTimeMeasure
  );

  const {
    selectedList: selectedProductList,
    selectRestrictionCount: selectedProductListRestrictionCount,
    addItem: addToSelectedProductList,
    removeItem: removeFromSelectedProductList,
    clearSelected: clearSelectedProductList,
    isAvailable: isAvailableForAddToSelectedProductList,
  } = useMultipleSelect<TiProduct, "id">("id", 6);

  const {
    selected: selectedProduct,
    addItem: selectProduct,
    removeItem: unselectProduct,
    isAvailable: isAvailableProduct,
  } = useSingleSelect<TiProduct, "id">("id");

  const selectedProductListCount = useMemo<string | null>(
    () =>
      selectedProductList.length
        ? `selected: ${selectedProductList.length}/${selectedProductListRestrictionCount}`
        : null,
    [selectedProductList, selectedProductListRestrictionCount]
  );

  useEffect(() => {
    requestHandler();
  }, [requestHandler]);

  return (
    <>
      <header className={style.header}>
        <AppList
          title={<h3>selected:</h3>}
          list={
            !!selectedProduct && (
              <AppCard
                name={selectedProduct.name}
                actions={
                  <AppButton onClick={unselectProduct}>remove</AppButton>
                }
              />
            )
          }
        />
        <AppList
          title={<h3>selectedList:</h3>}
          list={
            !!selectedProductList.length &&
            selectedProductList.map((item) => (
              <AppCard
                key={item.id}
                name={item.name}
                actions={
                  <AppButton
                    onClick={() => removeFromSelectedProductList(item)}
                  >
                    remove
                  </AppButton>
                }
              />
            ))
          }
          listActions={
            !!selectedProductList.length && (
              <>
                {!!selectedProductListCount && (
                  <h4>{selectedProductListCount}</h4>
                )}
                <AppButton onClick={clearSelectedProductList}>clear</AppButton>
              </>
            )
          }
        />
      </header>

      {isLoading && <AppLoader />}

      {errorMessage && <AppError>{errorMessage}</AppError>}

      {!isLoading && !errorMessage && productCatalog && (
        <main className={style.main}>
          <AppList
            title={<h3>Items:</h3>}
            list={productCatalog.singleSelect.map((item) => (
              <AppCard
                key={item.id}
                name={item.name}
                actions={
                  <AppButton
                    disabled={!isAvailableProduct(item)}
                    onClick={() => selectProduct(item)}
                  >
                    select
                  </AppButton>
                }
              />
            ))}
          />
          <AppList
            title={<h3>Items 2:</h3>}
            list={productCatalog.multiSelect.map((item) => (
              <AppCard
                key={item.id}
                name={item.name}
                actions={
                  <AppButton
                    disabled={!isAvailableForAddToSelectedProductList(item)}
                    onClick={() => addToSelectedProductList(item)}
                  >
                    add to list
                  </AppButton>
                }
              />
            ))}
          />
        </main>
      )}
    </>
  );
};

export default App;
