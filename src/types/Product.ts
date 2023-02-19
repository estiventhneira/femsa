export interface Product {
  createdAt: string;
  product: string;
  points: number;
  image: string;
  is_redemption: boolean;
  id: string;
  from_account_id?: number | null;
  to_account_id?: number | null;
  amount?: number | null;
  verification_code?: string | null;
  reason?: string | null;
}
