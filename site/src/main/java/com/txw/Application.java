/**
 * Copyright (C) 2006-2015 Tuniu All rights reserved
 */
package com.txw;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

/**
 * 示例：Web应用入口
 * Date: 2017-03-01
 *
 *
 */

public class Application extends SpringBootServletInitializer {

    /**
     * 继承{@link SpringBootServletInitializer SpringBootServletInitializer}是通过war包来部署的入口
     */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(SiteConfig.class);
    }

    /**
     * gradle bootRun的时候会找有main方法的类，如果有多个就必须在build.gradle里面指定是哪个类
     */
    public static void main(String... args) {
        SpringApplication.run(SiteConfig.class, args);
    }

}
