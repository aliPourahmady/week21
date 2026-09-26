import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAddProducts } from "../../services/mutation";
import { addProductsSchema } from "../../schemas/ProductsSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import styles from "./AddProductsModal.module.css";

const unformat = (value) => value.replace(/[^\d]/g, "");
const formatNumber = (value) => {
  const raw = unformat(String(value ?? ""));
  if (!raw) return "";
  return Number(raw).toLocaleString("en-US");
};

function AddProductsModal({ setShowModal }) {
  const { mutate, error, isLoading } = useAddProducts();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProductsSchema),
    defaultValues: { name: "", price: "", quantity: "" },
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
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    };
    console.log(payload);
    mutate(payload, {
      onSuccess: () => {
        setShowModal(false);
        toast.success("محصول با موفقیت ثبت شد ");
        reset();
      },
      onError: (err) => {
        toast.error("خطا در افزودن محصول ", err);
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
        <p>ایجاد محصول جدید </p>
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
            <Controller
              name="price"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <input
                  {...field}
                  type="text"
                  inputMode="numeric"
                  id="price"
                  placeholder="قیمت"
                  value={formatNumber(value)}
                  onChange={(e) => onChange(unformat(e.target.value))}
                />
              )}
            />
            {errors.price && <p>{errors.price.message}</p>}
          </div>

          {error && <p className={styles.error}>{error.message}</p>}
          <div className={styles.btn}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "درحال ایجاد" : "ایجاد"}
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

export default AddProductsModal;
