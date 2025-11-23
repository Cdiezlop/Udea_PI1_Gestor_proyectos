package co.edu.udea.gestor_de_proyectos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa@dev-codes.io
 * @version Id: Udea_PI1_Gestor_proyectos 23/11/2025, 2:04 p. m.
 **/
@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
}
