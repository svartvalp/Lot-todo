package com.svartvalp.lottodo.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().cors().disable()
                .authorizeRequests()
                .antMatchers("/login", "/user/register").permitAll()
                .anyRequest().authenticated().and()
                .userDetailsService(userDetailsService)
                .formLogin().loginProcessingUrl("/login")
                .successHandler((req, res, auth) -> res.setStatus(HttpServletResponse.SC_OK))
                .failureHandler((req, res, auth) -> res.setStatus(HttpServletResponse.SC_UNAUTHORIZED))
                .and()
                .logout().logoutUrl("/logout")
                .and().exceptionHandling()
                .accessDeniedHandler((req, res, e) -> res.setStatus(HttpServletResponse.SC_UNAUTHORIZED))
                .authenticationEntryPoint((req, res, e) -> res.setStatus(HttpServletResponse.SC_UNAUTHORIZED));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
