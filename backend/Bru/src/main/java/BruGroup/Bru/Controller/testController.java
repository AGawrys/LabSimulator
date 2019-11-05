package BruGroup.Bru.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testController {
    @RequestMapping("/")
    public String index() {
        return "Congratulations from Controller works";
    }
}
