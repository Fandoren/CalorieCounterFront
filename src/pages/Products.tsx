import { useState, useMemo } from "react";
import { debounce } from "lodash";
import { Input } from "@/components/ui/input";
import { ProductList } from "@/features/products/components/ProductList";
import { useProductsPage } from "@/features/products/hooks";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Loader from "@/components/common/loader/Loader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Products() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(""); // "чистое" состояние для запроса
  const [inputValue, setInputValue] = useState(""); // то, что пользователь вводит в поле
  const limit = 20;

  // Оборачиваем debounce в useMemo, чтобы не пересоздавался при каждом рендере
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
        setPage(1);
      }, 500), // задержка 500 мс
    []
  );

  const { data, total, loading } = useProductsPage(page, limit, search);

  const totalPages = Math.ceil(total / limit);

  function goToPage(p: number) {
    if (p >= 1 && p <= totalPages) setPage(p);
  }

  return (
    <div className="flex justify-center">
      <div className="w-[90%] max-w-5xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_150px] gap-6">
          {/* Левая колонка */}
          <aside className="space-y-4">
            <h2 className="text-lg font-semibold">Фильтры</h2>
            <div className="text-sm text-muted-foreground">
              (Планируется блок фильтров)
            </div>
          </aside>

          {/* Центральная колонка */}
          <main className="space-y-6">
            {/* Поиск */}
            <Input
              placeholder="Поиск продуктов..."
              value={inputValue}
              onChange={(e) => {
                const value = e.target.value;
                setInputValue(value);
                debouncedSearch(value);
              }}
            />

            {/* Список */}
            {loading ? <Loader /> : <ProductList products={data} />}

            {/* Пагинация */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(page - 1);
                        }}
                        aria-disabled={page === 1}
                        className={
                          page === 1 ? "pointer-events-none opacity-50" : ""
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, i) => {
                      const p = i + 1;

                      if (
                        p === 1 ||
                        p === totalPages ||
                        Math.abs(p - page) <= 1
                      ) {
                        return (
                          <PaginationItem key={p}>
                            <PaginationLink
                              href="#"
                              isActive={p === page}
                              onClick={(e) => {
                                e.preventDefault();
                                goToPage(p);
                              }}
                            >
                              {p}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }

                      if (p === page - 2 || p === page + 2) {
                        return (
                          <PaginationItem key={p}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }

                      return null;
                    })}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(page + 1);
                        }}
                        aria-disabled={page === totalPages}
                        className={
                          page === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </main>

          {/* Правая колонка */}
          <div className="flex justify-end">
            <Link to="/products/create">
              <Button>Добавить продукт</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
