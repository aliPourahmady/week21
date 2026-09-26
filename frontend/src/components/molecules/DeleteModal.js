import React, { useEffect } from "react";
import deleteIcon from "../../assets/Close.svg";
import {
  useDeleteProducts,
  useSelectedDeleteHandler,
} from "../../services/mutation";
import toast from "react-hot-toast";

import styles from "./DeleteModal.module.css";
import Image from "next/image";

function DeleteModal({
  product,
  setShowModal,
  deleteSelected,
  setDeleteSelected,
}) {
  const { mutate: deleteMutate, error: deleteError } = useDeleteProducts();
  const { mutate: selectedMutate, error: selectedError } =
    useSelectedDeleteHandler();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setShowModal]);

  const deleteHandler = () => {
    const onSuccess = () => {
      setShowModal(false);
      toast.success("با موفقیت حذف شد");
      if (!product && deleteSelected.length > 0) setDeleteSelected?.([]);
    };

    const onError = (error) => {
      toast.error(`حذف با خطا مواجه شد: ${error?.message ?? ""}`);
    };

    if (!product && deleteSelected.length > 0) {
      const ids = deleteSelected.map((p) => p.id);
      selectedMutate({ ids }, { onSuccess, onError });
    } else {
      deleteMutate(product.id, { onSuccess, onError });
    }
  };

  return (
    <div
      className={styles.container}
      onClick={(e) => {
        e.target === e.currentTarget ? setShowModal(false) : null;
      }}
    >
      <div className={styles.content}>
        <Image src={deleteIcon} alt="delete" />

        <p>
          {!product && deleteSelected.length > 0
            ? `آیا از حذف این ${deleteSelected.length} محصول  مطمئنید؟`
            : "آیا از حذف این محصول  مطمئنید؟"}
        </p>
        <div className={styles.name}>
          {!product && deleteSelected.length > 0 ? (
            deleteSelected.map((p) => <p key={p.id}>{p.name}</p>)
          ) : (
            <p>{product.name}</p>
          )}
        </div>

        <div className={styles.btn}>
          <button onClick={deleteHandler}>حذف</button>
          <button
            onClick={() => {
              setShowModal(false);
              toast.success("عملیات متوقف شد");
            }}
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
