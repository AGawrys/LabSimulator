package BruGroup.Bru.Repository;

import BruGroup.Bru.Entity.Organization;
import BruGroup.Bru.Entity.OrganizationIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, OrganizationIdentity> {
    List<Organization> findByOrganizationIdentityEmail(@PathVariable String email);
    Organization findByOrganizationIdentity(OrganizationIdentity organizationIdentity);
}
