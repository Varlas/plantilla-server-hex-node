import dotenv from 'dotenv';
import { ExpressAdapter } from './infrastructure/adapters/express/express.adapter';
import { RouteConfig } from './infrastructure/http/routes/route.config';

// Cargar variables de entorno
dotenv.config();

/**
 * Función principal de la aplicación
 * Aquí hacemos la inyección de dependencias y conectamos todos los componentes
 */
async function main() {
	try {
		// 1. Crear el adaptador HTTP (Express)
		// Si quisieras cambiar a Hono.js, solo cambiarías esta línea
		const httpServer = new ExpressAdapter();

		// 2. Configurar las rutas
		const routeConfig = new RouteConfig();
		routeConfig.register(httpServer);

		// 3. Iniciar el servidor
		const port = parseInt(process.env.PORT || '3000', 10);
		await httpServer.start(port);

		// Manejo de señales para cerrar el servidor correctamente
		process.on('SIGINT', async () => {
			console.log('\n🛑 Shutting down gracefully...');
			await httpServer.stop();
			process.exit(0);
		});

		process.on('SIGTERM', async () => {
			console.log('\n🛑 Shutting down gracefully...');
			await httpServer.stop();
			process.exit(0);
		});
	} catch (error) {
		console.error('❌ Error starting server:', error);
		process.exit(1);
	}
}

// Ejecutar la aplicación
main();
