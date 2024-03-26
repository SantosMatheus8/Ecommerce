import { Request } from "express";

type ParamsDictionary = Record<string, string>;

export type QueryRequest<T> = Request<ParamsDictionary, unknown, undefined, T>;
