package domain

type user struct {
	id       int
	name     string
	mail     string
	password string
}

func (u user) getName() string {
	return u.name
}

func (u user) getMail() string {
	return u.mail
}
