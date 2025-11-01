export interface IArticles {
  id: number;
  title: string;
  subject: string;
  distributor: string;
  timestamp: string;
}

export interface IArticlesParams {
  subject?: string;
  keyword?: string;
  period?: string;
  exdistributor?: string;
  // default: 0
  page?: number;
  // default: 20
  size?: number;
}

export interface ArticlesResponse {
  message: string;
  data: {
    content: IArticles[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPage: number;
  };
  timestamp: string;
}
