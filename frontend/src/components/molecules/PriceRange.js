import React, { useEffect, useRef, useState } from "react";
import ReactRangeSliderInput from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import useDebounce from "@/hooks/useDebounce";

import styles from "./PriceRange.module.css";

function PriceRange({
  onRangeChange,
  minPrice,
  maxPrice = 1000000,
  initialMin = "",
  initialMax = "",
}) {
  const [range, setRange] = useState([
    initialMin ? Number(initialMin) : minPrice,
    initialMax ? Number(initialMax) : maxPrice,
  ]);
  const debouncedRange = useDebounce(range, 600);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onRangeChange({ min: debouncedRange[0], max: debouncedRange[1] });
  }, [debouncedRange]);
  useEffect(() => {
    setRange([
      initialMin ? Number(initialMin) : minPrice,
      initialMax ? Number(initialMax) : maxPrice,
    ]);
  }, [initialMin, initialMax, minPrice, maxPrice]);

  return (
    <div className={styles.container}>
      <span className={styles.label}>محدوده قیمت</span>
      <div className={styles.slider}>
        <ReactRangeSliderInput
          min={minPrice}
          max={maxPrice}
          step={100}
          value={range}
          onInput={(newValue) => setRange(newValue)}
        />
      </div>
      <div className={styles.value}>
        <span>تا: {range[1].toLocaleString()}</span>
        <span>از: {range[0].toLocaleString()}</span>
      </div>
    </div>
  );
}

export default PriceRange;
