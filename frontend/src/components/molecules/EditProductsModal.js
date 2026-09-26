import { useEffect } from "react";
import { useUpdateProducts } from "../../services/mutation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProductsSchema } from "../../schemas/ProductsSchema";
import toast from "react-hot-toast";

import styles from "./EditProductsModal.module.css";

function EditProductsModal({ setShowModal, product }) {
  const { id, name, price, quantity } = product;
  const { mutate, error, isLoading } = useUpdateProducts(id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProductsSchema),
    defaultValues: {
      name,
      price,
      quantity,
    },
  });

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setShowModal]);

  const onSubmit = (formData) => {
    const payload = {
      name: formData.name,
      price: formData.price,
      quantity: formData.quantity,
    };

    mutate(payload, {
      onSuccess: () => {
        setShowModal(false);
        toast.success("محصول با موفقیت ویرایش شد");
        reset();
      },
      onError: (er) => {
        toast.error("خطا در ویرایش محصول", er);
      },
    });
  };

  return (
    <div
      className={styles.container}
      onClick={(e) => {
        e.target === e.currentTarget ? setShowModal(false) : null;
      }}
    >
      <div className={styles.content}>
        <p>ویرایش اطلاعات</p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.input}>
            <label htmlFor="name">نام کالا</label>
            <input
              type="text"
              id="name"
              placeholder="نام کالا"
              {...register("name")}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className={styles.input}>
            <label htmlFor="quantity">تعداد موجودی</label>
            <input
              type="number"
              id="quantity"
              placeholder="تعداد"
              {...register("quantity")}
            />
            {errors.quantity && <p>{errors.quantity.message}</p>}
          </div>
          <div className={styles.input}>
            <label htmlFor="price">قیمت</label>
            <input
              type="number"
              id="price"
              placeholder="قیمت"
              {...register("price")}
            />
            {errors.price && <p>{errors.price.message}</p>}
          </div>
          {error && <p className={styles.error}>{error.message}</p>}
          <div className={styles.btn}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "درحال ویرایش...." : "ثبت اطلاعات جدید"}
            </button>
            <button type="button" onClick={() => setShowModal(false)}>
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductsModal;
