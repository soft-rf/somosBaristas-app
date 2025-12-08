const fs = require('fs').promises;
const path = require('path');

const TICKET_TEMPLATE_PATH = path.join(__dirname, '../templates/ticket_template.html');
const TICKETS_DIR = path.join(__dirname, '../order_tickets');

/**
 * Genera un ticket HTML para un pedido dado y lo guarda en un archivo.
 * @param {object} order - El objeto del pedido con todos sus detalles.
 */
async function generateAndSaveTicket(order) {
    try {
        // Asegurarse de que el directorio de tickets exista
        await fs.mkdir(TICKETS_DIR, { recursive: true });

        // Leer la plantilla HTML
        let template = await fs.readFile(TICKET_TEMPLATE_PATH, 'utf-8');

        // Formatear la lista de productos para la tabla HTML
        const productsListHtml = order.products.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
            </tr>
        `).join('');

        // Parsear customer_info y preferences (si vienen como JSON string)
        const customer = typeof order.customer_info === 'string' 
            ? JSON.parse(order.customer_info) 
            : order.customer_info;
        const preferences = typeof order.preferences === 'string'
            ? JSON.parse(order.preferences)
            : order.preferences;

        // Reemplazar los marcadores de posición en la plantilla
        template = template
            .replace(/{{ORDER_ID}}/g, order.id)
            .replace(/{{ORDER_DATE}}/g, new Date(order.created_at).toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' }))
            .replace(/{{TOTAL}}/g, order.total.toFixed(2))
            .replace(/{{CUSTOMER_NAME}}/g, customer.name || 'N/A')
            .replace(/{{CUSTOMER_EMAIL}}/g, customer.email || 'N/A')
            .replace(/{{CUSTOMER_PHONE}}/g, customer.phone || 'N/A')
            .replace(/{{CUSTOMER_ADDRESS}}/g, customer.address || 'N/A')
            .replace(/{{PRODUCTS_LIST}}/g, productsListHtml);

        const ticketFileName = `ticket-${order.id}.html`;
        const ticketFilePath = path.join(TICKETS_DIR, ticketFileName);

        await fs.writeFile(ticketFilePath, template);
        console.log(`Ticket HTML generado y guardado en: ${ticketFilePath}`);
    } catch (error) {
        console.error("Error al generar y guardar el ticket HTML:", error);
        // Aquí podrías añadir una lógica para notificar si falla la generación del ticket
    }
}

module.exports = {
    generateAndSaveTicket
};