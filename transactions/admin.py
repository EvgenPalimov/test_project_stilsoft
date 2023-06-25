from django.contrib import admin

from transactions.models import Transaction


# Register your models here.
@admin.register(Transaction)
class Transactions(admin.ModelAdmin):

    ordering = ('-date_updated',)
    search_fields = ('user', 'date_created')
