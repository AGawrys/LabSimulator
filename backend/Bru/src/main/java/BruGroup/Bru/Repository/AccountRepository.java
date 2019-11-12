package BruGroup.Bru.Repository;

import BruGroup.Bru.Entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
    Account findByEmail(@PathVariable String email);
}