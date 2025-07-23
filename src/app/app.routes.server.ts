import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'dashboard/edit/:id',
    renderMode: RenderMode.Server, 
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
