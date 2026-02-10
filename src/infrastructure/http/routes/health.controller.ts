import {
	RouteRequest,
	RouteResponse,
} from '../../../domain/ports/http-server.port';

/**
 * Controlador para el health check
 * No depende de Express, solo de nuestros tipos genéricos
 */
export class HealthController {
	/**
	 * Handler para la ruta GET /ping
	 * Responde con un mensaje simple para verificar que el servidor está activo
	 */
	async ping(req: RouteRequest, res: RouteResponse): Promise<void> {
		res.status(200).json({
			status: 'ok',
			message: 'ping',
			timestamp: new Date().toISOString(),
		});
	}
}
