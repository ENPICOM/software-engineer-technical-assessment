export interface DNARow {
  id: number;
  dna_sequence: string;
  created: string;
  distance?: number;
}

export interface ApiResponse {
  errors?: any;
  result: Array<DNARow>;
}

export interface ApiSearchParams {
  [key: string]: string;
}

/**
 * Function searchDna
 *
 * @param {string} query
 * @param {string} [distance]
 * @return {*}  {Promise<ApiResponse>}
 */
const searchDna = (query: string, distance?: string): Promise<ApiResponse> => {
  const params: ApiSearchParams = { query };
  distance && (params.distance = distance);
  return fetch(`/dna/sequences?${new URLSearchParams(params)}`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

/**
 * Function createDNA
 *
 * @param {string} sequence
 * @return {*}  {Promise<ApiResponse>}
 */
const createDna = (sequence: string): Promise<ApiResponse> => {
  return fetch(`/dna/sequences`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sequence }),
  }).then((res) => res.json());
};

const api = { searchDna, createDna };

export default api;
