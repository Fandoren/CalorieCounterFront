import { Check, ChevronsUpDown } from "lucide-react";
import { debounce } from "lodash";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProductSelectProps } from "../types";
import { useCallback, useEffect, useState } from "react";
import Loader from "@/components/common/loader/Loader";
import { fetchFirstSelectProducts, searchSelectProducts } from "../api";
import { Product } from "@/features/products/types";

export function MealProductSelect({ onSelect }: ProductSelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Подгружаем первые 20
  const loadInitial = async () => {
    setLoading(true);
    try {
      const data = await fetchFirstSelectProducts(20);
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  // Подгружаем по поиску
  const searchProducts = useCallback(
    debounce(async (search: string) => {
      setLoading(true);
      try {
        if (!search) {
          const data = await fetchFirstSelectProducts(20);
          setProducts(data);
        } else {
          const data = await searchSelectProducts(search, 20);
          setProducts(data);
        }
      } finally {
        setLoading(false);
      }
    }, 400),
    []
  );

  // Когда поповер открывается → подгружаем первые 20
  useEffect(() => {
    if (open) {
      loadInitial();
    }
  }, [open]);

  // При изменении поиска
  useEffect(() => {
    searchProducts(search);
  }, [search, searchProducts]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? value.name : "Выберите продукт..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Поиск продукта..."
            value={search}
            onValueChange={setSearch}
            className="h-9"
          />
          <CommandList>
            {(() => {
              if (loading) {
                return (
                  <CommandEmpty>
                    <Loader />
                  </CommandEmpty>
                );
              } else if (products.length === 0) {
                return <CommandEmpty>Не найдено</CommandEmpty>;
              } else {
                return (
                  <CommandGroup>
                    {products.map((p) => (
                      <CommandItem
                        key={p.id}
                        value={p.name}
                        onSelect={() => {
                          setValue(p);
                          onSelect?.(p);
                          setOpen(false);
                        }}
                      >
                        {p.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            value?.id === p.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                );
              }
            })()}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
