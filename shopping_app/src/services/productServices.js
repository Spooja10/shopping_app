import apiClient from "../utils/api-client";

export function getSuggestionsAPI(search){
     return apiClient.get(`/produtcs/suggestions?search=${search}`)
}