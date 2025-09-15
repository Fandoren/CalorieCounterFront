import { useEffect, useState } from "react";
import { fetchProductsPage, fetchProductById } from "./api";
import { Product } from "./types";

export function useProductsPage(page: number, limit: number, search: string) {
  const [data, setData] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchProductsPage(page, limit, search).then((res) => {
      setData(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages || Math.ceil(res.total / limit));
      setLoading(false);
    });
  }, [page, limit, search]);

  return { data, total, totalPages, loading };
}

export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchProductById(id)
      .then((res) => {
        setProduct(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        setProduct(null);
      });
  }, [id]);

  return { product, loading, error };
}
