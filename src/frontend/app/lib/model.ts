export interface IUserDetails {
  id: string;
  isAdmin: boolean;
  email: string;
  name: string;
  phone: string;
  date_of_birth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  password: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface IMedication {
  id: string;
  user_id: string;
  name: string;
  description: string;
  stock: number;
  time_to_take: string;
  treatment_finished_at: string | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}
