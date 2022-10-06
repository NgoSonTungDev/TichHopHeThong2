create database ShareholderInfor

use ShareholderInfor

create table Shareholder(
	ShareholderID int primary key clustered not null,
	NameShareholder nvarchar(100) not null,
	IdentityCard int not null,
	Birthday nvarchar(100) ,
	Gender nvarchar(10) ,
	Ethnic nvarchar(10) ,
	TypeOfEmployee nvarchar(10) ,
)

select * from Shareholder

insert into Shareholder (ShareholderID , NameShareholder,IdentityCard,Birthday,Gender,Ethnic,TypeOfEmployee) values (4865,'asfd',52431,'asdads','asda','asdasd','asdads')


delete Shareholder where ShareholderID=123

drop table Shareholder
