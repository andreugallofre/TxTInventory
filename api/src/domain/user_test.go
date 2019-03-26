package domain

import (
	"testing"
)

func TestUser_getName(t *testing.T) {
	type fields struct {
		id       int
		name     string
		mail     string
		password string
	}
	tests := []struct {
		name   string
		fields fields
		want   string
	}{
		{
			name: "Get mail test",
			fields: fields{
				id:       1,
				name:     "Andreu",
				mail:     "andreugallofre@gmail.com",
				password: "test",
			},
			want: "Andreu",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			u := user{
				id:       tt.fields.id,
				name:     tt.fields.name,
				mail:     tt.fields.mail,
				password: tt.fields.password,
			}
			if got := u.getName(); got != tt.want {
				t.Errorf("user.getName() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestUser_getMail(t *testing.T) {
	type fields struct {
		id       int
		name     string
		mail     string
		password string
	}
	tests := []struct {
		name   string
		fields fields
		want   string
	}{
		{
			name: "Get mail test",
			fields: fields{
				id:       1,
				name:     "Andreu",
				mail:     "andreugallofre@gmail.com",
				password: "test",
			},
			want: "andreugallofre@gmail.com",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			u := user{
				id:       tt.fields.id,
				name:     tt.fields.name,
				mail:     tt.fields.mail,
				password: tt.fields.password,
			}
			if got := u.getMail(); got != tt.want {
				t.Errorf("user.getMail() = %v, want %v", got, tt.want)
			}
		})
	}
}
