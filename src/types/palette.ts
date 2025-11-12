export interface GradientColor {
  top: string;
  bottom: string;
}

export interface Palette {
  id?: string;
  user_id?: string;
  name: string;
  description?: string;
  grid_size: number;
  grid_cols: number;
  gradient_data: GradientColor[];
  is_template?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PaletteTemplate {
  name: string;
  description: string;
  grid_size: number;
  grid_cols: number;
  gradient_data: GradientColor[];
}
