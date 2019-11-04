package org.sid.dao;

import org.sid.entities.AppUser;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import org.springframework.data.domain.Pageable;


@RepositoryRestResource
public interface AppUserRepository extends JpaRepository<AppUser,Long> {
    public AppUser findByUsername(String username);


    @Query("Select u from AppUser u where u.username like:usernaeme")
    public Page<AppUser> findAll(@Param("usernaeme")String motCle, Pageable pageable);

}
