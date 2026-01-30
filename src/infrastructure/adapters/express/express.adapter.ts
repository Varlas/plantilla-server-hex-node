import express, { Express, Request, Response } from 'express';
import { HttpServerPort, RouteHandler, RouteRequest, RouteResponse } from '../../../domain/ports/http-server.port';

/**
 * Adaptador de Express
 * Implementa el puerto HttpServerPort usando Express
 * Si en el futuro quieres usar Hono.js, solo creas otro adaptador
 */
export class ExpressAdapter implements HttpServerPort {
  private app: Express;
  private server: any;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
  }

  private setupMiddlewares(): void {
    // Middleware para parsear JSON
    this.app.use(express.json());
    
    // Middleware para parsear URL-encoded
    this.app.use(express.urlencoded({ extended: true }));
  }

  async start(port: number): Promise<void> {
    return new Promise((resolve) => {
      this.server = this.app.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:${port}`);
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.server) {
        this.server.close((err: Error) => {
          if (err) reject(err);
          else {
            console.log('✅ Server stopped');
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

  registerRoute(method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, handler: RouteHandler): void {
    const expressHandler = async (req: Request, res: Response) => {
      // Adaptamos la Request y Response de Express a nuestros tipos genéricos
      const routeRequest: RouteRequest = {
        body: req.body,
        params: req.params,
        query: req.query as Record<string, string>,
        headers: req.headers as Record<string, string>,
      };

      const routeResponse: RouteResponse = {
        status: (code: number) => {
          res.status(code);
          return routeResponse;
        },
        json: (data: any) => {
          res.json(data);
        },
        send: (data: string) => {
          res.send(data);
        },
      };

      await handler(routeRequest, routeResponse);
    };

    // Registramos la ruta en Express
    switch (method) {
      case 'GET':
        this.app.get(path, expressHandler);
        break;
      case 'POST':
        this.app.post(path, expressHandler);
        break;
      case 'PUT':
        this.app.put(path, expressHandler);
        break;
      case 'DELETE':
        this.app.delete(path, expressHandler);
        break;
    }
  }

  /**
   * Método adicional específico de Express (opcional)
   * Por si necesitas acceder a la app de Express directamente
   */
  getExpressApp(): Express {
    return this.app;
  }
}