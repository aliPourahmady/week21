import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

function Pagination({
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
}) {
  const pageCount = Math.ceil(totalCount / pageSize);
  const handlePageClick = (e) => {
    onPageChange(e.selected + 1);
  };
  return (
    <div className={styles.container}>
      <div className={styles.pageSize}>
        <span>تعداد در صفحه:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {pageCount > 0 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="بعدی >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="< قبلی"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
          containerClassName={styles.pagination}
          pageClassName={styles.pageItem}
          pageLinkClassName={styles.pageLink}
          previousClassName={`${styles.pageItem} ${styles.prevNext}`}
          previousLinkClassName={styles.pageLink}
          nextClassName={`${styles.pageItem} ${styles.prevNext}`}
          nextLinkClassName={styles.pageLink}
          breakClassName={`${styles.pageItem} ${styles.breakItem}`}
          breakLinkClassName={styles.pageLink}
          activeClassName={styles.activeItem}
          disabledClassName={styles.disabled}
        />
      )}
    </div>
  );
}

export default Pagination;
