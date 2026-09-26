import { useState } from "react";
// import { RotatingLines } from "react-loader-spinner";
import ProductsItem from "../molecules/ProductsItem";
import AddProductsModal from "../molecules/AddProductsModal";
import EditProductsModal from "../molecules/EditProductsModal";
import DeleteModal from "../molecules/DeleteModal";
import { useProducts } from "../../services/queries";

import setting from "../../assets/setting-3.svg";
import styles from "./ProductsTable.module.css";
import { useRouter } from "next/router";
import Pagination from "../molecules/Pagination";
import PriceRange from "../molecules/PriceRange";
import Image from "next/image";

function ProductsTable() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [ShowEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteSelected, setDeleteSelected] = useState([]);

  const router = useRouter();
  const { query } = router;

  const filters = {
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 10,
    name: query.name || "",
    minPrice: query.minPrice || "",
    maxPrice: query.maxPrice || "",
  };

  const { error, data, isLoading } = useProducts(filters);

  const updateFilters = (newParams, resetPage = false) => {
    const currentParams = { ...router.query };
    const updatedParams = { ...currentParams, ...newParams };
    if (resetPage) {
      updatedParams.page = "1";
    }
    Object.keys(updatedParams).forEach((key) => {
      if (updatedParams[key] === "" || updatedParams[key] === undefined) {
        delete updatedParams[key];
      }
    });

    router.push(
      { pathname: router.pathname, query: updatedParams },
      undefined,
      { shallow: true },
    );
  };

  const totalCount = data?.totalProducts || 0;

  if (error)
    return (
      <p style={{ color: "f43f5e" }}>خطا در دریافت اطلاعات: {error.message}</p>
    );

  return (
    <>
      {showAddModal && <AddProductsModal setShowModal={setShowAddModal} />}
      {ShowEditModal && (
        <EditProductsModal setShowModal={setShowEditModal} product={selected} />
      )}
      {showDeleteModal && (
        <DeleteModal
          product={selected}
          setShowModal={setShowDeleteModal}
          deleteSelected={deleteSelected}
          setDeleteSelected={setDeleteSelected}
        />
      )}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Image src={setting} alt="setting" />
          <p>مدیریت کالا</p>
        </div>
        <div className={styles.headerBtn}>
          <button onClick={() => setShowAddModal(true)}>+ افزودن محصول</button>
          <button
            onClick={() => {
              setShowDeleteModal(true);
              setSelected(null);
            }}
            disabled={deleteSelected.length === 0}
          >
            حذف موارد انتخاب شده {deleteSelected.length}
          </button>
        </div>
      </div>
      <div className={styles.filtersContainer}>
        <PriceRange
          initialMin={filters.minPrice}
          initialMax={filters.maxPrice}
          minPrice={0}
          maxPrice={10000000}
          onRangeChange={({ min, max }) => {
            updateFilters(
              {
                minPrice: min.toString(),
                maxPrice: max.toString(),
              },
              true,
            );
          }}
        />
      </div>

      {isLoading ? (
        <div className={styles.loading}>
          {/* <RotatingLines strokeColor="#3a8ebd" strokeWidth={2} /> */}
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>نام کالا</th>
                <th>موجودی</th>
                <th>قیمت</th>
                <th>شناسه کالا</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!data?.data.length ? (
                <tr className={styles.empty}>
                  <td colSpan={5}>محصولی یافت نشد</td>
                </tr>
              ) : (
                data.data.map((product) => (
                  <tr key={product.id}>
                    <ProductsItem
                      product={product}
                      setSelected={setSelected}
                      setShowEditModal={setShowEditModal}
                      setShowDelteModal={setShowDeleteModal}
                      deleteSelected={deleteSelected}
                      setDeleteSelected={setDeleteSelected}
                    />
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        currentPage={filters.page}
        pageSize={filters.limit}
        totalCount={totalCount}
        onPageChange={(newPage) => {
          updateFilters({ page: newPage.toString() });
        }}
        onPageSizeChange={(newSize) => {
          updateFilters({ limit: newSize.toString() }, true);
        }}
      />
    </>
  );
}

export default ProductsTable;
