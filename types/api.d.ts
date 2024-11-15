type IApiProps = {
  params?: IApiParams;
  skip?: boolean;
  ignore?: string[];
  defaultParams?: IApiParams;
  overrideParams?: IApiParams;
};

type IApiPostProps<T = Record<string, IValue>> = {
  payload: T;
};

type IApiPutProps<T = Record<string, IValue>> = {
  id: ID;
  payload: T;
};

type IApiParams = Record<string, IValue>;

type IOrdering = Record<string, IValue> & {
  order?: "asc" | "desc" | false;
  orderBy?: string;
};

type IApiSuccessResponse<T> = {
  status: "ok";
  code: number;
  data: T;
  error?: null;
};

type IApiErrorResponse<T> = {
  status: null;
  code: number;
  error: string;
  data?: T | null;
};
