

export interface User {
    id: string;
    username: string;
    email: string;
}

export interface MainMenuProps {
    user: User;
}
export interface MainModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: Record<string, any>) => void;
    userId: string
}
export interface Account {
    id: string;
    user_id: string | null;
    accountName: string;
    accountType: string;
    balance: number | null;
    created_at: Date;
  }
  
  export interface Category {
    id: string;
    user_id: string | null;
    categoryName: string;
    categoryType: "Income" | "Expense";
    created_at: Date | null;
  }