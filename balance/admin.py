from django.contrib import admin

from balance.models import Balance


# Register your models here.

@admin.register(Balance)
class Balancess(admin.ModelAdmin):
    pass
