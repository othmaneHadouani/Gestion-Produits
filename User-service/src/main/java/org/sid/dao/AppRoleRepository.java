package org.sid.dao;

import org.sid.entities.AppRole;
import org.sid.entities.AppUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AppRoleRepository extends JpaRepository<AppRole,Long> {
    public AppRole findByRoleName(String roleName);

    @Query("Select r from AppRole r where r.roleName like :roleName")
    public Page<AppRole> findAll(@Param("roleName")String motCle, Pageable pageable);


}
