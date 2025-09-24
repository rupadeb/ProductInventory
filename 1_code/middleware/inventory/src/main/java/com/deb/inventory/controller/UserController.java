package com.deb.inventory.controller;

import java.util.List;
import java.util.Set;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.deb.inventory.model.User;
import com.deb.inventory.service.UserService;

import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/users")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

    final UserService userService;

    @GetMapping("/getall")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping("/add")
    public String addUser(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam Set<String> roles) {
        userService.addUser(username, password, roles);
        return "User added successfully";
    }
}
