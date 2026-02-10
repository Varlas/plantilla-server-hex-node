/**
 * Puerto: Define el contrato que debe cumplir cualquier servidor HTTP
 * Esta interfaz es independiente de la implementación (Express, Hono, etc.)
 */
export interface HttpServerPort {
	/**
	 * Inicia el servidor en el puerto especificado
	 */
	start(port: number): Promise<void>;

	/**
	 * Detiene el servidor
	 */
	stop(): Promise<void>;

	/**
	 * Registra una ruta GET
	 */
	registerRoute(
		method: 'GET' | 'POST' | 'PUT' | 'DELETE',
		path: string,
		handler: RouteHandler,
	): void;
}

/**
 * Tipo para los handlers de rutas
 * Request y Response son genéricos para no depender de Express
 */
export type RouteHandler = (
	req: RouteRequest,
	res: RouteResponse,
) => void | Promise<void>;

export interface RouteRequest {
	body?: any;
	params?: Record<string, string>;
	query?: Record<string, string>;
	headers?: Record<string, string>;
}

export interface RouteResponse {
	status(code: number): RouteResponse;
	json(data: any): void;
	send(data: string): void;
}
