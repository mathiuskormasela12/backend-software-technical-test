// =========== Response
// import all modules
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { parse } from 'url';
import { appConfig } from '../config';

export const response = (
  req: ExpressRequest,
  res: ExpressResponse,
  status: number,
  success: boolean,
  message: string,
  results?: unknown,
  totalPages?: number,
  totalData?: number,
) => {
  if (results && typeof results === 'object' && !Array.isArray(results)) {
    return res.status(status).json({
      status,
      success,
      message,
      results,
    });
  } if (
    results
		&& typeof results === 'object'
		&& Array.isArray(results)
		&& totalData
		&& totalPages
  ) {
    const {
      query: { page = 1, ...queries },
      pathname,
    } = parse(req.url, true);
    const modifiedQueries = { page, ...queries };
    return res.status(status).json({
      status,
      success,
      message,
      results,
      pageInfo: {
        totalPages,
        totalData,
        currentPage: Number(page),
        previousLink:
					Number(page) > 1
					  ? `${appConfig.appUrl}${pathname}?${Object.keys(
					    modifiedQueries,
					  )
					    .map(
					      (item, index) => `${
					          item === 'page'
					            ? `${item}=${
					              Number(Object.values(modifiedQueries)[index]) - 1
					            }`
					            : `${item}=${Object.values(modifiedQueries)[index]}`
					        }`,
					    )
					    .join('&')}`
					  : null,
        nextLink:
					Number(page) < totalPages
					  ? `${appConfig.appUrl}${pathname}?${Object.keys(
					    modifiedQueries,
					  )
					    .map(
					      (item, index) => `${
					          item === 'page'
					            ? `${item}=${
					              Number(Object.values(modifiedQueries)[index]) + 1
					            }`
					            : `${item}=${Object.values(modifiedQueries)[index]}`
					        }`,
					    )
					    .join('&')}`
					  : null,
      },
    });
  }
  return res.status(status).json({
    status,
    success,
    message,
  });
};
