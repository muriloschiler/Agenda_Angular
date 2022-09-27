import { SearchForm } from "./search-form";

export class SearchInputConfig {
  params!: SearchInputParams[];
  searchAction!: (query: SearchForm) => void;
}

class SearchInputParams {
  name!: string;
  label!: string
}