package com.example.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@RequiredArgsConstructor
class WebController implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/*").addResourceLocations("classpath:/public/");
    }
}

/*
@Controller
public class WebController {

    @GetMapping("/")
    public String web() {
        return "index.html";
    }
    //public String js() {return "firstScript.js";}
}
*/