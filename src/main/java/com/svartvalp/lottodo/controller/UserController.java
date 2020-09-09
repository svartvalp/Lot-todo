package com.svartvalp.lottodo.controller;

import com.svartvalp.lottodo.dto.UserDto;
import com.svartvalp.lottodo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/user")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody @Valid UserDto userDto) {
        Map<String, String> response = new HashMap<>();
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        response.put("userId", userService.register(userDto).toString());
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/info")
    public ResponseEntity<?> getUserInfo(Principal principal) {
        Map<String, String> response = new HashMap<>();
        response.put("id", userService.findIdByUsername(principal.getName()).toString());
        return ResponseEntity.ok(response);
    }

}
