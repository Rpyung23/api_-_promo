drop database if exists mas_promo;
create database if not exists mas_promo;

use mas_promo;
create table if not exists empresa(ruc_empresa char(20) primary key,
       nombre_empresa varchar(250) not null,foto_empresa longtext,
       dir_empresa varchar(250),tel_empresa varchar(100));

create table if not exists negocio(ruc_negocio char(20) primary key,
       nombre_negocio varchar(250) not null,foto_negocio longtext,
       tel_contacto char(50) not null,dir_negocio varchar(250) not null,
       activo smallint(1) default 1 comment '1->activo ... 2->inactivo');


create table usuario(email_usuario char(50) primary key,pass_usuario varchar(250) not null ,
                      nombre_usuario varchar(250) not null,activo smallint(1)
                      default 1 comment '1->activo ... 0->inactivo');

create table usuario_negocio(id_usuario_negocio int auto_increment primary key,
                             fk_email_usuario char(50) not null,fk_ruc_negocio char(20) not null);

create table if not exists cliente(uid_cliente varchar(250) primary key,name_cliente varchar(250) not null,
             dni_cliente char(20),foto_cliente longtext not null,
             sexo_cliente char(1) comment 'M -> masculino ... F -> femenino',
             fecha_nacimiento_cliente date,tel_cliente char(50),activo smallint(1) default 1
             comment '1 -> activo ... 0 -> inactivo');

create table if not exists cupon(code_cupon char(15) primary key,
                   fk_ruc_negocio char(20) not null,
                   nombre_cupon varchar(250) not null,
                   porcetaje_descuento decimal(10,2) not null,
                   fecha_creacion_cupon datetime default now(),
                   fecha_expiracion datetime not null,
                   cant_cupon int unsigned not null,
                   disponible_cupon int unsigned not null,
                   estado smallint(1) default 1 comment '1 -> activo ... 0 -> inactivo ... 3 -> expirado');

create table if not exists cupon_cliente(id_cupon_cliente int auto_increment primary key,
                            fk_code_cupon char(15) not null,fk_uid_cliente varchar(250) not null,
                            fecha_uso datetime default now());



alter table usuario_negocio add constraint rel_usuario_negocio_usuario foreign key usuario_negocio(fk_email_usuario)
      references usuario(email_usuario);

alter table usuario_negocio add constraint rel_usuario_negocio_negocio foreign key usuario_negocio(fk_ruc_negocio)
      references negocio(ruc_negocio);

alter table cupon add constraint rel_negocio_cupon foreign key cupon(fk_ruc_negocio)
                     references negocio(ruc_negocio);

alter table cupon_cliente add constraint rel_cupon_cliente_cupon foreign key cupon_cliente(fk_code_cupon)
                    references cupon(code_cupon);

alter table cupon_cliente add constraint rel_cupon_cliente_cliente foreign key cupon_cliente(fk_uid_cliente)
                    references cliente(uid_cliente);


alter table usuario add column foto_usuario longtext;
alter table cliente add column pass_cliente varchar(250) not null;


DELIMITER //
CREATE TRIGGER validar_cupon_disponibles
BEFORE INSERT ON cupon_cliente
FOR EACH ROW
BEGIN
    DECLARE cant_disp INT DEFAULT 0;
    SET cant_disp = (SELECT cant_disp FROM cupon WHERE code_cupon = NEW.fk_code_cupon);

    IF (cant_disp - 1 < 0) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'CUPONES NO DISPONIBLES';
    END IF;
END;
//
DELIMITER ;




/*** INSERT POR DEFECTO ***/

