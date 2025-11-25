package co.edu.udea.gestor_de_proyectos.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * Servicio de Email Asíncrono configurado para Gmail.
 */
@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // REMITENTE (Debe coincidir con el de application.yml)
    private static final String REMITENTE = "correonopersonal10@gmail.com";

    /**
     * Envía el correo en un hilo separado (@Async).
     * Siempre imprime el token en consola como respaldo inmediato.
     */
    @Async
    public void sendEmail(String to, String subject, String text) {
        // 1. IMPRIMIR RESPALDO (Siempre visible para el desarrollador)
        System.out.println("\n================= [SISTEMA DE RECUPERACIÓN] =================");
        System.out.println(" Para:    " + to);
        System.out.println(" Token:   " + extraerToken(text)); 
        System.out.println(" (Si el correo no llega, usa este token)");
        System.out.println("=============================================================\n");

        // 2. INTENTAR ENVÍO REAL (Segundo plano)
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(REMITENTE);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, false);
            helper.setSentDate(new Date());

            mailSender.send(message);
            
            System.out.println(">> [GMAIL] Correo enviado exitosamente a " + to);
        } catch (Exception e) {
            // Si falla, solo lo registramos en el log. El usuario ya recibió su "OK".
            System.err.println(">> [ERROR SMTP] Falló el envío a Gmail: " + e.getMessage());
        }
    }

    private String extraerToken(String text) {
        try {
            // Busca el token después de los dos puntos
            return text.substring(text.lastIndexOf(":") + 1).trim();
        } catch (Exception e) {
            return "Ver mensaje completo";
        }
    }
}