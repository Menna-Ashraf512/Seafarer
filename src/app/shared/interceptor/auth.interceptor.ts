import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('userToken');
  const newRequest = req.clone({
    setHeaders:token ? {
      authorization: `Bearer ${token}`
    } : {}
  });
  return next(newRequest);
};
