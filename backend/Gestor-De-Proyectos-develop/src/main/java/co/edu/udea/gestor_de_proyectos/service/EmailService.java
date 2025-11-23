package co.edu.udea.gestor_de_proyectos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * Servicio para envío de correos usando Hotmail/Outlook.
 */
@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // Correo remitente (DEBE coincidir con el application.yml)
    private static final String REMITENTE = "correonopersonal10@hotmail.com";

    public void sendEmail(String to, String subject, String text) {
        System.out.println("\n--- Intentando enviar correo a: " + to + " ---");

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(REMITENTE); // OBLIGATORIO para Hotmail
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            
            mailSender.send(message);
            
            System.out.println(">> ¡Correo enviado exitosamente por Hotmail!");
        } catch (Exception e) {
            System.err.println(">> ERROR CRÍTICO enviando correo: " + e.getMessage());
            System.err.println(">> Revisa: 1. Contraseña de aplicación. 2. Bloqueo de Microsoft.");
            
            // Imprimir token en consola por si falla el envío
            System.out.println(">> CONTENIDO DEL MENSAJE (Respaldo):\n" + text);
        }
    }
}