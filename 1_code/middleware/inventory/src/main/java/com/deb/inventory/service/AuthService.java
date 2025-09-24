package com.deb.inventory.service;

import com.deb.inventory.model.LoginRequest;
import com.deb.inventory.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserService userService;
    private final PasswordEncoder encoder;

    public AuthService(UserService userService, PasswordEncoder encoder) {
        this.userService = userService;
        this.encoder = encoder;
    }

    public User login(LoginRequest req) {
        User user = userService.findByUsername(req.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Don’t return the password hash to the frontend
        user.setPassword(null);

        return user;
    }
}
