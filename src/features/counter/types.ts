import { Product } from "../products/types"

// типы для еды
export interface Meal {
  readonly id: number
  readonly year: number
  readonly month: number
  readonly day: number
  readonly mealTime: string // HH:mm
  readonly name: string // например "Завтрак"
  readonly products: MealProduct[]
}

export interface MealFormData {
  id?: number
  year: number
  month: number
  day: number
  mealTime: string
  name: string
  products: MealProduct[]
}

export interface MealFormProps {
  onSubmit: (data: MealFormData) => void
  onClose: () => void
  initialData?: MealFormData
}

export interface MealCardProps extends Meal {
  readonly onEdit?: (meal: Meal) => void
  readonly onDelete?: () => void
  readonly isEditMode?: boolean
}

export interface MealProduct {
    readonly id?: number;
    readonly grams: number;
    readonly calories: number;
    readonly product: Product;
}

export interface ProductSelectProps {
  onSelect: (data: Product) => void
}


export interface MealListProps {
  readonly meals: Meal[];
  readonly onEdit?: (meal: Meal) => void;
  readonly onDelete?: (mealToDelete: Meal) => void;
  readonly isEditMode?: boolean;
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