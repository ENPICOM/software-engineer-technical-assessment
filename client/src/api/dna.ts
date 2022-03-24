export interface DNARow {
  id: number;
  dna_string: string;
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
  return fetch(`/dna/search?${new URLSearchParams(params)}`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

/**
 * Function createDNA
 *
 * @param {string} dnaString
 * @return {*}  {Promise<ApiResponse>}
 */
const createDna = (dnaString: string): Promise<ApiResponse> => {
  return fetch(`/dna/create`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dna_string: dnaString }),
  }).then((res) => res.json());
};

const api = { searchDna, createDna };

export default api;
