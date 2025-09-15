import { Product } from "../products/types"

// типы для еды
export interface Meal {
  id: number
  mealDate: string // YYYY-MM-DD
  mealTime: string // HH:mm
  name: string // например "Завтрак"
  products: MealProduct[]
}

export interface MealFormData {
  id?: number
  mealDate: string
  mealTime: string
  name: string
  products: MealProduct[]
}

export interface MealFormProps {
  onSubmit: (data: MealFormData) => void
  onClose: () => void
}

export interface MealCardProps extends Meal {
  onEdit?: () => void
  onDelete?: () => void
}

export interface MealProduct {
    id?: number;
    grams: number;
    calories: number;
    product: Product;
}

export interface ProductSelectProps {
  onSelect: (data: Product) => void
}


export interface MealListProps {
  meals: Meal[];
  onEdit: (meal: Meal) => void;
  onDelete: (mealToDelete: Meal) => void;
}

export interface MealSummapryProps {
 totalCalories: number;
  hasMeals: boolean;
}

export interface ProductFormProps {
  product: MealProduct;
  setProduct: (p: MealProduct) => void;
  manualCalories: boolean;
  setManualCalories: (v: boolean) => void;
  onAdd: () => void;
  onCancel: () => void;
  disabled: boolean;
}