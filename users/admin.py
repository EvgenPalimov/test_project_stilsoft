from django.contrib import admin

from users.models import User


# Register your models here.

@admin.register(User)
class Users(admin.ModelAdmin):

    list_display = ('username', 'first_name', 'last_name', 'email',)
    ordering = ('username',)
    search_fields = ('username', 'email')