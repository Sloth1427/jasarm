// TODO these types could be made more specific with more
// specific info, e.g. string unions of vendors etc.
export interface Board {
  name: string;
  vendor: string;
  core: string;
  has_wifi: boolean;
}

export interface Metadata {
  total_vendors: number;
  total_boards: number;
}

export interface BoardInfo {
  boards: Board[];
  _metadata?: Metadata;
}
