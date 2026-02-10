import { HttpServerPort } from '../../../domain/ports/http-server.port';
import { HealthController } from './health.controller';

/**
 * Configuración de todas las rutas de la aplicación
 * Aquí registramos todas las rutas en el servidor HTTP
 */
export class RouteConfig {
	private healthController: HealthController;

	constructor() {
		this.healthController = new HealthController();
	}

	/**
	 * Registra todas las rutas en el servidor HTTP
	 * @param server - Implementación del puerto HttpServerPort (puede ser Express, Hono, etc.)
	 */
	register(server: HttpServerPort): void {
		// Ruta de health check
		server.registerRoute(
			'GET',
			'/ping',
			this.healthController.ping.bind(this.healthController),
		);

		console.log('✅ Routes registered');
	}
}
