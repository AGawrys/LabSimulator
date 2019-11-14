package BruGroup.Bru.Controller;

import BruGroup.Bru.Repository.AccountRepository;
import BruGroup.Bru.Repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InstructorController {

    @Autowired
    InstructorRepository instructorRepository;

    @Autowired
    AccountRepository accountRepository;

    //get all
    //get one row
    //get insturctor's coureses
    //get courses insructors
    //delete a row
    //add a row
}
