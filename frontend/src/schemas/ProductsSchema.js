import * as yup from "yup";

const addProductsSchema = yup.object({
  name: yup.string().required("اسم محصول الزامیست"),
  price: yup
    .number()
    .required("قیمت محصول الزامیست")
    .typeError("قیمت باید یک عدد باشد"),
  quantity: yup
    .number()
    .required("تعداد محصول الزامیست")
    .typeError("تعداد باید یک عدد باشد"),
});

export { addProductsSchema };
